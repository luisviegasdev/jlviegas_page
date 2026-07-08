'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/motion';
import { services } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';

/*
  Services list — cloned from workoholics.es "Servicios".

  Each service is one giant uppercase line, split at the string midpoint.
  On hover the two halves part and an image expands inline between the
  letters (width 0 → 1.5em, em-based so it scales with the type). The
  service description unfolds right below, only while hovered. Siblings
  dim so the active row carries the section.
*/

// TODO: swap placeholders for per-service imagery in public/images/services/
const SERVICE_IMAGES = [
	'/images/hero-image.png',
	'/images/hero-image.png',
	'/images/hero-image.png',
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesSection() {
	const { locale } = useLocale();
	const reduce = useReducedMotion();
	const [active, setActive] = useState<number | null>(null);

	// Scrolling moves rows under a stationary cursor, which fires mouseenter
	// and expands descriptions mid-scroll — the page height changes while
	// Lenis is animating and the scroll stutters. Suppress enters fired
	// within 150ms of a scroll tick; deliberate hovers (mouse moved after
	// the scroll settles) pass through. Leaves always process so nothing
	// sticks open.
	const lastScrollRef = useRef(0);
	useEffect(() => {
		const onScroll = () => {
			lastScrollRef.current = performance.now();
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	const hoverEnter = (i: number) => {
		if (performance.now() - lastScrollRef.current < 150) return;
		setActive(i);
	};

	return (
		<section
			id="services"
			className="overflow-x-clip px-5 py-24 md:px-10 md:py-32"
		>
			<Reveal>
				<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
					[ {services.heading[locale]} ]
				</p>
			</Reveal>

			<ul className="mt-14 md:mt-20">
				{services.items.map((service, i) => {
					const title = service.title[locale];
					const mid = Math.ceil(title.length / 2);
					const left = title.slice(0, mid);
					const right = title.slice(mid);
					const isActive = active === i;

					return (
						<li
							key={service.title.en}
							tabIndex={0}
							onMouseEnter={() => hoverEnter(i)}
							onMouseLeave={() => setActive(null)}
							onFocus={() => setActive(i)}
							onBlur={() => setActive(null)}
							className="group cursor-default py-6 outline-none transition-opacity duration-300 md:py-8"
							style={{
								opacity: active !== null && !isActive ? 0.35 : 1,
							}}
						>
							<h3 className="flex items-center justify-center whitespace-nowrap font-display text-[clamp(1.35rem,4.4vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
								<span
									aria-hidden
									className="mr-2 self-start font-mono text-[0.65rem] font-normal tracking-normal text-muted-foreground md:mr-3 md:text-xs"
								>
									[0{i + 1}]
								</span>
								<span className="whitespace-pre">{left}</span>
								<motion.span
									aria-hidden
									className="inline-block overflow-hidden rounded-md"
									initial={false}
									animate={{
										width: isActive ? '1.5em' : '0em',
										marginLeft: isActive ? '0.12em' : '0em',
										marginRight: isActive ? '0.12em' : '0em',
									}}
									transition={
										reduce
											? { duration: 0 }
											: { duration: 0.55, ease: EASE }
									}
									style={{ height: '0.78em' }}
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={SERVICE_IMAGES[i]}
										alt=""
										className="h-full w-full object-cover"
										style={{ minWidth: '1.5em' }}
									/>
								</motion.span>
								<span className="whitespace-pre">{right}</span>
							</h3>

							{/* Description — unfolds beneath the title only while hovered */}
							<motion.div
								className="overflow-hidden"
								initial={false}
								animate={{
									height: isActive ? 'auto' : 0,
									opacity: isActive ? 1 : 0,
								}}
								transition={
									reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }
								}
							>
								<p className="mx-auto max-w-[52ch] pt-5 text-center text-body-lg text-muted-foreground">
									{service.text[locale]}
								</p>
							</motion.div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
