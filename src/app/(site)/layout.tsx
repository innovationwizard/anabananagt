import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { draftMode } from "next/headers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DraftModeBanner } from "@/components/preview/draft-mode-banner";
import { RefreshRouteOnSave } from "@/components/preview/refresh-route-on-save";
import { getSiteSettings } from "@/lib/content";
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
// Metadata — identidad desde el CMS (Ajustes del sitio)
// ---------------------------------------------------------------------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anabanana.gt";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const titulo = settings.identidad.tituloBase;
  const descripcion = settings.identidad.metaDescripcion;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titulo,
      template: "%s | ana banana Experiences",
    },
    description: descripcion,
    openGraph: {
      type: "website",
      locale: "es_GT",
      url: siteUrl,
      siteName: "ana banana Experiences",
      title: titulo,
      description: descripcion,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, draft] = await Promise.all([getSiteSettings(), draftMode()]);

  return (
    <html lang="es-GT" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar
          links={settings.nav.enlaces.map((l) => ({
            href: l.destino,
            label: l.etiqueta,
          }))}
          ctaLabel={settings.nav.ctaEtiqueta}
        />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        {draft.isEnabled && (
          <>
            <RefreshRouteOnSave />
            <DraftModeBanner />
          </>
        )}
      </body>
    </html>
  );
}
