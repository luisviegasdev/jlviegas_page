'use client';

import {
	motion,
	stagger,
	useAnimate,
	useMotionValueEvent,
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

// Vertical slices for the one-time wordmark load reveal (workoholics-style).
const REVEAL_BARS = 56;

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

	// Image fades out as the container grows, revealing the black layer beneath
	const imageOpacity = useTransform(smooth, [0.2, 0.65], [1, 0]);

	// About content appears once the black layer is fully revealed
	const aboutOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);

	// Hero text fades early so it's gone before the container is large
	const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 0.18], [0, -18]);

	// Hero wordmark — one font constant keeps the docking math in sync. Sized so
	// "LUIS VIEGAS" fits on one line within the viewport (no overflow).
	const nameFontVw = 16.5;
	const nameFontPx = (nameFontVw / 100) * dims.w;
	const nameH = nameFontPx * 0.72; // matches leading-[0.72]
	const nameScaleTarget = 18 / nameFontPx; // ~18px logo when docked
	const nameYTarget = 32 - dims.h + (nameH * nameScaleTarget) / 2;
	// Docked logo anchors from the LEFT (text-left + 0% origin) so the surname can
	// abbreviate without re-centering. Hero starts with a small left margin and the
	// logo settles at 40px ≈ the navbar's md:px-10 padding.
	const nameXHero = 32;
	const nameXTarget = 40;
	// Lift the hero wordmark a hair off the bottom edge so round caps (G, A, S)
	// — whose ink overshoots below the baseline — aren't clipped by the viewport.
	const nameYHero = -18;

	const nameScale = useTransform(smooth, [0, 0.2], [1, nameScaleTarget]);
	const nameY = useTransform(smooth, [0, 0.2], [nameYHero, nameYTarget]);
	const nameX = useTransform(smooth, [0, 0.2], [nameXHero, nameXTarget]);

	// "Docked" = the name has finished settling into the navbar. The docking
	// motion completes at smooth 0.2, so we flag a touch past that. The spring
	// is overdamped (no overshoot), so this won't chatter at the boundary.
	const [scope, animate] = useAnimate();
	// Two thresholds (hysteresis): the surname abbreviates only once the name has
	// fully DOCKED (smooth ≥ 0.21), and reverts only once it's back at the START
	// (smooth ≤ 0.02). Between those it holds its state — so neither cascade plays
	// mid-transition.
	const [phase, setPhase] = useState<'full' | 'abbrev'>('full');
	useMotionValueEvent(smooth, 'change', (v) => {
		if (v >= 0.21) setPhase('abbrev');
		else if (v <= 0.02) setPhase('full');
	});

	// The surname abbreviates ONLY once docked — never during the transition.
	// Docking plays a one-shot cascade: the whole surname fades out letter by
	// letter, the trailing letters collapse their width, then "V." resolves.
	// Un-docking (scrolling back to the top) plays the SAME cascade in reverse:
	// the dot drops and "VIEGAS" fades back in letter by letter to the full name.
	const [first, ...rest] = hero.name.split(' ');
	const surname = rest.join(' ');
	const surnameTrail = surname.slice(1).split('');
	useEffect(() => {
		if (reduce || !scope.current) return;
		const v = '[data-abbrev="v"]';
		const trail = '[data-abbrev="trail"]';
		const dot = '[data-abbrev="dot"]';
		let cancelled = false;

		// VIEGAS → V.
		const dock = async () => {
			await animate(
				`${v}, ${trail}`,
				{ opacity: 0 },
				{ duration: 0.22, delay: stagger(0.07) },
			);
			if (cancelled) return;
			animate(trail, { maxWidth: 0 }, { duration: 0 });
			await animate(v, { opacity: 1 }, { duration: 0.28 });
			if (cancelled) return;
			await animate(dot, { opacity: 1, maxWidth: '0.5em' }, { duration: 0.28 });
		};

		// V. → VIEGAS (reverse cascade)
		const undock = async () => {
			animate(dot, { opacity: 0, maxWidth: 0 }, { duration: 0 });
			// Re-open the collapsed letter slots (still invisible) so they fade
			// back in place rather than slide.
			animate(trail, { maxWidth: '0.85em' }, { duration: 0 });
			await animate(
				`${v}, ${trail}`,
				{ opacity: 1 },
				{ duration: 0.22, delay: stagger(0.07) },
			);
		};

		(phase === 'abbrev' ? dock : undock)();
		return () => {
			cancelled = true;
		};
	}, [phase, reduce, animate, scope]);

	return (
		<div ref={wrapperRef} className="relative" style={{ minHeight: '380vh' }}>
			{/* Sticky panel — no overflow-hidden so page bg shows around the growing container */}
			<div className="sticky top-16 h-[calc(100svh-4rem)] relative">
				{/* Growing media container — centered, expands outward from image natural size */}
				<div className="absolute inset-0 flex justify-end z-10 pointer-events-none">
					<motion.div
						className="relative overflow-hidden m-2"
						style={{
							width: reduce ? imgW : containerW,
							height: reduce ? imgH : containerH,
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
					className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center pointer-events-none"
					style={{
						opacity: reduce ? undefined : textOpacity,
						y: reduce ? undefined : textY,
					}}
				></motion.div>

				{/* h1 + CTAs — behind the image container (z-0) */}
				<motion.div
					className="absolute inset-0 z-0 flex flex-col items-start justify-center gap-6 px-5 md:px-10 text-left pointer-events-none"
					style={{
						opacity: reduce ? undefined : textOpacity,
						y: reduce ? undefined : textY,
					}}
				>
					<h1 className="max-w-[30ch] text-balance font-[family-name:var(--font-kenoky)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] tracking-[-0.01em]">
						{hero.headline[locale]}
					</h1>
					<div className="flex flex-wrap items-center justify-start gap-6 pointer-events-auto">
						<Button asChild className="h-12 px-6 text-base">
							<Link href={hero.primaryCta.href}>
								{hero.primaryCta.label[locale]}
							</Link>
						</Button>
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
						transformOrigin: '0% 100%',
						zIndex: 51,
					}}
				>
					<h2
						aria-label={hero.name}
						className="relative whitespace-nowrap text-left font-display uppercase leading-[0.72] font-medium "
						style={{ fontSize: `${nameFontVw}vw` }}
					>
						{/* First name in Kenoky, surname in Geist. The surname spans
						    carry data-abbrev hooks the dock effect above animates. */}
						<span aria-hidden className="inline-flex items-end">
							<span
								className="font-[family-name:var(--font-kenoky)] tracking-[0.025em] mr-16"
								style={{
									// Kenoky caps are ~3% shorter than Geist's at the same
									// size; nudge up so both words match top-to-bottom.
									fontSize: '1.034em',
									textBoxTrim: 'trim-both',
									textBoxEdge: 'cap alphabetic',
								}}
							>
								{first}
							</span>
							<span
								ref={scope}
								className="inline-flex items-end tracking-[-0.03em] font-[family-name:var(--font-geist)]"
								style={{
									textBoxTrim: 'trim-both',
									textBoxEdge: 'cap alphabetic',
								}}
							>
								<span data-abbrev="v">{surname.charAt(0)}</span>
								{surnameTrail.map((char, i) => (
									<span
										key={`${char}-${i}`}
										data-abbrev="trail"
										className="inline-block min-w-0 overflow-x-clip overflow-y-visible"
										style={{ maxWidth: '0.85em' }}
									>
										{char}
									</span>
								))}
								<span
									data-abbrev="dot"
									className="inline-block min-w-0 overflow-x-clip overflow-y-visible"
									style={{ maxWidth: 0, opacity: 0 }}
								>
									.
								</span>
							</span>
						</span>

						{/* One-time load reveal — the wordmark builds up in vertical
						    slices that retract upward (each revealed bottom→top),
						    staggered left→right. Cream bars over the cream canvas,
						    à la workoholics.es. Plays once on mount. */}
						<span
							aria-hidden
							className="pointer-events-none absolute inset-x-0 -inset-y-2 flex"
						>
							{Array.from({ length: REVEAL_BARS }).map((_, i) => (
								<motion.span
									key={i}
									className="flex-1 bg-background"
									style={{ transformOrigin: 'top' }}
									initial={{ scaleY: 1 }}
									animate={{ scaleY: 0 }}
									transition={{
										delay: 0.1 + i * 0.013,
										duration: 0.5,
										ease: [0.22, 1, 0.36, 1],
									}}
								/>
							))}
						</span>
					</h2>
				</motion.div>
			)}
		</div>
	);
}
