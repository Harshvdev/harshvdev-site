"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/lib/site";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/media", label: "Media" },
  { href: "/games", label: "Games" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu when the route changes. Adjusting state during
  // render (rather than in an effect) avoids a wasted intermediate paint.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.github.toLowerCase()}
          <span className="text-accent">_</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 font-mono text-[13px] transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="mr-1.5 text-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  >
                    •
                  </motion.span>
                )}
                {l.label}
              </Link>
            );
          })}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[12px] text-ink"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="px-5 py-2">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between border-b border-line py-3.5 font-mono text-[14px] text-ink last:border-0"
                  >
                    {l.label}
                    <span className={active ? "text-accent" : "text-faint"}>
                      {active ? "•" : "→"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
