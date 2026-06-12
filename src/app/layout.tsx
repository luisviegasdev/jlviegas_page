import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
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
  // Disabled so missing glyphs fall through to Big Shoulders below
  // instead of the synthetic Arial-metric face.
  adjustFontFallback: false,
});

// Glyph-gap fallback only: the provided Manuka subset lacks latin-ext
// (Ç, Õ, É… needed for PT headings). Big Shoulders fills those in a
// matching condensed-black voice. TODO: drop when full-coverage
// Manuka files are provided.
const displayFallback = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  variable: "--font-display-fallback",
  display: "swap",
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
      className={`${display.variable} ${displayFallback.variable} ${body.variable} ${mono.variable} h-full antialiased`}
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
