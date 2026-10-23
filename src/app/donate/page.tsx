import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { donate, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the open source work.",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="pt-16">
        <PageHeader
          eyebrow="Optional, and never expected"
          title="Donate"
          lede="Everything on this site is free to use and free to fork. If it saved you time, here's an easy way to say thanks."
        />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {donate.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.06}>
            <a
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-2 p-8 transition-colors hover:border-accent sm:p-10"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent">
                    {d.name}
                  </h2>
                  <span className="text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {d.blurb}
                </p>
              </div>

              <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors group-hover:bg-accent">
                {d.cta}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border-t border-line pt-8">
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
          Not in a position to donate? That&apos;s completely fine — starring a
          repo or telling someone about it helps just as much.{" "}
          <a
            href={`https://github.com/${site.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Find the repos here →
          </a>
        </p>
      </Reveal>
    </div>
  );
}
