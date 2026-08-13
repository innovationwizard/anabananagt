import type { Metadata } from "next";
import { mediaDoc, type MediaRef } from "@/lib/content/media";

// ---------------------------------------------------------------------------
// Metadata de página desde el CMS (pestaña SEO). Centraliza el armado para
// que la «Imagen al compartir» (seo.ogImagen) realmente se emita como
// og:image cuando el editor la define; sin ella, aplica la tarjeta de marca
// generada en (site)/opengraph-image.tsx.
// ---------------------------------------------------------------------------

type SeoGroup =
  | {
      metaTitulo?: string | null;
      metaDescripcion?: string | null;
      ogImagen?: MediaRef;
    }
  | null
  | undefined;

export function pageMetadata({
  titulo,
  descripcion,
  seo,
}: {
  /** Título por defecto si el editor no definió uno en la pestaña SEO. */
  titulo: string;
  /** Descripción por defecto si el editor no definió una. */
  descripcion?: string;
  seo: SeoGroup;
}): Metadata {
  const title = seo?.metaTitulo ?? titulo;
  const description = seo?.metaDescripcion ?? descripcion;

  const og = mediaDoc(seo?.ogImagen);
  // Variante recortada 1200×630 si existe; si no, el original.
  const ogUrl = og?.sizes?.og?.url ?? og?.url;

  return {
    title,
    description,
    ...(ogUrl
      ? {
          openGraph: {
            type: "website",
            locale: "es_GT",
            siteName: "ana banana Experiences",
            title,
            description,
            images: [{ url: ogUrl, width: 1200, height: 630 }],
          },
        }
      : {}),
  };
}
