import type { Media } from "@/payload-types";

// ---------------------------------------------------------------------------
// Ayudantes para campos de imagen/video de Payload (relación a `media`).
// Con depth ≥ 1 la relación llega poblada (objeto Media); con depth 0, un id.
// ---------------------------------------------------------------------------

export type MediaRef = Media | number | null | undefined;

export function mediaDoc(ref: MediaRef): Media | null {
  if (!ref || typeof ref === "number") return null;
  return ref;
}

export function mediaUrl(ref: MediaRef): string | null {
  return mediaDoc(ref)?.url ?? null;
}

/** Texto alternativo: vacío ("") si la imagen está marcada como decorativa. */
export function mediaAlt(ref: MediaRef): string {
  const doc = mediaDoc(ref);
  if (!doc || doc.decorativa) return "";
  return doc.alt ?? "";
}
