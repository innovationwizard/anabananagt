import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrEditor } from "@/access";
import { collectionRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";
import { seoTab } from "@/fields/seo";
import { ICONO_OPTIONS, PILAR_OPTIONS } from "@/fields/options";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Pilar de servicio",
    plural: "Pilares de servicio",
  },
  defaultSort: "orden",
  admin: {
    group: "Contenido",
    preview: (data) =>
      previewUrl({
        collection: "services",
        slug: typeof data?.slug === "string" ? data.slug : null,
      }),
    useAsTitle: "title",
    defaultColumns: ["title", "tagline", "_status", "updatedAt"],
    description:
      "Los tres pilares de la marca. Cada uno tiene su página en /servicios y su tarjeta en el inicio. Son fijos: se editan, no se agregan ni eliminan.",
  },
  access: {
    read: publishedOrEditor,
    create: isAdmin,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
    maxPerDoc: 50,
  },
  hooks: collectionRevalidation("services"),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenido",
          fields: [
            {
              name: "title",
              label: "Nombre del pilar",
              type: "text",
              required: true,
            },
            {
              name: "tagline",
              label: "Lema",
              type: "text",
              required: true,
              admin: {
                description: "Tres palabras que abren la página. Ej.: «Crecer. Liderar. Comunicar.»",
              },
            },
            {
              name: "resumen",
              label: "Resumen para el inicio",
              type: "textarea",
              required: true,
              maxLength: 200,
              admin: {
                description:
                  "1–2 oraciones para la tarjeta del pilar en la página de inicio.",
              },
            },
            {
              name: "description",
              label: "Descripción completa",
              type: "textarea",
              required: true,
              admin: {
                description: "Párrafo principal de la página del pilar.",
              },
            },
            {
              name: "audience",
              label: "Para quién",
              type: "textarea",
              required: true,
              admin: {
                description: "A qué equipos o áreas está dirigido este pilar.",
              },
            },
            {
              name: "deliverables",
              label: "Qué incluye",
              type: "array",
              required: true,
              minRows: 1,
              labels: { singular: "Elemento", plural: "Elementos" },
              fields: [
                { name: "texto", label: "Elemento", type: "textarea", required: true },
              ],
            },
            {
              name: "outcomes",
              label: "Resultados esperados",
              type: "array",
              required: true,
              minRows: 1,
              labels: { singular: "Resultado", plural: "Resultados" },
              fields: [
                { name: "texto", label: "Resultado", type: "textarea", required: true },
              ],
            },
            {
              name: "foto",
              label: "Foto del pilar",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Foto horizontal (4:3) para la cabecera de la página. Personas en una experiencia real, luz natural, sin oscurecer.",
              },
            },
            {
              name: "ctaEtiqueta",
              label: "Botón principal",
              type: "text",
              required: true,
              defaultValue: "Diseñemos esta experiencia",
              admin: {
                description: "Texto del botón de la cabecera (lleva a Contacto).",
              },
            },
            {
              name: "cierre",
              label: "Cierre de la página",
              type: "group",
              admin: {
                description: "Sección final que invita a conversar.",
              },
              fields: [
                {
                  name: "titulo",
                  label: "Título",
                  type: "text",
                  required: true,
                  defaultValue: "¿Es esta la experiencia que su equipo necesita?",
                },
                {
                  name: "texto",
                  label: "Texto",
                  type: "textarea",
                  required: true,
                  defaultValue:
                    "Conversemos. Escuchamos sus objetivos y diseñamos una experiencia a la medida de su organización.",
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón",
                  type: "text",
                  required: true,
                  defaultValue: "Conversemos",
                },
              ],
            },
          ],
        },
        seoTab(),
      ],
    },
    // --- Barra lateral ---
    {
      name: "slug",
      label: "Dirección web",
      type: "select",
      required: true,
      unique: true,
      options: PILAR_OPTIONS,
      admin: {
        position: "sidebar",
        description:
          "Fija por pilar: el sitio y el formulario de contacto dependen de estas tres direcciones.",
      },
    },
    {
      name: "icon",
      label: "Icono",
      type: "select",
      required: true,
      options: ICONO_OPTIONS,
      admin: {
        position: "sidebar",
        description: "Icono de la tarjeta en la página de inicio.",
      },
    },
    {
      name: "orden",
      label: "Orden",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        position: "sidebar",
        description: "Posición entre los tres pilares (1, 2, 3).",
      },
    },
  ],
};
