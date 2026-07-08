import { notFound } from "next/navigation";
import { ACCOUNTS, getAccount } from "@/lib/accounts";
import { DEFAULT_WEIGHTS, fitScore } from "@/lib/types";
import { SectionHeader } from "@/components/section-header";
import { AccountPanels } from "@/components/account-panels";

export function generateStaticParams() {
  return ACCOUNTS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const account = getAccount(params.slug);
  return {
    title: account
      ? `${account.name.toLowerCase()} ⊹ prox vertical engine`
      : "account ⊹ prox vertical engine",
  };
}

export default function AccountPage({
  params,
}: {
  params: { slug: string };
}) {
  const account = getAccount(params.slug);
  if (!account) notFound();

  const fit = fitScore(account.scores, DEFAULT_WEIGHTS);

  return (
    <div>
      <SectionHeader num="03" title="account" />
      <header className="mb-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="lowercase text-xl tracking-tight">{account.name}</h1>
          <span className="font-mono text-accent text-[15px]">
            fit {fit.toFixed(1)}
            <span className="text-muted text-[11px]"> @ default weights</span>
          </span>
        </div>
        <p className="font-mono text-[12px] text-muted mt-1">
          {account.hq.toLowerCase()} ⊹ {account.founded} ⊹ {account.employees}{" "}
          emp ⊹ {account.revenueBand} ⊹ {account.segment}
        </p>
        <p className="font-mono text-[12px] text-muted mt-1">
          {account.products.toLowerCase()}
        </p>
      </header>
      <AccountPanels account={account} />
    </div>
  );
}
