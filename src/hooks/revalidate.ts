import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  RequestContext,
} from "payload";

// ---------------------------------------------------------------------------
// Revalidación bajo demanda: al publicar en el panel se purga la etiqueta de
// caché correspondiente y Next regenera las páginas afectadas.
// `context.disableRevalidate` lo usa el seed para no revalidar en masa.
// ---------------------------------------------------------------------------

type DocStatus = { _status?: string | null };

function disabled(context: RequestContext): boolean {
  return Boolean((context as { disableRevalidate?: boolean }).disableRevalidate);
}

function touchesPublished(doc: DocStatus, previousDoc?: DocStatus): boolean {
  // Colecciones sin borradores no tienen _status: revalidar siempre.
  if (doc._status == null) return true;
  // Con borradores: solo si el estado publicado cambió (publicar/despublicar).
  return doc._status === "published" || previousDoc?._status === "published";
}

export function collectionRevalidation(tag: string): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} {
  return {
    afterChange: [
      ({ doc, previousDoc, req }) => {
        if (!disabled(req.context) && touchesPublished(doc, previousDoc)) {
          revalidateTag(tag, "max");
        }
        return doc;
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (!disabled(req.context)) {
          revalidateTag(tag, "max");
        }
        return doc;
      },
    ],
  };
}

export function globalRevalidation(tag: string): {
  afterChange: GlobalAfterChangeHook[];
} {
  return {
    afterChange: [
      ({ doc, previousDoc, req }) => {
        if (!disabled(req.context) && touchesPublished(doc, previousDoc)) {
          revalidateTag(tag, "max");
        }
        return doc;
      },
    ],
  };
}
