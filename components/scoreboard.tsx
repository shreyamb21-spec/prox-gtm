"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNTS } from "@/lib/accounts";
import {
  DEFAULT_WEIGHTS,
  SIGNAL_KEYS,
  SIGNAL_LABELS,
  fitScore,
  type SignalKey,
} from "@/lib/types";

export function Scoreboard() {
  const router = useRouter();
  const [weights, setWeights] =
    useState<Record<SignalKey, number>>(DEFAULT_WEIGHTS);

  const ranked = useMemo(() => {
    return ACCOUNTS.map((a) => ({ account: a, fit: fitScore(a.scores, weights) }))
      .sort((x, y) => y.fit - x.fit || x.account.name.localeCompare(y.account.name));
  }, [weights]);

  // FLIP: remember previous row positions, animate the delta on re-sort
  const rowRefs = useRef(new Map<string, HTMLDivElement>());
  const prevRects = useRef(new Map<string, DOMRect>());

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rects = new Map<string, DOMRect>();
    rowRefs.current.forEach((el, slug) => {
      if (!el) return;
      rects.set(slug, el.getBoundingClientRect());
      const prev = prevRects.current.get(slug);
      if (prev && !reduced) {
        const dy = prev.top - rects.get(slug)!.top;
        if (dy !== 0) {
          el.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }],
            { duration: 300, easing: "cubic-bezier(0.2, 0, 0.2, 1)" }
          );
        }
      }
    });
    prevRects.current = rects;
  }, [ranked]);

  const isDefault = SIGNAL_KEYS.every((k) => weights[k] === DEFAULT_WEIGHTS[k]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* weight rail */}
      <aside className="lg:w-60 shrink-0">
        <div className="lg:sticky lg:top-6 space-y-4">
          {SIGNAL_KEYS.map((k) => (
            <label key={k} className="block">
              <div className="flex justify-between font-mono text-[12px] text-muted mb-1">
                <span>{SIGNAL_LABELS[k]}</span>
                <span className="text-ink">{weights[k]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[k]}
                onChange={(e) =>
                  setWeights((w) => ({ ...w, [k]: Number(e.target.value) }))
                }
                className="w-full accent-[var(--accent)] h-1 cursor-pointer"
                aria-label={`weight for ${SIGNAL_LABELS[k]}`}
              />
            </label>
          ))}
          {!isDefault && (
            <button
              onClick={() => setWeights(DEFAULT_WEIGHTS)}
              className="font-mono text-[12px] text-accent underline underline-offset-2"
            >
              reset weights
            </button>
          )}
          <p className="font-mono text-[11px] text-muted leading-relaxed pt-2 border-t border-rule">
            fit = weighted sum of six cited signals. drag to see the vertical
            differently.
          </p>
        </div>
      </aside>

      {/* ranked table */}
      <div className="flex-1 min-w-0">
        {/* desktop header row */}
        <div className="hidden lg:grid grid-cols-[2rem_minmax(11rem,1.4fr)_repeat(6,minmax(0,1fr))_3.5rem] gap-x-2 font-mono text-[10px] text-muted pb-2 border-b border-rule items-end">
          <span>#</span>
          <span>account</span>
          {SIGNAL_KEYS.map((k) => (
            <span key={k} className="text-right">
              {SIGNAL_LABELS[k].split(" ").map((w, i) => (
                <span key={i} className="block">
                  {w}
                </span>
              ))}
            </span>
          ))}
          <span className="text-right">fit</span>
        </div>

        {ranked.map(({ account: a, fit }, i) => (
          <div
            key={a.slug}
            ref={(el) => {
              if (el) rowRefs.current.set(a.slug, el);
              else rowRefs.current.delete(a.slug);
            }}
            onClick={() => router.push(`/account/${a.slug}`)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") router.push(`/account/${a.slug}`);
            }}
            className="relative border-b border-rule cursor-pointer hover:bg-ink/[0.03] focus:outline-none focus:bg-ink/[0.03]
              py-3 lg:py-2.5
              lg:grid lg:grid-cols-[2rem_minmax(11rem,1.4fr)_repeat(6,minmax(0,1fr))_3.5rem] lg:gap-x-2 lg:items-baseline"
          >
            {/* mobile card header / desktop cells */}
            <span className="font-mono text-[12px] text-muted">{i + 1}</span>
            <span className="block lg:inline">
              <span className="lowercase">{a.name}</span>
              <span className="block font-mono text-[11px] text-muted">
                {a.segment}
              </span>
            </span>
            <span className="lg:hidden float-right font-mono text-accent text-[15px]">
              {fit.toFixed(1)}
            </span>
            <div className="lg:contents grid grid-cols-3 gap-x-2 gap-y-1 mt-2 lg:mt-0">
              {SIGNAL_KEYS.map((k) => (
                <span key={k} className="static lg:relative group lg:text-right">
                  <span className="lg:hidden font-mono text-[10px] text-muted block">
                    {SIGNAL_LABELS[k]}
                  </span>
                  <span className="font-mono text-[12px] cursor-help border-b border-dotted border-rule">
                    {a.scores[k]}
                  </span>
                  {/* on mobile the chip anchors to the (relative) row and spans
                      its width, so a tapped tooltip can never overflow the
                      390px viewport. on lg it anchors to the score cell. */}
                  <span className="pointer-events-none absolute z-10 hidden group-hover:block left-0 right-0 lg:left-auto lg:right-0 top-full mt-1 w-auto lg:w-56 font-mono text-[11px] text-accent border border-accent/40 rounded bg-paper px-2 py-1 shadow-none text-left">
                    cited: {a.evidence[k]}
                  </span>
                </span>
              ))}
            </div>
            <span className="hidden lg:block font-mono text-accent text-[13px] text-right">
              {fit.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
