export type Category =
  | "apps"
  | "tools"
  | "games"
  | "extensions"
  | "experiments"
  | "learning";

export const categoryLabels: Record<Category, string> = {
  apps: "Apps",
  tools: "Tools",
  games: "Games",
  extensions: "Extensions",
  experiments: "Experiments",
  learning: "Learning",
};

export const categoryOrder: Category[] = [
  "apps",
  "tools",
  "games",
  "extensions",
  "experiments",
  "learning",
];

type Override = {
  category: Category;
  /** Curated one-liner. Falls back to the GitHub description when absent. */
  blurb?: string;
  featured?: boolean;
  hidden?: boolean;
};

/**
 * Hand-maintained map from repo name -> presentation.
 *
 * GitHub gives us the raw material (name, language, stars, dates); this file
 * decides how it reads. Anything missing here is shown under "Experiments" using
 * its own GitHub description, so adding a repo never breaks the page.
 */
export const overrides: Record<string, Override> = {
  "MeZShip": {
    category: "apps",
    blurb: "A place to meet new people around you.",
    featured: true,
  },
  "aniotako": {
    category: "apps",
    blurb: "Anime tracking site — keep a watchlist that actually stays in sync.",
    featured: true,
  },
  "MedUnbox": {
    category: "apps",
    blurb: "Medicine information, unboxed and made readable.",
    featured: true,
  },
  "voidquill": {
    category: "apps",
    blurb: "Confess to the void. It listens — and sometimes, speaks back.",
    featured: true,
  },
  "HearMeOuttt": {
    category: "apps",
    blurb: "Anonymous, text-only confessions. No accounts, no faces.",
    featured: true,
  },
  "last-minute-pilot": {
    category: "apps",
    blurb: "An AI copilot that plans, monitors, and replans your crunch time.",
    featured: true,
  },
  "Shizumi-Garden": {
    category: "games",
    blurb: "A relaxing Zen word-find game, with the visuals to match.",
    featured: true,
  },
  "e7-gear-evaluator": {
    category: "games",
    blurb: "Gear evaluation tool for Epic Seven players. Still growing.",
  },
  "Noise-Remover-Linux": {
    category: "tools",
    blurb: "Records and strips background noise, built for Linux.",
    featured: true,
  },
  "Cropyfier": {
    category: "tools",
    blurb: "Crop media fast, without opening a heavyweight editor.",
    featured: true,
  },
  "pointer-locator": {
    category: "tools",
    blurb: "Find your mouse pointer's coordinates without hunting for it.",
  },
  "upi-shield-gfgxccc": {
    category: "tools",
    blurb: "UPI safety layer — a guardrail for payment flows.",
  },
  "Page-to-B-Roll": {
    category: "extensions",
    blurb: "Browser extension that turns any website into video B-roll.",
    featured: true,
  },
  "chatbroom-extension": {
    category: "extensions",
    blurb: "Wipe ChatGPT chats by keyword, in one keystroke.",
  },
  "agent-skills": {
    category: "experiments",
    blurb: "A curated set of agent skills, personally written and tested.",
    featured: true,
  },
  "stillwater": {
    category: "experiments",
    blurb: "A world that is yours. Quiet, and in progress.",
  },
  "Craftvolve": {
    category: "experiments",
    blurb: "Early-stage. No description yet — it's still becoming.",
  },
  "Samrich": {
    category: "experiments",
    blurb: "A personal website made for Samrich.",
  },
  "hack2skill-ai-email-assistant": {
    category: "experiments",
    blurb: "AI email assistant MVP — summaries and drafted replies.",
  },
  "100DaysofCode-Harshvdev": {
    category: "learning",
    blurb: "The #100DaysOfCode log. Where all of this started.",
  },
  "Harshvdev": {
    category: "learning",
    hidden: true,
  },
  "harshvdev-site": {
    category: "learning",
    hidden: true,
  },
  "aseprite-builder": {
    category: "learning",
    hidden: true,
  },
};

/** Fallback bucket for repos with no curated entry. */
export const DEFAULT_CATEGORY: Category = "experiments";
