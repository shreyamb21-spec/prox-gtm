export function SectionHeader({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="pt-8 pb-4">
      <p className="font-mono text-[12px] text-muted">
        <span className="text-accent">⊹</span> {num} / {title}
      </p>
      <hr className="border-rule mt-2" />
    </div>
  );
}
