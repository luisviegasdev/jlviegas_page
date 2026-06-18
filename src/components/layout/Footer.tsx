'use client';

import Link from 'next/link';

import { Reveal } from '@/components/motion';
import { WaveLink } from '@/components/WaveLink';
import { footer } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

const barLinkClass =
	'font-display text-lg uppercase tracking-[0.18em] text-primary-foreground/55 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent';

export function Footer() {
	const { locale } = useLocale();
	const ro = footer.reachOut;

	return (
		<footer className="bg-primary text-primary-foreground">
			{/* — Heading + giant CTA ————————————————————————————— */}
			<div className="flex flex-col items-center overflow-hidden pt-20 md:pt-28">
				<Reveal>
					<p className="font-body text-[clamp(1.375rem,2vw,2rem)] font-bold text-primary-foreground/60">
						{ro.heading[locale]}
					</p>
				</Reveal>

				{/*
					"Reach Out" in full-bleed Manuka — same scale-x technique as hero name.
					scale-x[1.9] widens the ultra-condensed face to span the viewport.
					The outer overflow-hidden clips the slight overscan into a clean bleed.
					The whole block is a link to /contact.
				*/}
				<Reveal delay={0.08} className="w-full overflow-hidden">
					<Link href="/contact" aria-label={ro.cta[locale]} className="block">
						<p className="origin-bottom  select-none whitespace-nowrap text-center font-display text-[15vw] font-bold uppercase leading-[0.78] tracking-[-0.01em] transition-colors hover:text-accent">
							{ro.cta[locale]}
						</p>
					</Link>
				</Reveal>
			</div>

			{/* — Bottom link bar ———————————————————————————————— */}
			<div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-primary-foreground/10 px-5 py-5 md:px-10">
				<span className={barLinkClass}>( P )</span>
				{footer.directory.links.map((link) => (
					<WaveLink
						key={link.href}
						href={link.href}
						label={link.label[locale]}
						className={barLinkClass}
					/>
				))}

				<span className={`${barLinkClass} select-none px-1`}>|</span>

				<span className={barLinkClass}>( S )</span>
				{footer.protocol.links.map((link) => (
					<WaveLink
						key={link.label.en}
						href={link.href}
						label={link.label[locale]}
						className={barLinkClass}
					/>
				))}
			</div>
		</footer>
	);
}
