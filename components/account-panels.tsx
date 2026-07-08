"use client";

import { useEffect, useRef, useState } from "react";
import type { Account } from "@/lib/types";
import { SIGNAL_KEYS, SIGNAL_LABELS } from "@/lib/types";
import { BRIEF_SOURCES_LINE, parseOutreach } from "@/lib/prompts";
import { getFallback } from "@/lib/fallbacks";
import { useGenerate } from "@/lib/use-generate";
import { useSessionState } from "@/lib/session-store";
import { CitationChip } from "@/components/citation-chip";

function CachedTag({ onRegenerate, locked }: { onRegenerate: () => void; locked: boolean }) {
  return (
    <span className="font-mono text-[11px] text-muted">
      cached copy ⊹{" "}
      <button
        onClick={onRegenerate}
        disabled={locked}
        className="text-accent underline underline-offset-2 disabled:opacity-40"
      >
        regenerate
      </button>
    </span>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-rule rounded bg-white/40 px-4 py-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
      {children}
    </div>
  );
}

export function AccountPanels({ account }: { account: Account }) {
  const fallback = getFallback(account.slug);
  const session = useSessionState();
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const brief = useGenerate({
    kind: "brief",
    accountSlug: account.slug,
    fallbackText: fallback?.brief ?? "",
    initialText: session.briefs[account.slug]?.text,
    initialFromFallback: session.briefs[account.slug]?.fromFallback,
  });

  const topSignal = SIGNAL_KEYS.reduce((best, k) =>
    account.scores[k] > account.scores[best] ? k : best
  );

  return (
    <div className="space-y-10">
      {/* section A: buyer committee */}
      <section>
        <p className="font-mono text-[12px] text-muted mb-3">
          <span className="text-accent">⊹</span> buyer committee
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {account.committee.map((p) => (
            <div key={p.id} className="border border-rule rounded px-4 py-3 flex flex-col">
              <p className="lowercase font-medium">{p.name}</p>
              <p className="font-mono text-[11px] text-muted">{p.title}</p>
              <p className="text-[13px] mt-2 flex-1">{p.angle}</p>
              <button
                onClick={() => setActivePersona(p.id)}
                className="self-start mt-3 font-mono text-[12px] text-accent"
              >
                draft outreach →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* section B: account brief (live) */}
      <section>
        <p className="font-mono text-[12px] text-muted mb-3">
          <span className="text-accent">⊹</span> account brief (live)
        </p>
        {brief.status === "idle" ? (
          <button
            onClick={brief.run}
            disabled={brief.locked}
            className="font-mono text-[13px] bg-accent text-paper px-4 py-2 rounded disabled:opacity-40"
          >
            generate brief
          </button>
        ) : (
          <div className="space-y-2">
            {brief.status === "loading" && (
              <Panel>
                <span className="stream-cursor text-muted">
                  writing from account data
                </span>
              </Panel>
            )}
            {(brief.status === "streaming" || brief.status === "done") && (
              <Panel>
                <span className={brief.status === "streaming" ? "stream-cursor" : ""}>
                  {brief.text}
                </span>
                {brief.status === "done" && (
                  <p className="mt-4 pt-3 border-t border-rule">
                    <CitationChip>{BRIEF_SOURCES_LINE}</CitationChip>
                  </p>
                )}
              </Panel>
            )}
            {brief.status === "done" && (
              <div className="flex items-center gap-3">
                {brief.fromFallback ? (
                  <CachedTag onRegenerate={brief.run} locked={brief.locked} />
                ) : (
                  <button
                    onClick={brief.run}
                    disabled={brief.locked}
                    className="font-mono text-[11px] text-muted underline underline-offset-2 disabled:opacity-40"
                  >
                    regenerate
                  </button>
                )}
                {brief.capped && (
                  <span className="font-mono text-[11px] text-muted">
                    session limit reached ⊹ showing cached copy
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* section C: outreach (live) */}
      {activePersona && (
        <OutreachSection
          key={activePersona}
          account={account}
          personaId={activePersona}
          topSignal={topSignal}
        />
      )}
    </div>
  );
}

function OutreachSection({
  account,
  personaId,
  topSignal,
}: {
  account: Account;
  personaId: string;
  topSignal: (typeof SIGNAL_KEYS)[number];
}) {
  const persona = account.committee.find((p) => p.id === personaId)!;
  const fallback = getFallback(account.slug);
  const session = useSessionState();
  const saved = (session.outreach[account.slug] ?? []).find(
    (o) => o.personaId === personaId
  );

  const gen = useGenerate({
    kind: "outreach",
    accountSlug: account.slug,
    personaId,
    fallbackText: fallback?.outreach ?? "",
    initialText: saved?.text,
    initialFromFallback: saved?.fromFallback,
  });

  // clicking `draft outreach →` should start drafting right away. if another
  // generation holds the lock, the button below stays as manual entry.
  const autoRan = useRef(false);
  useEffect(() => {
    if (!autoRan.current && gen.status === "idle" && !gen.locked) {
      autoRan.current = true;
      gen.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gen.status, gen.locked]);

  const parsed = gen.status === "done" ? parseOutreach(gen.text) : null;
  const builtOn = `built on: ${SIGNAL_LABELS[topSignal].replace(" ", "_")}=${account.scores[topSignal]} ⊹ ${persona.angle}`;

  return (
    <section>
      <p className="font-mono text-[12px] text-muted mb-3">
        <span className="text-accent">⊹</span> outreach (live) ⊹{" "}
        {persona.name.toLowerCase()}, {persona.title.toLowerCase()}
      </p>

      {gen.status === "idle" && (
        <button
          onClick={gen.run}
          disabled={gen.locked}
          className="font-mono text-[13px] bg-accent text-paper px-4 py-2 rounded disabled:opacity-40"
        >
          draft outreach for {persona.name.split(" ")[0].toLowerCase()}
        </button>
      )}

      {gen.status === "loading" && (
        <Panel>
          <span className="stream-cursor text-muted">drafting</span>
        </Panel>
      )}

      {gen.status === "streaming" && (
        <Panel>
          <span className="stream-cursor">{gen.text}</span>
        </Panel>
      )}

      {gen.status === "done" && parsed && (
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Panel>
              {parsed.subject && (
                <p className="pb-2 mb-2 border-b border-rule">
                  subject: {parsed.subject}
                </p>
              )}
              {parsed.email}
            </Panel>
            <CitationChip>{builtOn}</CitationChip>
          </div>
          {parsed.linkedin && (
            <div className="space-y-2">
              <Panel>{parsed.linkedin}</Panel>
              <CitationChip>{builtOn}</CitationChip>
            </div>
          )}
          <div className="lg:col-span-2 flex items-center gap-3">
            {gen.fromFallback ? (
              <span className="font-mono text-[11px] text-muted">
                cached copy ⊹{" "}
                <button
                  onClick={gen.run}
                  disabled={gen.locked}
                  className="text-accent underline underline-offset-2 disabled:opacity-40"
                >
                  regenerate
                </button>
              </span>
            ) : (
              <button
                onClick={gen.run}
                disabled={gen.locked}
                className="font-mono text-[11px] text-muted underline underline-offset-2 disabled:opacity-40"
              >
                regenerate
              </button>
            )}
            {gen.capped && (
              <span className="font-mono text-[11px] text-muted">
                session limit reached ⊹ showing cached copy
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
