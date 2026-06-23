'use client';

import {
	motion,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { WaveLink } from '@/components/WaveLink';
import { about, hero } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Hero scroll sequence — three phases over 380vh:

  1. [0–18%]   Hero text + name fade / transition to navbar
  2. [5–65%]   Media container grows from natural image size to (viewport − 16px),
               with 10px border-radius retained at max — page background shows as gap
  3. [68–85%]  About content fades in over the full-bleed image

  The container grows via width/height (not transform: scale) so the page background
  is literally the padding you see at the edges, matching the joegarner.com technique.
*/

export function Hero() {
	const { locale } = useLocale();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();

	const [dims, setDims] = useState({ w: 1440, h: 900 });
	useEffect(() => {
		const update = () =>
			setDims({ w: window.innerWidth, h: window.innerHeight });
		update();
		window.addEventListener('resize', update, { passive: true });
		return () => window.removeEventListener('resize', update);
	}, []);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ['start start', 'end end'],
	});

	const smooth = useSpring(scrollYProgress, {
		stiffness: 55,
		damping: 20,
		mass: 0.5,
	});

	// Image natural dimensions (the starting size of the growing container)
	const imgW = dims.w >= 768 ? 420 : 220;
	const imgH = imgW * (9 / 16);
	const stickyH = dims.h - 64; // 100svh minus navbar

	// Target: full panel minus 8px on every side — page background shows as the gap
	const targetW = dims.w - 16;
	const targetH = stickyH - 16;

	// Container grows via width/height — not CSS scale
	const containerW = useTransform(smooth, [0.05, 0.65], [imgW, targetW]);
	const containerH = useTransform(smooth, [0.05, 0.65], [imgH, targetH]);
	// Border-radius stays at 10px at max — the rounded corners + page bg = visible padding
	const containerR = useTransform(smooth, [0.05, 0.65], [16, 10]);

	// Image fades out as the container grows, revealing the black layer beneath
	const imageOpacity = useTransform(smooth, [0.2, 0.65], [1, 0]);

	// About content appears once the black layer is fully revealed
	const aboutOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);

	// Hero text fades early so it's gone before the container is large
	const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 0.18], [0, -18]);

	// Name → navbar (spring-smoothed, same inertia as the container)
	const nameH = dims.w * 0.22 * 0.72;
	const nameScaleTarget = 22 / (dims.w * 0.22);
	const nameYTarget = 32 - dims.h + (nameH * nameScaleTarget) / 2;
	const nameXTarget = 70 - dims.w / 2;

	const nameScale = useTransform(smooth, [0, 0.2], [1, nameScaleTarget]);
	const nameY = useTransform(smooth, [0, 0.2], [0, nameYTarget]);
	const nameX = useTransform(smooth, [0, 0.2], [0, nameXTarget]);

	return (
		<div ref={wrapperRef} className="relative" style={{ minHeight: '380vh' }}>
			{/* Sticky panel — no overflow-hidden so page bg shows around the growing container */}
			<div className="sticky top-16 h-[calc(100svh-4rem)] relative">
				{/* Growing media container — centered, expands outward from image natural size */}
				<div className="absolute inset-0 flex  justify-center">
					<motion.div
						className="relative overflow-hidden m-2"
						style={{
							width: reduce ? imgW : containerW,
							height: reduce ? imgH : containerH,
							borderRadius: reduce ? 16 : containerR,
						}}
					>
						{/* Layer 1 — black background, always visible behind the image */}
						<div className="absolute inset-0 bg-black" />

						{/* Layer 2 — image fades out as the container grows */}
						<motion.div
							className="absolute inset-0"
							style={{ opacity: reduce ? undefined : imageOpacity }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/images/hero-image.png"
								alt={`${hero.name} — portrait`}
								className="absolute inset-0  w-full h-full object-cover object-top"
							/>
						</motion.div>

						{/* About content — fades in over the full-bleed image, same container */}
						{!reduce && (
							<motion.div
								className="absolute inset-0 z-10 pointer-events-none"
								style={{ opacity: aboutOpacity }}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
								<div className="absolute inset-0 flex items-end px-5 py-20 md:px-10 md:py-28">
									<div className="relative z-10 w-full ">
										<h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-primary-foreground">
											{about.philosophy.heading[locale]}
										</h2>
										<div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
											{about.philosophy.paragraphs.map((paragraph) => (
												<p
													key={paragraph.en.slice(0, 24)}
													className="text-body-lg text-primary-foreground/70"
												>
													{paragraph[locale]}
												</p>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</motion.div>
				</div>

				{/* Hero text — above the container (z-20), fades before the container is large */}
				<motion.div
					className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-5 text-center pointer-events-none"
					style={{
						opacity: reduce ? undefined : textOpacity,
						y: reduce ? undefined : textY,
					}}
				>
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
						{hero.caption[locale]}
					</p>
					<h1 className="max-w-[20ch] text-balance font-body text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.01em]">
						{hero.headline[locale]}
					</h1>
					<div className="flex flex-wrap items-center justify-center gap-6 pointer-events-auto">
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
			</div>

			{/* Fixed name — position: fixed, transitions from hero bottom to navbar logo */}
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
