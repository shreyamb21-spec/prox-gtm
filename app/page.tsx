import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

export default function WhyPage() {
  return (
    <div className="max-w-[680px]">
      <SectionHeader num="00" title="why i built this" />
      <article className="space-y-4 leading-relaxed">
        <h1 className="lowercase font-medium text-lg">why i built this</h1>
        <p>
          I saw the founding GTM engineer role and figured the fastest way to
          show fit was to do the job. This is milestone one from your 90 day
          list: one vertical, raw source list to scored accounts to buyer maps
          to outreach to pipeline. Built in a weekend on the stack I already
          use.
        </p>
        <p>
          Two proof points behind it. At Louisa AI (Goldman spin-out) I built
          the outbound engine: Python on Claude API and Apollo, 25+ meetings
          booked from 500+ prospects, manual outreach time down about 95%.
          Before that I co-founded CompetitorPulse, an AI competitive
          intelligence SaaS: 7 agent pipeline, Next.js, Stripe billing, 25+
          active beta testers.
        </p>
        <p>
          The accounts here are synthetic so I&apos;m not publishing
          anyone&apos;s real pipeline. The sourcing method, scoring logic,
          generation prompts and export flow are all real and rerunnable on
          live data in a day.
        </p>
        <p>
          Everything generative on this site runs live on Claude. Every score
          cites the fields that produced it. And the export button gives you
          the whole campaign as a folder of markdown files, because I read how
          you run the company.
        </p>
        <p>
          shreyam borah ⊹{" "}
          <a
            href="https://shreyamborah.com"
            className="text-accent underline underline-offset-2"
          >
            shreyamborah.com
          </a>{" "}
          ⊹ shreyamb21@gmail.com
        </p>
        <p>thought this would be more useful than another message.</p>
      </article>

      <section className="mt-10 pt-4 border-t border-rule">
        <p className="font-mono text-[12px] text-muted mb-3">
          <span className="text-accent">⊹</span> the walkthrough, about two
          minutes
        </p>
        <p className="text-[14px] leading-relaxed mb-4">
          this demo runs your gtm motion for one vertical, commercial hvac and
          industrial heat oems, end to end. here is the path through it:
        </p>
        <ol className="space-y-3 text-[14px] leading-relaxed">
          <li className="flex gap-3">
            <Link href="/source" className="font-mono text-[12px] text-accent shrink-0 pt-0.5">
              01 source
            </Link>
            <span>
              where the 20 accounts came from. four real list sources and how
              each would be scraped and enriched on live data.
            </span>
          </li>
          <li className="flex gap-3">
            <Link href="/scoreboard" className="font-mono text-[12px] text-accent shrink-0 pt-0.5">
              02 scoreboard
            </Link>
            <span>
              drag the six weight sliders and watch all 20 accounts re-rank
              instantly. hover any score to see the evidence behind it.
            </span>
          </li>
          <li className="flex gap-3">
            <Link href="/account/kestrel-thermal" className="font-mono text-[12px] text-accent shrink-0 pt-0.5">
              03 account
            </Link>
            <span>
              click any row. you get the buyer committee, then hit generate
              brief and watch claude write a pre-call brief live from that
              account&apos;s data. draft outreach per person the same way.
            </span>
          </li>
          <li className="flex gap-3">
            <Link href="/pipeline" className="font-mono text-[12px] text-accent shrink-0 pt-0.5">
              04 pipeline
            </Link>
            <span>
              where every account sits and its next action. no action, not in
              the pipeline.
            </span>
          </li>
          <li className="flex gap-3">
            <Link href="/export" className="font-mono text-[12px] text-accent shrink-0 pt-0.5">
              05 export
            </Link>
            <span>
              download the whole campaign, accounts, briefs, outreach and
              pipeline, as a folder of markdown files, including whatever you
              just generated.
            </span>
          </li>
        </ol>
      </section>

      <div className="mt-10 pt-4 border-t border-rule font-mono text-[13px] space-y-2">
        <p>
          <Link href="/source" className="text-accent">
            → 01 source
          </Link>
        </p>
        <p>
          <Link href="/scoreboard" className="text-accent">
            → 02 scoreboard
          </Link>
        </p>
        <p>
          <Link href="/export" className="text-accent">
            → 05 export
          </Link>
        </p>
      </div>
    </div>
  );
}
