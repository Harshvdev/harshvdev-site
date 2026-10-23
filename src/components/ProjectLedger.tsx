"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/github";
import { categoryLabels, categoryOrder, type Category } from "@/lib/curated";
import { ProjectRow } from "./ProjectRow";

type Filter = "all" | Category;

/** Ledger + category filter. Filtering is instant — data is already local. */
export function ProjectLedger({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const available = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return categoryOrder.filter((c) => present.has(c));
  }, [projects]);

  const shown = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `All · ${projects.length}` },
    ...available.map((c) => ({
      id: c as Filter,
      label: `${categoryLabels[c]} · ${projects.filter((p) => p.category === c).length}`,
    })),
  ];

  return (
    <div>
      {/* Filter rail */}
      <div className="flex flex-wrap gap-2 py-6">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors ${
                active
                  ? "border-transparent text-white"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* The ledger */}
      <div className="rule">
        {shown.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm text-faint">
            Nothing here yet.
          </p>
        ) : (
          shown.map((p, i) => <ProjectRow key={p.name} project={p} index={i} />)
        )}
      </div>
    </div>
  );
}
