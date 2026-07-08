import type { Fallback } from "./index";

// hand-written fallbacks, part 4 of 4:
// coastal-marine, highplains-evap, sterling-cleanroom, quarry-fans, beacon-snowmelt

export const PART_4: Record<string, Fallback> = {
  "coastal-marine": {
    brief: `⊹ wedge
whitespace is 84, the second-highest score on this account, and support pain sits at 76. the evidence line says it plainly: zero digital support surface, the phone is the product. 110 boatyard dealers and marine distributors all route their questions to one small desk, and boatyards call from the dock with the panel open. 290 skus is a catalog Prox can swallow whole.

⊹ why now
Bo Trask still takes support calls personally, and every call is selling time lost. the niche is small ($15M–$25M, smallest on the list) but the pain is immediate and the fix is cheap to prove. borderline ACV fit means we should qualify hard and fast, not court slowly.

⊹ demo angle
load the install manuals for their self-contained marine AC line and a vessel chiller. then answer the question a boatyard tech actually asks from the dock: unit won't start, panel open, what do i check first, in order, cited to the page. show it on a phone screen, because that is the device on the dock.

⊹ five discovery questions
1. when a boatyard calls from the dock, who picks up and how long does the callback loop run?
2. what share of yolanda's calls are answered somewhere in your install manuals already?
3. how much of bo's week goes to support calls instead of selling?
4. do dealers choose lines partly on how easy they are to troubleshoot?
5. how deep does your troubleshooting documentation actually go past install?

⊹ objections
we're too small for this. response: the pilot is one product line and one support surface, priced to the desk it replaces, not to your revenue.
our docs are thin on troubleshooting. response: Prox surfaces what exists and shows you exactly where the gaps are, which is the map for fixing them.

⊹ deployment path
1. collect install manuals and troubleshooting notes for the marine AC line, index and cite.
2. pilot on a phone-friendly support page the boatyard dealers use from the dock.
3. expand to the dealer network as a sales-side answer layer across all 110 accounts.`,
    outreachPersonaId: "yolanda-reyes",
    outreach: `subject: calls from the dock
email:
Yolanda, boatyards call you from the dock with the panel open, and every one of those calls lands on your desk because there is nowhere else for them to go.

we built Prox for exactly that call. it puts an AI product specialist on dealer tablets and product pages, grounded in the manufacturer's own manuals, cited to the page. a tech on the dock gets the first three checks for a no-start, with the manual page attached, before you even pick up.

reply with the gnarliest question a boatyard has asked you this month and we'll answer it from your own docs. or 15 minutes, your pick.
linkedin:
Yolanda, boatyards calling from the dock with the panel open. we put an AI specialist on the pages and tablets those techs already use, answering from your own install manuals, cited to the page. send me your hardest dock call and we'll answer it from your docs.`,
  },

  "highplains-evap": {
    brief: `⊹ wedge
whitespace scores 86, the highest signal on this account, against a brochure-only site. dealer network is the second signal at 72: 150 distributors per HARDI mapping, all served by phone. wade hollister's own framing is the wedge: price-driven category, support ease is the only differentiation left. 330 skus of coolers, media, pumps and controls is a small, clean corpus.

⊹ why now
seasonal call spike hits with no extra headcount. consuelo's desk absorbs the summer surge alone, and counters that can't explain media choices sell on price instead. a support layer that ships before the season is a concrete answer to a dated problem. revenue fit is 54, so scope tight and price to land.

⊹ demo angle
load their evap cooler manuals plus the media and pump selection guides. then take the counter question that loses them margin: which media for this cooler in this water hardness, and which pump pairs with it. answer it cited to their own selection tables, on a tablet a distributor counter would actually use.

⊹ five discovery questions
1. what happens to call volume in june, and who absorbs it?
2. when a counter can't explain media options, what do they sell instead?
3. how many of your 150 distributors carry competing evap lines?
4. what would make a distributor pick your line when the price is a wash?
5. how current are your published selection guides versus what your team actually knows?

⊹ objections
our category is too price-driven to pay for software. response: wade said it himself, support ease is the differentiation left, and it costs less than one seasonal hire.
our docs are thinner than the big industrial players. response: 330 skus means we can index everything you have in days and flag the gaps before season.

⊹ deployment path
1. index cooler manuals plus media and pump selection guides, cited to the page.
2. pilot on distributor counter tablets in the top 20 accounts before the summer spike.
3. expand to the public site so end buyers self-serve the same answers year-round.`,
    outreachPersonaId: "wade-hollister",
    outreach: `subject: the only differentiation left
email:
Wade, in a price-driven category the line that wins the counter is the one the counter can actually explain. right now a distributor who can't walk a buyer through media choices sells on price, and that's your margin.

Prox puts an AI product specialist on dealer tablets and product pages, grounded in the manufacturer's own manuals, cited to the page. the counter answers media and pump pairing questions like your best territory manager, across all 150 distributors, before the season hits.

15 minutes? or reply with the question your counters flub most and we'll answer it from your own docs.
linkedin:
Wade, when evap sells on price, support ease is the edge left. we put an AI specialist on distributor tablets, answering media and pump questions from your own manuals, cited to the page. happy to show it on your catalog before the season spike.`,
  },

  "sterling-cleanroom": {
    brief: `⊹ wedge
this is the account where Prox's pitch stops being a metaphor. doc depth 84, support pain 82, sku complexity 80. compliance documentation requests are 8-hour jobs, and the buyers are regulated pharma and semi contractors who want every answer cited. Prox cites to the page because it has to. sterling's customers demand citations because they have to. same sentence.

⊹ why now
oscar's validation desk handles documentation requests by email, one at a time, 8 hours each. mei-ling says sales cycles die in documentation. 480 skus of AHUs, fan filter units, pressure controls and validation kits, sold direct through only 55 reps, means the desk is the bottleneck for the whole revenue line. revenue fit is 80, comfortably in the sweet spot.

⊹ demo angle
load their validation kit docs, a fan filter unit IOM and the pressure control specs. then run a real compliance request: pull the validation documentation trail for a specific FFU and pressure spec pairing, every claim cited to the source page. the demo is the 8-hour job done in 40 seconds with an audit trail.

⊹ five discovery questions
1. walk me through the last compliance documentation request that took a full day. what did it actually involve?
2. how many of those requests does oscar's team handle in a month?
3. has a deal stalled or died this year waiting on documentation?
4. do your pharma buyers accept answers without a citation to the source document?
5. how often do project submittals reuse validation answers you've already written?

⊹ objections
regulated buyers won't accept AI-generated answers. response: every answer carries a citation to your own published document, which is more traceable than an email from memory.
our validation docs are too sensitive to hand to a vendor. response: start with what's already public, and the deployment stays inside your controlled environment.

⊹ deployment path
1. index public validation docs, IOM manuals and pressure specs, every claim cited.
2. pilot on oscar's validation desk, drafting documentation responses with source trails.
3. expand to a rep-facing and buyer-facing surface so submittals self-serve the same cited answers.`,
    outreachPersonaId: "oscar-delacroix",
    outreach: `subject: the 8-hour documentation request
email:
Oscar, a compliance documentation request lands and it's an 8-hour job: dig the validation docs, assemble the trail, cite everything, send the email. then the next one lands.

Prox is an AI product specialist grounded in the manufacturer's own manuals and validation docs, cited to the page, deployed on support desks and product pages. it drafts the response with the source trail attached. your regulated buyers get citations because that's all it produces.

reply with your last 8-hour request and we'll show you the same answer assembled from your published docs. or 15 minutes, whichever is less work for you.
linkedin:
Oscar, 8-hour compliance documentation requests, handled by email one at a time. we build AI specialists grounded in a manufacturer's own validation docs, every answer cited to the page. regulated buyers get the trail, you get your day back. want to see it on your docs?`,
  },

  "quarry-fans": {
    brief: `⊹ wedge
dealer network is the top signal at 82: 185 dealers per HARDI mapping plus national accounts, with whitespace at 78 behind it, no spec tool anywhere. the pain has a body count: bridget's inside sales team quotes mounting hardware wrong weekly, and joist-load questions scare generalist dealers off closing entirely. the joist-load tables exist, published, in their own mounting guides. nobody at the counter can read them fast enough.

⊹ why now
reggie's framing is the deal: structural mounting fear kills deals dealers should close. 610 skus where the mounting system carries the depth. santiago's national accounts expect spec answers same-day and get them at whatever speed the desk allows. every wrong hardware quote is rework, and every scared dealer is a fan sold by someone else.

⊹ demo angle
load their HVLS mounting guides with the joist-load tables plus two fan IOMs. then ask the question that kills deals: 24-foot fan, open web steel joists at 40-inch spacing, what mounting kit and what's the load per attachment point, cited to the table. show a generalist dealer closing a deal structural fear used to kill.

⊹ five discovery questions
1. how many quotes did inside sales redo last month because the mounting hardware was wrong?
2. when a dealer hits a joist-load question, what do they actually do, call you or go quiet?
3. what share of your 185 dealers will quote an HVLS install unassisted today?
4. how fast do national accounts expect a spec answer, and how fast do they get one?
5. your mounting guides publish the joist-load tables. who actually reads them?

⊹ objections
structural questions need an engineer, not software. response: Prox reads your published load tables and cites the row, and anything past the tables still routes to your engineer, faster and pre-qualified.
our dealers won't adopt another tool. response: it sits on the product page and the counter tablet they already use, nothing new to log into.

⊹ deployment path
1. index mounting guides, joist-load tables and fan IOMs, cited to the table row.
2. pilot with bridget's inside sales team to kill the weekly wrong-hardware quote.
3. expand to dealer tablets across the 185-dealer network, then national account portals.`,
    outreachPersonaId: "bridget-malone",
    outreach: `subject: wrong mounting quotes, weekly
email:
Bridget, your team quotes mounting hardware wrong weekly. not because they're careless, because joist-load selection across 610 skus is a table-lookup job under time pressure, and the tables live in a pdf.

Prox puts an AI product specialist on dealer tablets and product pages, grounded in the manufacturer's own manuals, cited to the page. your team types the fan size and joist spec, gets the right kit and the load per attachment point, with the table row cited.

send me the mounting question your team got wrong most recently and we'll answer it from your own guides. or grab 15 minutes.
linkedin:
Bridget, mounting hardware quoted wrong weekly is a table-lookup problem, not a people problem. we put an AI specialist on your team's screens that reads your own joist-load tables and cites the row. send me your last wrong quote and i'll show you the fix.`,
  },

  "beacon-snowmelt": {
    brief: `⊹ wedge
smallest account on the list, but the shape is right: doc depth 70 with wiring diagrams and install guides public for the full 260-sku catalog, dealer network 68 across 130 wholesale accounts plus e-commerce. the pain is dated and visual: install-wiring photos flood dot's inbox every november. and the buying signal is real, they already sell online and van wants the site answering wiring questions itself. natural adopter, per their own notes.

⊹ why now
november. elliot runs a 60–90 person team and install season buries everyone at once. a wiring-question answer layer either ships before the freeze or waits a year. revenue fit is 46, the lowest here, so this is a fast, small, self-serve-shaped deal or it is not a deal.

⊹ demo angle
load their snowmelt controller install guides and wiring diagrams. then answer dot's actual november inbox: here's a photo-described install, sensor on terminal 3, valve wired to zone 2, why won't it fire. Prox walks the diagnosis from their own wiring diagram, cited to the page, on the product page where the buyer already is.

⊹ five discovery questions
1. how many wiring photos hit dot's inbox in a typical november week?
2. what share of those are answered by a diagram you've already published?
3. when a diy-leaning buyer on your site hits a wiring question, what do they do, call or abandon?
4. van, what have you already tried to make the site answer questions itself?
5. what does november cost you in expedited support versus what you staff for?

⊹ objections
we're too small to spend on this. response: you already publish the answers, we make them work the counter and the cart, priced for a 60-person company.
photos are the problem and a chatbot can't see them. response: start with the wiring questions behind the photos, which your diagrams already answer, and measure how many photos never get sent.

⊹ deployment path
1. index controller install guides, wiring diagrams and sensor specs, cited to the page.
2. pilot on the e-commerce product pages before november, where wiring questions start.
3. expand to the 130 wholesale accounts as a counter-side answer layer for install season.`,
    outreachPersonaId: "dot-kowalski",
    outreach: `subject: november inbox
email:
Dot, install-wiring photos flood your inbox every november, and most of them are asking a question your published wiring diagrams already answer. the photo is just how the question travels.

Prox puts an AI product specialist on product pages and dealer tablets, grounded in the manufacturer's own manuals, cited to the page. the installer asks why zone 2 won't fire, gets the diagnosis walked from your own diagram, and the photo never gets taken.

reply with the wiring question you answered most last november and we'll answer it from your own docs. or 15 minutes before the season starts.
linkedin:
Dot, the november wiring-photo flood. most of those photos ask questions your published diagrams already answer. we put an AI specialist on your product pages that walks installers through them, cited to the page. want to see it on your controllers before the freeze?`,
  },
};
