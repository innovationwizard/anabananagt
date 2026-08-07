import type { Field, FieldHook } from "payload";

// ---------------------------------------------------------------------------
// Campo slug — dirección web del documento, generada desde otro campo si el
// editor la deja vacía. Normaliza español: tildes fuera, ñ→n, espacios→guiones.
// ---------------------------------------------------------------------------

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatSlugHook(sourceField: string): FieldHook {
  return ({ value, data }) => {
    if (typeof value === "string" && value.length > 0) return slugify(value);
    const source = data?.[sourceField];
    if (typeof source === "string" && source.length > 0) return slugify(source);
    return value;
  };
}

export function slugField(sourceField = "title"): Field {
  return {
    name: "slug",
    label: "Dirección web",
    type: "text",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description:
        "Parte final de la URL (ej. «taller-marca-personal»). Se genera sola desde el título si la dejas vacía. Evita cambiarla después de publicar: los enlaces compartidos dejarían de funcionar.",
    },
    hooks: {
      beforeValidate: [formatSlugHook(sourceField)],
    },
  };
}
