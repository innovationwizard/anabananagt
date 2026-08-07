import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "@/access";
import { seoTab } from "@/fields/seo";
import { globalRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";

export const ContactPage: GlobalConfig = {
  slug: "contactPage",
  label: "Contacto",
  admin: {
    group: "Páginas",
    preview: () => previewUrl({ global: "contactPage" }),
    description:
      "Textos de la página de contacto. Los campos y pasos del formulario son parte del sistema y no se editan aquí; el número de WhatsApp vive en «Ajustes del sitio».",
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  hooks: globalRevalidation("global_contactPage"),
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
              name: "altContacto",
              label: "Contacto alternativo",
              type: "group",
              admin: {
                description: "Línea bajo el formulario que ofrece WhatsApp.",
              },
              fields: [
                {
                  name: "texto",
                  label: "Texto",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: «¿Prefiere hablar directamente?»" },
                },
                {
                  name: "etiquetaEnlace",
                  label: "Texto del enlace",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: «Escríbanos por WhatsApp»." },
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
