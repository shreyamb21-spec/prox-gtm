import { SectionHeader } from "@/components/section-header";
import { ExportButton } from "@/components/export-button";

export const metadata = { title: "export ⊹ prox vertical engine" };

export default function ExportPage() {
  return (
    <div className="max-w-[680px]">
      <SectionHeader num="05" title="export" />
      <article className="space-y-4 leading-relaxed">
        <h1 className="lowercase font-medium text-lg">
          export campaign as markdown
        </h1>
        <p>
          You run the company out of a folder of markdown files. So this
          campaign exports as one. Accounts, buyer maps, briefs, outreach
          drafts and the pipeline, each as its own .md, ready to drop into
          /raw.
        </p>
      </article>
      <div className="mt-8">
        <ExportButton />
      </div>
      <pre className="mt-8 font-mono text-[12px] text-muted leading-relaxed border border-rule rounded px-4 py-3 overflow-x-auto">{`prox-hvac-campaign/
  README.md                 what this is, how it was scored, weights used
  pipeline.md               the full pipeline table
  accounts/{slug}.md        spec block + committee + evidence, one per account
  briefs/{slug}.md          generated this session, else the cached copy
  outreach/{slug}.md        generated this session, else cached for top-5`}</pre>
    </div>
  );
}
