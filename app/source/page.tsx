import Link from "next/link";
import { ACCOUNTS } from "@/lib/accounts";
import { SectionHeader } from "@/components/section-header";

export const metadata = { title: "source ⊹ prox vertical engine" };

const SOURCES = [
  {
    name: "AHR Expo 2026 exhibitor list",
    yields: "every OEM shipping commercial HVAC hardware this cycle, with booth-level category tags",
    method:
      "exhibitor scrape → domain match → Apollo enrichment → dealer-count estimation from locator pages",
  },
  {
    name: "AHRI member directory",
    yields: "certified equipment manufacturers by product category, the established mid-market core",
    method:
      "directory pull by category → dedupe against expo list → revenue banding via enrichment → manual-library depth check on each site",
  },
  {
    name: "HARDI distributor network mapping",
    yields: "which OEMs actually move through 2-step wholesale, and roughly how wide",
    method:
      "distributor line-card scrape → OEM frequency count across distributors → network size estimate → cross-check against locator pages",
  },
  {
    name: "ACHR News industrial coverage",
    yields: "process-heat and industrial OEMs that never exhibit but carry heavy support load",
    method:
      "trade coverage crawl for OEM mentions → company match → support-pain signals from hiring pages and forum chatter",
  },
];

export default function SourcePage() {
  return (
    <div>
      <SectionHeader num="01" title="source" />
      <p className="inline-block font-mono text-[12px] text-accent border border-accent/40 rounded px-2 py-1 mb-6">
        20 synthetic accounts ⊹ real sourcing method
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {SOURCES.map((s) => (
          <div key={s.name} className="border border-rule rounded px-4 py-3">
            <p className="font-mono text-[12px] mb-2">{s.name.toLowerCase()}</p>
            <p className="text-[13px]">{s.yields}</p>
            <p className="font-mono text-[11px] text-muted mt-2 leading-relaxed">
              {s.method}
            </p>
          </div>
        ))}
      </div>

      {/* phone: stacked cards, no horizontal scroll */}
      <div className="md:hidden">
        {ACCOUNTS.map((a) => (
          <Link
            key={a.slug}
            href={`/account/${a.slug}`}
            className="block border-b border-rule py-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="lowercase">{a.name}</span>
              <span className="font-mono text-[11px] text-muted shrink-0">
                {a.hq.toLowerCase()}
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted mt-1">
              {a.segment} ⊹ {a.source.toLowerCase()}
            </p>
            <p className="font-mono text-[11px] mt-1">
              {a.dealerCount} dealers ⊹ {a.skuCount} skus
            </p>
          </Link>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="font-mono text-[10px] text-muted border-b border-rule">
              <th className="py-2 pr-3 font-normal">account</th>
              <th className="py-2 pr-3 font-normal">hq</th>
              <th className="py-2 pr-3 font-normal">segment</th>
              <th className="py-2 pr-3 font-normal">source</th>
              <th className="py-2 pr-3 font-normal text-right">dealers</th>
              <th className="py-2 font-normal text-right">skus</th>
            </tr>
          </thead>
          <tbody>
            {ACCOUNTS.map((a) => (
              <tr key={a.slug} className="border-b border-rule hover:bg-ink/[0.03]">
                <td className="py-2.5 pr-3">
                  <Link href={`/account/${a.slug}`} className="lowercase">
                    {a.name}
                  </Link>
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-muted">
                  {a.hq.toLowerCase()}
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px]">{a.segment}</td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-muted">
                  {a.source.toLowerCase()}
                </td>
                <td className="py-2.5 pr-3 font-mono text-[12px] text-right">
                  {a.dealerCount}
                </td>
                <td className="py-2.5 font-mono text-[12px] text-right">
                  {a.skuCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
