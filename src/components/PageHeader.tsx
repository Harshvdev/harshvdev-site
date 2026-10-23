import { categoryLabels, type Category } from "@/lib/curated";

/** Page header used across every route — eyebrow + title + optional lede. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="border-b border-line pb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {lede && (
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">
          {lede}
        </p>
      )}
    </header>
  );
}

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
      {categoryLabels[category]}
    </span>
  );
}
