import type { Project } from "@/lib/github";
import { categoryLabels } from "@/lib/curated";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/**
 * One line in the ledger.
 *
 * Full-bleed row rather than a card: name in mono, the job it does in body,
 * tech + stars right-aligned. The vermilion rule slides in on hover.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-b border-line"
    >
      {/* Accent rule that grows on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-300 ease-out group-hover:w-1"
      />

      <div className="flex flex-col gap-2 py-5 pl-4 pr-2 transition-[padding] duration-300 ease-out group-hover:pl-7 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="w-8 shrink-0 font-mono text-[12px] text-faint tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="w-52 shrink-0 font-mono text-[15px] text-ink transition-colors group-hover:text-accent">
          {project.name}
        </span>

        <span className="flex-1 text-[15px] leading-relaxed text-muted">
          {project.description}
        </span>

        <span className="flex shrink-0 items-center gap-4 pl-12 font-mono text-[12px] text-faint sm:pl-0">
          {project.language && <span>{project.language}</span>}
          {project.stars > 0 && <span>★ {project.stars}</span>}
          <span className="hidden sm:inline">{formatDate(project.pushedAt)}</span>
          <span className="text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
            ↗
          </span>
        </span>
      </div>
    </a>
  );
}

export { categoryLabels };
