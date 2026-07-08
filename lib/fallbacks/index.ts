// hand-written fallbacks for every account. rendered whenever the gateway
// errors, times out, rate-limits, or the session cap is hit. always tagged
// `cached copy ⊹ regenerate` by the client.

import { PART_1 } from "./part1";
import { PART_2 } from "./part2";
import { PART_3 } from "./part3";
import { PART_4 } from "./part4";

export interface Fallback {
  // full brief text with the six ⊹ headers, no sources line (client appends it)
  brief: string;
  // the persona the outreach pair was written for
  outreachPersonaId: string;
  // outreach in the same `subject: / email: / linkedin:` format the live
  // generation returns, so one parser handles both
  outreach: string;
}

export const FALLBACKS: Record<string, Fallback> = {
  ...PART_1,
  ...PART_2,
  ...PART_3,
  ...PART_4,
};

export function getFallback(slug: string): Fallback | undefined {
  return FALLBACKS[slug];
}
