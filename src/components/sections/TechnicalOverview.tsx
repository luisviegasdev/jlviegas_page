"use client";

import { Reveal } from "@/components/motion";
import { servicesPage } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function TechnicalOverview() {
  const { locale } = useLocale();

  return (
    <section className="border-b border-border px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-[clamp(2.8rem,7.5vw,7rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] md:col-span-7">
            {servicesPage.overview.heading[locale]}
          </h1>
          <p className="max-w-md text-body-lg text-muted-foreground md:col-span-5 md:justify-self-end md:text-right">
            {servicesPage.overview.subheading[locale]}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
        {servicesPage.overview.stacks.map((stack, i) => (
          <Reveal key={stack.title.en} delay={i * 0.08} className="bg-card">
            <div className="flex h-full flex-col gap-4 p-8 md:p-10">
              <h2 className="font-display text-h2 uppercase leading-none">
                {stack.title[locale]}
              </h2>
              <p className="mt-auto font-mono text-sm text-muted-foreground">
                {stack.text[locale]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
