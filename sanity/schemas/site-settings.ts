import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Titular del Hero",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subtítulo del Hero",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "Métricas de Autoridad",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: 'Valor (ej: "200+")' },
            { name: "label", type: "string", title: "Etiqueta" },
          ],
        },
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Logos de Clientes",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "contactEmail",
      title: "Email de Contacto",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "Número de WhatsApp",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Redes Sociales",
      type: "object",
      fields: [
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "instagram", type: "url", title: "Instagram" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuración del Sitio" }),
  },
});
