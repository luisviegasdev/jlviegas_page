import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SmoothScroll } from '@/components/SmoothScroll';
import { LocaleProvider } from '@/lib/locale-context';

const ppneue = localFont({
	src: [
		{ path: '../../public/fonts/ppneuemontreal-book.woff2', weight: '400' },
		{ path: '../../public/fonts/ppneuemontreal-medium.woff2', weight: '500' },
		{ path: '../../public/fonts/ppneuemontreal-bold.woff2', weight: '700' },
	],
	variable: '--font-ppneuemontreal',
	display: 'swap',
});

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://lumosolucoes.com'),
	title: 'Luis Viegas',
	description:
		'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
	openGraph: {
		title: 'Luis Viegas',
		description:
			'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
		url: 'https://lumosolucoes.com',
		siteName: 'Lumo',
		images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design',
		description:
			'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
		images: ['/images/og-image.jpg'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-BR"
			className={`${ppneue.variable} ${geist.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<LocaleProvider>
					<SmoothScroll>
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</SmoothScroll>
				</LocaleProvider>
			</body>
		</html>
	);
}
