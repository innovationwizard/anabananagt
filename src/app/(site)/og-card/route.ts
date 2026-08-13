import OgImage from "../opengraph-image";

// ---------------------------------------------------------------------------
// /og-card — la tarjeta OG de marca en URL estable. La convención
// opengraph-image.tsx sirve bajo una URL con hash de build; el panel
// (payload.config → admin.meta.openGraph) necesita una dirección fija.
// ---------------------------------------------------------------------------

export const dynamic = "force-static";

export async function GET() {
  return OgImage();
}
