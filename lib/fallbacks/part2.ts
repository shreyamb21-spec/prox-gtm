import type { Fallback } from "./index";

// hand-written fallbacks, part 2 of 4. same structure and voice rules as the
// live prompts in lib/prompts.ts. no em dashes, no banned phrases, no real
// HVAC brands. client appends the sources line and the cached-copy tag.

export const PART_2: Record<string, Fallback> = {
  "cascade-chiller": {
    brief: `⊹ wedge
1100 skus across 20 to 500 tons, and the tool that navigates them is desktop selection software that is 9 years old. reps quote from spreadsheets. skuComplexity scores 86 and revenueFit 88, the second-highest revenue fit on the list at $70M–$110M. the selection data and controls docs are already published (docDepth 80), just scattered. the knowledge exists. nothing serves it at the moment of quoting.

⊹ why now
chiller ACVs clear $60K without stretching, so one saved national account pays for prox. BAS integration questions currently bounce between three teams, which means every controls question costs three people's time. a 90-dealer channel is concentrated, so fixing the answer layer for reps moves fast, no long-tail rollout.

⊹ demo angle
load their scroll and screw chiller selection data plus the plant controls docs. then answer the question that bounces between three teams today: which BAS points does a 200-ton screw unit with free cooling expose, and on which protocol. cited to the controls manual page. then a rep question, free-cooling option compatibility for a 60-ton scroll unit, answered in seconds instead of a spreadsheet dig.

⊹ five discovery questions
1. when a rep needs to check free-cooling compatibility today, what do they actually open first?
2. how many quotes went out last quarter with a wrong option pairing?
3. who are the three teams a BAS integration question touches, and how long does one take end to end?
4. what stops you from replacing the desktop selection software, budget or migration fear?
5. if reps could get cited answers on a tablet, which national account would you point it at first?

⊹ objections
we're replacing the selection software already. good, prox is the answer layer on top of whatever you pick, live in weeks while that project runs its year.
our controls docs are scattered. that is the point, prox ingests them scattered and answers as if they weren't.

⊹ deployment path
1. ingest chiller IOM manuals, selection data, and plant controls docs.
2. pilot on rep tablets for the national accounts team, quoting and BAS questions.
3. expand to the service desk so escalations stop recycling answers already in the docs.`,
    outreachPersonaId: "victor-chen",
    outreach: `subject: reps quoting from spreadsheets

email:
Victor, your reps are quoting 20 to 500 ton chillers out of spreadsheets because the selection software is desktop-only and 9 years old. 1100 skus deserve better than ctrl-F.

Prox puts an AI product specialist on rep tablets and product pages, grounded in your own selection data and controls manuals, cited to the page. A rep asks which free-cooling options pair with a 60-ton scroll unit and gets the answer with the source, not a spreadsheet hunt.

15 minutes this week? Or reply with the nastiest option-compatibility question your reps face and we'll answer it from your own docs.

linkedin:
Victor, saw the selection software is desktop-only and 9 years back. Prox turns your manuals and selection data into a cited answer layer on rep tablets, so 1100 skus stop living in spreadsheets. Happy to show it on your gnarliest compatibility question.`,
  },

  "ironline-unit": {
    brief: `⊹ wedge
190 distributors served by a 3-person desk, and no digital surface beyond a brochure site. whitespace scores 88, highest signal on the account, with dealerNetwork at 80. the install and venting manuals for the whole 380-sku line are already public (docDepth 72). Hank Willoughby is president and VP sales in one chair, and he has said the quiet part: he wants dealers self-serving basic questions.

⊹ why now
a 1958 family-owned company with a lean team cannot hire its way out of covering 190 counters. Terrell Boone's field view is blunt, counter staff who can't answer venting questions spec a competitor instead. every unanswered question is a lost slot on the shelf. the fix has to be software because headcount isn't coming.

⊹ demo angle
load the power-vented and separated-combustion install manuals plus the venting guides. answer the counter question that loses them deals: can this unit heater vent horizontally through a 20-foot run with two elbows, and which vent kit does that need. cited to the venting table. show it running on a phone, because that is what a counter person actually holds.

⊹ five discovery questions
1. what are the five questions Joan's desk answers most, week in week out?
2. when a distributor counter can't answer a venting question, what do they do, call you or sell the other line?
3. how many of your 190 distributors carry a competing unit heater line?
4. what has stopped you from putting anything digital on the site so far?
5. if dealers could self-serve venting and thermostat pairing questions tomorrow, where does Joan's team spend the freed hours?

⊹ objections
we're too small for this. the pilot is one product line and the manuals you already publish, sized for a lean team, not a big-company rollout.
our dealers won't use a tool. they already call your desk, this is the same answer arriving in 10 seconds instead of a hold queue.

⊹ deployment path
1. ingest the install and venting manuals for the full 380-sku line.
2. pilot as an answer box on the site the 190 distributors already visit.
3. expand to a counter-tablet mode for the top 20 distributors by volume.`,
    outreachPersonaId: "hank-willoughby",
    outreach: `subject: 190 counters, 3 people answering

email:
Hank, you have 190 distributors and a 3-person desk behind them. When a counter can't answer a venting question, that customer walks out with the other line on the shelf.

You already publish the install and venting manuals. Prox puts an AI product specialist on your site and on dealer tablets, grounded in those same manuals, cited to the page. Counter staff type the venting question, get the answer with the source, sell your heater.

Worth 15 minutes? Or send me the venting question your desk answers most and we'll answer it from your own docs.

linkedin:
Hank, a 3-person desk covering 190 distributors is a math problem, not an effort problem. Prox turns the venting manuals you already publish into cited answers dealers can self-serve at the counter. Glad to show it on the question Joan's team hears most.`,
  },

  "gulfstream-dehum": {
    brief: `⊹ wedge
the natatorium expertise that keeps warranty fights at bay lives in 2 people's heads, and both are near retirement. supportPain scores 80, whitespace 78. pool-room sizing mistakes already cause warranty fights, per Chip Landry, and the sizing and application guides are public (docDepth 74) while the actual natatorium know-how is not. this is the literal prox pitch: senior-tech tribal knowledge, captured before it walks out the door.

⊹ why now
retirement is a deadline, not a trend. every quarter that passes without capturing what those 2 people know raises the cost of the first sizing mistake after they leave. 520 skus with coastal packages and DOAS options mean the 85 reps and natatorium specialists cannot hold the whole selection logic in their heads either.

⊹ demo angle
load the pool dehumidifier sizing guides and the coastal package application docs. then ask the question that starts warranty fights: size a dehumidifier for a 4,500 sq ft hotel pool room with spectator seating, 84 degree water, coastal install. show the answer citing the sizing guide page, then show the follow-up on which corrosion package that spec requires. that is a Chip-quality answer without waiting for Chip.

⊹ five discovery questions
1. how many warranty claims in the last year trace back to a sizing or selection mistake?
2. what happens to a natatorium question today when your two senior application people are both unavailable?
3. what have you written down of what they know, honestly?
4. which reps send you the roughest sizing requests, and what do those cost your team per week?
5. if an agent could answer sizing questions with citations, would you put it in front of reps first or on the spec pages Erin owns?

⊹ objections
the real knowledge isn't in the docs. right, so we interview your two experts, write it down, and ground the agent on that plus the guides, that is the product.
a bot answering sizing questions sounds like liability. every answer cites the guide page, which is more traceable than a phone call nobody logged.

⊹ deployment path
1. ingest sizing guides and application docs, then capture the natatorium tribal knowledge in structured sessions with the 2 experts.
2. pilot with the rep channel on sizing and coastal package selection questions.
3. expand to product-page answers for the engineers landing on spec pages.`,
    outreachPersonaId: "chip-landry",
    outreach: `subject: sizing knowledge that retires with them

email:
Chip, pool-room sizing mistakes are already causing warranty fights, and the natatorium expertise that prevents them sits in two heads that are close to retirement. That knowledge has a shelf life now.

Prox turns your sizing guides, application docs, and your senior people's know-how into an AI product specialist on rep tablets and product pages, grounded in your own docs, cited to the page. A rep gets a Chip-quality sizing answer, with the source, without waiting on you.

15 minutes? Or reply with the gnarliest natatorium sizing question you've seen and we'll answer it from your own guides.

linkedin:
Chip, warranty fights from sizing mistakes, and the expertise that prevents them retiring soon. Prox captures that knowledge plus your published sizing guides into a cited answer layer for reps. Would rather show you than describe it, on a sizing question you pick.`,
  },

  "prairie-furnace": {
    brief: `⊹ wedge
175 distributors, and each carries 4 competing lines. Russ Kimble's line is the whole strategy: whoever is easiest to spec wins the counter. right now nobody wins, because MUA sizing requires airflow math most counter staff can't do. whitespace scores 84, dealerNetwork 78, and the MUA sizing guides and duct furnace manuals are already public at docDepth 78. the docs exist, the counters can't use them.

⊹ why now
2-step wholesale is a knife fight for counter attention. a distributor who fumbles an airflow question doesn't call Althea's desk, they quote the competitor whose spec is one page. sizing questions already stack up at technical services every morning, which caps how many distributors the desk can actually support.

⊹ demo angle
load the direct-fired and indirect-fired MUA sizing guides plus a duct furnace manual. then run the counter question that kills them today: a kitchen needs 6,000 CFM make-up air with 55 degree rise in a Kansas winter, which unit and which gas train. the agent does the airflow math, names the model, and cites the sizing table page. the point lands in one sentence: your counter staff just became the easiest line to spec.

⊹ five discovery questions
1. of your 175 distributors, how many can size an MUA unit at the counter without calling in?
2. what share of Althea's morning queue is the same five sizing questions?
3. when a counter can't do the airflow math, do you see the lost quote or does it just vanish?
4. which competing line is winning on ease of spec right now?
5. if we made your line the easiest to spec, which 10 distributors would you pilot it with?

⊹ objections
distributors won't adopt another tool. it is not a tool they learn, it is a search box that does airflow math, and it lives where they already look up your products.
our sizing guides already cover this. they do, that is why this works, prox makes them usable by people who can't do the math.

⊹ deployment path
1. ingest MUA sizing guides, duct furnace manuals, and kitchen ventilation heat docs.
2. pilot with 10 high-volume distributors as a counter spec assistant.
3. expand to the technical services desk so Althea's queue answers itself.`,
    outreachPersonaId: "russ-kimble",
    outreach: `subject: easiest line to spec wins

email:
Russ, your distributors carry 4 competing lines and MUA sizing takes airflow math most counter staff can't do. So the counter quotes whichever line doesn't make them do math. That's the whole fight.

Prox puts an AI product specialist on dealer tablets and product pages, grounded in your own sizing guides and manuals, cited to the page. Counter types the CFM and temperature rise, gets the model and gas train with the source table.

15 minutes to see it on your docs? Or reply with the sizing question your counters fumble most and we'll answer it from your own guides.

linkedin:
Russ, when distributors carry 4 lines, the easiest to spec wins. MUA airflow math makes yours the hardest right now. Prox turns your published sizing guides into cited counter answers, math included. Happy to run your toughest sizing question through it.`,
  },

  "summit-erv": {
    brief: `⊹ wedge
education is the sale, and there is no education layer. buyers arrive confused by ASHRAE 62.1, whitespace scores 76, and the application guides tied to code requirements are already public at docDepth 70. Brett Halloran answers the same code questions in every design-build meeting, and Sofia's quote turnaround slips every time engineering gets pulled into pre-sales. small account, but the wedge is unusually clean: prox as the code-question teacher that never sleeps.

⊹ why now
code-driven demand means the confused buyer is the growth channel, they show up because 62.1 says they must. every one who bounces off a spec page unanswered is demand the code generated and Summit dropped. with 70 reps and an 80 to 110 person team, engineering hours are the scarcest resource in the building.

⊹ demo angle
load the ERV application guides and a packaged rooftop ERV manual. then ask the buyer question Brett answers weekly: what outdoor air rate does 62.1 require for a 12-classroom school, and which packaged ERV covers it with which controls. cited to the application guide page. follow with a core sizing question to show it holds up past the code basics. Nia watches her education-heavy sale compress in real time.

⊹ five discovery questions
1. how many hours a week does Brett spend re-answering 62.1 basics in design-build meetings?
2. what happens to a confused buyer who lands on your spec pages today, where do they go next?
3. how much does quote turnaround slip when engineering is stuck in pre-sales?
4. which code questions come up in literally every first meeting?
5. if buyers arrived at the first call already educated, how much shorter is your cycle?

⊹ objections
we're too small for a $60K product. the counterargument is Brett's calendar, price the pilot against the engineering hours pre-sales burns today.
the education is our differentiation, why give it away. the education still comes from your docs and your expertise, prox just delivers it before the competitor's rep does.

⊹ deployment path
1. ingest application guides, code-requirement docs, and the ERV/HRV core manuals.
2. pilot on product pages, catching the confused code-driven buyer at first landing.
3. expand to rep tablets for design-build meetings so Brett stops repeating himself.`,
    outreachPersonaId: "nia-okafor",
    outreach: `subject: buyers confused by 62.1

email:
Nia, your buyers show up because ASHRAE 62.1 makes them, then arrive confused, and your engineers spend the sale teaching. Education is the sale, and right now it only happens live, one meeting at a time.

Prox puts an AI product specialist on your product pages, grounded in your own application guides and manuals, cited to the page. The confused buyer asks what 62.1 requires for their building and gets the answer plus the ERV that covers it, before they ever book Brett's time.

15 minutes? Or send the code question Brett answers in every meeting and we'll answer it from your own guides.

linkedin:
Nia, code-driven demand sends you confused buyers, and educating them one meeting at a time caps growth. Prox turns your application guides into cited answers on your product pages, so buyers arrive at the first call already taught. Glad to demo it on your most repeated 62.1 question.`,
  },
};
