import Link from "next/link";
import { PIPELINE, STAGES } from "@/lib/pipeline";
import { getAccount } from "@/lib/accounts";
import { SectionHeader } from "@/components/section-header";

export const metadata = { title: "pipeline ⊹ prox vertical engine" };

export default function PipelinePage() {
  return (
    <div>
      <SectionHeader num="04" title="pipeline" />
      <p className="font-mono text-[12px] text-muted mb-8">
        pipeline truth: every account has a next action or it isn&apos;t in the
        pipeline.
      </p>

      {STAGES.map((stage) => {
        const rows = PIPELINE.filter((r) => r.stage === stage);
        return (
          <section key={stage} className="mb-8">
            <p className="font-mono text-[12px] mb-2">
              <span className="text-accent">⊹</span> {stage}{" "}
              <span className="text-muted">({rows.length})</span>
            </p>
            {rows.length === 0 ? (
              <p className="font-mono text-[12px] text-muted border-b border-rule pb-3">
                none yet. honest for a demo.
              </p>
            ) : (
              <>
                {/* phone: stacked cards, no horizontal scroll */}
                <div className="md:hidden">
                  {rows.map((r) => {
                    const a = getAccount(r.slug);
                    return (
                      <div key={r.slug} className="border-b border-rule py-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <Link
                            href={`/account/${r.slug}`}
                            className="lowercase"
                          >
                            {a?.name ?? r.slug}
                          </Link>
                          <span className="font-mono text-[11px] text-muted shrink-0">
                            {r.owner} ⊹ {r.lastTouch}
                          </span>
                        </div>
                        <p className="font-mono text-[12px] mt-1.5">
                          {r.nextAction}
                        </p>
                        {r.blocker !== "—" && (
                          <p className="font-mono text-[11px] text-muted mt-1">
                            blocker: {r.blocker}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="font-mono text-[10px] text-muted border-b border-rule">
                      <th className="py-1.5 pr-3 font-normal w-44">account</th>
                      <th className="py-1.5 pr-3 font-normal">next action</th>
                      <th className="py-1.5 pr-3 font-normal w-52">blocker</th>
                      <th className="py-1.5 pr-3 font-normal w-14">owner</th>
                      <th className="py-1.5 font-normal w-20">last touch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const a = getAccount(r.slug);
                      return (
                        <tr key={r.slug} className="border-b border-rule align-top hover:bg-ink/[0.03]">
                          <td className="py-2.5 pr-3">
                            <Link href={`/account/${r.slug}`} className="lowercase">
                              {a?.name ?? r.slug}
                            </Link>
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-[12px]">
                            {r.nextAction}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-[12px] text-muted">
                            {r.blocker}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-[12px] text-muted">
                            {r.owner}
                          </td>
                          <td className="py-2.5 font-mono text-[12px] text-muted">
                            {r.lastTouch}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
