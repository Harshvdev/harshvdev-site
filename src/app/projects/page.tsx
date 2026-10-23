import type { Metadata } from "next";
import { getProjects } from "@/lib/github";
import { ProjectLedger } from "@/components/ProjectLedger";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every public project, organized by what it is.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="pt-16">
        <PageHeader
          eyebrow="Everything, open source"
          title="Projects"
          lede="Live from GitHub, so this list is never stale. Filter by what kind of thing it is."
        />
      </div>

      {projects.length === 0 ? (
        <p className="py-20 text-center font-mono text-sm text-faint">
          Couldn&apos;t reach GitHub just now. Refresh in a minute.
        </p>
      ) : (
        <ProjectLedger projects={projects} />
      )}
    </div>
  );
}
