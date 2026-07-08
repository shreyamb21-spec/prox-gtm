# Prox Vertical Engine — Claude Code Build Spec

Build a deployed Next.js web app called **prox vertical engine** — a show-don't-tell prototype Shreyam Borah will send to the founders of Prox (YC F25) as evidence of work for their Founding GTM Engineer role.

The app runs Prox's own 90-day milestone #1 on one vertical (commercial HVAC & industrial heat OEMs): raw source list → scored accounts → buyer committee maps → high-context outreach → pipeline truth. Everything generative runs LIVE through Merge Gateway (Claude) while the user watches. Synthetic account data, real method.

Read this whole spec before writing any code. Follow it exactly. Where something is unspecified, choose the simplest option that keeps the app fast and unbreakable in front of a founder.

---

## 1. Who sees this and what it must accomplish

The audience is two YC founders (Greg and Dima) who:
- run their whole company out of a folder of 1000+ markdown files with Claude Code (no Notion, no Airtable)
- brand Prox as "grounded in your manuals, cited to the page"
- write in lowercase, terse sentences, and use the ⊹ character as a bullet
- explicitly want GTM writing that does not read like AI slop
- use Attio as their CRM

The app must make them think: "he already did month one of the job." Every design and copy decision serves that.

**Three moments that must land:**
1. Dragging a scoring weight slider and watching 20 accounts re-rank instantly.
2. Clicking "generate brief" on an account and watching a live Claude-written account brief stream in, with citations to the data fields that informed it.
3. Clicking "export campaign as markdown" and getting a zip that is a ready-to-drop folder for their markdown-file company brain.

---

## 2. Non-negotiables

1. **Honesty labeling.** A persistent, subtle banner/footer on every page: `all 20 accounts are synthetic. the sourcing method, scoring logic, prompts, and export flow are real. built by shreyam borah ⊹ not affiliated with prox`. Never present synthetic companies as real. Never use real HVAC company names (no Carrier, Trane, Lennox, Daikin, Modine, Reznor, etc. anywhere in data or generated output — add this to generation prompts too).
2. **No AI-slop voice anywhere.** All copy in the app AND all generation prompts must enforce Shreyam's voice rules: no em dashes, no "moreover / furthermore / it's worth noting / in today's fast-paced world / delve / leverage (as a verb in prose)", no neat parallel triads, varied sentence lengths, direct and terse. Lowercase headers throughout the UI to match Prox's style.
3. **The API key never ships to the client.** Merge Gateway is called only from a Next.js server route. Key lives in an env var.
4. **The app can never look broken.** Every live generation has a pre-baked fallback. Timeouts, errors, and rate limits all degrade gracefully with a visible "cached copy" tag and a regenerate button.
5. **Fast.** First load under ~2s on Vercel. All account data is static and bundled. No database.

---

## 3. Stack

- Next.js 14+ (App Router), TypeScript, deployed on Vercel
- Tailwind CSS
- `jszip` + `file-saver` for the markdown export
- No database, no auth, no analytics beyond Vercel defaults
- State: React state + URL params (selected account as `/account/[slug]`). localStorage only for the session generation counter.

### Environment

`.env.local` (and later Vercel project env vars — remind the user to set this in Vercel before deploy, and never commit it):

```
MERGE_GATEWAY_KEY=mg_jJ1SemklQckYD04vhJEl6t_DpZc1UupByH_VtKmH4w0
```

---

## 4. Merge Gateway integration

Base request shape (verified working curl from the user):

```bash
curl -X POST "https://api-gateway.merge.dev/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {MERGE_GATEWAY_KEY}" \
  -d '{
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "This is a test message to check your api costs"
    }
  ],
  "stream": true,
  "include_routing_metadata": true,
  "model": "anthropic/claude-opus-4-7"
}'
```

### 4.1 Verify before building on it

Before wiring the app, write and run `scripts/test-gateway.mjs`:
1. Send one **non-streaming** request (`"stream": false`) with each candidate model string, in this order: `anthropic/claude-sonnet-4-6`, `claude-sonnet-4-6`, `anthropic/claude-opus-4-7`.
2. Print the full response JSON for the first one that returns 200. Inspect the actual shape and write the response parser against reality, not assumption.
3. Pick the fastest working Sonnet-class model as the default. Put the chosen string in ONE config constant: `lib/config.ts → GATEWAY_MODEL`. Opus is acceptable only if no Sonnet string works (latency matters more than marginal quality here; briefs must stream in seconds).
4. Then test `"stream": true` and inspect the event format. If it is SSE with incremental text deltas, implement true streaming to the client. If the streaming format is unclear or flaky, fall back to non-streaming server-side and simulate progressive rendering client-side (reveal the returned text in chunks). The user experience must FEEL live either way.

### 4.2 Server route

`app/api/generate/route.ts` (Edge runtime if streaming works cleanly, otherwise Node):

- Accepts POST `{ kind: "brief" | "outreach", accountSlug: string, personaId?: string, weightsSnapshot?: Record<string, number> }`
- Looks up the account server-side from the bundled dataset (client never sends account content, only the slug — prevents prompt tampering)
- Builds the prompt (section 9), calls Merge Gateway with a **25-second abort timeout**
- Streams text back to the client, or returns JSON `{ text }` if non-streaming
- On any error/timeout: return `{ fallback: true }` and let the client render the pre-baked fallback
- Basic in-memory best-effort rate limit: per-IP, max 20 generations per 5 minutes → 429 with `{ fallback: true, rateLimited: true }`

Client-side: while a generation is in flight, disable other generate buttons. Cap 40 generations per browser session (localStorage counter); past the cap, serve fallbacks with a small note: `session limit reached ⊹ showing cached copy`.

---

## 5. Design system

Direction: **the equipment datasheet.** Prox's whole world is service manuals, spec sheets, and fitment tables. So the app should look like a beautifully set technical datasheet, not a SaaS dashboard. This is the deliberate aesthetic risk: light manual-paper surfaces, engineering-drawing rules, monospace data, one industrial accent.

Do NOT use: near-black background with an acid green/vermilion accent, warm-cream with terracotta serif, or any generic gradient-hero SaaS look.

### Tokens

- `--paper: #F7F6F2` (page background, like manual stock)
- `--ink: #14161A` (primary text)
- `--rule: #C9C7BF` (hairline rules, table borders)
- `--muted: #6B6E66` (secondary text, captions)
- `--accent: #E8590C` (safety orange — the color stamped on industrial equipment; used ONLY for: citation chips, the active slider thumb, the ⊹ marker, and primary action buttons)
- `--ok: #2F6B3A` (small status marks only)

Type:
- Display/headers: a tight grotesk (e.g. "Archivo" or "Space Grotesk" via next/font), lowercase, tracking slightly tight
- Body: same grotesk at regular weight
- Data/numbers/citations/labels: "IBM Plex Mono" — all table figures, scores, chips, and field names render in mono

Layout language:
- Hairline horizontal rules between sections, like a datasheet
- Section headers formatted like manual sections: `⊹ 02 / scoreboard` (mono, small, muted, with the section number — the numbering is justified: the app IS a sequential process, source → score → map → outreach → pipeline)
- Tables with thin rules, generous row height, mono figures
- Border radius: 2px max. No shadows heavier than a 1px rule.
- Zero decorative animation. The only motion: rows re-sorting on the scoreboard (FLIP animation, ~300ms) and text streaming into brief/outreach panels. Respect `prefers-reduced-motion`.

### Signature element

**Citation chips.** Every score, claim, and generated paragraph carries a small mono chip in accent orange: `cited: dealer_count=210 ⊹ source: HARDI directory`. Hovering a subscore on the scoreboard shows its evidence string. Generated briefs end with a `sources` line listing the account fields used. This is Prox's "cited to the page" identity applied to GTM, and it should be visually consistent everywhere.

Top nav: wordmark `prox vertical engine` (grotesk, lowercase) + mono tag `hvac & industrial heat ⊹ demo build`. Nav links: `why ⊹ source ⊹ scoreboard ⊹ pipeline ⊹ export`.

Responsive: must be fully usable on a phone (founders will open the link from LinkedIn on mobile). Scoreboard collapses to cards, sliders stack, brief panel full-width.

---

## 6. Data model and dataset

`lib/types.ts`:

```ts
export type SignalKey =
  | "dealerNetwork"     // size/reach of dealer & distributor network
  | "skuComplexity"     // catalog breadth + configuration depth
  | "supportPain"       // observable technical support load/pain
  | "docDepth"          // depth of public manuals/spec sheets (Prox needs docs to ground on)
  | "whitespace"        // inverse digital maturity: no chat, weak portal = greenfield
  | "revenueFit";       // fit with a $60K+/yr ACV motion (mid-size OEM sweet spot)

export interface Persona {
  id: string;
  name: string;          // fictional
  title: string;
  angle: string;         // one line: what they care about / the wedge for them
}

export interface Account {
  slug: string;
  name: string;          // fictional, must not collide with a real major HVAC brand
  hq: string;
  founded: number;
  employees: string;     // band, e.g. "180–240"
  revenueBand: string;   // e.g. "$40M–$70M"
  segment: string;       // e.g. "commercial rooftop units"
  products: string;      // short catalog description
  skuCount: number;
  dealerCount: number;
  distribution: string;  // e.g. "2-step: manufacturer reps → distributors → contractors"
  source: string;        // e.g. "AHR Expo 2026 exhibitor list"
  scores: Record<SignalKey, number>;      // 0–100
  evidence: Record<SignalKey, string>;    // one terse line per subscore, cited on hover
  committee: Persona[];  // 3–4 people
  notes: string;         // one line of color for the brief prompt
}
```

### Default weights

```ts
export const DEFAULT_WEIGHTS: Record<SignalKey, number> = {
  dealerNetwork: 25,
  skuComplexity: 20,
  supportPain: 20,
  docDepth: 15,
  whitespace: 10,
  revenueFit: 10,
};
```

Fit score = Σ (score_k × weight_k) / Σ weights, rounded to one decimal. Re-computed client-side on every slider change; scoreboard re-sorts live.

### 6.1 The 20 accounts (`lib/accounts.ts`)

Author all 20 exactly as below. Keep the field values; write the `evidence` lines yourself if any are missing, in the same terse mono style ("210 dealers across 38 states per HARDI listing"). Persona `angle` lines: keep them concrete and pain-shaped, never generic.

1. **Kestrel Thermal Systems** (`kestrel-thermal`) — Tulsa, OK. Founded 1987. 320–400 emp, $80M–$120M. Segment: commercial rooftop units. Products: packaged RTUs 3–50 ton, curbs, economizers, BAS integration kits. skuCount 1400, dealerCount 210, distribution "2-step: reps → distributors → mechanical contractors", source "AHR Expo 2026 exhibitor list". Scores: dealerNetwork 88, skuComplexity 82, supportPain 78, docDepth 85, whitespace 72, revenueFit 90. Committee: Dana Whitfield (VP Sales, "dealer quote turnaround is the #1 complaint in her channel"), Marcus Ohler (Director of Dealer Operations, "counter staff take 6+ months to ramp on the configurator"), Priya Raghavan (Technical Support Manager, "3 senior techs answer the same curb-adapter fitment questions daily"). Notes: "publishes 40+ IOM manuals publicly; no chat on site; dealer portal is a PDF library."

2. **Blue Ridge Hydronics** (`blue-ridge-hydronics`) — Asheville, NC. 1974. 150–200 emp, $35M–$55M. Segment: hydronic boilers. Products: condensing boilers, cast-iron commercial boilers, venting kits, controls. skuCount 900, dealerCount 160, distribution "wholesale distributors → hydronic contractors", source "AHRI member directory". Scores: 74, 76, 84, 88, 80, 78. Committee: Tom Kessler (VP Sales), Renee Alvarado (Head of Technical Services, "winter no-heat calls swamp the desk; error-code lookups eat her team"), Gil Mancini (Aftermarket & Parts Director, "wrong-part returns on venting kits run ~9%"). Notes: "deep manual library incl. legacy models back to 1998; support line closes 5pm ET, contractors work later."

3. **Meridian Air Technologies** (`meridian-air`) — Phoenix, AZ. 2003. 400–500 emp, $120M–$180M. Segment: VRF & commercial heat pumps. Products: VRF outdoor/indoor units, branch controllers, line-set accessories, commissioning tools. skuCount 2100, dealerCount 240, distribution "certified dealer program, direct-to-mechanical", source "AHR Expo 2026 exhibitor list". Scores: 90, 94, 82, 70, 55, 92. Committee: Alex Duran (VP Sales), Keiko Tanabe (Director, Dealer Enablement, "certification course backlog is gating new dealer activation"), Sam Whitaker (Technical Support Manager), Lena Ford (Head of Digital, "owns a portal contractors barely log into"). Notes: "compatibility matrix across 2100 SKUs is the support desk's daily grind; already has a weak chatbot (FAQ-only)."

4. **Vulcan Process Heating** (`vulcan-process`) — Pittsburgh, PA. 1969. 220–280 emp, $60M–$90M. Segment: industrial process heaters. Products: immersion heaters, circulation heaters, control panels, custom-engineered systems. skuCount 700 (plus engineered-to-order), dealerCount 60, distribution "direct + manufacturer reps", source "ACHR News industrial coverage". Scores: 45, 88, 90, 82, 85, 84. Committee: Ed Brancato (VP Sales), Dr. Ana Kovács (Applications Engineering Lead, "her engineers spend half their week on pre-sales sizing questions"), Ray Delgado (Service Manager). Notes: "engineered-to-order means every quote needs an expert; wattage/watt-density sizing questions dominate inbound."

5. **NorthStar Radiant** (`northstar-radiant`) — Minneapolis, MN. 1991. 120–160 emp, $25M–$40M. Segment: radiant tube & infrared heaters. Products: gas-fired tube heaters, high-intensity infrared, garage/warehouse kits. skuCount 450, dealerCount 140, distribution "2-step wholesale", source "AHRI member directory". Scores: 70, 58, 72, 76, 82, 66. Committee: Carrie Lindqvist (VP Sales & Marketing), Doug Feeney (Technical Support Lead, "clearance-to-combustibles questions are 30% of calls"), Matt Osei (Dealer Development Manager). Notes: "strong seasonal spike Oct–Jan; support desk drowns exactly when dealers sell hardest."

6. **Cascade Chiller Works** (`cascade-chiller`) — Portland, OR. 1998. 260–320 emp, $70M–$110M. Segment: air- and water-cooled chillers. Products: scroll/screw chillers 20–500 ton, free-cooling options, plant controls. skuCount 1100, dealerCount 90, distribution "reps + national accounts", source "AHR Expo 2026 exhibitor list". Scores: 62, 86, 76, 80, 68, 88. Committee: Victor Chen (VP Sales), Ingrid Halvorsen (Director of Service Operations), Paulo Ribeiro (Controls Product Manager, "BAS integration questions bounce between three teams"). Notes: "selection software is desktop-only and 9 years old; reps quote from spreadsheets."

7. **Ironline Unit Heaters** (`ironline-unit`) — Cleveland, OH. 1958. 90–130 emp, $20M–$32M. Segment: gas unit heaters. Products: power-vented and separated-combustion unit heaters, thermostats, hanging kits. skuCount 380, dealerCount 190, distribution "wholesale distribution", source "HARDI distributor network mapping". Scores: 80, 44, 60, 72, 88, 58. Committee: Hank Willoughby (President & VP Sales, "wears both hats; wants dealers self-serving basic questions"), Joan Marek (Customer Service Manager), Terrell Boone (Regional Sales Manager). Notes: "family-owned, lean team; no digital surface at all beyond a brochure site."

8. **Gulfstream Dehumidification** (`gulfstream-dehum`) — Tampa, FL. 2008. 110–150 emp, $28M–$45M. Segment: commercial dehumidifiers. Products: pool dehumidifiers, DOAS units, corrosion-resistant coastal packages. skuCount 520, dealerCount 85, distribution "reps → mechanical contractors, natatorium specialists", source "AHR Expo 2026 exhibitor list". Scores: 55, 68, 80, 74, 78, 70. Committee: Marisol Vega (VP Sales), Chip Landry (Applications Manager, "pool-room sizing mistakes cause warranty fights"), Erin Dvorak (Marketing Manager). Notes: "niche expertise (natatoriums) lives in 2 people's heads; both near retirement."

9. **Prairie Furnace Co** (`prairie-furnace`) — Wichita, KS. 1963. 200–260 emp, $50M–$75M. Segment: commercial furnaces & make-up air. Products: direct/indirect-fired MUA, duct furnaces, kitchen ventilation heat. skuCount 640, dealerCount 175, distribution "2-step wholesale", source "HARDI distributor network mapping". Scores: 78, 62, 70, 78, 84, 74. Committee: Gordon Pike (VP Sales), Althea Bryant (Technical Services Director), Russ Kimble (Distributor Relations Manager, "distributors carry 4 competing lines; whoever is easiest to spec wins"). Notes: "MUA sizing questions require airflow math most counter staff can't do."

10. **Summit ERV Systems** (`summit-erv`) — Denver, CO. 2011. 80–110 emp, $18M–$30M. Segment: energy recovery ventilators. Products: ERV/HRV cores, packaged rooftop ERVs, controls. skuCount 340, dealerCount 70, distribution "reps + direct to design-build", source "AHR Expo 2026 exhibitor list". Scores: 48, 60, 64, 70, 76, 60. Committee: Nia Okafor (VP Sales & Co-founder), Brett Halloran (Applications Engineer), Sofia Marchetti (Operations Manager). Notes: "code-driven demand (ASHRAE 62.1) means buyers arrive confused; education is the sale."

11. **Halcyon Cooling Towers** (`halcyon-cooling`) — Baltimore, MD. 1982. 240–300 emp, $65M–$95M. Segment: cooling towers & fluid coolers. Products: FRP towers, closed-circuit coolers, fill/drift retrofit kits. skuCount 800, dealerCount 100, distribution "reps + aftermarket parts direct", source "AHRI member directory". Scores: 60, 72, 74, 82, 70, 82. Committee: Walt Jessup (VP Sales), Farrah Nassar (Aftermarket Director, "parts identification on 20-year-old towers is a photo-and-pray process"), Omar Castellanos (Service Network Manager). Notes: "aftermarket is 40% of revenue; parts fitment on legacy units is the pain center."

12. **Redrock Combustion** (`redrock-combustion`) — Salt Lake City, UT. 1995. 130–170 emp, $30M–$50M. Segment: burners & combustion controls. Products: gas burners, flame safeguards, retrofit kits, tuning tools. skuCount 560, dealerCount 120, distribution "wholesale + OEM supply", source "ACHR News industrial coverage". Scores: 66, 78, 86, 78, 74, 68. Committee: Deb Sorenson (VP Sales), Luis Barrientos (Field Service Manager, "commissioning support calls run 45 min average"), Kenji Morita (OEM Accounts Manager). Notes: "sells through OEMs too; two-audience docs confuse everyone."

13. **Lakeshore Steam Specialties** (`lakeshore-steam`) — Milwaukee, WI. 1977. 100–140 emp, $22M–$36M. Segment: steam humidifiers & specialties. Products: steam humidifiers, dispersion panels, condensate gear. skuCount 410, dealerCount 95, distribution "reps → mechanical contractors", source "AHRI member directory". Scores: 52, 64, 72, 80, 80, 62. Committee: Peter Vandenberg (General Manager), Colleen Rafferty (Technical Support Supervisor, "psychrometrics questions stall every first-time buyer"), Andre Sylvain (Sales Engineer). Notes: "sells physics as much as hardware; long educational sales cycle."

14. **Everline Ductless** (`everline-ductless`) — Sacramento, CA. 2014. 170–220 emp, $45M–$70M. Segment: ductless mini-splits (commercial/light-commercial). Products: single/multi-zone systems, ceiling cassettes, line-set kits, wifi controls. skuCount 980, dealerCount 260, distribution "certified dealer program + distribution", source "AHR Expo 2026 exhibitor list". Scores: 92, 74, 78, 66, 60, 76. Committee: Jasmine Cho (VP Sales), Robbie Muniz (Dealer Program Manager, "260 dealers, 4 trainers; enablement doesn't scale"), Tara Whitcomb (Support Center Lead), Devin Okada (E-commerce Manager). Notes: "biggest dealer network on the list; already invests in dealer training, receptive to enablement tech."

15. **Foundry Heat Exchange** (`foundry-hx`) — Detroit, MI. 1971. 180–230 emp, $40M–$65M. Segment: heat exchangers. Products: plate, shell-and-tube, brazed-plate exchangers, gaskets/plates aftermarket. skuCount 720, dealerCount 75, distribution "direct + reps", source "ACHR News industrial coverage". Scores: 50, 76, 78, 76, 82, 72. Committee: Stan Wozniak (VP Sales), Helena Brandt (Applications Engineering Manager, "sizing requests queue 3 days deep"), Curtis Long (Aftermarket Sales Manager). Notes: "gasket/plate fitment on competitor units is a lucrative, expertise-bound aftermarket."

16. **Coastal Marine HVAC** (`coastal-marine`) — Norfolk, VA. 1989. 70–100 emp, $15M–$25M. Segment: marine HVAC. Products: self-contained marine AC, chillers for vessels, corrosion-proof ducting. skuCount 290, dealerCount 110, distribution "boatyard dealers + marine distributors", source "AHRI member directory". Scores: 64, 56, 76, 62, 84, 48. Committee: Bo Trask (Owner/VP Sales), Yolanda Reyes (Service Coordinator, "boatyards call from the dock with the panel open"), Neil Farraday (Dealer Sales Rep). Notes: "smallest revenue on list; borderline ACV fit, but a vivid photo-and-voice support use case."

17. **Highplains Evaporative** (`highplains-evap`) — Lubbock, TX. 1984. 90–120 emp, $19M–$30M. Segment: evaporative cooling. Products: industrial evap coolers, media, pumps, controls. skuCount 330, dealerCount 150, distribution "wholesale distribution", source "HARDI distributor network mapping". Scores: 72, 48, 58, 64, 86, 54. Committee: Wade Hollister (VP Sales), Consuelo Marín (Customer Service Manager), Judd Ferris (Territory Manager). Notes: "seasonal, price-driven category; support pain moderate but digital whitespace total."

18. **Sterling Cleanroom Air** (`sterling-cleanroom`) — Raleigh, NC. 2006. 140–180 emp, $38M–$60M. Segment: cleanroom air handling. Products: cleanroom AHUs, fan filter units, pressure controls, validation kits. skuCount 480, dealerCount 55, distribution "direct to pharma/semi contractors + reps", source "AHR Expo 2026 exhibitor list". Scores: 42, 80, 82, 84, 66, 80. Committee: Dr. Mei-Ling Shaw (VP Sales & Applications), Oscar Delacroix (Validation Support Lead, "compliance documentation requests are 8-hour jobs"), Hana Petrov (Project Engineering Manager). Notes: "regulated buyers; every answer needs a citation. Prox's cited-to-the-page pitch is literal here."

19. **Quarry Industrial Fans** (`quarry-fans`) — Louisville, KY. 1979. 160–210 emp, $42M–$68M. Segment: HVLS & industrial fans. Products: HVLS fans, exhaust/supply fans, controls, mounting systems. skuCount 610, dealerCount 185, distribution "2-step + national accounts", source "HARDI distributor network mapping". Scores: 82, 58, 62, 72, 78, 74. Committee: Reggie Calhoun (VP Sales), Bridget Malone (Inside Sales Manager, "her team quotes mounting hardware wrong weekly"), Santiago Vidal (National Accounts Director). Notes: "structural mounting questions (joist loads) scare generalist dealers off closing."

20. **Beacon Snowmelt & Hydronic Controls** (`beacon-snowmelt`) — Burlington, VT. 2001. 60–90 emp, $14M–$24M. Segment: snowmelt & hydronic controls. Products: snowmelt controllers, sensors, mixing valves, zone controls. skuCount 260, dealerCount 130, distribution "wholesale + e-commerce", source "AHRI member directory". Scores: 68, 52, 66, 70, 62, 46. Committee: Elliot Marsh (Founder & VP Sales), Dot Kowalski (Support Lead, "install-wiring photos flood her inbox every November"), Van Nguyen (Digital Sales Manager). Notes: "small but digitally curious; already sells online, natural chat-widget adopter."

### 6.2 Pipeline dataset (`lib/pipeline.ts`)

Static, Attio-flavored. Stages: `sourced → contacted → replied → demo booked → trial → deployed`. Place accounts:

- deployed: (none — honest for a demo)
- trial: meridian-air (next action: "collect VRF compatibility matrix docs from Keiko; test dealer-tablet agent on 20 gnarliest fitment questions", blocker: "compat matrix lives in a 2019 Excel export", owner: "gtm", last touch: "2d ago")
- demo booked: kestrel-thermal ("prep founder demo around curb-adapter fitment; pull 3 IOM manuals into agent beforehand", blocker: "—", "gtm", "1d ago"); blue-ridge-hydronics ("build error-code lookup demo from public boiler manuals before call", "—", "gtm", "3d ago")
- replied: vulcan-process ("Ana asked for a sizing-question pilot scope; send 1-pager", "legal wants NDA first", "gtm", "5h ago"); everline-ductless ("Robbie intro'd Jasmine; propose dealer-enablement pilot", "—", "gtm", "1d ago"); halcyon-cooling ("Farrah wants parts-ID-from-photo proof; script demo", "needs legacy parts catalog access", "gtm", "4d ago")
- contacted: sterling-cleanroom, redrock-combustion, cascade-chiller, foundry-hx (each with one terse next action in the same voice)
- sourced: everything else (next action: "score review ⊹ pick wedge persona")

Each row: account, stage, next action, blocker, owner, last touch. This page is static (no generation) — it demonstrates Pipeline Truth discipline, not AI.

---

## 7. Pages

### Page 0 — `/` — `⊹ 00 / why i built this`

Single column, datasheet-styled, max-w ~680px. Use this copy VERBATIM (do not rewrite, do not "improve"):

> **why i built this**
>
> I saw the founding GTM engineer role and figured the fastest way to show fit was to do the job. This is milestone one from your 90 day list: one vertical, raw source list to scored accounts to buyer maps to outreach to pipeline. Built in a weekend on the stack I already use.
>
> Two proof points behind it. At Louisa AI (Goldman spin-out) I built the outbound engine: Python on Claude API and Apollo, 25+ meetings booked from 500+ prospects, manual outreach time down about 95%. Before that I co-founded CompetitorPulse, an AI competitive intelligence SaaS: 7 agent pipeline, Next.js, Stripe billing, 25+ active beta testers.
>
> The accounts here are synthetic so I'm not publishing anyone's real pipeline. The sourcing method, scoring logic, generation prompts and export flow are all real and rerunnable on live data in a day.
>
> Everything generative on this site runs live on Claude. Every score cites the fields that produced it. And the export button gives you the whole campaign as a folder of markdown files, because I read how you run the company.
>
> shreyam borah ⊹ [shreyamborah.com](https://shreyamborah.com) ⊹ shreyamb21@gmail.com
>
> thought this would be more useful than another message.

Below the copy: three mono links styled as datasheet references: `→ 01 source`, `→ 02 scoreboard`, `→ 05 export`.

### Page 1 — `/source` — `⊹ 01 / source`

Explains list assembly. Four source cards (mono headers): AHR Expo 2026 exhibitor list, AHRI member directory, HARDI distributor network mapping, ACHR News industrial coverage. Each card: what it yields, how it would be scraped/enriched in production (2 lines, concrete: "exhibitor scrape → domain match → Apollo enrichment → dealer-count estimation from locator pages"). Then a plain table of all 20 accounts: name, hq, segment, source, dealer count, SKU count. Banner at top: `20 synthetic accounts ⊹ real sourcing method`.

### Page 2 — `/scoreboard` — `⊹ 02 / scoreboard`

Left rail (or top on mobile): six weight sliders (0–100), mono labels with current value, defaults per section 6, and a `reset weights` text button. Main area: ranked table — rank, account, segment, six subscore cells (mono, hover reveals the evidence string as a citation chip), computed fit score (accent orange, one decimal). Slider changes recompute and FLIP-animate the re-sort instantly. Row click → account page. Under the sliders, one caption: `fit = weighted sum of six cited signals. drag to see the vertical differently.`

### Page 3 — `/account/[slug]` — `⊹ 03 / account`

Header: account name, mono spec line (hq ⊹ founded ⊹ employees ⊹ revenue band ⊹ segment), fit score at current weights.

Section A — **buyer committee**: one card per persona: name, title, angle, and a `draft outreach →` button per persona.

Section B — **account brief (live)**: a `generate brief` button. On click, streams the Claude-generated brief into a datasheet-styled panel with a blinking mono cursor while streaming. Structure of the output (enforced by prompt): wedge / why now / demo angle / five discovery questions / likely objections + responses / deployment path. After generation, append the citation line: `sources: dealer_count, sku_count, support_pain evidence, doc_depth evidence, notes`. If fallback used: tag `cached copy ⊹ regenerate`.

Section C — **outreach (live)**: renders when a persona's `draft outreach →` is clicked. Two panels: email (subject + body) and linkedin note. Each shows a one-line `built on:` citation naming the signal used. `regenerate` button on each.

### Page 4 — `/pipeline` — `⊹ 04 / pipeline`

Attio-flavored board or dense table (table is fine, more datasheet): stage, account, next action, blocker, owner, last touch. Group rows by stage with mono stage headers and counts. Caption: `pipeline truth: every account has a next action or it isn't in the pipeline.`

### Page 5 — `/export` — `⊹ 05 / export`

One page. Copy (verbatim):

> **export campaign as markdown**
>
> You run the company out of a folder of markdown files. So this campaign exports as one. Accounts, buyer maps, briefs, outreach drafts and the pipeline, each as its own .md, ready to drop into /raw.

Big accent button: `download campaign.zip`. Client-side jszip builds:

```
prox-hvac-campaign/
  README.md                 (what this is, how it was scored, weights used)
  pipeline.md               (the full pipeline table)
  accounts/{slug}.md        (spec block + committee + evidence, one per account)
  briefs/{slug}.md          (generated brief if one was generated this session, else the fallback)
  outreach/{slug}.md        (any generated outreach this session, else fallback for top-5 accounts)
```

Markdown files use the same ⊹ style. Keep generated-this-session content in a client store so the export includes what the founder just watched being generated.

---

## 8. Fallback system

`lib/fallbacks/` contains a hand-written brief and one outreach pair (email + linkedin) for EVERY account, authored by you (Claude Code) at build time, following the exact same output structures and voice rules as the live prompts (section 9). Write them well — a founder may see these. They render whenever: gateway error, 25s timeout, 429, or session cap. Always tagged `cached copy ⊹ regenerate`.

---

## 9. Generation prompts

Store as template functions in `lib/prompts.ts`. Both prompts share this system preamble:

```
You write GTM material for Prox (YC F25), the AI product specialist for manufacturers.
Prox turns a manufacturer's manuals, spec sheets, and senior-tech tribal knowledge into an
AI product specialist deployed on product pages, dealer tablets, support desks, and MCP
connectors. Grounded in the manuals, cited to the page.

Voice rules, non-negotiable:
- no em dashes anywhere. use commas or periods.
- never use: moreover, furthermore, additionally, "it's worth noting", delve, seamless,
  robust, "in today's", leverage, utilize, streamline, "game-changer", excited.
- vary sentence length. some short. no neat three-item parallel lists.
- write like a sharp operator in a hurry, not a marketer.
- lowercase is fine for headers. plain verbs. concrete numbers over adjectives.
- never invent real company or person names. use only the data provided.
- never mention real HVAC brands (Carrier, Trane, Lennox, Daikin, Modine, Reznor, or any other real manufacturer).
```

### 9.1 Account brief prompt (user message)

```
Write an internal account brief for the GTM pipeline. Audience: the two Prox founders,
before a first call. 320 words max. Use exactly these mono-style section headers:

⊹ wedge
⊹ why now
⊹ demo angle
⊹ five discovery questions
⊹ objections
⊹ deployment path

Account data (synthetic demo account):
{JSON.stringify(account, null, 2)}

Rules:
- the wedge must be built on the highest-scoring signals in the data. name the numbers.
- demo angle must describe a specific Prox demo using this account's actual products
  and pain (e.g. load three of their manuals, answer their nastiest fitment question).
- discovery questions must be ones a founder could ask verbatim on a call.
- objections: two, with a one-line response each.
- deployment path: 3 steps, docs → pilot surface → expansion surface.
- end with nothing after the deployment path. no summary, no sign-off.
```

### 9.2 Outreach prompt (user message)

```
Draft first-touch outreach from a Prox founder to this person. Two artifacts.

Persona: {persona.name}, {persona.title} at {account.name}. Cares about: {persona.angle}
Account data: {compact account JSON}

Artifact 1, email: subject line under 6 words, lowercase ok. Body under 110 words.
Open with their specific pain, not with Prox. One concrete proof element (Prox puts an
AI product specialist on dealer tablets and product pages, grounded in the manufacturer's
own manuals, cited to the page). One low-friction ask: 15 minutes or reply with their
gnarliest support question and we answer it with their own docs.

Artifact 2, linkedin note: under 55 words, same angle compressed, no link.

Format the response exactly as:
subject: ...
email:
...
linkedin:
...

The writing must survive the founder's own test: it cannot read like AI wrote it.
```

Parse the outreach response by the `subject:` / `email:` / `linkedin:` markers, defensively (fall back to rendering the raw text in the email panel if parsing fails).

---

## 10. Build order

1. `scripts/test-gateway.mjs` → verify model string + response/stream shape. Record findings in a comment at the top of `lib/config.ts`.
2. Scaffold Next.js + Tailwind + fonts + design tokens.
3. `lib/types.ts`, `lib/accounts.ts` (all 20), `lib/pipeline.ts`, `DEFAULT_WEIGHTS`.
4. Scoreboard with live re-rank (pure client, no API) — get the FLIP sort feeling right.
5. `app/api/generate/route.ts` + streaming client hook.
6. Account page with live brief + outreach.
7. Fallbacks for all 20 accounts (write these carefully, in voice).
8. Source and pipeline pages.
9. Export page + jszip bundle.
10. Mobile pass (assume the founder opens it on a phone from LinkedIn).
11. Honesty banner/footer on every page.
12. `npm run build` clean, then deploy notes.

## 11. Deployment notes (put in README.md of the repo)

- Vercel project, set `MERGE_GATEWAY_KEY` in project env vars (Production + Preview). Never commit the key; `.env.local` is gitignored.
- Suggested project name/domain: `prox-vertical-engine.vercel.app` (or nearest available).
- After deploy: open on a phone, run one brief generation and one outreach generation end-to-end, pull the gateway once with wifi off to confirm the fallback path renders with the cached tag.

## 12. Acceptance checklist

- [ ] Sliders re-rank 20 accounts instantly with FLIP animation; scores match the weighted-sum math
- [ ] Every subscore shows its evidence string on hover as an orange mono citation chip
- [ ] Brief generation streams live (or feels live) and ends with the sources line
- [ ] Outreach generates per persona with subject/email/linkedin parsed into panels
- [ ] Kill the network → fallback renders with `cached copy ⊹ regenerate`, app never looks broken
- [ ] Export downloads a zip whose .md files open clean and include session-generated content
- [ ] No em dashes and no banned phrases anywhere in UI copy or fallback content (grep for them)
- [ ] Honesty footer on every page; zero real HVAC brand names anywhere (grep the repo)
- [ ] Page 0 copy is verbatim from this spec
- [ ] Fully usable on a 390px-wide phone
- [ ] Key absent from client bundle (check the built JS for `mg_`)
