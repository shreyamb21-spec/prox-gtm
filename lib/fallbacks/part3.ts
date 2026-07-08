import type { Fallback } from "./index";

// hand-written fallbacks, accounts 11-15.
// same structure and voice rules as the live prompts. no em dashes,
// no banned phrases, no real HVAC brands.

export const PART_3: Record<string, Fallback> = {
  "halcyon-cooling": {
    brief: `⊹ wedge
aftermarket is 40% of revenue and it runs on emailed photos. parts identification on 20-year-old towers is, in their own aftermarket director's words, a photo-and-pray process. the docs to fix this already exist: parts catalogs and IOM manuals are public back through the legacy lines (doc depth 82). 800 skus, retrofit kit fitment spanning 20+ years of tower models, and a $65M–$95M revenue band that fits the ACV comfortably (revenue fit 82). the pain center and the grounding corpus are the same shelf of documents.

⊹ why now
field crews wait days on legacy-tower parts confirmations while the aftermarket parts channel sells direct. every day of wait is deferred revenue on a 40% slice of the business. there is no parts-lookup tool at all, so the first vendor to put one in front of Farrah's team sets the standard.

⊹ demo angle
load their legacy parts catalogs and three IOM manuals for older FRP towers. then answer the exact question their desk gets: a 2004-era tower, partial nameplate, which fill retrofit kit fits. Prox returns the kit, the compatible model range, and the catalog page it came from. that is the photo-and-pray process replaced with a cited answer.

⊹ five discovery questions
1. when a parts request comes in with just a photo and a serial, what happens next and how long does it take?
2. how many parts-ID requests does the aftermarket desk handle in a week?
3. who are the two or three people everyone escalates legacy-tower questions to?
4. what share of parts orders get returned or reshipped because the first ID was wrong?
5. if reps could self-serve fitment on retrofit kits, what would that do to aftermarket revenue?

⊹ objections
"our legacy catalogs are messy scans." Prox grounds on what exists today; messy scans beat tribal memory, and we cite the page so errors are catchable.
"reps will not trust an AI on fitment." every answer carries the catalog page, so trust rests on their own documents, not the model.

⊹ deployment path
1. ingest parts catalogs and IOM manuals, legacy lines first.
2. pilot on the aftermarket desk: parts identification for Farrah's team and the service network.
3. expand to a rep-facing lookup on product pages and the direct parts channel.`,
    outreachPersonaId: "farrah-nassar",
    outreach: `subject: photo-and-pray parts ID
email:
Farrah, a parts request lands as a photo of a 20-year-old tower and someone on your team squints at fill patterns to guess the retrofit kit. meanwhile field crews wait days on confirmations, on the 40% of revenue that is aftermarket.

your catalogs and IOM manuals already hold the answer. Prox turns them into an AI product specialist on dealer tablets and product pages, grounded in your own manuals, cited to the page. serial plus photo in, kit plus catalog page out.

15 minutes? or reply with your gnarliest legacy-tower fitment question and we will answer it from your own docs.
linkedin:
Farrah, parts ID on 20-year-old towers by emailed photo, while crews wait days. your legacy catalogs already hold the answers. we turn them into a cited lookup your whole aftermarket desk can use. want to send me your hardest fitment question and see?`,
  },
  "redrock-combustion": {
    brief: `⊹ wedge
support pain is the top signal at 86: commissioning support calls run 45 minutes average. behind it, 560 skus where retrofit fitment and flame safeguard pairing carry real depth (sku complexity 78), and a doc library published for two audiences at once (doc depth 78). they sell wholesale and through OEMs, and the same docs confuse both. that split is the wedge: one grounded specialist that answers each audience in its own terms, from the same manuals.

⊹ why now
OEM engineers want spec answers in hours, not days, and Kenji's accounts will not wait. every 45-minute commissioning call is a field service manager's afternoon gone. the docs already exist and are public, so the grounding work is days, not months.

⊹ demo angle
load a burner manual, a flame safeguard manual, and a retrofit kit guide. then run the call that eats Luis's team: a tech mid-commissioning asks which safeguard pairs with a given burner on a retrofit, and what the tuning sequence is. Prox answers with the pairing, the sequence, and the page. a 45-minute call becomes a 2-minute lookup on a tablet at the burner.

⊹ five discovery questions
1. walk me through the last commissioning call that ran over an hour. what was the tech actually stuck on?
2. how many commissioning calls does the field service team take in a week during peak?
3. when an OEM engineer asks a spec question, who answers it and how long do they wait?
4. do wholesale and OEM buyers get the same docs today, and where does that break down?
5. if commissioning calls dropped to 10 minutes, where would that time go?

⊹ objections
"commissioning is safety-critical, we cannot risk a wrong answer." every answer is cited to the manual page, and the fallback is the same call they make today.
"our OEM relationships are hands-on by design." the specialist handles the lookups so the hands-on time goes to design-in work, not page-hunting.

⊹ deployment path
1. ingest burner manuals, safeguard docs, and retrofit tuning guides.
2. pilot on the field service desk: commissioning and retrofit pairing questions.
3. expand to an OEM-facing MCP connector and the wholesale product pages.`,
    outreachPersonaId: "luis-barrientos",
    outreach: `subject: 45-minute commissioning calls
email:
Luis, your commissioning calls average 45 minutes. most of that is a tech at a burner waiting while someone pages through a safeguard manual they know is right but cannot quote from memory.

those manuals are public. Prox turns them into an AI product specialist on dealer tablets and product pages, grounded in your own docs, cited to the page. the tech asks which safeguard pairs with the retrofit, gets the answer and the page number, keeps working.

15 minutes to see it on your docs? or reply with the nastiest commissioning question your desk got this month and we answer it from your own manuals.
linkedin:
Luis, 45-minute commissioning calls, most of it page-hunting through safeguard manuals. we put an AI specialist on the tech's tablet, grounded in your own docs, cited to the page. send me your hardest retrofit pairing question and I will show you the answer with the page number.`,
  },
  "lakeshore-steam": {
    brief: `⊹ wedge
they sell physics as much as hardware, and the physics is where deals stall. psychrometrics questions stall every first-time buyer (support pain 72), and Andre walks each one through the same psychrometrics 101 by hand. the counterweight: engineering guides that teach the physics are all public (doc depth 80), and the digital whitespace is wide open at 80. 410 skus where dispersion sizing depends on psychrometrics. the education that gates every sale is already written down. nobody has made it answer questions.

⊹ why now
a long educational sales cycle on a 100–140 person company means the sales engineer is the bottleneck for the whole funnel. every first-time buyer takes the same walk. an answer layer grounded in their own engineering guides shortens the cycle without adding headcount they will not hire.

⊹ demo angle
load two engineering guides and a dispersion panel manual. then ask the question that stalls first-time buyers: given a duct condition and target humidity, which humidifier and dispersion panel, and why does absorption distance matter. Prox explains the psychrometrics from their own guide, sizes the panel, and cites the page. the educational sale, self-served.

⊹ five discovery questions
1. when a first-time buyer hits the psychrometrics wall, what happens today and who unblocks them?
2. how many active deals right now are waiting on an education step?
3. how much of Andre's week goes to first-buyer walkthroughs versus closing work?
4. do contractors ever mis-size dispersion panels, and what does a mis-size cost you?
5. if the engineering guides could answer questions directly on the site, where would you point them first?

⊹ objections
"buyers need a human to trust the physics." the specialist teaches from their own published guides and cites the page, and Andre steps in warmer, later, on qualified buyers.
"we are 100–140 people, below your usual size." the whole pilot corpus is 410 skus and a guide library that is already public; small here means fast.

⊹ deployment path
1. ingest engineering guides, humidifier manuals, and dispersion sizing docs.
2. pilot on the site: a specialist for first-time buyers and the questions that stall them.
3. expand to rep tablets and the support desk Colleen runs.`,
    outreachPersonaId: "colleen-rafferty",
    outreach: `subject: the psychrometrics wall
email:
Colleen, every first-time buyer stalls on the same psychrometrics questions, and your team re-teaches the physics one call at a time. the engineering guides that answer all of it are already on your site. buyers just cannot ask them anything.

Prox turns those guides into an AI product specialist on product pages and rep tablets, grounded in your own docs, cited to the page. absorption distance, panel sizing, duct conditions, answered with the page number.

15 minutes? or reply with the psychrometrics question that stalls buyers most and we answer it from your own guides.
linkedin:
Colleen, first-time buyers stall on psychrometrics and your team re-teaches it call by call. your engineering guides already hold every answer. we make them answer questions directly, cited to the page. send me the question that stalls buyers most and I will show you.`,
  },
  "everline-ductless": {
    brief: `⊹ wedge
260 dealers, the biggest network on the list, and 4 trainers (dealer network 92). enablement does not scale and Robbie knows it. behind that, 980 skus where multi-zone pairing rules trip up new dealers, and line-set and control pairing questions dominate Tara's call volume (support pain 78). the catch worth naming: manuals are public but pairing rules are scattered across bulletins (doc depth 66). they already spend on dealer training, so the budget line exists. Prox is the trainer that scales to 260.

⊹ why now
dealer competence caps growth, not demand, per their VP Sales. every dealer the 4 trainers cannot reach is a dealer selling less or selling wrong. and product pages answer nothing today, so carts stall at the compatibility step. the pairing knowledge exists, it is just scattered where no dealer will find it mid-quote.

⊹ demo angle
load three manuals plus the pairing bulletins for a multi-zone system. then run a new dealer's worst quote: four indoor units, mixed cassettes, which outdoor unit, which line-set kits, which controls. Prox resolves the pairing rules across the scattered bulletins and cites each source. that is the trainer on every counter, day one.

⊹ five discovery questions
1. what does a new dealer get wrong most often in their first 90 days?
2. how long does the 4-person training team take to reach a newly signed dealer?
3. what share of Tara's call volume is line-set and control pairing?
4. where do the pairing rules actually live today, and who keeps the bulletins current?
5. if a dealer tablet could answer pairing questions with citations, which dealers would you pilot it with?

⊹ objections
"we already invest in dealer training." this is that investment multiplied, the same content, on every counter, not 4 calendars.
"our pairing rules change with every bulletin." Prox re-grounds on each new bulletin, which beats hoping 260 dealers read it.

⊹ deployment path
1. ingest manuals and consolidate the pairing bulletins into the corpus.
2. pilot on dealer tablets with a cohort Robbie picks, 15 to 20 dealers.
3. expand to product pages and cart-side compatibility answers for Devin.`,
    outreachPersonaId: "robbie-muniz",
    outreach: `subject: 260 dealers, 4 trainers
email:
Robbie, 260 dealers and 4 trainers. the math never closes. new dealers quote multi-zone jobs wrong, the pairing rules are scattered across bulletins nobody reads, and Tara's desk absorbs the difference.

Prox puts an AI product specialist on dealer tablets and product pages, grounded in your own manuals and bulletins, cited to the page. a dealer asks which line-set kit fits a four-zone job and gets the answer plus the source. training that reaches all 260 at once.

15 minutes? or reply with the pairing question new dealers botch most and we answer it from your own docs.
linkedin:
Robbie, 260 dealers, 4 trainers, and pairing rules scattered across bulletins. we put a specialist on every dealer tablet, grounded in your own manuals, cited to the page. send me the multi-zone question new dealers botch most and I will send back the cited answer.`,
  },
  "foundry-hx": {
    brief: `⊹ wedge
sizing requests queue 3 days deep at applications engineering (support pain 78), and the digital whitespace is near total at 82: no sizing tool, the queue is the product experience. 720 skus where gasket and plate fitment spans competitor units too, which is the lucrative part. sizing tables and gasket cross-references are already published (doc depth 76). Stan is losing deals to faster-quoting rivals while the answers sit in printed tables.

⊹ why now
the aftermarket on competitor-unit gaskets lives in 2 heads, per Curtis. that is a business line one retirement away from shrinking. and the 3-day queue is a standing invitation for any rival who quotes same-day. the cross-reference tables exist, so grounding a specialist is weeks of work against years of accumulated fitment knowledge.

⊹ demo angle
load the gasket cross-reference tables and two exchanger manuals. then answer the aftermarket question that pays: a plate-and-frame unit from another manufacturer, which of their gaskets and plates fit. Prox returns the cross-referenced part numbers with the table page cited. follow with a sizing lookup that would otherwise sit in Helena's queue for 3 days.

⊹ five discovery questions
1. what is actually in the sizing queue right now, and how much of it is repeat questions?
2. how many deals in the last quarter went to a rival who quoted faster?
3. who are the 2 people who know competitor gasket fitment, and what happens when they are out?
4. what share of aftermarket inquiries never convert because the answer took too long?
5. if the cross-reference tables could answer directly, would you point reps or end customers at it first?

⊹ objections
"engineered sizing cannot be automated." agreed, the judgment stays with Helena's team. Prox clears the repeat lookups so the queue holds real engineering, not table lookups.
"competitor fitment data is our moat, we will not expose it." deploy it internally first, on the desk and rep tablets. the moat gets faster, not public.

⊹ deployment path
1. ingest sizing tables, gasket cross-references, and exchanger manuals.
2. pilot on the applications desk and rep tablets: sizing lookups and gasket fitment.
3. expand to a customer-facing aftermarket lookup once internal accuracy is proven.`,
    outreachPersonaId: "helena-brandt",
    outreach: `subject: the 3-day sizing queue
email:
Helena, sizing requests queue 3 days deep at your desk, and a good share of them are lookups your published tables already answer. meanwhile the queue is what customers experience, and rivals quote same-day.

Prox turns your sizing tables and gasket cross-references into an AI product specialist on rep tablets and product pages, grounded in your own docs, cited to the page. repeat lookups clear in minutes. your engineers keep the questions that actually need them.

15 minutes? or reply with the gnarliest fitment question in your queue right now and we answer it from your own tables.
linkedin:
Helena, a 3-day sizing queue where half the requests are table lookups. we ground an AI specialist in your own sizing tables and cross-references, cited to the page, so the queue holds real engineering work. send me one question from the queue and see the answer.`,
  },
};
