import type { Fallback } from "./index";

// hand-written fallbacks, part 1 of 4. same structure and voice rules as the
// live prompts. no sources line here, the client appends it.

export const PART_1: Record<string, Fallback> = {
  "kestrel-thermal": {
    brief: `⊹ wedge
210 dealers, 1400 skus, and a $80M–$120M revenue band, revenueFit scores 90, the highest on our list. the dealer network scores 88 and every one of those counters leans on a configurator that takes new staff 6+ months to learn. meanwhile 3 senior techs answer the same curb-adapter fitment questions every day. the knowledge exists, it just lives in three heads and 40+ IOM manuals nobody searches.

⊹ why now
docDepth is 85, they already publish those 40+ manuals publicly, so grounding costs nothing. no chat on site, dealer portal is a pdf library. whitespace at 72 means nobody inside is building this. we get there first or a generic chatbot vendor does, badly.

⊹ demo angle
load three RTU IOM manuals plus the curb and economizer accessory sheets. then answer the exact question priya's team fields daily: which curb adapter fits a 25-ton unit replacing a 1990s-era rooftop footprint, cited to the manual page. if the agent nails that on a dealer tablet, marcus's 6-month ramp problem shrinks on the spot.

⊹ five discovery questions
1. how many curb-adapter fitment calls does your support desk take in a week?
2. when a counter person can't answer a fitment question, what happens to that quote?
3. what does the 6-month configurator ramp cost you per new dealer hire?
4. which 5 manuals would you hand a new tech on day one?
5. who owns the dealer portal today, and what would they replace it with?

⊹ objections
"our senior techs are faster than any bot." true for them, false for the 210 dealer counters who can't reach them, and the agent cites the same manuals they wrote.
"dealers won't adopt another tool." it lives on the tablet they already quote from, no login, no new habit.

⊹ deployment path
1. ingest the 40+ public IOM manuals plus curb and economizer spec sheets.
2. pilot on dealer tablets with marcus's 10 highest-volume distributors.
3. expand to the product pages and priya's support desk queue.`,
    outreachPersonaId: "priya-raghavan",
    outreach: `subject: your curb-adapter question, answered once
email:
Priya, three senior techs answering the same curb-adapter fitment question every day is an expensive way to use your best people. and it caps how fast anyone else on the desk ramps.

Prox turns your 40+ published IOM manuals into an AI product specialist that sits on dealer tablets and product pages. it answers fitment questions from your own docs, cited to the page, so the answer is checkable, not vibes.

15 minutes this week? or skip the call: reply with the nastiest curb-adapter question your desk got this month and we'll send back the answer, built from your manuals.
linkedin:
Priya, saw that Kestrel publishes 40+ IOM manuals but fitment questions still land on 3 senior techs daily. we turn those manuals into an AI specialist on dealer tablets, every answer cited to the page. want to send me your hardest curb-adapter question and see what comes back?`,
  },

  "blue-ridge-hydronics": {
    brief: `⊹ wedge
docDepth 88 is the strongest signal here, a public manual library reaching back to 1998 legacy boilers. supportPain sits at 84 because winter no-heat calls swamp a desk that closes at 5pm ET while contractors work into the night. 160 distributors, 900 skus, and venting kit compatibility that shifts by boiler generation. the after-hours gap is the wedge: their knowledge is already written down, it just goes home at five.

⊹ why now
heating season is the whole game. every no-heat call a contractor can't resolve at 8pm is a distributor who remembers which line left them stranded. gil's wrong-part returns on venting kits run ~9%, and whitespace scores 80, no chat, no portal, nothing between the manual pdf and the phone.

⊹ demo angle
pull the condensing boiler manuals plus the legacy library back to 1998. then run the two calls that define their winter: an error-code lookup on a 2003-era cast-iron unit at 9pm, and a venting kit match for a specific boiler generation. both answered from their own manuals, cited to the page. renee's desk closed 4 hours ago, the agent didn't.

⊹ five discovery questions
1. how many support calls come in after 5pm during heating season, and where do they go?
2. what does a 9% wrong-part return rate on venting kits cost you in a year?
3. which error codes generate the most repeat calls each winter?
4. how do contractors look up legacy model info today, on a 1998 boiler?
5. if the desk could clone its best tech for after-hours, what would you have them handle first?

⊹ objections
"contractors want a human on a no-heat call." they want the right answer at 9pm. the agent gives it cited, and escalates the true emergencies.
"our legacy docs are messy." messy is fine, they're public and complete back to 1998, that's the raw material.

⊹ deployment path
1. ingest the full manual library, condensing through 1998 legacy, plus venting kit compatibility docs.
2. pilot an after-hours error-code and venting lookup agent for renee's desk.
3. expand to distributor counters and the parts return workflow gil owns.`,
    outreachPersonaId: "renee-alvarado",
    outreach: `subject: no-heat calls after your desk closes
email:
Renee, your support line closes at 5pm ET. contractors on no-heat calls work until the building has heat. every winter that gap fills with callbacks, guesses, and a ~9% wrong-part return rate on venting kits.

your manual library is unusually good, public and complete back to 1998 legacy models. Prox turns exactly that into an AI product specialist on your site and at distributor counters, answering error-code and venting questions from your own manuals, cited to the page. it doesn't close at five.

worth 15 minutes before the season peaks? or reply with the error code that generated the most repeat calls last winter and we'll answer it from your docs.
linkedin:
Renee, contractors chase no-heat calls at 9pm and your desk closes at 5. Blue Ridge's manual library goes back to 1998, which is everything needed to put a cited, always-on specialist in front of them. happy to prove it on your worst error code.`,
  },

  "meridian-air": {
    brief: `⊹ wedge
skuComplexity 94 and dealerNetwork 90, the two highest paired scores on the list. 2100 skus of VRF gear where the compatibility matrix is the support desk's daily grind, and 240 certified dealers whose activation is gated by a certification course backlog. revenueFit is 92, $120M–$180M, the largest account we're chasing. the wedge is the matrix: it lives in a 2019 excel export and every question about it burns a human.

⊹ why now
they already tried, an FAQ-only chatbot and a portal contractors barely log into. whitespace scores 55 because of that, which cuts both ways: budget exists, appetite exists, and the bar set by the incumbent tool is on the floor. keiko's certification backlog means dealers wait to sell. an agent that makes a day-one dealer competent on pairing rules attacks the backlog directly.

⊹ demo angle
ingest the compat matrix export plus branch controller and line-set docs. then take sam's 20 nastiest fitment questions, which outdoor unit supports this indoor mix, which branch controller for this topology, and answer them on a dealer tablet, cited to the source row and manual page. same demo doubles as keiko's certification shortcut.

⊹ five discovery questions
1. how many compatibility questions does the desk field in a week across the 2100 skus?
2. how long does a new dealer wait in the certification queue before they can activate?
3. what did the current chatbot cost, and what does it actually resolve?
4. where does the compat matrix live today, and who updates it?
5. if dealers could self-serve pairing questions, what would keiko's team do with the time?

⊹ objections
"we already have a chatbot." it answers FAQs. it can't read your compat matrix or cite a manual page, which is the entire job.
"the matrix is a 2019 excel file." good. one file to ingest, and the agent becomes its only usable interface.

⊹ deployment path
1. ingest the compatibility matrix plus VRF, branch controller, and commissioning docs.
2. pilot on tablets with 20 certified dealers against sam's hardest fitment questions.
3. expand into keiko's certification program and lena's portal as the answer layer.`,
    outreachPersonaId: "keiko-tanabe",
    outreach: `subject: activating dealers without the queue
email:
Keiko, a certification backlog that gates dealer activation is a strange bottleneck to have when demand is there and 240 dealers are signed. every week in the queue is revenue Meridian scheduled but didn't collect.

most of what certification teaches is pairing rules across 2100 skus. Prox puts an AI product specialist on dealer tablets, grounded in your own compat matrix and manuals, cited to the page. a day-one dealer gets senior-level fitment answers, so certification stops being the thing standing between signing and selling.

15 minutes? or reply with the pairing question your trainers get asked most and we'll answer it from your docs.
linkedin:
Keiko, if certification backlog gates dealer activation, the fix might not be more trainers. we ground an AI specialist in Meridian's own compat matrix and manuals, cited answers on a dealer tablet from day one. would love to show you against your hardest pairing question.`,
  },

  "vulcan-process": {
    brief: `⊹ wedge
supportPain 90, the highest on the list, and it lands on the most expensive people in the building: applications engineers spending half their week on pre-sales sizing questions. skuComplexity is 88, 700 catalog skus plus engineered-to-order, so every quote needs an expert. whitespace scores 85, no digital pre-sales surface at all, inbound goes straight to ana's engineers. the wedge is engineer-hours: wattage and watt-density sizing is a solved, documented problem being answered by hand.

⊹ why now
ed's sales cycle stalls every time a quote waits on applications engineering, so the pain has a revenue number attached, not just a headcount one. docDepth is 82, the sizing tables and watt-density guides are already published. the raw material for an agent exists today, in their own format.

⊹ demo angle
load the wattage and watt-density sizing guides plus the immersion and circulation heater catalogs. then answer a real inbound sizing question, tank volume, target temp, ramp time, which heater and what watt density, cited to their own tables. show it fielding the question before it ever reaches an engineer. that is half of ana's week handed back.

⊹ five discovery questions
1. how many pre-sales sizing questions hit applications engineering in a week?
2. what fraction of those are standard catalog sizing versus true engineered-to-order?
3. how long does a quote sit while it waits on an engineer?
4. which sizing guides do your engineers actually reference when they answer?
5. if the routine sizing load disappeared, what would ana's team ship instead?

⊹ objections
"sizing errors are dangerous, we can't trust a bot." the agent answers only from vulcan's published tables, cited, and routes anything off-table to an engineer. it's a filter, not a replacement.
"our reps like the engineering touch." keep it for the engineered-to-order work that earns it. the agent absorbs the routine 700-sku catalog questions.

⊹ deployment path
1. ingest sizing guides, watt-density tables, and the catalog heater manuals.
2. pilot as a pre-sales sizing desk for inbound, triaging before engineering.
3. expand to rep-facing tablets and an MCP connector into the quoting workflow.`,
    outreachPersonaId: "ana-kovacs",
    outreach: `subject: half your engineers' week, back
email:
Dr. Kovács, your applications engineers spend half their week on pre-sales sizing questions. most of those answers already sit in Vulcan's published wattage and watt-density tables. the engineers are the lookup layer, which is a costly way to run a lookup.

Prox turns those tables and your heater manuals into an AI product specialist on your site and rep tablets. it answers routine sizing questions cited to your own tables and routes true engineered-to-order work to your team.

15 minutes to scope a pilot? or reply with an inbound sizing question from this week and we'll return the answer, built from your docs, citations included.
linkedin:
Dr. Kovács, pre-sales sizing eating half your engineers' week is a documentation problem wearing an engineering costume. we ground an AI specialist in Vulcan's own watt-density tables, cited to the page, and it filters inbound before it reaches your team. send me a hard sizing question, i'll show you.`,
  },

  "northstar-radiant": {
    brief: `⊹ wedge
whitespace 82 and a support desk that drowns exactly when it matters: the Oct–Jan seasonal spike hits a phone line with no chat and no portal. doug's number is the sharpest on the account, clearance-to-combustibles questions are 30% of all calls. one question category, one third of the load, and the answers sit in public install manuals with clearance tables, docDepth 76. 140 dealers and 450 skus round it out.

⊹ why now
the season is the argument. carrie loses winter deals when dealers can't answer clearance questions at the counter, and matt can recruit dealers faster than he can make them competent. an agent live before october converts the spike from a staffing crisis into a distribution advantage. miss the window, wait a year.

⊹ demo angle
load the tube heater and high-intensity infrared install manuals. then answer the call doug's team takes ten times a day: mounting height and clearance-to-combustibles for a specific tube heater model in a garage bay, cited to the clearance table and page. put it on a phone screen, because that's where a dealer counter and a contractor on a ladder will actually use it.

⊹ five discovery questions
1. what share of winter calls are clearance and mounting questions, and how long is each?
2. what happens at a dealer counter today when a clearance question comes up mid-quote?
3. how much seasonal support headcount do you add for Oct–Jan, if any?
4. which install manuals get referenced most by your own support team?
5. if dealers could self-serve clearance answers, how many more would matt activate?

⊹ objections
"clearance answers are a liability risk." the agent quotes northstar's own published clearance tables verbatim, cited to the page. that's less liability than a rushed phone answer in january.
"we're too small for this." 30% of call volume is one question type. the payback math is short and doug can check it himself.

⊹ deployment path
1. ingest install manuals and clearance tables across the 450-sku catalog.
2. pilot on product pages and dealer counters before the october spike.
3. expand to the support desk as first-line triage through the season.`,
    outreachPersonaId: "doug-feeney",
    outreach: `subject: 30% of your calls, one question
email:
Doug, clearance-to-combustibles questions are 30% of your call volume, and they spike Oct–Jan, exactly when your dealers need answers fastest and your desk has the least slack. the answers are already in NorthStar's published install manuals. the phone is just a slow way to read them.

Prox puts an AI product specialist on your product pages and dealer counters, grounded in your own manuals, cited to the clearance table and page. contractors get the mounting height answer in seconds, your desk keeps the calls that need a human.

15 minutes before the season? or reply with your gnarliest clearance question and we'll answer it from your docs.
linkedin:
Doug, a third of your calls are clearance-to-combustibles, and the answers sit in manuals NorthStar already publishes. we turn those into a cited AI specialist on dealer counters before the Oct–Jan spike. send me your hardest clearance question and i'll show you what comes back.`,
  },
};
