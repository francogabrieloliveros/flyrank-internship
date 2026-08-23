import { Button } from "@/components/Button";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/data";

export const metadata = {
  title: "Contact — Franco Oliveros",
};

const links = [
  {
    label: "LinkedIn",
    detail: "Preferred — fastest way to reach me",
    href: site.linkedin,
    icon: LinkedinIcon,
    primary: true,
  },
  {
    label: "GitHub",
    detail: "Code for everything on Proof of Work",
    href: site.github,
    icon: GithubIcon,
  },
  {
    label: "Email",
    detail: site.email,
    href: `mailto:${site.email}`,
    icon: MailIcon,
  },
  {
    label: "Resume",
    detail: "PDF, one page",
    href: site.resumeHref,
    icon: DownloadIcon,
  },
];

export default function Contact() {
  return (
    <section className="px-4 pb-28 pt-36 sm:px-6 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/45">Contact</p>
        <h1 className="font-display mt-3 max-w-xl text-4xl sm:text-5xl">
          Let&apos;s build something that doesn&apos;t fall over.
        </h1>
        <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-ink/65">
          {site.pitch}
        </p>

        <div className="relative mt-14 overflow-hidden rounded-[2rem]">
          <span
            aria-hidden="true"
            className="liquid-blob absolute -right-16 -top-16 h-64 w-64 bg-teal/30"
          />
          <div className="glass relative grid gap-3 rounded-[2rem] p-3 sm:grid-cols-2">
            {links.map(({ label, detail, href, icon: Icon, primary }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex items-center gap-4 rounded-3xl p-6 transition-colors ${
                  primary ? "bg-ink text-mist" : "bg-paper/70 text-ink hover:bg-paper"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    primary ? "bg-teal text-ink" : "bg-mist text-ink"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="font-display block text-lg">{label}</span>
                  <span
                    className={`block text-sm font-light ${
                      primary ? "text-mist/70" : "text-ink/55"
                    }`}
                  >
                    {detail}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Button href={site.linkedin} external variant="outline" icon={<LinkedinIcon className="h-4 w-4" />}>
            Connect with me on LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
}
