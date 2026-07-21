import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// ---------------------------------------------------------------------------
// Fonts (brand manual Ch.05 · Tipografía)
// Playfair Display = titulares/citas. Montserrat = free substitute for Gotham
// ("Ghotam"). Self-hosted at build time via next/font — no runtime requests to
// Google. Exposed as CSS variables consumed by @theme in globals.css.
// ---------------------------------------------------------------------------
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anabanana.gt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "ana banana Experiences — Transformar desde lo humano",
    template: "%s | ana banana Experiences",
  },
  description:
    "Diseñamos experiencias corporativas personalizadas que desarrollan personas, impulsan el bienestar y fortalecen la cultura de cada organización.",
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: siteUrl,
    siteName: "ana banana Experiences",
    title: "ana banana Experiences — Transformar desde lo humano",
    description:
      "Experiencias corporativas que desarrollan personas, impulsan el bienestar y fortalecen la cultura. Las empresas crecen cuando las personas crecen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-GT" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
