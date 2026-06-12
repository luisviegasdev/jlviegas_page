'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/*
  Reference-matched link hover (joegarnerdesign.com): label is split into
  per-char inline-blocks; on hover each char rotateX-flips 0 → 90 / -90 → 0
  (reads as a vertical shrink/grow "blink"), staggered left-to-right.
  One-shot per hover-in — the wave completes even if the pointer leaves.
*/

const CHAR_STAGGER_MS = 35;
const BLINK_MS = 450;

type WaveLinkProps = {
	label: string;
	href: string;
	className?: string;
	onClick?: () => void;
};

export function WaveLink({ label, href, className, onClick }: WaveLinkProps) {
	const [waving, setWaving] = useState(false);
	const timer = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timer.current !== null) window.clearTimeout(timer.current);
		};
	}, []);

	const startWave = useCallback(() => {
		if (timer.current !== null) return;
		setWaving(true);
		timer.current = window.setTimeout(
			() => {
				setWaving(false);
				timer.current = null;
			},
			BLINK_MS + label.length * CHAR_STAGGER_MS + 60,
		);
	}, [label.length]);

	const chars = (
		<span aria-hidden className="inline-block">
			{[...label].map((char, i) => (
				<span
					key={`${char}-${i}`}
					className={cn(
						'inline-block whitespace-pre',
						waving && 'char-blink',
					)}
					style={{ animationDelay: `${i * CHAR_STAGGER_MS}ms` }}
				>
					{char}
				</span>
			))}
		</span>
	);

	const shared = {
		'aria-label': label,
		onMouseEnter: startWave,
		onFocus: startWave,
		onClick,
		className,
	};

	if (/^https?:/.test(href)) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
				{chars}
			</a>
		);
	}
	if (href.startsWith('mailto:')) {
		return (
			<a href={href} {...shared}>
				{chars}
			</a>
		);
	}
	return (
		<Link href={href} {...shared}>
			{chars}
		</Link>
	);
}
