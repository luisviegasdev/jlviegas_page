'use client';

import { Menu } from 'lucide-react';
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

function LocaleSwitch({ className }: { className?: string }) {
	const { locale, setLocale } = useLocale();
	const options: Locale[] = ['en', 'pt'];
	return (
		<div
			role="group"
			aria-label="Language / Idioma"
			className={cn('flex items-center gap-1 font-display text-xs', className)}
		>
			{options.map((option, i) => (
				<span key={option} className="flex items-center gap-1">
					{i > 0 && (
						<span aria-hidden className="text-border">
							/
						</span>
					)}
					<button
						type="button"
						onClick={() => setLocale(option)}
						aria-pressed={locale === option}
						className={cn(
							'px-1 py-1 cursor-pointer uppercase tracking-[0.15em] transition-colors',
							'hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 active:text-accent',
							locale === option ? 'text-foreground' : 'text-muted-foreground',
						)}
					>
						{option}
					</button>
				</span>
			))}
		</div>
	);
}

export function Navbar() {
	const { locale } = useLocale();
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	// On the homepage the Hero renders a position:fixed name that travels
	// to this logo slot — no static logo needed here.
	const showLogo = pathname !== '/';

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

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

				{/* Section links — centered in the bar */}
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

				<div className="hidden items-center gap-6 md:flex">
					<Button asChild className="px-4 font-display uppercase">
						<Link href={nav.cta.href}>{nav.cta.label[locale]}</Link>
					</Button>
					<LocaleSwitch />
				</div>

				<div className="flex items-center gap-2 md:hidden">
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
								<Button asChild className="w-full">
									<Link href={nav.cta.href} onClick={() => setOpen(false)}>
										{nav.cta.label[locale]}
									</Link>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
