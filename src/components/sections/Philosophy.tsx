"use client";

import { Reveal } from "@/components/motion";
import { about } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function Philosophy() {
  const { locale } = useLocale();

  return (
    <section className="border-b border-border px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
      <Reveal>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.8rem,7.5vw,7rem)] uppercase leading-[0.95] tracking-[-0.03em]">
          {about.philosophy.heading[locale]}
        </h1>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        {about.philosophy.paragraphs.map((paragraph, i) => (
          <Reveal
            key={paragraph.en.slice(0, 24)}
            delay={i * 0.08}
            className={
              i === 0
                ? "md:col-span-5 md:col-start-2"
                : "md:col-span-5 md:col-start-7 md:mt-16"
            }
          >
            <p className="text-body-lg text-muted-foreground">
              {paragraph[locale]}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
