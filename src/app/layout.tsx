import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// ---------------------------------------------------------------------------
// Fonts — Google Fonts loaded via next/font
// NOTE: In sandboxed/CI environments without Google Fonts access, the build
// uses CSS fallbacks defined in globals.css. On Vercel, uncomment the imports
// below and add the variables to the <html> className.
// ---------------------------------------------------------------------------
// import { Playfair_Display, Source_Sans_3 } from "next/font/google";
//
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-display",
//   display: "swap",
//   weight: ["400", "600", "700"],
// });
//
// const sourceSans = Source_Sans_3({
//   subsets: ["latin"],
//   variable: "--font-body",
//   display: "swap",
//   weight: ["400", "600", "700"],
// });
//
// Then add to <html>: className={`${playfair.variable} ${sourceSans.variable}`}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anabanana.gt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "anabanana — Keynotes, Facilitación y Entrenamiento Ejecutivo",
    template: "%s | anabanana",
  },
  description:
    "Ana Gabriela — Conferencista corporativa, facilitadora ejecutiva y estratega de marca. Keynotes, talleres y consultoría para las empresas más exigentes de la región.",
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: siteUrl,
    siteName: "anabanana",
    title: "anabanana — Keynotes, Facilitación y Entrenamiento Ejecutivo",
    description:
      "Keynotes, talleres corporativos y consultoría estratégica para empresas que exigen resultados.",
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
    <html lang="es-GT">
      <head>
        {/* Google Fonts — preconnect + stylesheet for production */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
