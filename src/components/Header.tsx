"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { nav } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="relative mx-auto max-w-6xl">
        {/* Liquid glass surface + morphing teal blob (the signature element) */}
        <div className="glass relative overflow-hidden rounded-[2rem] px-4 py-2.5 sm:px-6">
          <span
            aria-hidden="true"
            className="liquid-blob pointer-events-none absolute -left-8 -top-10 h-32 w-32 bg-teal/45 sm:h-36 sm:w-36"
          />
          <span
            aria-hidden="true"
            className="liquid-blob pointer-events-none absolute -right-10 -bottom-12 h-28 w-28 bg-teal/25 sm:h-32 sm:w-32"
            style={{ animationDelay: "-6s" }}
          />

          <div className="relative flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <Logo className="h-9 w-9 sm:h-10 sm:w-10" />
              <span className="font-display text-base tracking-tight sm:text-lg">
                Franco Oliveros
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      active
                        ? "bg-ink text-mist"
                        : "text-ink/70 hover:bg-paper/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="hidden rounded-full bg-ink px-5 py-2 text-sm text-mist transition-transform hover:scale-[1.03] md:inline-block"
            >
              Connect with me
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2 text-ink md:hidden"
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass relative mt-2 overflow-hidden rounded-[1.75rem] p-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base transition-colors ${
                      active ? "bg-ink text-mist" : "text-ink/80 hover:bg-paper/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-ink px-4 py-3 text-center text-base text-mist"
              >
                Connect with me
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
