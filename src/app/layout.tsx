import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocaleProvider } from "@/lib/locale-context";

/*
  Self-hosted fonts per SPECS §2 (public/fonts/):
  - Display: Manuka — headings 600/700 resolve to Condensed Black;
    Medium registered at 500 for optional lighter display use.
  - Body: Feature Display — Regular 400, Bold 700 (500 falls back to 400
    via CSS font matching, no synthetic bolding).
  - Mono role: FeatureDisplay-Regular per spec (optional, tags/labels).
*/
const display = localFont({
  src: [
    { path: "../../public/fonts/Manuka-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Manuka-Condensed-Black.woff2", weight: "600 800" },
  ],
  variable: "--font-manuka",
  display: "swap",
  // The Manuka subset lacks latin-ext (Ç, Õ, É… used in PT headings);
  // disabling the synthetic fallback lets those few glyphs fall through
  // to Feature (chained in globals.css --font-display) instead of Arial.
  adjustFontFallback: false,
});

const body = localFont({
  src: [
    { path: "../../public/fonts/FeatureDisplay-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/FeatureDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-feature",
  display: "swap",
});

const mono = localFont({
  src: [{ path: "../../public/fonts/FeatureDisplay-Regular.woff2", weight: "400" }],
  variable: "--font-feature-mono",
  display: "swap",
});

// Hero name test — Geist (Google, self-hosted) + Kenoky (local). See Hero.tsx.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const kenoky = localFont({
  src: [{ path: "../../public/fonts/kenoky-light.woff2", weight: "300" }],
  variable: "--font-kenoky",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumosolucoes.com"),
  title: "Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design",
  description:
    "Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.",
  openGraph: {
    title: "Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design",
    description:
      "Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.",
    url: "https://lumosolucoes.com",
    siteName: "Lumo",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design",
    description:
      "Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${geist.variable} ${kenoky.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
