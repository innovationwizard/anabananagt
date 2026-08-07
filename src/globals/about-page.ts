import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/access";
import { seoTab } from "@/fields/seo";
import { globalRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";
import { ICONO_OPTIONS } from "@/fields/options";

export const AboutPage: GlobalConfig = {
  slug: "aboutPage",
  label: "Nosotros",
  admin: {
    group: "Páginas",
    preview: () => previewUrl({ global: "aboutPage" }),
    description:
      "La página Nosotros: historia, esencia, valores y arquetipos de la marca (manual Cap. 01–02).",
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  hooks: globalRevalidation("global_aboutPage"),
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
              label: "Cabecera e historia",
              type: "group",
              fields: [
                {
                  name: "eyebrow",
                  label: "Antetítulo",
                  type: "text",
                  required: true,
                },
                {
                  name: "titulo",
                  label: "Titular",
                  type: "text",
                  required: true,
                },
                {
                  name: "tituloDestacado",
                  label: "Parte destacada del titular",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Cierre en cursiva. Ej.: «desde las personas.»",
                  },
                },
                {
                  name: "historia",
                  label: "Historia",
                  type: "array",
                  required: true,
                  minRows: 1,
                  maxRows: 5,
                  labels: { singular: "Párrafo", plural: "Párrafos" },
                  fields: [
                    {
                      name: "parrafo",
                      label: "Párrafo",
                      type: "textarea",
                      required: true,
                    },
                  ],
                },
                {
                  name: "foto",
                  label: "Foto",
                  type: "upload",
                  relationTo: "media",
                  admin: {
                    description:
                      "Foto vertical (3:4): personas conectando en una experiencia real, luz natural. Mientras esté vacía, se muestra el marcador de posición.",
                  },
                },
              ],
            },
            {
              name: "esencia",
              label: "Esencia y promesa",
              type: "group",
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                {
                  name: "titulo",
                  label: "Frase de esencia",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: «Transformar»." },
                },
                {
                  name: "tituloDestacado",
                  label: "Parte destacada",
                  type: "text",
                  required: true,
                  admin: { description: "En cursiva. Ej.: «desde lo humano.»" },
                },
                {
                  name: "texto",
                  label: "Promesa",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "valores",
              label: "Valores",
              type: "group",
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                { name: "titulo", label: "Título", type: "text", required: true },
                {
                  name: "items",
                  label: "Valores",
                  type: "array",
                  required: true,
                  minRows: 5,
                  maxRows: 5,
                  labels: { singular: "Valor", plural: "Valores" },
                  admin: {
                    description:
                      "Los cinco valores del manual de marca (Cap. 02), textuales.",
                  },
                  fields: [
                    {
                      name: "icono",
                      label: "Icono",
                      type: "select",
                      required: true,
                      options: ICONO_OPTIONS,
                    },
                    {
                      name: "titulo",
                      label: "Nombre",
                      type: "text",
                      required: true,
                    },
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
            {
              name: "arquetipos",
              label: "Arquetipos",
              type: "group",
              fields: [
                { name: "tag", label: "Etiqueta", type: "text", required: true },
                { name: "titulo", label: "Título", type: "text", required: true },
                {
                  name: "descripcion",
                  label: "Descripción",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "items",
                  label: "Arquetipos",
                  type: "array",
                  required: true,
                  minRows: 3,
                  maxRows: 3,
                  labels: { singular: "Arquetipo", plural: "Arquetipos" },
                  admin: {
                    description:
                      "Los tres arquetipos del manual de marca (Cap. 02), textuales.",
                  },
                  fields: [
                    {
                      name: "titulo",
                      label: "Nombre",
                      type: "text",
                      required: true,
                    },
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
            {
              name: "cierre",
              label: "Cierre",
              type: "group",
              fields: [
                {
                  name: "titulo",
                  label: "Frase de cierre",
                  type: "text",
                  required: true,
                },
                {
                  name: "tituloDestacado",
                  label: "Parte destacada",
                  type: "text",
                  required: true,
                  admin: { description: "En cursiva." },
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón",
                  type: "text",
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
