"use client";

import Link from "next/link";

import { LoadReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { locale } = useLocale();

  return (
    <section className="border-b border-border px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
      <LoadReveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          [ {hero.eyebrow[locale]} ]
        </p>
      </LoadReveal>

      <LoadReveal delay={0.1}>
        <h1 className="mt-8 max-w-[18ch] font-display text-[clamp(3.4rem,11.5vw,11rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
          {hero.headline[locale]}
        </h1>
      </LoadReveal>

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
        <LoadReveal delay={0.2} className="md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
          <p className="text-body-lg text-muted-foreground">
            {hero.lead[locale]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button asChild className="h-12 px-6 text-base">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label[locale]}
              </Link>
            </Button>
            <Link
              href={hero.secondaryCta.href}
              className="text-sm underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
            >
              {hero.secondaryCta.label[locale]}
            </Link>
          </div>
        </LoadReveal>
      </div>
    </section>
  );
}
