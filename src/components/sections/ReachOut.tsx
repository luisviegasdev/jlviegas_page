'use client';

import { Reveal } from '@/components/motion';
import { footer } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

export function ReachOut() {
	const { locale } = useLocale();
	const ro = footer.reachOut;

	return (
		<section className="relative px-5 py-24 md:px-10 md:py-36 min-h-full">
			{/* Corner dots — same decorative device as joegarnerdesign.com */}
			<span className="absolute left-5 top-8 h-1.5 w-1.5 rounded-full bg-foreground/25 md:left-10" />
			<span className="absolute right-5 top-8 h-1.5 w-1.5 rounded-full bg-foreground/25 md:right-10" />

			<Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
				<p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
					{ro.overline[locale]}
				</p>
				<div className="mx-auto mt-6 h-px w-16 bg-border" />
				<blockquote className="mt-10 font-body text-[clamp(1.375rem,2.4vw,1.125rem)] leading-[1.22] tracking-[-0.015em]">
					{ro.quote[locale]}
				</blockquote>
			</Reveal>

			<span className="absolute bottom-8 left-5 h-1.5 w-1.5 rounded-full bg-foreground/25 md:left-10" />
			<span className="absolute bottom-8 right-5 h-1.5 w-1.5 rounded-full bg-foreground/25 md:right-10" />
		</section>
	);
}
