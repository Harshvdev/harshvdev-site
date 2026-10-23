import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { overrides, DEFAULT_CATEGORY, type Category } from "./curated";
import { site } from "./site";

export type Project = {
  name: string;
  fullName: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  category: Category;
  featured: boolean;
};

type GhRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  private: boolean;
};

const API = `https://api.github.com/users/${site.github}/repos`;

/**
 * Fetch the user's public repos and merge in curated presentation.
 *
 * Revalidated hourly so new pushes show up without a redeploy. If GitHub is
 * unreachable we fail soft with an empty list rather than breaking the page.
 */
export async function getProjects(): Promise<Project[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('projects')

  try {
    const res = await fetch(API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const repos: GhRepo[] = await res.json();

    return repos
      .filter((r) => !r.private && !r.fork)
      .map((r) => {
        const o = overrides[r.name];
        return {
          name: r.name,
          fullName: r.full_name,
          url: r.html_url,
          description: o?.blurb ?? r.description ?? "No description yet.",
          language: r.language,
          stars: r.stargazers_count,
          topics: r.topics ?? [],
          pushedAt: r.pushed_at,
          category: o?.category ?? DEFAULT_CATEGORY,
          featured: o?.featured ?? false,
        };
      })
      .filter((p) => !overrides[p.name]?.hidden)
      .sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt));
  } catch (err) {
    console.error("[github] failed to fetch repos:", err);
    return [];
  }
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('projects')

  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
