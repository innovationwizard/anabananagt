import type { GlobalConfig } from "payload";
import { anyone, isAdmin } from "@/access";
import { DESTINO_OPTIONS } from "@/fields/options";
import { globalRevalidation } from "@/hooks/revalidate";
import { previewUrl } from "@/lib/preview";

function validarUrl(value: unknown): true | string {
  if (value == null || value === "") return true;
  if (typeof value === "string" && /^https:\/\/.+\..+/.test(value)) return true;
  return "Debe ser una dirección completa que empiece con https://";
}

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Ajustes del sitio",
  admin: {
    group: "Configuración",
    preview: () => previewUrl({ global: "siteSettings" }),
    description:
      "Identidad, contacto, redes, navegación y pie de página — lo que aparece en todas las páginas.",
  },
  access: {
    read: anyone,
    update: isAdmin,
  },
  hooks: globalRevalidation("global_siteSettings"),
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
          label: "Identidad y SEO",
          fields: [
            {
              name: "identidad",
              label: false,
              type: "group",
              fields: [
                {
                  name: "tituloBase",
                  label: "Título del sitio",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Título por defecto en Google y la pestaña del navegador. Ej.: «ana banana Experiences — Transformar desde lo humano».",
                  },
                },
                {
                  name: "metaDescripcion",
                  label: "Descripción del sitio",
                  type: "textarea",
                  required: true,
                  maxLength: 170,
                  admin: {
                    description:
                      "Descripción por defecto para buscadores (ideal: hasta 155 caracteres).",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Contacto y redes",
          fields: [
            {
              name: "contacto",
              label: false,
              type: "group",
              fields: [
                {
                  name: "email",
                  label: "Correo de contacto",
                  type: "email",
                  required: true,
                },
                {
                  name: "whatsapp",
                  label: "WhatsApp",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Solo números, con código de país y sin espacios. Ej.: 50250320841.",
                  },
                  validate: (value: unknown) => {
                    if (typeof value === "string" && /^[0-9]{8,15}$/.test(value)) {
                      return true;
                    }
                    return "Solo números, con código de país. Ej.: 50250320841";
                  },
                },
              ],
            },
            {
              name: "redes",
              label: "Redes sociales",
              type: "group",
              admin: {
                description:
                  "Direcciones completas. Deja vacía una red para ocultarla del pie de página.",
              },
              fields: [
                {
                  name: "linkedin",
                  label: "LinkedIn",
                  type: "text",
                  validate: validarUrl,
                },
                {
                  name: "instagram",
                  label: "Instagram",
                  type: "text",
                  validate: validarUrl,
                },
                {
                  name: "tiktok",
                  label: "TikTok",
                  type: "text",
                  validate: validarUrl,
                },
              ],
            },
          ],
        },
        {
          label: "Navegación",
          fields: [
            {
              name: "nav",
              label: false,
              type: "group",
              fields: [
                {
                  name: "enlaces",
                  label: "Enlaces del menú",
                  type: "array",
                  required: true,
                  minRows: 1,
                  maxRows: 5,
                  labels: { singular: "Enlace", plural: "Enlaces" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "etiqueta",
                          label: "Texto",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "destino",
                          label: "Destino",
                          type: "select",
                          required: true,
                          options: DESTINO_OPTIONS,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón del menú",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Botón destacado del menú (lleva a Contacto). Ej.: «Conversemos».",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Pie de página",
          fields: [
            {
              name: "footer",
              label: false,
              type: "group",
              fields: [
                {
                  name: "ctaTitulo",
                  label: "Frase de cierre",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: «Transformemos su organización»." },
                },
                {
                  name: "ctaTituloDestacado",
                  label: "Parte destacada",
                  type: "text",
                  required: true,
                  admin: { description: "En cursiva. Ej.: «desde lo humano.»" },
                },
                {
                  name: "ctaEtiqueta",
                  label: "Botón",
                  type: "text",
                  required: true,
                },
                {
                  name: "blurb",
                  label: "Descripción de la marca",
                  type: "textarea",
                  required: true,
                  admin: {
                    description: "Párrafo corto junto al logo, en el pie de página.",
                  },
                },
                {
                  name: "enlaces",
                  label: "Enlaces del pie",
                  type: "array",
                  required: true,
                  minRows: 1,
                  maxRows: 6,
                  labels: { singular: "Enlace", plural: "Enlaces" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "etiqueta",
                          label: "Texto",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "destino",
                          label: "Destino",
                          type: "select",
                          required: true,
                          options: DESTINO_OPTIONS,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "entidad",
                      label: "Entidad legal",
                      type: "text",
                      required: true,
                      admin: {
                        description:
                          "Aparece en el © del pie. Ej.: «Grupo anabanana, S.A.»",
                      },
                    },
                    {
                      name: "ubicacion",
                      label: "Ubicación",
                      type: "text",
                      required: true,
                      admin: { description: "Ej.: «Guatemala City, Guatemala»." },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
