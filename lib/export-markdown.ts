// builds the campaign.zip markdown files. same ⊹ style as the app.

import { ACCOUNTS } from "./accounts";
import { PIPELINE, STAGES } from "./pipeline";
import { FALLBACKS } from "./fallbacks";
import {
  DEFAULT_WEIGHTS,
  SIGNAL_KEYS,
  SIGNAL_LABELS,
  fitScore,
  type Account,
} from "./types";
import { BRIEF_SOURCES_LINE } from "./prompts";
import type { GeneratedOutreach } from "./session-store";

function readme(): string {
  const weights = SIGNAL_KEYS.map(
    (k) => `| ${SIGNAL_LABELS[k]} | ${DEFAULT_WEIGHTS[k]} |`
  ).join("\n");
  return `# prox hvac campaign

⊹ one vertical: commercial hvac and industrial heat oems
⊹ 20 synthetic accounts, real sourcing method, real scoring logic, real prompts
⊹ built by shreyam borah as a demo for the prox founding gtm engineer role. not affiliated with prox.

## how it was scored

fit = weighted sum of six signals, each 0 to 100, each with a cited evidence line.

| signal | default weight |
| --- | --- |
${weights}

sources: ahr expo 2026 exhibitor list, ahri member directory, hardi distributor network mapping, achr news industrial coverage.

## folder layout

⊹ pipeline.md, the full pipeline table
⊹ accounts/, spec block plus committee plus evidence per account
⊹ briefs/, account briefs (live-generated this session where available, cached copy otherwise)
⊹ outreach/, outreach drafts (live-generated this session where available, cached copy for the top 5 accounts otherwise)

drop the folder into /raw and go.
`;
}

function pipelineMd(): string {
  let out = `# pipeline

pipeline truth: every account has a next action or it isn't in the pipeline.

| stage | account | next action | blocker | owner | last touch |
| --- | --- | --- | --- | --- | --- |
`;
  for (const stage of STAGES) {
    for (const r of PIPELINE.filter((p) => p.stage === stage)) {
      const a = ACCOUNTS.find((x) => x.slug === r.slug);
      out += `| ${stage} | ${a?.name.toLowerCase() ?? r.slug} | ${r.nextAction} | ${r.blocker} | ${r.owner} | ${r.lastTouch} |\n`;
    }
  }
  return out;
}

function accountMd(a: Account): string {
  const fit = fitScore(a.scores, DEFAULT_WEIGHTS);
  const scores = SIGNAL_KEYS.map(
    (k) => `| ${SIGNAL_LABELS[k]} | ${a.scores[k]} | ${a.evidence[k]} |`
  ).join("\n");
  const committee = a.committee
    .map((p) => `⊹ ${p.name.toLowerCase()}, ${p.title.toLowerCase()}. ${p.angle}`)
    .join("\n");
  return `# ${a.name.toLowerCase()}

⊹ hq: ${a.hq.toLowerCase()}
⊹ founded: ${a.founded}
⊹ employees: ${a.employees}
⊹ revenue band: ${a.revenueBand}
⊹ segment: ${a.segment}
⊹ products: ${a.products}
⊹ skus: ${a.skuCount}
⊹ dealers: ${a.dealerCount}
⊹ distribution: ${a.distribution}
⊹ source: ${a.source.toLowerCase()}
⊹ fit at default weights: ${fit.toFixed(1)}

## scores

| signal | score | evidence |
| --- | --- | --- |
${scores}

## buyer committee

${committee}

## notes

${a.notes}
`;
}

function briefMd(
  a: Account,
  session: Record<string, { text: string; fromFallback: boolean }>
): string {
  const generated = session[a.slug];
  const text = generated?.text || FALLBACKS[a.slug]?.brief || "";
  const tag =
    generated && !generated.fromFallback
      ? "live-generated this session"
      : "cached copy";
  return `# brief: ${a.name.toLowerCase()}

${tag}

${text}

${BRIEF_SOURCES_LINE}
`;
}

function outreachMd(a: Account, items: GeneratedOutreach[] | undefined): {
  text: string;
  hasLive: boolean;
} {
  const fallback = FALLBACKS[a.slug];
  const live = (items ?? []).filter((o) => !o.fromFallback);
  let body = "";
  let hasLive = false;
  if (live.length) {
    hasLive = true;
    for (const o of live) {
      const persona = a.committee.find((p) => p.id === o.personaId);
      body += `## to: ${persona ? `${persona.name.toLowerCase()}, ${persona.title.toLowerCase()}` : o.personaId} (live-generated this session)

${o.text}

`;
    }
  } else if (fallback) {
    const persona = a.committee.find((p) => p.id === fallback.outreachPersonaId);
    body = `## to: ${persona ? `${persona.name.toLowerCase()}, ${persona.title.toLowerCase()}` : ""} (cached copy)

${fallback.outreach}
`;
  }
  return { text: `# outreach: ${a.name.toLowerCase()}\n\n${body}`, hasLive };
}

export function buildCampaignFiles(session: {
  briefs: Record<string, { text: string; fromFallback: boolean }>;
  outreach: Record<string, GeneratedOutreach[]>;
}): Record<string, string> {
  const files: Record<string, string> = {
    "prox-hvac-campaign/README.md": readme(),
    "prox-hvac-campaign/pipeline.md": pipelineMd(),
  };

  for (const a of ACCOUNTS) {
    files[`prox-hvac-campaign/accounts/${a.slug}.md`] = accountMd(a);
    files[`prox-hvac-campaign/briefs/${a.slug}.md`] = briefMd(a, session.briefs);
  }

  // outreach: everything generated this session, else fallback for the top 5
  const top5 = new Set(
    [...ACCOUNTS]
      .sort(
        (x, y) =>
          fitScore(y.scores, DEFAULT_WEIGHTS) - fitScore(x.scores, DEFAULT_WEIGHTS)
      )
      .slice(0, 5)
      .map((a) => a.slug)
  );
  for (const a of ACCOUNTS) {
    const { text, hasLive } = outreachMd(a, session.outreach[a.slug]);
    if (hasLive || top5.has(a.slug)) {
      files[`prox-hvac-campaign/outreach/${a.slug}.md`] = text;
    }
  }

  return files;
}
