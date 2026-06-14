'use client';

import Link from 'next/link';

import { LoadReveal } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { WaveLink } from '@/components/WaveLink';
import { hero } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Hero structure (refs: tusaro.studio, joegarnerdesign.com):
  - TOP    — centered portrait
  - MIDDLE — serif call-to-action phrase + minimal CTAs (fills the gap)
  - BOTTOM — name as a giant Manuka wordmark, full-bleed edge to edge.
  Section pad is horizontal-only on the inner blocks so the name can
  bleed to the viewport edges; overflow-hidden clips the overscan.
  Navbar is sticky h-16 (4rem) — hero fills the rest of the first screen.
*/

export function Hero() {
	const { locale } = useLocale();

	return (
		<section className="flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
			{/* TOP — portrait */}
			<LoadReveal className="flex flex-col items-center px-5 pt-6 md:px-10 md:pt-8">
				<figure className="w-full max-w-[220px] md:max-w-[420px]">
					{/* TODO: swap for next/image + /images/hero.jpg when the photo lands */}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/images/hero-image.png"
						alt={`${hero.name} — portrait`}
						className="aspect-[16/9] w-full rounded-md border border-border object-cover"
					/>
					<figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
						{hero.caption[locale]}
					</figcaption>
				</figure>
			</LoadReveal>

			{/* MIDDLE — call-to-action phrase */}
			<LoadReveal
				delay={0.12}
				className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-6 text-center md:px-10 md:py-8"
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
			</LoadReveal>

			{/* BOTTOM — full-bleed name. Manuka is ultra-condensed, so a fixed
          horizontal scale widens it to span the viewport edge-to-edge; the
          fill ratio is viewport-independent, so one value holds at all sizes.
          overflow-hidden crops the slight overscan into a clean bleed. */}
			<LoadReveal delay={0.24} className="w-full overflow-hidden">
				<h2 className="origin-bottom  select-none whitespace-nowrap text-center font-display text-[22vw] font-bold uppercase leading-[0.72] tracking-[-0.01em]">
					{hero.name}
				</h2>
			</LoadReveal>
		</section>
	);
}
