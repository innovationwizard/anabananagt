import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// GET /next/preview?secret=…&path=… — habilita el modo borrador y redirige.
// El secreto viene del botón «Vista previa» del panel (payload.config).
// Solo se redirige a rutas internas (el path se valida), nunca a URLs abiertas.
// ---------------------------------------------------------------------------

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") ?? "/";

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Secreto de vista previa inválido.", { status: 401 });
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Ruta inválida.", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}
