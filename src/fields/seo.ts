import type { Tab } from "payload";

// ---------------------------------------------------------------------------
// Pestaña SEO — reutilizada por todas las páginas y experiencias.
// Límites: guía editorial (advertencia visual vía descripción), no bloqueo.
// ---------------------------------------------------------------------------

export function seoTab(): Tab {
  return {
    label: "SEO",
    description:
      "Cómo aparece esta página en Google y al compartir el enlace. Si dejas los campos vacíos, se usan los textos generales del sitio.",
    fields: [
      {
        name: "seo",
        label: false,
        type: "group",
        fields: [
          {
            name: "metaTitulo",
            label: "Título para buscadores",
            type: "text",
            maxLength: 70,
            admin: {
              description:
                "Ideal: hasta 60 caracteres. Google corta los títulos más largos.",
            },
          },
          {
            name: "metaDescripcion",
            label: "Descripción para buscadores",
            type: "textarea",
            maxLength: 170,
            admin: {
              description:
                "Resumen de 1–2 oraciones. Ideal: hasta 155 caracteres; Google corta el resto.",
            },
          },
          {
            name: "ogImagen",
            label: "Imagen al compartir",
            type: "upload",
            relationTo: "media",
            admin: {
              description:
                "Imagen que aparece al compartir el enlace en redes o WhatsApp (horizontal, 1200×630). Opcional: sin ella se usa la imagen general del sitio.",
            },
          },
        ],
      },
    ],
  };
}
