import "server-only";
import { cacheLife, cacheTag } from "next/cache";

export const CHANNEL_ID = "UC_1ZRZ4GAO-KFFfvYEo591g";
export const CHANNEL_URL = "https://www.youtube.com/@harshvdev";

export type Video = {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  publishedAt: string;
};

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/**
 * Parse the channel's public Atom feed into a list of videos.
 *
 * The feed gives us titles + ids + dates for free, with no API key. It only
 * exposes the most recent ~15 entries, which is exactly what a portfolio wants.
 */
function parseFeed(xml: string): Video[] {
  const entries = xml.split("<entry>").slice(1);
  const videos: Video[] = [];

  for (const entry of entries) {
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1];
    const title =
      /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/.exec(entry)?.[1]?.trim();
    const published =
      /<published>([^<]+)<\/published>/.exec(entry)?.[1] ?? "";

    if (!id || !title) continue;

    videos.push({
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      publishedAt: published,
    });
  }

  return videos;
}

export async function getVideos(): Promise<Video[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')

  try {
    const res = await fetch(FEED);
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    return parseFeed(await res.text());
  } catch (err) {
    console.error("[youtube] failed to fetch feed:", err);
    return [];
  }
}
