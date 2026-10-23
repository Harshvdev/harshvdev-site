export const site = {
  name: "Harshvdev",
  person: "Harsh",
  role: "Builder",
  tagline: "I build small tools that solve one problem each.",
  bio: [
    "I'm a builder from India, learning in public by shipping real projects. Most of what I make starts as something annoying me, and ends as a tool someone else can use.",
    "Some weeks that's a browser extension, some weeks it's a Zen word game. The constant is that it ships.",
  ],
  location: "Uttar Pradesh, India",
  email: "harsh.vs.tech@gmail.com",
  github: "Harshvdev",
  avatar: "https://avatars.githubusercontent.com/u/207229786?v=4",
  // Public GitHub profile creation date — used for the "building since" figure.
  buildingSince: "2025-04-11",
  availableForWork: true,
  siteUrl: "https://harshvdev.vercel.app",
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
  /** Short one-line description shown on the contact page. */
  note: string;
};

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "@Harshvdev",
    href: "https://github.com/Harshvdev",
    note: "Everything I've shipped, open source.",
  },
  {
    label: "X",
    handle: "@harshvdev",
    href: "https://x.com/harshvdev",
    note: "Build logs and half-finished thoughts.",
  },
  {
    label: "LinkedIn",
    handle: "harshvdev",
    href: "https://www.linkedin.com/in/harshvdev",
    note: "The formal version of the same story.",
  },
  {
    label: "Instagram",
    handle: "@harshvdev",
    href: "https://www.instagram.com/harshvdev",
    note: "Occasionally, when I remember it exists.",
  },
  {
    label: "Discord",
    handle: "harshvdev",
    href: "https://discord.com/users/harshvdev",
    note: "Fastest way to reach me.",
  },
] as const;

export type DonateMethod = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  cta: string;
};

export const donate: DonateMethod[] = [
  {
    id: "github",
    name: "GitHub Sponsors",
    blurb: "Support the open source work directly through GitHub. Recurring or one-off, your call.",
    href: "https://github.com/sponsors/Harshvdev",
    cta: "Sponsor on GitHub",
  },
  {
    id: "kofi",
    name: "Ko-fi",
    blurb: "Buy a coffee for the next late-night build session. One-time, no account needed.",
    href: "https://ko-fi.com/harshvdev",
    cta: "Buy me a coffee",
  },
] as const;
