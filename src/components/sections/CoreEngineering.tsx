"use client";

import { Reveal } from "@/components/motion";
import { services } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function CoreEngineering() {
  const { locale } = useLocale();

  return (
    <section className="bg-card px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <p className="max-w-md text-body-lg text-muted-foreground md:order-1 md:col-span-5">
            {services.subheading[locale]}
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-none tracking-[-0.03em] md:order-2 md:col-span-7 md:text-right">
            {services.heading[locale]}
          </h2>
        </div>
      </Reveal>

      <div className="mt-14">
        {services.items.map((service) => (
          <Reveal key={service.title.en}>
            <div className="grid gap-3 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
              <h3 className="font-display text-h2 uppercase leading-none md:col-span-5">
                {service.title[locale]}
              </h3>
              <p className="max-w-2xl text-body text-muted-foreground md:col-span-7">
                {service.text[locale]}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-border" aria-hidden />
      </div>
    </section>
  );
}
