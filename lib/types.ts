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

export type Stage =
  | "sourced"
  | "contacted"
  | "replied"
  | "demo booked"
  | "trial"
  | "deployed";

export interface PipelineRow {
  slug: string;
  stage: Stage;
  nextAction: string;
  blocker: string;
  owner: string;
  lastTouch: string;
}

export const SIGNAL_KEYS: SignalKey[] = [
  "dealerNetwork",
  "skuComplexity",
  "supportPain",
  "docDepth",
  "whitespace",
  "revenueFit",
];

export const SIGNAL_LABELS: Record<SignalKey, string> = {
  dealerNetwork: "dealer network",
  skuComplexity: "sku complexity",
  supportPain: "support pain",
  docDepth: "doc depth",
  whitespace: "whitespace",
  revenueFit: "revenue fit",
};

export const DEFAULT_WEIGHTS: Record<SignalKey, number> = {
  dealerNetwork: 25,
  skuComplexity: 20,
  supportPain: 20,
  docDepth: 15,
  whitespace: 10,
  revenueFit: 10,
};

export function fitScore(
  scores: Record<SignalKey, number>,
  weights: Record<SignalKey, number>
): number {
  let num = 0;
  let den = 0;
  for (const k of SIGNAL_KEYS) {
    num += scores[k] * weights[k];
    den += weights[k];
  }
  if (den === 0) return 0;
  return Math.round((num / den) * 10) / 10;
}
