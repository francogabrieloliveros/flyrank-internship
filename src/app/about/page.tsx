import { Button } from "@/components/Button";
import { LinkedinIcon } from "@/components/icons";
import { capabilities, education, site } from "@/lib/data";

export const metadata = {
  title: "About — Franco Oliveros",
};

export default function About() {
  return (
    <>
      <section className="px-4 pb-16 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">About</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            What I can build for you.
          </h1>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rigid-frame bg-paper/70 p-6">
                <span className="h-2 w-2 rounded-full bg-teal" />
                <h2 className="font-display mt-4 text-lg">{cap.title}</h2>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink/60">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Bio / philosophy — solid ink block for contrast                 */}
      {/* -------------------------------------------------------------- */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rigid-frame relative overflow-hidden bg-ink p-8 text-mist sm:p-12">
            <span
              aria-hidden="true"
              className="liquid-blob absolute -bottom-20 -right-20 h-64 w-64 bg-teal/20"
            />
            <p className="relative text-xs uppercase tracking-[0.3em] text-teal">
              Philosophy
            </p>
            <p className="font-display relative mt-4 max-w-2xl text-2xl leading-snug sm:text-3xl">
              Concurrency is the part most people skip until it breaks. I don&apos;t skip it.
            </p>
            <p className="relative mt-6 max-w-2xl text-sm font-light leading-relaxed text-mist/70 sm:text-base">
              I&apos;m a Computer Science student at the University of the Philippines Los
              Baños who cares more about what happens when 50 people hit a system at once
              than what happens in the demo with one. That habit — building for the real
              load, not the happy path — is what I&apos;m carrying from real-time backend
              work into AI engineering: pipelines and LLM integrations that stay correct
              and responsive once actual users show up.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Education                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">Education</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">Background</h2>

          <div className="mt-8 space-y-4">
            {education.map((item) => (
              <div
                key={item.school}
                className="rigid-frame flex flex-col gap-4 bg-paper/70 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-lg">{item.school}</h3>
                  {item.detail && (
                    <p className="text-sm font-light text-ink/60">{item.detail}</p>
                  )}
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-ink/40">
                    {item.location} · {item.period}
                  </p>
                </div>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 sm:max-w-xs sm:justify-end">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Button href={site.linkedin} external icon={<LinkedinIcon className="h-4 w-4" />}>
            Connect with me on LinkedIn
          </Button>
        </div>
      </section>
    </>
  );
}
