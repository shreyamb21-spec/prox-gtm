"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "why" },
  { href: "/source", label: "source" },
  { href: "/scoreboard", label: "scoreboard" },
  { href: "/pipeline", label: "pipeline" },
  { href: "/export", label: "export" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <Link href="/" className="lowercase tracking-tight font-medium">
          prox vertical engine
        </Link>
        <span className="font-mono text-[11px] text-muted">
          hvac &amp; industrial heat ⊹ demo build
        </span>
        <nav className="font-mono text-[12px] flex flex-wrap gap-x-4 gap-y-1 basis-full sm:basis-auto sm:ml-auto">
          {LINKS.map((l, i) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href) ||
                  (l.href === "/scoreboard" && pathname.startsWith("/account"));
            return (
              <span key={l.href} className="flex items-baseline gap-x-4">
                {i > 0 && <span className="text-rule select-none">⊹</span>}
                <Link
                  href={l.href}
                  className={active ? "text-accent" : "text-muted hover:text-ink"}
                >
                  {l.label}
                </Link>
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
