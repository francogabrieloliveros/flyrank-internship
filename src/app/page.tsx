import { Button } from "@/components/Button";
import { ProjectThumb } from "@/components/ProjectThumb";
import { ArrowRightIcon } from "@/components/icons";
import { leadProject, site } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 pb-16 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">
            {site.role} · {site.location}
          </p>

          <h1 className="font-display mt-5 max-w-4xl text-4xl leading-[1.08] sm:text-6xl">
            {site.claim}
          </h1>

          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-ink/65 sm:text-lg">
            {site.proof}
          </p>

          <div className="mt-9">
            <Button
              href="/contact"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              Connect with me
            </Button>
          </div>

          {/* Rigid grid block with a liquid glass metrics card overlapping it —
              the same contrast language as the header, reintroduced here. */}
          <div className="rigid-frame relative mt-16 overflow-hidden bg-paper/60 p-1">
            <div
              aria-hidden="true"
              className="grid h-75 w-full grid-cols-6 sm:h-72"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-ink/[0.06]" />
              ))}
            </div>

            <div className="glass absolute bottom-5 left-1/2 flex w-[92%] -translate-x-1/2 flex-col gap-6 rounded-[1.75rem] p-6 sm:bottom-6 sm:w-auto sm:flex-row sm:gap-10 sm:px-10 sm:py-7">
              {leadProject.metrics?.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-3xl text-ink sm:text-4xl">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-ink/50">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Works snapshot                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">
            Works snapshot
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            The strongest proof
          </h2>

          <div className="rigid-frame mt-8 grid overflow-hidden bg-paper/70 md:grid-cols-2">
            <ProjectThumb
              title={leadProject.title}
              image={leadProject.image!}
            />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <h3 className="font-display text-2xl">{leadProject.title}</h3>
              <p className="text-sm font-light leading-relaxed text-ink/65">
                {leadProject.blurb} {leadProject.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {leadProject.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button
              href="/proof-of-work"
              variant="outline"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              See my projects
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
