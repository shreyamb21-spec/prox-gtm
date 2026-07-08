export function CitationChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[11px] text-accent border border-accent/40 rounded px-1.5 py-0.5 bg-accent/5">
      {children}
    </span>
  );
}
