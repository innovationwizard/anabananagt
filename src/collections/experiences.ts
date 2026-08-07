import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrEditor } from "@/access";
import { collectionRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";
import { slugField } from "@/fields/slug";
import { seoTab } from "@/fields/seo";
import { PILAR_OPTIONS } from "@/fields/options";

// Guardarraíl: solo una experiencia destacada a la vez. Al publicar una con
// «destacada», las demás se desmarcan solas (el editor no tiene que recordarlo).
const soloUnaDestacada: NonNullable<
  NonNullable<CollectionConfig["hooks"]>["afterChange"]
>[number] = async ({ doc, req }) => {
  if (doc._status === "published" && doc.destacada === true) {
    await req.payload.update({
      collection: "experiences",
      where: {
        and: [
          { destacada: { equals: true } },
          { id: { not_equals: doc.id } },
        ],
      },
      data: { destacada: false },
      req,
      context: { disableRevalidate: true },
    });
  }
  return doc;
};

const revalidation = collectionRevalidation("experiences");

export const Experiences: CollectionConfig = {
  slug: "experiences",
  labels: {
    singular: "Experiencia",
    plural: "Experiencias",
  },
  defaultSort: "-fecha",
  admin: {
    group: "Contenido",
    preview: (data) =>
      previewUrl({
        collection: "experiences",
        slug: typeof data?.slug === "string" ? data.slug : null,
      }),
    useAsTitle: "title",
    defaultColumns: ["title", "pillar", "destacada", "_status", "updatedAt"],
    description:
      "Los talleres y experiencias del portafolio. Cada una aparece en /portafolio, en su propia página y en la página de su pilar.",
  },
  access: {
    read: publishedOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [...revalidation.afterChange, soloUnaDestacada],
    afterDelete: revalidation.afterDelete,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenido",
          fields: [
            {
              name: "title",
              label: "Título",
              type: "text",
              required: true,
              admin: {
                description: "Nombre completo. Ej.: «Taller Marca Personal».",
              },
            },
            {
              name: "tagline",
              label: "Nombre corto",
              type: "text",
              required: true,
              maxLength: 40,
              admin: {
                description:
                  "Versión breve para tarjetas y etiquetas. Ej.: «Marca Personal».",
              },
            },
            {
              name: "cover",
              label: "Foto de portada",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description:
                  "Foto horizontal (16:9) de la experiencia. Aparece en las tarjetas del portafolio y en la página de la experiencia.",
              },
            },
            {
              name: "objetivo",
              label: "Objetivo",
              type: "textarea",
              required: true,
              admin: {
                description:
                  "Qué logra esta experiencia, en 1–3 oraciones. Aparece bajo «Objetivo» en la página.",
              },
            },
            {
              name: "resultados",
              label: "Resultados esperados",
              type: "array",
              required: true,
              minRows: 1,
              labels: { singular: "Resultado", plural: "Resultados" },
              admin: {
                description: "Uno por línea. Aparecen como lista en la página.",
              },
              fields: [
                {
                  name: "texto",
                  label: "Resultado",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "contenido",
              label: "Contenido / Descripción",
              type: "textarea",
              admin: {
                description:
                  "Párrafo que describe la experiencia. Puedes dejarlo vacío si usas solo la lista de temas de abajo.",
              },
            },
            {
              name: "contenidoItems",
              label: "Lista de contenido (opcional)",
              type: "array",
              labels: { singular: "Punto", plural: "Puntos" },
              admin: {
                description:
                  "Puntos ordenados del contenido del taller, si aplica.",
              },
              fields: [
                { name: "texto", label: "Punto", type: "textarea", required: true },
              ],
            },
            {
              name: "temasIntro",
              label: "Introducción a los temas",
              type: "text",
              admin: {
                description:
                  "Frase que presenta el bloque «Temas a trabajar». Aparece cuando agregas al menos un tema abajo.",
                condition: (_, siblingData) =>
                  Array.isArray(siblingData?.temas) && siblingData.temas.length > 0,
              },
            },
            {
              name: "temas",
              label: "Temas a trabajar (opcional)",
              type: "array",
              labels: { singular: "Tema", plural: "Temas" },
              fields: [
                { name: "texto", label: "Tema", type: "textarea", required: true },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "duracion",
                  label: "Duración",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: «3 horas»." },
                },
                {
                  name: "modalidad",
                  label: "Modalidad",
                  type: "text",
                  required: true,
                  defaultValue: "Virtual, presencial o híbrido",
                },
              ],
            },
          ],
        },
        seoTab(),
      ],
    },
    // --- Barra lateral ---
    slugField("title"),
    {
      name: "pillar",
      label: "Pilar",
      type: "select",
      required: true,
      options: PILAR_OPTIONS,
      admin: {
        position: "sidebar",
        description:
          "A qué pilar pertenece. Define en qué página de servicio aparece.",
      },
    },
    {
      name: "destacada",
      label: "¿Destacar en la página de inicio?",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "La experiencia destacada aparece en grande en el inicio. Solo hay una a la vez: al publicar esta como destacada, las demás se desmarcan solas.",
      },
    },
    {
      name: "fecha",
      label: "Fecha",
      type: "date",
      admin: {
        position: "sidebar",
        description:
          "Orden en el portafolio: la más reciente aparece primero.",
        date: { pickerAppearance: "dayOnly" },
      },
    },
  ],
};
