import type { Metadata } from "next";
import { getVideos, CHANNEL_URL } from "@/lib/youtube";
import { VideoCard } from "@/components/VideoCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Media",
  description: "Demos, walkthroughs, and animation work.",
};

export default async function MediaPage() {
  const videos = await getVideos();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="pt-16">
        <PageHeader
          eyebrow="Videos & demos"
          title="Media"
          lede="Product demos, screen recordings, and the occasional animation. Pulled straight from YouTube."
        />
      </div>

      {videos.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-mono text-sm text-faint">
            No videos loaded right now.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-mono text-[13px] text-accent hover:underline"
          >
            Watch on YouTube →
          </a>
        </div>
      ) : (
        <>
          {/* Featured (first) video, full width */}
          <Reveal className="mt-12">
            <VideoCard video={videos[0]} />
          </Reveal>

          {videos.length > 1 && (
            <>
              <p className="eyebrow mt-16 border-t border-line pt-8">Everything else</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.slice(1).map((v, i) => (
                  <Reveal key={v.id} delay={i * 0.04}>
                    <VideoCard video={v} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Reveal className="mt-16 border-t border-line pt-8">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              More on the YouTube channel
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Reveal>
        </>
      )}
    </div>
  );
}
