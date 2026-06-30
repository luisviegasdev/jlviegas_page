'use client';

import Link from 'next/link';

import { Reveal } from '@/components/motion';
import { about } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

export function AboutSection() {
	const { locale } = useLocale();
	const { intro } = about;

	return (
		<section className="px-5 pt-24 pb-0 md:px-10 md:pt-32">
			<Reveal className="flex flex-col items-center text-center">
				<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
					{intro.eyebrow[locale]}
				</p>
				<h2 className="mt-8 max-w-[20ch] font-display text-[clamp(2.8rem,7.5vw,7.5rem)] font-bold leading-[0.93] tracking-[-0.03em]">
					{intro.headline[locale]}
				</h2>
				<p className="mt-8 max-w-[48ch] text-body-lg text-muted-foreground">
					{intro.body[locale]}
				</p>
			</Reveal>

			<Reveal delay={0.12}>
				<Link
					href={intro.cta.href}
					className="mt-14 flex w-full items-center justify-center border-t border-b border-dashed border-foreground/30 py-5 font-display text-sm font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
				>
					{intro.cta.label[locale]}
				</Link>
			</Reveal>
		</section>
	);
}
