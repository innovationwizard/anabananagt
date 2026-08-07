import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/access";
import { seoTab } from "@/fields/seo";
import { globalRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";

export const PortfolioPage: GlobalConfig = {
  slug: "portfolioPage",
  label: "Portada del portafolio",
  admin: {
    group: "Páginas",
    preview: () => previewUrl({ global: "portfolioPage" }),
    description:
      "Encabezado de /portafolio. Las tarjetas salen de «Experiencias».",
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  hooks: globalRevalidation("global_portfolioPage"),
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
              name: "header",
              label: "Cabecera",
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
                  name: "texto",
                  label: "Texto de apoyo",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "cierreExperiencia",
              label: "Cierre de cada experiencia",
              type: "group",
              admin: {
                description:
                  "Invitación al final de la página de cada experiencia (compartida por todas).",
              },
              fields: [
                {
                  name: "titulo",
                  label: "Título",
                  type: "text",
                  required: true,
                },
                {
                  name: "texto",
                  label: "Texto",
                  type: "text",
                  required: true,
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
