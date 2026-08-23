import { ExternalLinkIcon, GithubIcon } from "@/components/icons";
import { ProjectThumb } from "@/components/ProjectThumb";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rigid-frame group flex flex-col overflow-hidden bg-paper/70 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      <ProjectThumb title={project.title} />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-xl">{project.title}</h3>
          <p className="mt-1 text-sm font-light text-ink/60">{project.blurb}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-teal"
          >
            <GithubIcon className="h-4 w-4" /> Code
          </a>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-teal"
            >
              <ExternalLinkIcon className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
