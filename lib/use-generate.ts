"use client";

// generation hook. the server route streams live text (verified cumulative
// SSE snapshots forwarded as suffix chunks); this hook buffers what arrives
// and reveals it at a steady pace so coarse chunks still read as typing.
// fallback responses come back as JSON and render the pre-baked cached copy.
// the app never looks broken.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bumpGenerationCount,
  saveBrief,
  saveOutreach,
  sessionCapReached,
  setInFlight,
  useSessionState,
} from "./session-store";

export type GenStatus = "idle" | "loading" | "streaming" | "done";

// a live result shorter than this is a failed/truncated generation
const MIN_VALID_LENGTH = 60;

export interface GenResult {
  status: GenStatus;
  text: string;
  fromFallback: boolean;
  capped: boolean;
  run: () => void;
  locked: boolean; // another generation is in flight somewhere on the page
}

export function useGenerate(opts: {
  kind: "brief" | "outreach";
  accountSlug: string;
  personaId?: string;
  fallbackText: string;
  initialText?: string;
  initialFromFallback?: boolean;
}): GenResult {
  const { kind, accountSlug, personaId, fallbackText } = opts;
  const [status, setStatus] = useState<GenStatus>(
    opts.initialText ? "done" : "idle"
  );
  const [text, setText] = useState(opts.initialText ?? "");
  const [fromFallback, setFromFallback] = useState(
    opts.initialFromFallback ?? false
  );
  const [capped, setCapped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const session = useSessionState();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const save = useCallback(
    (full: string, fb: boolean) => {
      if (kind === "brief") saveBrief(accountSlug, full, fb);
      else if (personaId) saveOutreach(accountSlug, personaId, full, fb);
    },
    [kind, accountSlug, personaId]
  );

  const showFallback = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setText(fallbackText);
    setFromFallback(true);
    setStatus("done");
    save(fallbackText, true);
  }, [fallbackText, save]);

  const run = useCallback(async () => {
    if (session.inFlight) return;

    if (sessionCapReached()) {
      setCapped(true);
      showFallback();
      return;
    }

    setInFlight(true);
    setStatus("loading");
    setText("");
    setFromFallback(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, accountSlug, personaId }),
      });

      const contentType = res.headers.get("content-type") ?? "";
      if (!res.ok || contentType.includes("application/json")) {
        // fallback path (error, 429, missing key)
        showFallback();
        return;
      }

      // live stream. buffer arrivals, reveal at a steady pace.
      const reader = res.body?.getReader();
      if (!reader) {
        showFallback();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let streamDone = false;
      let revealed = 0;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setStatus("streaming");

      if (timerRef.current) clearInterval(timerRef.current);
      const finish = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (buffer.length < MIN_VALID_LENGTH) {
          showFallback();
        } else {
          setText(buffer);
          setStatus("done");
          bumpGenerationCount();
          save(buffer, false);
        }
      };

      timerRef.current = setInterval(() => {
        if (reduced) {
          revealed = buffer.length;
          setText(buffer);
        } else if (revealed < buffer.length) {
          revealed = Math.min(buffer.length, revealed + 6);
          setText(buffer.slice(0, revealed));
        }
        if (streamDone && revealed >= buffer.length) finish();
      }, 24);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
      }
      streamDone = true;
    } catch {
      showFallback();
    } finally {
      setInFlight(false);
    }
  }, [
    session.inFlight,
    kind,
    accountSlug,
    personaId,
    showFallback,
    save,
  ]);

  return {
    status,
    text,
    fromFallback,
    capped,
    run,
    locked: session.inFlight,
  };
}
