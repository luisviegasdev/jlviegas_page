'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Button } from '@/components/ui/button';
import { WaveLink } from '@/components/WaveLink';
import { hero } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Two independent animations driven by scroll:

  1. Portrait (image)
     - Scale 1→8 via useSpring(scrollYProgress) — adds inertia/weight
     - Dark overlay fades in as it scales

  2. Full-bleed name (position: fixed, outside the overflow-hidden container)
     - transformOrigin: "20px 100%" — anchors the text left-edge (pl-5) + bottom
     - scale: 1 → ~0.07 (22px target / 22vw natural)
     - translateY: 0 → moves text center from viewport-bottom to navbar-center (32px)
     - No x translation needed: the 20px origin stays fixed as scale collapses
     - Driven by raw scrollYProgress (no spring) — organic 1:1 scroll response
     - pointer-events: none during transition so hero CTAs remain clickable
*/

export function Hero() {
  const { locale } = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Viewport dims — needed for pixel-accurate y + scale targets
  const [dims, setDims] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed progress for the image (adds inertia/lag)
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.5 });

  // Image transforms — spring-smoothed
  const imageScale = useTransform(smooth, [0.08, 0.85], [1, 8]);
  const imageBorderRadius = useTransform(smooth, [0.08, 0.5], [8, 0]);
  const overlayOpacity = useTransform(smooth, [0.18, 0.8], [0, 1]);

  // Text (caption + headline + CTAs) — raw progress, fades immediately
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -18]);

  // Name — spring-smoothed (same inertia as the image).
  // Text height: font-size 22vw × leading 0.72
  const nameH = dims.w * 0.22 * 0.72;
  // Scale to roughly 22px (navbar logo size) from 22vw natural size
  const nameScaleTarget = 22 / (dims.w * 0.22);
  // Y: with transformOrigin "50% 100%", bottom stays anchored; after scale s,
  // center = viewH - nameH*s/2. translateY moves that to navbar-center (32px).
  const nameYTarget = 32 - dims.h + (nameH * nameScaleTarget) / 2;
  // X: text final width = 22/0.22 = 100px regardless of viewport.
  // Final center = navPad(20) + 50 = 70px. Shift center from viewW/2 to 70px.
  const nameXTarget = 70 - dims.w / 2;

  const nameScale = useTransform(smooth, [0, 0.28], [1, nameScaleTarget]);
  const nameY = useTransform(smooth, [0, 0.28], [0, nameYTarget]);
  const nameX = useTransform(smooth, [0, 0.28], [0, nameXTarget]);

  return (
    <div ref={wrapperRef} className="relative" style={{ minHeight: '250vh' }}>
      {/* Sticky hero panel — keeps overflow-hidden for image clipping */}
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden flex flex-col">

        {/* TOP — portrait */}
        <div className="flex flex-col items-center px-5 pt-6 md:px-10 md:pt-8">
          <motion.figure
            className="relative z-10 w-full max-w-[220px] md:max-w-[420px]"
            style={{
              scale: reduce ? undefined : imageScale,
              borderRadius: reduce ? undefined : imageBorderRadius,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-image.png"
              alt={`${hero.name} — portrait`}
              className="aspect-[16/9] w-full object-cover block"
            />
            <motion.div
              className="absolute inset-0 bg-black"
              style={{ opacity: reduce ? undefined : overlayOpacity }}
            />
          </motion.figure>

          <motion.p
            className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            style={{ opacity: reduce ? undefined : textOpacity }}
          >
            {hero.caption[locale]}
          </motion.p>
        </div>

        {/* MIDDLE — headline + CTAs */}
        <motion.div
          className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-6 text-center md:px-10 md:py-8"
          style={{
            opacity: reduce ? undefined : textOpacity,
            y: reduce ? undefined : textY,
          }}
        >
          <h1 className="max-w-[20ch] text-balance font-body text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.01em]">
            {hero.headline[locale]}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button asChild className="h-12 px-6 text-base">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label[locale]}
              </Link>
            </Button>
            <WaveLink
              href={hero.secondaryCta.href}
              label={hero.secondaryCta.label[locale]}
              className="border-b border-border pb-2 text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
            />
          </div>
        </motion.div>

        {/* Spacer — holds the layout space the fixed name visually occupies */}
        <div style={{ height: `${nameH}px` }} aria-hidden />
      </div>

      {/* Full-bleed name — position: fixed so it escapes the overflow-hidden container.
          transformOrigin "20px 100%": the text's left edge (pl-5) + viewport bottom
          stays anchored as scale collapses, carrying it directly to the navbar logo slot. */}
      {!reduce && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 select-none pointer-events-none"
          style={{
            y: nameY,
            x: nameX,
            scale: nameScale,
            transformOrigin: '50% 100%',
            zIndex: 51,
          }}
        >
          <h2 className="whitespace-nowrap text-center font-display text-[22vw] font-bold uppercase leading-[0.72] tracking-[-0.01em]">
            {hero.name}
          </h2>
        </motion.div>
      )}
    </div>
  );
}
