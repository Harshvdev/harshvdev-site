"use client";

import { useState } from "react";
import type { Video } from "@/lib/youtube";

/**
 * Thumbnail that swaps in a privacy-enhanced YouTube iframe on click.
 *
 * Keeps the page light — no iframe (or third-party JS) loads until someone
 * actually wants to watch.
 */
export function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group">
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play: ${video.title}`}
        className="relative block w-full overflow-hidden rounded-lg border border-line bg-paper-2 aspect-video"
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`${video.embedUrl}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </>
        )}
      </button>

      <p className="mt-3 text-[15px] leading-snug text-ink">{video.title}</p>
      <p className="mt-1 font-mono text-[12px] text-faint">
        {new Date(video.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
