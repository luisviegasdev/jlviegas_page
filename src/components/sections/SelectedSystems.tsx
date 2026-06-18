"use client";

import { Reveal } from "@/components/motion";
import { works } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function SelectedSystems() {
  const { locale } = useLocale();

  return (
    // Dark background continues seamlessly from the hero image's black overlay.
    <section id="works" className="scroll-mt-16 bg-primary px-5 py-20 text-primary-foreground md:px-10 md:py-28">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] md:col-span-7">
            {works.heading[locale]}
          </h2>
          <p className="max-w-md text-body-lg text-primary-foreground/50 md:col-span-5 md:justify-self-end md:text-right">
            {works.subheading[locale]}
          </p>
        </div>
      </Reveal>

      <div className="mt-14">
        {works.projects.map((project) => (
          <Reveal key={project.title.en}>
            <article className="grid gap-4 border-t border-primary-foreground/15 py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/40 md:col-span-3">
                {project.meta[locale]}
              </p>
              <h3 className="font-display text-h1 uppercase leading-none md:col-span-5 md:text-[clamp(2.4rem,4vw,3.6rem)]">
                {project.title[locale]}
              </h3>
              <div className="md:col-span-4">
                <p className="text-body text-primary-foreground/60">
                  {project.description[locale]}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground/40">
                  {project.tags}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="border-t border-primary-foreground/15" aria-hidden />
      </div>
    </section>
  );
}
