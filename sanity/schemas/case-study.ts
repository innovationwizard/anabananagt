import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Experiencia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título del Caso",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientAlias",
      title: "Nombre del Cliente (o alias)",
      type: "string",
      description: 'Nombre real o alias corporativo (ej: "Banco Tier 1 Regional")',
    }),
    defineField({
      name: "industry",
      title: "Industria",
      type: "string",
      options: {
        list: [
          "Banca y Finanzas",
          "Tecnología",
          "Manufactura",
          "Retail",
          "Telecomunicaciones",
          "Servicios Profesionales",
          "Farmacéutica",
          "Energía",
          "Otro",
        ],
      },
    }),
    defineField({
      name: "budgetRange",
      title: "Rango de Inversión",
      type: "string",
      options: { list: ["Q100k–Q500k", "Q500k–Q1M", "Q1M+"] },
    }),
    defineField({
      name: "attendance",
      title: "Número de Participantes",
      type: "number",
    }),
    defineField({
      name: "serviceType",
      title: "Tipo de Servicio",
      type: "string",
      options: {
        list: [
          "Desarrollo Profesional",
          "Bienestar Corporativo",
          "Experiencias de Integración",
        ],
      },
    }),
    defineField({
      name: "heroImage",
      title: "Imagen Principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galería",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "challenge",
      title: "Desafío del Cliente",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "solution",
      title: "Solución Entregada",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "results",
      title: "Resultados",
      type: "array",
      of: [{ type: "string" }],
      description: 'Métricas de impacto (ej: "92% de satisfacción en encuesta post-evento")',
    }),
    defineField({
      name: "testimonial",
      title: "Testimonio del Cliente",
      type: "object",
      fields: [
        { name: "quote", type: "text", title: "Cita" },
        { name: "author", type: "string", title: "Nombre" },
        { name: "role", type: "string", title: "Cargo" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de Publicación",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Destacado en Home",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Fecha",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "clientAlias", media: "heroImage" },
  },
});
