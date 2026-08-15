import { ExternalLinkIcon, GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/data";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <section className="rigid-frame relative overflow-hidden bg-ink text-mist">
      <span
        aria-hidden="true"
        className="liquid-blob absolute -right-24 -top-24 h-80 w-80 bg-teal/25"
      />
      <span
        aria-hidden="true"
        className="liquid-blob absolute -bottom-32 -left-16 h-72 w-72 bg-teal/10"
        style={{ animationDelay: "-7s" }}
      />

      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-teal">Lead case study</p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">{project.title}</h2>
          <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-mist/75">
            {project.desc}
          </p>

          {project.note && (
            <p className="mt-4 max-w-lg text-sm font-light italic text-mist/50">
              {project.note}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-mist/20 px-3 py-1 text-xs text-mist/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="glass-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-mist transition-transform hover:scale-[1.03]"
            >
              View live app <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-mist/25 px-6 py-3 text-sm text-mist/80 transition-colors hover:border-teal hover:text-teal"
            >
              View code <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {project.metrics && (
          <div className="grid content-start gap-4 self-start sm:grid-cols-3 lg:grid-cols-1">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="glass-dark rounded-3xl p-6"
              >
                <p className="font-display text-4xl text-teal">{m.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-mist/60">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
