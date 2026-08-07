// ---------------------------------------------------------------------------
// Vista previa — mapa documento→ruta y constructor de URL de vista previa.
// Compartido por payload.config (botón «Vista previa» y Live Preview del
// panel) y por la ruta /next/preview.
// ---------------------------------------------------------------------------

type PreviewArgs = {
  collection?: string;
  global?: string;
  slug?: string | null;
};

/** Ruta pública del sitio donde se ve un documento dado. */
export function pathForDocument({ collection, global, slug }: PreviewArgs): string {
  if (collection === "experiences" && slug) return `/portafolio/${slug}`;
  if (collection === "services" && slug) return `/servicios/${slug}`;
  switch (global) {
    case "homePage":
      return "/";
    case "aboutPage":
      return "/nosotros";
    case "contactPage":
      return "/contacto";
    case "portfolioPage":
      return "/portafolio";
    case "siteSettings":
      return "/";
  }
  // Testimonios y logos aparecen en el inicio.
  return "/";
}

/** URL absoluta que habilita el modo borrador y redirige a la ruta. */
export function previewUrl(args: PreviewArgs): string {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) {
    throw new Error("Falta la variable de entorno requerida: PREVIEW_SECRET");
  }
  const params = new URLSearchParams({
    secret,
    path: pathForDocument(args),
  });
  return `${base}/next/preview?${params.toString()}`;
}
