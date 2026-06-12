"use client";

import { Reveal } from "@/components/motion";
import { servicesPage } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function StrategicSolutions() {
  const { locale } = useLocale();

  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          [ {servicesPage.solutions.label[locale]} ]
        </p>
      </Reveal>

      <div className="mt-10">
        {servicesPage.solutions.items.map((solution) => (
          <Reveal key={solution.title.en}>
            <div className="grid gap-3 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <h2 className="font-display text-h1 uppercase leading-none md:col-span-6 md:text-[clamp(2.4rem,4.5vw,4rem)]">
                {solution.title[locale]}
              </h2>
              <p className="max-w-2xl text-body-lg text-muted-foreground md:col-span-6">
                {solution.text[locale]}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-border" aria-hidden />
      </div>
    </section>
  );
}
