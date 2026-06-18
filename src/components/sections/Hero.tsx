'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { WaveLink } from '@/components/WaveLink';
import { hero } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Hero scroll effect — portrait image expands into the SelectedSystems section.

  Structure:
  ┌ wrapper  min-h-[250vh]  ← provides ~150vh of scroll animation distance
  │ └ sticky  top-16  h-[calc(100svh-4rem)]  overflow-hidden
  │   ├ figure  (scale 1→8, border-radius 8→0, dark overlay 0→1)
  │   ├ headline + CTAs  (fade out at 0–22% scroll)
  │   └ full-bleed name  (fade out at 0–18% scroll)
  └ (SelectedSystems follows with bg-primary — seamless dark continuation)

  Scale = 8 ensures the ultra-condensed figure covers every viewport size.
  overflow-hidden on the sticky panel clips the overscan cleanly.
*/

export function Hero() {
	const { locale } = useLocale();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ['start start', 'end end'],
	});

	// Image — scale + rounded corners collapse + dark overlay
	const imageScale = useTransform(scrollYProgress, [0.08, 0.85], [1, 8]);
	const imageBorderRadius = useTransform(scrollYProgress, [0.08, 0.5], [8, 0]);
	const overlayOpacity = useTransform(scrollYProgress, [0.18, 0.80], [0, 1]);

	// Text content — fades out before the image covers it
	const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 0.22], [0, -18]);
	const nameOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

	return (
		// Tall wrapper — extra height = scroll runway for the animation.
		<div ref={wrapperRef} className="relative" style={{ minHeight: '250vh' }}>
			{/* Sticky hero panel — stays fixed while wrapper scrolls past. */}
			<div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden flex flex-col">

				{/* TOP — portrait */}
				<div className="flex flex-col items-center px-5 pt-6 md:px-10 md:pt-8">
					{/*
						z-10 + relative: raises the figure above the headline/name
						in the stacking order so scaled pixels appear on top.
					*/}
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
						{/* Dark overlay deepens as image scales toward full-bleed */}
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

				{/* MIDDLE — call-to-action phrase */}
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

				{/* BOTTOM — full-bleed name */}
				<motion.div
					className="w-full overflow-hidden"
					style={{ opacity: reduce ? undefined : nameOpacity }}
				>
					<h2 className="origin-bottom select-none whitespace-nowrap text-center font-display text-[22vw] font-bold uppercase leading-[0.72] tracking-[-0.01em]">
						{hero.name}
					</h2>
				</motion.div>
			</div>
		</div>
	);
}
