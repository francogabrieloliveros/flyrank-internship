import { Button } from "@/components/Button";
import { CaseStudy } from "@/components/CaseStudy";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ArrowRightIcon } from "@/components/icons";
import { leadProject, secondaryProjects } from "@/lib/data";

export const metadata = {
  title: "Proof of Work — Franco Oliveros",
};

export default function ProofOfWork() {
  return (
    <>
      <section className="px-4 pb-10 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">Proof of Work</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Built to hold up under real traffic.
          </h1>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <CaseStudy project={leadProject} />
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">More projects</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">Secondary cases</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">Skills</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">What&apos;s underneath</h2>
          <div className="mt-8">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Button href="/contact" icon={<ArrowRightIcon className="h-4 w-4" />}>
            Let&apos;s talk about my projects
          </Button>
        </div>
      </section>
    </>
  );
}
