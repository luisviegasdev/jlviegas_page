'use client';

import { Reveal } from '@/components/motion';
import { about } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Full-bleed image panel that follows the Hero scroll animation.
  The hero portrait scales up to fill the viewport; this section
  continues that image at full-bleed so the transition reads as a
  seamless reveal — the photo expanding into the About section.
*/
export function HomeAbout() {
  const { locale } = useLocale();

  return (
    <section className="relative min-h-svh flex items-end overflow-hidden">
      {/* Full-bleed portrait — object-top matches the crop visible at hero max-scale */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-image.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Gradient for text readability — bottom half only, keeps top of image clean */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-primary-foreground">
            {about.philosophy.heading[locale]}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
          {about.philosophy.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph.en.slice(0, 24)} delay={i * 0.1}>
              <p className="text-body-lg text-primary-foreground/70">
                {paragraph[locale]}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
