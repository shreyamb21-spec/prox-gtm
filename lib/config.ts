// gateway findings, verified live 2026-07-08 (scripts/test-gateway.mjs and
// scripts/test-stream-shape.mjs):
// - `anthropic/claude-sonnet-4-6` returns 200 (~1.3s llm_call for a tiny
//   prompt). first candidate worked, others not needed.
// - non-streaming shape: { object: "response", output: [{ type: "message",
//   content: [{ type: "text", text }] }], usage, routing }
// - streaming: SSE `data: {...}` events, object "response.stream" then a
//   final "response.done". each event carries a CUMULATIVE snapshot of the
//   full text at output[0].content[0].text, not deltas, and granularity is
//   coarse. the route therefore forwards only the new suffix per event as a
//   plain-text stream and the client paces the reveal.

export const GATEWAY_URL = "https://api-gateway.merge.dev/v1/responses";
export const GATEWAY_MODEL = "anthropic/claude-sonnet-4-6";

// server-side abort timeout for a generation call
export const GATEWAY_TIMEOUT_MS = 25_000;

// best-effort per-IP rate limit
export const RATE_LIMIT_MAX = 20;
export const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

// per-browser-session generation cap (localStorage)
export const SESSION_GENERATION_CAP = 40;
