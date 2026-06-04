import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      description: 'Lucide icon name (e.g., "mic-2", "users", "compass")',
    }),
    defineField({
      name: "audience",
      title: "Para Quién",
      type: "text",
      rows: 3,
      description: "Descripción del público objetivo",
    }),
    defineField({
      name: "deliverables",
      title: "Qué Incluye",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "outcomes",
      title: "Resultados Esperados",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroImage",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
