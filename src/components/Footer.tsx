import Link from "next/link";
import { donate, site, socials } from "@/lib/site";

/**
 * The copyright year is time-dependent, which Cache Components rejects during
 * prerender. Caching it makes the value stable and refreshes it daily.
 */
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await CurrentYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[13px] text-ink">
              {site.github.toLowerCase()}
              <span className="text-accent">_</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Pages</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/projects" className="text-sm text-muted transition-colors hover:text-accent">Projects</Link>
              </li>
              <li>
                <Link href="/media" className="text-sm text-muted transition-colors hover:text-accent">Media</Link>
              </li>
              <li>
                <Link href="/games" className="text-sm text-muted transition-colors hover:text-accent">Games</Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm text-muted transition-colors hover:text-accent">Donate</Link>
              </li>
              <li>
                <a
                  href={donate[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent transition-colors hover:text-ink"
                >
                  Sponsor →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {year} {site.person} · {site.location}
          </p>
          <p className="font-mono">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
