import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Cita",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "company", title: "Empresa", type: "string" }),
    defineField({
      name: "avatar",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "author", subtitle: "company" },
  },
});
