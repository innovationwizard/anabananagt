import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// /servicios — hub retired. "Servicios" was removed from the nav (client request,
// 2026-07-28); the three pillars now live on the home page and each pillar keeps
// its own detail page at /servicios/[slug]. Redirect the bare hub to home.
// ---------------------------------------------------------------------------

export default function ServiciosPage() {
  redirect("/");
}
