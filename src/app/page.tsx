import Link from "next/link";
import { getFeaturedProjects, getProjects } from "@/lib/github";
import { getVideos } from "@/lib/youtube";
import { ProjectRow } from "@/components/ProjectRow";
import { Reveal } from "@/components/Motion";
import { VideoCard } from "@/components/VideoCard";
import { donate, site } from "@/lib/site";

/**
 * Days since the public GitHub profile was created. Time-dependent, so it's
 * cached to keep prerender stable and revalidated daily.
 */
async function daysBuilding() {
  "use cache";
  const start = new Date(site.buildingSince).getTime();
  return Math.max(1, Math.floor((Date.now() - start) / 86_400_000));
}

export default async function HomePage() {
  const [featured, allProjects, videos] = await Promise.all([
    getFeaturedProjects(6),
    getProjects(),
    getVideos(),
  ]);

  const totalStars = allProjects.reduce((sum, p) => sum + p.stars, 0);

  const stats = [
    { value: allProjects.length, label: "public projects" },
    { value: totalStars, label: "stars earned" },
    { value: await daysBuilding(), label: "days building" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col justify-center pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Reveal>
          <p className="eyebrow">
            {site.location} · building since {new Date(site.buildingSince).getFullYear()}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight text-ink sm:text-[9vw] lg:text-[7.5rem]">
            Harsh<span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">
            {site.tagline} Some weeks that&apos;s a browser extension, some weeks
            it&apos;s a Zen word game. The constant is that it{" "}
            <span className="text-ink">ships</span>.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              See the work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink"
            >
              Get in touch
            </Link>

            {site.availableForWork && (
              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                open to work
              </span>
            )}
          </div>
        </Reveal>

        {/* Stats — quiet, mono, factual */}
        <Reveal delay={0.2}>
          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl tabular-nums text-ink sm:text-4xl">
                  {s.value.toLocaleString()}
                </dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-wider text-faint">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── Featured work ────────────────────────────────────── */}
      <section>
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl tracking-tight text-ink">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              all {allProjects.length} →
            </Link>
          </div>
        </Reveal>

        <div className="rule">
          {featured.map((p, i) => (
            <ProjectRow key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── Media teaser ─────────────────────────────────────── */}
      {videos.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h2 className="font-display text-2xl tracking-tight text-ink">
                On camera
              </h2>
              <Link
                href="/media"
                className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
              >
                all media →
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(0, 3).map((v, i) => (
              <Reveal key={v.id} delay={i * 0.05}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Support ──────────────────────────────────────────── */}
      <section className="mt-24">
        <Reveal>
          <div className="rounded-2xl border border-line bg-paper-2 p-8 sm:p-12">
            <p className="eyebrow">Support the work</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              Everything here is free and open source.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              If any of these tools saved you a few minutes, you can send a few
              dollars back the other way.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {donate.map((d) => (
                <a
                  key={d.id}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {d.name}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              ))}
              <Link
                href="/donate"
                className="inline-flex items-center font-mono text-[13px] text-muted transition-colors hover:text-ink self-center"
              >
                other ways →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
