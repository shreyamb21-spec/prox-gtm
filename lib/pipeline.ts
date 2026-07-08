import type { PipelineRow, Stage } from "./types";

export const STAGES: Stage[] = [
  "deployed",
  "trial",
  "demo booked",
  "replied",
  "contacted",
  "sourced",
];

const SOURCED_ACTION = "score review ⊹ pick wedge persona";

export const PIPELINE: PipelineRow[] = [
  // deployed: none. honest for a demo.
  {
    slug: "meridian-air",
    stage: "trial",
    nextAction:
      "collect VRF compatibility matrix docs from Keiko; test dealer-tablet agent on 20 gnarliest fitment questions",
    blocker: "compat matrix lives in a 2019 Excel export",
    owner: "gtm",
    lastTouch: "2d ago",
  },
  {
    slug: "kestrel-thermal",
    stage: "demo booked",
    nextAction:
      "prep founder demo around curb-adapter fitment; pull 3 IOM manuals into agent beforehand",
    blocker: "—",
    owner: "gtm",
    lastTouch: "1d ago",
  },
  {
    slug: "blue-ridge-hydronics",
    stage: "demo booked",
    nextAction: "build error-code lookup demo from public boiler manuals before call",
    blocker: "—",
    owner: "gtm",
    lastTouch: "3d ago",
  },
  {
    slug: "vulcan-process",
    stage: "replied",
    nextAction: "Ana asked for a sizing-question pilot scope; send 1-pager",
    blocker: "legal wants NDA first",
    owner: "gtm",
    lastTouch: "5h ago",
  },
  {
    slug: "everline-ductless",
    stage: "replied",
    nextAction: "Robbie intro'd Jasmine; propose dealer-enablement pilot",
    blocker: "—",
    owner: "gtm",
    lastTouch: "1d ago",
  },
  {
    slug: "halcyon-cooling",
    stage: "replied",
    nextAction: "Farrah wants parts-ID-from-photo proof; script demo",
    blocker: "needs legacy parts catalog access",
    owner: "gtm",
    lastTouch: "4d ago",
  },
  {
    slug: "sterling-cleanroom",
    stage: "contacted",
    nextAction: "follow up Mei-Ling with cited-answer example from her own validation docs",
    blocker: "—",
    owner: "gtm",
    lastTouch: "2d ago",
  },
  {
    slug: "redrock-combustion",
    stage: "contacted",
    nextAction: "send Luis a commissioning-call teardown; ask for one 45-min call transcript",
    blocker: "—",
    owner: "gtm",
    lastTouch: "3d ago",
  },
  {
    slug: "cascade-chiller",
    stage: "contacted",
    nextAction: "nudge Paulo with BAS-integration answer demo built from public controls docs",
    blocker: "—",
    owner: "gtm",
    lastTouch: "5d ago",
  },
  {
    slug: "foundry-hx",
    stage: "contacted",
    nextAction: "reply to Helena's OOO; offer to clear one day of the sizing queue as proof",
    blocker: "—",
    owner: "gtm",
    lastTouch: "6d ago",
  },
  // sourced: everything else
  { slug: "northstar-radiant", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "ironline-unit", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "gulfstream-dehum", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "prairie-furnace", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "summit-erv", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "lakeshore-steam", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "coastal-marine", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "highplains-evap", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "quarry-fans", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
  { slug: "beacon-snowmelt", stage: "sourced", nextAction: SOURCED_ACTION, blocker: "—", owner: "gtm", lastTouch: "—" },
];
