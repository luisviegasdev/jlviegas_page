'use client';

import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Globe, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { WaveLink } from '@/components/WaveLink';
import { hero, nav } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

// Globe + code + chevron dropdown, à la hildenkaira.fi's locale picker.
function LocaleSwitch({ className }: { className?: string }) {
	const { locale, setLocale } = useLocale();
	const [open, setOpen] = useState(false);
	const options: { value: Locale; label: string }[] = [
		{ value: 'en', label: 'English' },
		{ value: 'pt', label: 'Português' },
	];
	return (
		<div
			className={cn('relative', className)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label="Language / Idioma"
				onClick={() => setOpen((v) => !v)}
				className="flex cursor-pointer items-center gap-1.5 px-1 py-1 font-display text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
			>
				<Globe size={14} strokeWidth={1.5} />
				{locale}
				<ChevronDown
					size={12}
					strokeWidth={1.5}
					className={cn(
						'transition-transform duration-200',
						open && 'rotate-180',
					)}
				/>
			</button>
			{open && (
				<ul
					role="listbox"
					className="absolute right-0 top-full z-50 mt-1 min-w-[9rem] border border-border bg-background py-1"
				>
					{options.map((option) => (
						<li key={option.value}>
							<button
								type="button"
								role="option"
								aria-selected={locale === option.value}
								onClick={() => {
									setLocale(option.value);
									setOpen(false);
								}}
								className={cn(
									'flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 font-display text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent',
									locale === option.value
										? 'text-foreground'
										: 'text-muted-foreground',
								)}
							>
								{option.label}
								<span className="text-[10px]">{option.value}</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

// Label + arrow-in-a-box CTA, à la hildenkaira.fi's "Get in touch".
function NavCta({
	className,
	onClick,
}: {
	className?: string;
	onClick?: () => void;
}) {
	const { locale } = useLocale();
	return (
		<Link
			href={nav.cta.href}
			onClick={onClick}
			className={cn(
				'group flex items-stretch overflow-hidden bg-foreground font-display text-xs uppercase tracking-[0.1em] text-background',
				'focus-visible:outline-2 focus-visible:outline-offset-2',
				className,
			)}
		>
			<span className="flex flex-1 items-center px-4 py-2.5">
				{nav.cta.label[locale]}
			</span>
			<span className="flex w-9 items-center justify-center border border-foreground bg-background text-foreground">
				<ArrowRight
					size={14}
					strokeWidth={1.5}
					className="transition-transform duration-300 group-hover:translate-x-0.5"
				/>
			</span>
		</Link>
	);
}

export function Navbar() {
	const { locale } = useLocale();
	const pathname = usePathname();
	const reduce = useReducedMotion();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	// On the homepage the Hero renders a position:fixed name that travels to
	// this logo slot, plus the traveling nav-links row that docks into the
	// bar's center — so neither a static logo nor center links render here.
	const isHome = pathname === '/';
	const showLogo = !isHome;

	useEffect(() => {
		// On home the border/bg wait until the hero wordmark has docked —
		// earlier, the hairline would slice through the giant title.
		const threshold = isHome ? 480 : 8;
		const onScroll = () => setScrolled(window.scrollY > threshold);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [isHome]);

	// Home: the CTA/locale chrome fades in while the hero wordmark docks
	// (at rest the full-width title occupies the bar's space).
	const { scrollY } = useScroll();
	const chromeOpacity = useTransform(scrollY, [260, 520], [0, 1]);
	const chromePE = useTransform(chromeOpacity, (o) =>
		o > 0.6 ? ('auto' as const) : ('none' as const),
	);
	const chromeStyle =
		isHome && !reduce
			? { opacity: chromeOpacity, pointerEvents: chromePE }
			: undefined;

	return (
		<header
			className={cn(
				'sticky top-0 z-50 border-b transition-colors duration-300',
				scrolled
					? 'border-border bg-background/90 backdrop-blur-sm'
					: 'border-transparent bg-transparent',
			)}
		>
			<nav className="relative flex h-16 items-center justify-between px-5 md:px-10">
				{/* Logo — hidden on homepage (the Hero's fixed name element is the logo there) */}
				{showLogo ? (
					<WaveLink
						href="/"
						label={hero.name}
						className="font-display text-xl font-bold uppercase leading-none tracking-[-0.02em] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
					/>
				) : (
					<div aria-hidden className="w-0" />
				)}

				{/* Section links — centered in the bar. On home the Hero renders
				    them instead (they travel from below the wordmark into here). */}
				{!isHome && (
					<ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
						{nav.items.map((item) => (
							<li key={item.href}>
								<WaveLink
									href={item.href}
									label={item.label[locale]}
									className="font-display text-s uppercase  text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
								/>
							</li>
						))}
					</ul>
				)}

				<motion.div
					style={chromeStyle}
					className="hidden items-center gap-5 md:flex"
				>
					<LocaleSwitch />
					<NavCta />
				</motion.div>

				<motion.div
					style={chromeStyle}
					className="flex items-center gap-2 md:hidden"
				>
					<LocaleSwitch />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="Open menu">
								<Menu />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="bg-background">
							<SheetHeader>
								<SheetTitle className="font-display text-2xl font-bold uppercase tracking-tight">
									{hero.name}
								</SheetTitle>
							</SheetHeader>
							<ul className="flex flex-col gap-1 px-4">
								{nav.items.map((item) => (
									<li key={item.href} className="border-b border-border">
										<WaveLink
											href={item.href}
											label={item.label[locale]}
											onClick={() => setOpen(false)}
											className="block py-4 font-display text-h3 uppercase transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent"
										/>
									</li>
								))}
							</ul>
							<div className="mt-auto px-4 pb-6">
								<NavCta className="w-full" onClick={() => setOpen(false)} />
							</div>
						</SheetContent>
					</Sheet>
				</motion.div>
			</nav>
		</header>
	);
}
