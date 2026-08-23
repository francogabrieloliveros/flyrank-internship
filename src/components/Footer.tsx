import Link from "next/link";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { nav, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink text-mist">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">Franco Oliveros</p>
            <p className="mt-3 max-w-sm text-sm font-light text-mist/70">
              {site.claim}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mist/50">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-mist/80 transition-colors hover:text-teal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mist/50">Elsewhere</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-mist/80 transition-colors hover:text-teal"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-mist/80 transition-colors hover:text-teal"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-mist/80 transition-colors hover:text-teal"
                >
                  <MailIcon className="h-4 w-4" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-mist/15 pt-6 text-xs text-mist/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Franco Gabriel Oliveros. All rights reserved.</p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
