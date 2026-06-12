"use client";

import { Reveal } from "@/components/motion";
import { mechanism } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function TheMechanism() {
  const { locale } = useLocale();

  return (
    <section
      id="mechanism"
      className="scroll-mt-16 border-t border-border px-5 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] md:col-span-7">
            {mechanism.heading[locale]}
          </h2>
          <p className="max-w-md text-body-lg text-muted-foreground md:col-span-5 md:justify-self-end md:text-right">
            {mechanism.subheading[locale]}
          </p>
        </div>
      </Reveal>

      {/* The four stages are a true sequence — order carries meaning. */}
      <ol className="mt-14">
        {mechanism.steps.map((step) => (
          <Reveal key={step.title.en}>
            <li className="grid gap-3 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
              <h3 className="font-display text-h2 uppercase leading-none md:col-span-6 md:text-h1">
                {step.title[locale]}
              </h3>
              <p className="max-w-2xl text-body text-muted-foreground md:col-span-6">
                {step.text[locale]}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="border-t border-border" aria-hidden />
    </section>
  );
}
