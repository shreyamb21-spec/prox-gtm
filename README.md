# prox vertical engine

demo build: one vertical (commercial hvac and industrial heat oems), raw source
list → scored accounts → buyer committee maps → live claude-written outreach →
pipeline truth → markdown export. all 20 accounts are synthetic. the method is
real. built by shreyam borah ⊹ not affiliated with prox.

## run locally

```
npm install
npm run dev
```

put the gateway key in `.env.local` (gitignored, never commit it):

```
MERGE_GATEWAY_KEY=...
```

## before deploying

1. run `node scripts/test-gateway.mjs` once. it verifies which model string the
   merge gateway accepts and prints the real response and stream shapes. update
   `lib/config.ts → GATEWAY_MODEL` and the findings comment with what you see.
2. `npm run build` must pass clean.

## deploy (vercel)

- create the vercel project, suggested name `prox-vertical-engine` (domain
  `prox-vertical-engine.vercel.app` or nearest available).
- set `MERGE_GATEWAY_KEY` in project env vars for Production and Preview
  before the first deploy. the key never ships to the client; the gateway is
  called only from `app/api/generate/route.ts`.
- after deploy: open the site on a phone, run one brief generation and one
  outreach generation end to end, then pull the gateway once with wifi off to
  confirm the fallback path renders with the `cached copy ⊹ regenerate` tag.

## how it degrades

every generation has a hand-written fallback in `lib/fallbacks/`. gateway
error, 25s timeout, 429, or the 40-generation session cap all render the
cached copy with a regenerate button. the app never looks broken.
