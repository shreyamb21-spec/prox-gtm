import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-16 max-w-[680px]">
      <p className="font-mono text-[12px] text-muted">
        <span className="text-accent">⊹</span> not found
      </p>
      <p className="mt-4">no page here.</p>
      <p className="mt-2 font-mono text-[13px]">
        <Link href="/scoreboard" className="text-accent">
          → 02 scoreboard
        </Link>
      </p>
    </div>
  );
}
