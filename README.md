# harshvdev-site

My professional site. Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, deployed on **Vercel**.

Multi-page: Home, Projects, Media, Games, Contact, Donate. Light theme by default, with a dark mode toggle.

## Run it

This project uses **Bun** (`packageManager` is set to bun, so Vercel picks it up automatically).

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build (also typechecks)
bun run lint
```

## What's live vs. what's yours to edit

**Auto-fetched (no edits needed):**
- **Projects** — pulled from the GitHub API for `Harshvdev`, revalidated hourly. Forks and a few internal repos are filtered out.
- **Media** — pulled from the YouTube channel feed for `@harshvdev`. Click-to-play embeds (nothing loads until you press play).

**Yours to edit:**

| What | File |
| --- | --- |
| Name, bio, email, socials, donation links | `src/lib/site.ts` |
| Project categories, blurbs, which are featured/hidden | `src/lib/curated.ts` |
| Colors, type, theme tokens | `src/app/globals.css` |
| Where a game is actually playable | `src/app/games/page.tsx` (`playTargets`) |

## Editing content

- **Change a project's description or category** → add/adjust an entry in `src/lib/curated.ts`. Anything missing falls back to its GitHub description under "Experiments", so adding a repo never breaks the page.
- **Add a social link** → push an object into `socials` in `src/lib/site.ts`.
- **Add a donation method** → push an object into `donate` in `src/lib/site.ts`.

## Deploy on Vercel

Push to the `Harshvdev/harshvdev-site` repo, then import it at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Next.js — no config needed. Set the production domain in `site.siteUrl` (`src/lib/site.ts`) for correct SEO/Open Graph tags.

## Notes

- Uses Next 16's **Cache Components** model: data functions use `'use cache'` + `cacheLife('hours')` instead of the older `export const revalidate`. This is why you won't find `revalidate` segment configs.
- All routes prerender as static and refresh hourly — fast pages, fresh content, no server needed.
