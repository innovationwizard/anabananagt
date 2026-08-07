import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/access";
import { seoTab } from "@/fields/seo";
import { globalRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";

export const HomePage: GlobalConfig = {
  slug: "homePage",
  label: "Inicio",
  admin: {
    group: "Páginas",
    preview: () => previewUrl({ global: "homePage" }),
    description:
      "Todo el contenido de la página de inicio, sección por sección, en el orden en que aparecen.",
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  hooks: globalRevalidation("global_homePage"),
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
    max: 50,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenido",
          fields: [
            {
              name: "hero",
              label: "Portada",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  label: "Antetítulo",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Línea pequeña sobre el titular. Ej.: «Experiencias corporativas · Desde lo humano».",
                  },
                },
                {
                  name: "titulo",
                  label: "Titular",
                  type: "text",
                  required: true,
                  maxLength: 90,
                  admin: {
                    description:
                      "Primera parte del titular grande. Ideal: corto; en pantallas pequeñas los titulares largos se parten mal.",
                  },
                },
                {
                  name: "tituloDestacado",
                  label: "Parte destacada del titular",
                  type: "text",
                  required: true,
                  maxLength: 60,
                  admin: {
                    description:
                      "Cierre del titular, en cursiva y color de marca. Ej.: «las personas crecen.»",
                  },
                },
                {
                  name: "subtitulo",
                  label: "Subtítulo",
                  type: "textarea",
                  required: true,
                  maxLength: 260,
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón principal",
                  type: "text",
                  required: true,
                  admin: { description: "Lleva a Contacto." },
                },
                {
                  name: "fondo",
                  label: "Video o foto de fondo",
                  type: "upload",
                  relationTo: "media",
                  admin: {
                    description:
                      "Video en loop (mp4/webm, máx. 8 MB) o foto horizontal. Mientras esté vacío, el sitio muestra el marcador de posición. No lo oscurezcas: el sitio aplica su propio degradado.",
                  },
                },
              ],
            },
            {
              name: "marcas",
              label: "Marcas que confían",
              type: "group",
              admin: {
                description:
                  "Franja de logos bajo la portada. Los logos se gestionan en «Logos de clientes».",
              },
              fields: [
                {
                  name: "titulo",
                  label: "Título de la franja",
                  type: "text",
                  required: true,
                },
                {
                  name: "texto",
                  label: "Texto de apoyo",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "pilares",
              label: "Sección de pilares",
              type: "group",
              admin: {
                description:
                  "Encabezado de la sección. Las tarjetas salen de «Pilares de servicio».",
              },
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                { name: "titulo", label: "Título", type: "text", required: true },
                {
                  name: "descripcion",
                  label: "Descripción",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "sembrando",
              label: "Compromiso social (Sembrando futuro)",
              type: "group",
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                { name: "titulo", label: "Título", type: "text", required: true },
                {
                  name: "texto",
                  label: "Texto",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "fotos",
                  label: "Fotos (2)",
                  type: "array",
                  maxRows: 2,
                  labels: { singular: "Foto", plural: "Fotos" },
                  admin: {
                    description:
                      "Dos fotos verticales (3:4) de Proyecto Estrella. Mientras falten, el sitio muestra marcadores de posición.",
                  },
                  fields: [
                    {
                      name: "foto",
                      label: "Foto",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "destacada",
              label: "Experiencia destacada",
              type: "group",
              admin: {
                description:
                  "Sección grande con la experiencia marcada como destacada en «Experiencias».",
              },
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                {
                  name: "resumen",
                  label: "Resumen de impacto",
                  type: "textarea",
                  required: true,
                  admin: {
                    description:
                      "1–2 oraciones: personas participantes, tipo de experiencia, resultado clave.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "statValor",
                      label: "Cifra",
                      type: "text",
                      required: true,
                      admin: { description: "Ej.: «120+»." },
                    },
                    {
                      name: "statEtiqueta",
                      label: "Etiqueta de la cifra",
                      type: "text",
                      required: true,
                      admin: { description: "Ej.: «Personas»." },
                    },
                  ],
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "testimonios",
              label: "Sección de testimonios",
              type: "group",
              admin: {
                description:
                  "Encabezado de la sección. Las citas salen de «Testimonios» (los tres destacados).",
              },
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                { name: "titulo", label: "Título", type: "text", required: true },
                {
                  name: "descripcion",
                  label: "Descripción",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
        seoTab(),
      ],
    },
  ],
};
