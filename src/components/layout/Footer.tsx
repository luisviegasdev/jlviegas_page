"use client";

import { WaveLink } from "@/components/WaveLink";
import { footer } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

const linkClass =
  "text-sm text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent";

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-6">
          {/* TODO: replace wordmark with public/images/logo-white.svg when provided */}
          <p className="font-display text-h1 uppercase leading-none">Lumo</p>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            {footer.tagline[locale]}
          </p>
        </div>

        <nav
          aria-label={footer.directory.heading[locale]}
          className="md:col-span-3"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            {footer.directory.heading[locale]}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {footer.directory.links.map((link) => (
              <li key={link.href}>
                <WaveLink
                  href={link.href}
                  label={link.label[locale]}
                  className={linkClass}
                />
              </li>
            ))}
          </ul>
        </nav>

        <nav
          aria-label={footer.protocol.heading[locale]}
          className="md:col-span-3"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            {footer.protocol.heading[locale]}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {footer.protocol.links.map((link) => (
              <li key={link.label.en}>
                <WaveLink
                  href={link.href}
                  label={link.label[locale]}
                  className={linkClass}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-primary-foreground/15 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-xs text-primary-foreground/50">
          {footer.legal[locale]}
        </p>
        <ul className="flex items-center gap-6">
          {footer.legalLinks.map((link) => (
            <li key={link.label.en}>
              <WaveLink
                href={link.href}
                label={link.label[locale]}
                className="text-xs text-primary-foreground/50 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
