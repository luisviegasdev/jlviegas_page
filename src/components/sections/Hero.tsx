'use client';

import {
	motion,
	stagger,
	useAnimate,
	useMotionValue,
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
import { about, hero, nav } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Hero scroll sequence (hildenkaira.fi-style header):

  At rest the giant wordmark spans the FULL page width at the very top, with
  the nav links in a centered row right below it. On scroll the wordmark
  shrinks/docks into the navbar's left logo slot (VIEGAS → V.) while the
  links row slides up into the navbar's center — both driven by the same
  spring so they land together. Below them, the media container grows from
  its natural size to full-bleed and the About content fades in over it.

  The container grows via width/height (not transform: scale) so the page background
  is literally the padding you see at the edges, matching the joegarner.com technique.
*/

// Vertical slices for the wordmark load reveal (workoholics-style) and for the
// VIEGAS ⇄ V. transition on the surname.
const REVEAL_BARS = 56;
const SURNAME_BARS = 30;

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
		stiffness: 160,
		damping: 24,
		mass: 0.35,
	});

	// Image natural dimensions (the starting size of the growing container)
	const imgW = dims.w >= 768 ? 420 : 220;
	const imgH = imgW * (9 / 16);
	const stickyH = dims.h - 64; // 100svh minus navbar

	// Target: full panel minus 16px horizontal / 8px vertical gaps — page
	// background shows as the gap (growth is symmetric around the center)
	const targetW = dims.w - 32;
	const targetH = stickyH - 16;

	// Container grows via width/height — not CSS scale
	const containerW = useTransform(smooth, [0.04, 0.46], [imgW, targetW]);
	const containerH = useTransform(smooth, [0.04, 0.46], [imgH, targetH]);

	// Image fades out as the container grows, revealing the black layer beneath
	const imageOpacity = useTransform(smooth, [0.08, 0.46], [1, 0]);

	// About content appears once the black layer is fully revealed
	const aboutOpacity = useTransform(scrollYProgress, [0.43, 0.48], [0, 1]);

	// Hero text fades early so it's gone before the container is large
	const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 0.18], [0, -18]);

	// Hero wordmark — the font size is FITTED so "LUIS VIEGAS" spans the full
	// page width (small side gaps). Width scales linearly with font size (the
	// inter-word gap is em-based), so one measured correction converges.
	const [nameFontVw, setNameFontVw] = useState(13);
	const nameFontPx = (nameFontVw / 100) * dims.w;
	const nameH = nameFontPx * 0.72; // matches leading-[0.72]
	const nameScaleTarget = 18 / nameFontPx; // ~18px logo when docked
	// Docked logo anchors from the LEFT (text-left + 0% origin) so the surname
	// can abbreviate without re-centering. The hero wordmark starts centered
	// (full width → ~16px gaps) and docks at 40px ≈ the navbar's md:px-10.
	const nameWrapRef = useRef<HTMLHeadingElement>(null);
	// Measured offsets live in MotionValues so the wordmark re-fits the moment
	// a measurement lands — a plain useTransform range only re-evaluates on
	// the next scroll tick.
	const nameXHeroMv = useMotionValue(40);
	useEffect(() => {
		const el = nameWrapRef.current;
		if (!el) return;
		const measure = () => {
			const w = el.offsetWidth;
			if (!w) return;
			// Leave room for the mobile menu button; desktop goes edge-to-edge.
			const pad = document.documentElement.clientWidth >= 768 ? 32 : 96;
			const target = document.documentElement.clientWidth - pad;
			setNameFontVw((vw) => {
				const next = vw * (target / w);
				return Math.abs(next - vw) > 0.05 ? next : vw;
			});
			nameXHeroMv.set((document.documentElement.clientWidth - w) / 2);
		};
		measure();
		// Re-measure once webfonts land — the swap changes the width.
		document.fonts?.ready.then(measure);
	}, [dims.w, nameFontVw, nameXHeroMv]);
	const nameXTarget = 40;
	// Wordmark rest position: pinned to the very top of the page.
	const nameYHero = 12;
	// Docked: visual center lands mid-navbar (h-16 → 32px). Scale pivots on
	// the h2's top-left, so the scaled height is what offsets the center.
	const nameYTarget = 32 - (nameH * nameScaleTarget) / 2;

	const nameScale = useTransform(smooth, [0, 0.2], [1, nameScaleTarget]);
	const nameY = useTransform(smooth, [0, 0.2], [nameYHero, nameYTarget]);
	// Multi-input so the wordmark recenters immediately when the measured
	// hero offset lands, not just on the next scroll movement.
	const nameX = useTransform(() => {
		const t = Math.min(Math.max(smooth.get() / 0.2, 0), 1);
		const xHero = nameXHeroMv.get();
		return xHero + (nameXTarget - xHero) * t;
	});

	// Nav links row — rests right below the wordmark, docks into the navbar
	// center (hildenkaira.fi behavior). Same spring window as the wordmark so
	// both land together. The rest offset depends on the fitted wordmark
	// height, so it lives in a MotionValue (same staleness rule as nameXHeroMv).
	const linksRestY = nameYHero + nameH + 24;
	const linksYTarget = 22; // ~centers the row in the 64px navbar
	const linksRestMv = useMotionValue(linksRestY);
	useEffect(() => {
		linksRestMv.set(linksRestY);
	}, [linksRestY, linksRestMv]);
	const linksY = useTransform(() => {
		const t = Math.min(Math.max(smooth.get() / 0.2, 0), 1);
		const rest = linksRestMv.get();
		return rest + (linksYTarget - rest) * t;
	});

	// Vertical rhythm: the media container starts below the wordmark + links
	// stack; the headline + CTA sit centered right below it. The image top
	// animates to 8px as it grows to full-bleed. Panel coords = viewport − 64
	// (navbar). Kept in a MotionValue so the image drops into place as soon
	// as the fitted wordmark height lands.
	const heroPaddingTop = Math.round(linksRestY + 56 - 64);
	const heroPadMv = useMotionValue(heroPaddingTop);
	useEffect(() => {
		heroPadMv.set(heroPaddingTop);
	}, [heroPaddingTop, heroPadMv]);
	const imageTop = useTransform(() => {
		const t = Math.min(Math.max((smooth.get() - 0.04) / 0.42, 0), 1);
		const rest = heroPadMv.get();
		return rest + (8 - rest) * t;
	});

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
	// The VIEGAS ⇄ V. change uses the same vertical-slice effect as the load
	// reveal: slices sweep down to COVER the surname, the layout swaps underneath
	// (letters collapse / the dot toggles), then slices retract to REVEAL the new
	// state. Docking does VIEGAS → V.; returning to the start does the inverse.
	const [first, ...rest] = hero.name.split(' ');
	const surname = rest.join(' ');
	const surnameTrail = surname.slice(1).split('');
	const didMountRef = useRef(false);
	useEffect(() => {
		if (reduce || !scope.current) return;
		// Skip the first run: the DOM already renders the full surname, and the
		// load reveal handles the initial appearance.
		if (!didMountRef.current) {
			didMountRef.current = true;
			return;
		}
		const trail = '[data-abbrev="trail"]';
		const dot = '[data-abbrev="dot"]';
		const slice = '[data-slice]';
		let cancelled = false;

		const cover = () =>
			animate(
				slice,
				{ scaleY: 1 },
				{ duration: 0.22, delay: stagger(0.01), ease: [0.65, 0, 0.35, 1] },
			);
		const reveal = () =>
			animate(
				slice,
				{ scaleY: 0 },
				{ duration: 0.38, delay: stagger(0.013), ease: [0.22, 1, 0.36, 1] },
			);

		const run = async (toAbbrev: boolean) => {
			await cover();
			if (cancelled) return;
			// Swap the layout under the cover — instant, hidden behind the slices.
			animate(trail, { maxWidth: toAbbrev ? 0 : '0.85em' }, { duration: 0 });
			animate(dot, { maxWidth: toAbbrev ? '0.5em' : 0 }, { duration: 0 });
			await reveal();
		};

		run(phase === 'abbrev');
		return () => {
			cancelled = true;
		};
	}, [phase, reduce, animate, scope]);

	return (
		<div ref={wrapperRef} className="relative" style={{ minHeight: '438vh' }}>
			{/* Sticky panel — no overflow-hidden so page bg shows around the growing container */}
			<div className="sticky top-16  h-[calc(100svh-4rem)] relative">
				{/* Growing media container — horizontally centered, grows symmetrically */}
				<motion.div
					className="absolute left-1/2 z-10 overflow-hidden pointer-events-none"
					style={{
						x: '-50%',
						top: reduce ? heroPaddingTop : imageTop,
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
							className="absolute inset-0 z-10 pointer-events-none "
							style={{ opacity: aboutOpacity }}
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-5 text-center ">
								<h2 className="max-w-[20ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-primary-foreground">
									{about.philosophy.heading[locale]}
								</h2>
								<Button
									asChild
									className="pointer-events-auto h-12 px-6 text-base"
								>
									<Link href={hero.primaryCta.href}>
										{hero.primaryCta.label[locale]}
									</Link>
								</Button>
							</div>
						</motion.div>
					)}
				</motion.div>

				{/* h1 + CTA — centered below the image (z-0, the growing image covers it) */}
				<motion.div
					className="absolute inset-x-0 z-0 flex flex-col items-center gap-6 px-5 text-center pointer-events-none"
					style={{
						opacity: reduce ? undefined : textOpacity,
						y: reduce ? undefined : textY,
						top: heroPaddingTop + imgH + 40,
					}}
				>
					<h1 className="max-w-[30ch] text-balance font-display text-[clamp(1.75rem,3.8vw,2.35rem)] leading-[1.08] tracking-[-0.01em]">
						{hero.headline[locale]}
					</h1>
					<div className="flex flex-wrap items-center justify-center gap-6 pointer-events-auto ">
						<Button asChild className="h-12 px-6 text-base bg-accent">
							<Link href={hero.primaryCta.href}>
								{hero.primaryCta.label[locale]}
							</Link>
						</Button>
					</div>
				</motion.div>
			</div>

			{/* Fixed nav links — rest below the wordmark, dock into the navbar center */}
			{!reduce && (
				<motion.ul
					className="pointer-events-none fixed top-0 left-0 right-0 z-[52] hidden items-center justify-center gap-6 md:flex"
					style={{ y: linksY }}
				>
					{nav.items.map((item) => (
						<li key={item.href} className="pointer-events-auto">
							<WaveLink
								href={item.href}
								label={item.label[locale]}
								className="font-display text-s uppercase text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
							/>
						</li>
					))}
				</motion.ul>
			)}

			{/* Fixed name — position: fixed, transitions from page top to navbar logo */}
			{!reduce && (
				<motion.div
					className="fixed top-0 left-0 right-0 select-none pointer-events-none"
					style={{
						y: nameY,
						x: nameX,
						scale: nameScale,
						transformOrigin: '0% 0%',
						zIndex: 51,
					}}
				>
					<h2
						ref={nameWrapRef}
						aria-label={hero.name}
						className="relative inline-block whitespace-nowrap text-left font-body uppercase leading-[0.72]"
						style={{ fontSize: `${nameFontVw}vw` }}
					>
						{/* Surname spans carry data-abbrev hooks the dock effect animates. */}
						<span aria-hidden className="inline-flex items-end">
							<span
								className="font-display"
								style={{
									marginRight: '0.35em',
									textBoxTrim: 'trim-both',
									textBoxEdge: 'cap alphabetic',
								}}
							>
								{first}
							</span>
							<span
								ref={scope}
								className="relative inline-flex items-end font-display"
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
									style={{ maxWidth: 0 }}
								>
									.
								</span>
								{/* VIEGAS ⇄ V. transition — the same vertical-slice effect as the
								    load reveal, scoped to the surname. Idle (scaleY 0) until a
								    dock/undock sweeps it. */}
								<span
									aria-hidden
									className="pointer-events-none absolute inset-x-0 -inset-y-[0.08em] flex"
								>
									{Array.from({ length: SURNAME_BARS }).map((_, i) => (
										<motion.span
											key={i}
											data-slice="true"
											className="flex-1 bg-background"
											style={{ transformOrigin: 'top' }}
											initial={{ scaleY: 0 }}
										/>
									))}
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
