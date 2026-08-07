import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isAdminOrEditor } from "@/access";
import { collectionRevalidation } from "@/hooks/revalidate";

export const ClientLogos: CollectionConfig = {
  slug: "clientLogos",
  labels: {
    singular: "Logo de cliente",
    plural: "Logos de clientes",
  },
  defaultSort: "orden",
  admin: {
    group: "Contenido",
    useAsTitle: "nombre",
    defaultColumns: ["nombre", "orden", "updatedAt"],
    description:
      "Marcas que aparecen en «Marcas que han confiado en nosotros», en la página de inicio, ordenadas por el campo Orden.",
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: collectionRevalidation("clientLogos"),
  fields: [
    {
      name: "nombre",
      label: "Nombre de la marca",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      label: "Logo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "PNG con fondo transparente. Se muestra sobre tarjeta blanca, pequeño: usa la versión simple del logo.",
      },
    },
    {
      name: "orden",
      label: "Orden",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        position: "sidebar",
        description: "Posición en la cuadrícula (1 = primero).",
      },
    },
  ],
};
