import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrEditor } from "@/access";
import { collectionRevalidation } from "@/hooks/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonio",
    plural: "Testimonios",
  },
  defaultSort: "orden",
  admin: {
    group: "Contenido",
    useAsTitle: "autor",
    defaultColumns: ["autor", "empresa", "destacado", "_status", "updatedAt"],
    description:
      "Citas de clientes. Los tres marcados como «destacado» aparecen en la página de inicio.",
  },
  access: {
    read: publishedOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  hooks: collectionRevalidation("testimonials"),
  fields: [
    {
      name: "cita",
      label: "Cita",
      type: "textarea",
      required: true,
      maxLength: 400,
      admin: {
        description:
          "2–3 oraciones, en palabras del cliente, sobre el impacto en su equipo o cultura. Sin comillas: el sitio las agrega.",
      },
    },
    {
      name: "autor",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "cargo",
          label: "Cargo",
          type: "text",
          required: true,
          admin: { description: "Ej.: «Dirección de RRHH»." },
        },
        {
          name: "empresa",
          label: "Empresa",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "destacado",
      label: "¿Mostrar en la página de inicio?",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "El inicio muestra exactamente tres testimonios destacados, en el orden indicado abajo.",
      },
    },
    {
      name: "orden",
      label: "Orden",
      type: "number",
      defaultValue: 1,
      admin: {
        position: "sidebar",
        description: "Posición entre los destacados (1 = primero).",
      },
    },
  ],
};
