// verifies the merge gateway before the app relies on it.
// run: node scripts/test-gateway.mjs
// 1. tries each candidate model string non-streaming, prints the full JSON of the first 200.
// 2. then tests stream: true with the winning model and prints the raw event format.
// record findings in the comment at the top of lib/config.ts.

import { readFileSync } from "node:fs";

function loadKey() {
  if (process.env.MERGE_GATEWAY_KEY) return process.env.MERGE_GATEWAY_KEY;
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const m = env.match(/MERGE_GATEWAY_KEY=(\S+)/);
    if (m) return m[1];
  } catch {}
  throw new Error("MERGE_GATEWAY_KEY not found in env or .env.local");
}

const KEY = loadKey();
const URL_ = "https://api-gateway.merge.dev/v1/responses";
const CANDIDATES = [
  "anthropic/claude-sonnet-4-6",
  "claude-sonnet-4-6",
  "anthropic/claude-opus-4-7",
];

async function call(model, stream) {
  const started = Date.now();
  const res = await fetch(URL_, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      input: [
        {
          type: "message",
          role: "user",
          content: "reply with the single word: ok",
        },
      ],
      stream,
      include_routing_metadata: true,
      model,
    }),
  });
  return { res, ms: Date.now() - started };
}

let winner = null;

for (const model of CANDIDATES) {
  process.stdout.write(`\n=== non-streaming: ${model} ... `);
  try {
    const { res, ms } = await call(model, false);
    console.log(`${res.status} in ${ms}ms`);
    if (res.ok) {
      const json = await res.json();
      console.log(JSON.stringify(json, null, 2));
      winner = model;
      break;
    } else {
      console.log(await res.text());
    }
  } catch (e) {
    console.log("ERROR", e.message);
  }
}

if (!winner) {
  console.log("\nno candidate model returned 200. stop and investigate.");
  process.exit(1);
}

console.log(`\n=== streaming test: ${winner}`);
try {
  const { res } = await call(winner, true);
  console.log("status", res.status, "content-type:", res.headers.get("content-type"));
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let events = 0;
  while (events < 40) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log("---chunk---");
    console.log(dec.decode(value));
    events++;
  }
  reader.cancel().catch(() => {});
} catch (e) {
  console.log("stream ERROR", e.message);
}

console.log(`\nwinner: ${winner} → put in lib/config.ts GATEWAY_MODEL`);
