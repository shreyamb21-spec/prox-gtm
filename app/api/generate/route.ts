import { NextRequest, NextResponse } from "next/server";
import { getAccount } from "@/lib/accounts";
import { SYSTEM_PREAMBLE, briefPrompt, outreachPrompt } from "@/lib/prompts";
import {
  GATEWAY_MODEL,
  GATEWAY_TIMEOUT_MS,
  GATEWAY_URL,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/config";

// gateway verified 2026-07-08 (scripts/test-gateway.mjs + test-stream-shape.mjs):
// stream events are SSE `data:` lines carrying CUMULATIVE snapshots at
// output[0].content[0].text. we forward only the new suffix of each snapshot
// to the client as plain text, so the client sees a live stream. fallbacks
// return JSON; the client switches on content-type.
export const runtime = "nodejs";

// best-effort in-memory per-IP rate limit. resets on cold start, that's fine.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (list.length >= RATE_LIMIT_MAX) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function eventText(json: any): string {
  const parts: string[] = [];
  if (Array.isArray(json?.output)) {
    for (const item of json.output) {
      if (Array.isArray(item?.content)) {
        for (const c of item.content) {
          if (typeof c?.text === "string") parts.push(c.text);
        }
      }
    }
  }
  return parts.join("");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { fallback: true, rateLimited: true },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ fallback: true }, { status: 400 });
  }

  const { kind, accountSlug, personaId } = body ?? {};
  if (kind !== "brief" && kind !== "outreach") {
    return NextResponse.json({ fallback: true }, { status: 400 });
  }

  // account content is looked up server-side from the bundled dataset.
  // the client only ever sends a slug, so prompts can't be tampered with.
  const account = getAccount(String(accountSlug ?? ""));
  if (!account) {
    return NextResponse.json({ fallback: true }, { status: 404 });
  }

  let userPrompt: string;
  if (kind === "brief") {
    userPrompt = briefPrompt(account);
  } else {
    const persona = account.committee.find((p) => p.id === personaId);
    if (!persona) {
      return NextResponse.json({ fallback: true }, { status: 404 });
    }
    userPrompt = outreachPrompt(account, persona);
  }

  const key = process.env.MERGE_GATEWAY_KEY;
  if (!key) {
    return NextResponse.json({ fallback: true });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GATEWAY_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        // the verified request shape only uses user messages, so the system
        // preamble rides in the same message rather than assuming a system
        // role works
        input: [
          {
            type: "message",
            role: "user",
            content: `${SYSTEM_PREAMBLE}\n\n${userPrompt}`,
          },
        ],
        stream: true,
        include_routing_metadata: true,
        model: GATEWAY_MODEL,
      }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timer);
    return NextResponse.json({ fallback: true });
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timer);
    return NextResponse.json({ fallback: true });
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(streamController) {
      let buf = "";
      let sent = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let idx;
          while ((idx = buf.indexOf("\n\n")) !== -1) {
            const event = buf.slice(0, idx).trim();
            buf = buf.slice(idx + 2);
            if (!event.startsWith("data:")) continue;
            let json: any;
            try {
              json = JSON.parse(event.slice(5));
            } catch {
              continue;
            }
            const full = eventText(json);
            if (full.length > sent.length && full.startsWith(sent)) {
              streamController.enqueue(encoder.encode(full.slice(sent.length)));
              sent = full;
            } else if (full && !full.startsWith(sent)) {
              // snapshot diverged (shouldn't happen); resend everything
              streamController.enqueue(encoder.encode("\n" + full));
              sent = full;
            }
          }
        }
      } catch {
        // timeout or upstream drop mid-stream. the client treats a short
        // result as a failed generation and renders the fallback.
      } finally {
        clearTimeout(timer);
        streamController.close();
      }
    },
    cancel() {
      clearTimeout(timer);
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
