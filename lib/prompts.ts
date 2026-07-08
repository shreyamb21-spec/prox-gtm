import type { Account, Persona } from "./types";

export const SYSTEM_PREAMBLE = `You write GTM material for Prox (YC F25), the AI product specialist for manufacturers.
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
- never mention real HVAC brands (Carrier, Trane, Lennox, Daikin, Modine, Reznor, or any other real manufacturer).`;

export function briefPrompt(account: Account): string {
  return `Write an internal account brief for the GTM pipeline. Audience: the two Prox founders,
before a first call. 320 words max. Use exactly these mono-style section headers:

⊹ wedge
⊹ why now
⊹ demo angle
⊹ five discovery questions
⊹ objections
⊹ deployment path

Account data (synthetic demo account):
${JSON.stringify(account, null, 2)}

Rules:
- the wedge must be built on the highest-scoring signals in the data. name the numbers.
- demo angle must describe a specific Prox demo using this account's actual products
  and pain (e.g. load three of their manuals, answer their nastiest fitment question).
- discovery questions must be ones a founder could ask verbatim on a call.
- objections: two, with a one-line response each.
- deployment path: 3 steps, docs → pilot surface → expansion surface.
- end with nothing after the deployment path. no summary, no sign-off.
- plain text only: no markdown bold or asterisks, no --- dividers, no title
  line before the first header. start directly with ⊹ wedge.`;
}

export function outreachPrompt(account: Account, persona: Persona): string {
  const compact = {
    name: account.name,
    hq: account.hq,
    segment: account.segment,
    products: account.products,
    skuCount: account.skuCount,
    dealerCount: account.dealerCount,
    distribution: account.distribution,
    scores: account.scores,
    evidence: account.evidence,
    notes: account.notes,
  };
  return `Draft first-touch outreach from a Prox founder to this person. Two artifacts.

Persona: ${persona.name}, ${persona.title} at ${account.name}. Cares about: ${persona.angle}
Account data: ${JSON.stringify(compact)}

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

The writing must survive the founder's own test: it cannot read like AI wrote it.`;
}

// the sources line appended to every brief, live or fallback
export const BRIEF_SOURCES_LINE =
  "sources: dealer_count, sku_count, support_pain evidence, doc_depth evidence, notes";

// defensive parse of the outreach response by its markers.
// falls back to the raw text in the email panel if parsing fails.
export function parseOutreach(text: string): {
  subject: string;
  email: string;
  linkedin: string;
  parsed: boolean;
} {
  const m = text.match(
    /subject:\s*([\s\S]*?)\n\s*email:\s*\n?([\s\S]*?)\n\s*linkedin:\s*\n?([\s\S]*)/i
  );
  if (m) {
    return {
      subject: m[1].trim(),
      email: m[2].trim(),
      linkedin: m[3].trim(),
      parsed: true,
    };
  }
  return { subject: "", email: text.trim(), linkedin: "", parsed: false };
}
