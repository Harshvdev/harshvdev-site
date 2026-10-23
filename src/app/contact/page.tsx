import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CopyEmail } from "@/components/CopyEmail";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach me.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="pt-16">
        <PageHeader
          eyebrow="Say hello"
          title="Contact"
          lede="No forms, no funnel. Pick whichever of these you actually use."
        />
      </div>

      {/* Primary: email */}
      <Reveal className="mt-12">
        <div className="rounded-2xl border border-line bg-paper-2 p-8 sm:p-10">
          <p className="eyebrow">Email</p>
          <p className="mt-4 font-display text-3xl tracking-tight text-ink break-all sm:text-4xl">
            {site.email}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Write an email
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <CopyEmail email={site.email} />
          </div>
        </div>
      </Reveal>

      {/* Socials */}
      <p className="eyebrow mt-16 border-t border-line pt-8">Or find me here</p>
      <div className="mt-6">
        {socials.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.03}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-b border-line"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-300 ease-out group-hover:w-1"
              />
              <div className="flex flex-col gap-1 py-5 pl-4 pr-2 transition-[padding] duration-300 ease-out group-hover:pl-7 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="w-40 shrink-0 font-mono text-[15px] text-ink transition-colors group-hover:text-accent">
                  {s.label}
                </span>
                <span className="flex-1 text-[15px] leading-relaxed text-muted">
                  {s.note}
                </span>
                <span className="flex shrink-0 items-center gap-4 font-mono text-[12px] text-faint">
                  <span>{s.handle}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
