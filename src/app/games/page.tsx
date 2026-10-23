import type { Metadata } from "next";
import { getProjects, type Project } from "@/lib/github";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Games",
  description: "Things you can actually play.",
};

/** Where each game is actually playable, when it isn't just the repo. */
const playTargets: Record<string, { href: string; label: string }> = {
  "Shizumi-Garden": {
    href: "https://harshvdev.github.io/Shizumi-Garden/",
    label: "Play in browser",
  },
};

function GameCard({ game, index }: { game: Project; index: number }) {
  const target = playTargets[game.name] ?? { href: game.url, label: "View source" };

  return (
    <Reveal delay={index * 0.05}>
      <a
        href={target.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-2 p-7 transition-colors hover:border-accent"
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-mono text-[17px] text-ink transition-colors group-hover:text-accent">
              {game.name}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
              {game.language}
            </span>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {game.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
          <span className="font-mono text-[13px] text-ink transition-colors group-hover:text-accent">
            {target.label}
          </span>
          <span className="text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
            ↗
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default async function GamesPage() {
  const projects = await getProjects();
  const games = projects.filter((p) => p.category === "games");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="pt-16">
        <PageHeader
          eyebrow="Playable"
          title="Games"
          lede="The lighter side of the backlog. Small, finishable, and meant to be fun."
        />
      </div>

      {games.length === 0 ? (
        <p className="py-20 text-center font-mono text-sm text-faint">
          Nothing playable right now — check back after the next jam.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {games.map((g, i) => (
            <GameCard key={g.name} game={g} index={i} />
          ))}
        </div>
      )}

      <Reveal className="mt-16 border-t border-line pt-8">
        <p className="text-[15px] text-muted">
          Want to see everything else?{" "}
          <a href="/projects" className="text-accent hover:underline">
            All projects →
          </a>
        </p>
      </Reveal>
    </div>
  );
}
