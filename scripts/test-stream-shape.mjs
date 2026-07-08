// probes whether stream events carry text deltas or cumulative snapshots.
// run: node scripts/test-stream-shape.mjs
import { readFileSync } from "node:fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const KEY = env.match(/MERGE_GATEWAY_KEY=(\S+)/)[1];

const res = await fetch("https://api-gateway.merge.dev/v1/responses", {
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
        content: "count from one to twenty in words, one per line.",
      },
    ],
    stream: true,
    include_routing_metadata: true,
    model: "anthropic/claude-sonnet-4-6",
  }),
});

console.log("status", res.status);
const reader = res.body.getReader();
const dec = new TextDecoder();
let buf = "";
const texts = [];
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buf += dec.decode(value, { stream: true });
  let idx;
  while ((idx = buf.indexOf("\n\n")) !== -1) {
    const event = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 2);
    if (!event.startsWith("data:")) continue;
    try {
      const json = JSON.parse(event.slice(5));
      const text = json.output?.[0]?.content?.[0]?.text ?? "";
      texts.push({ object: json.object, len: text.length, tail: JSON.stringify(text.slice(-20)) });
    } catch (e) {
      console.log("unparseable event:", event.slice(0, 120));
    }
  }
}
console.log(`${texts.length} events`);
for (const t of texts) console.log(t.object, "len", t.len, "tail", t.tail);
const lens = texts.map((t) => t.len);
const monotonic = lens.every((l, i) => i === 0 || l >= lens[i - 1]);
console.log(
  monotonic && lens[lens.length - 1] > lens[0]
    ? "verdict: CUMULATIVE snapshots (growing full text per event)"
    : "verdict: inspect above, likely DELTAS or mixed"
);
