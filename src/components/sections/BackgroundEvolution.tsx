"use client";

import { Reveal } from "@/components/motion";
import { about } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function BackgroundEvolution() {
  const { locale } = useLocale();

  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] md:col-span-7">
            {about.evolution.heading[locale]}
          </h2>
          <p className="max-w-md text-body-lg text-muted-foreground md:col-span-5 md:justify-self-end md:text-right">
            {about.evolution.intro[locale]}
          </p>
        </div>
      </Reveal>

      {/* Typed career timeline — chronological order carries meaning. */}
      <ol className="mt-14">
        {about.evolution.timeline.map((item) => (
          <Reveal key={item.title.en}>
            <li className="grid gap-3 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
              <h3 className="font-display text-h2 uppercase leading-tight md:col-span-6">
                {item.title[locale]}
              </h3>
              <p className="max-w-2xl text-body text-muted-foreground md:col-span-6">
                {item.text[locale]}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="border-t border-border" aria-hidden />
    </section>
  );
}
