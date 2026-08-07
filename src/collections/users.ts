import type { CollectionConfig } from "payload";
import { fieldAdminOnly, isAdmin, isAdminOrSelf } from "@/access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuario",
    plural: "Usuarios",
  },
  auth: true,
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["nombre", "email", "role"],
    group: "Configuración",
    description:
      "Personas con acceso a este panel. Los editores gestionan contenido; los administradores además gestionan usuarios y ajustes.",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      admin: {
        description: "Nombre y apellido, como quieres que aparezca en el panel.",
      },
    },
    {
      name: "role",
      label: "Rol",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Solo un administrador puede cambiar roles (evita auto-escalación).
        create: fieldAdminOnly,
        update: fieldAdminOnly,
      },
      admin: {
        description:
          "Editor: crea, edita y publica contenido. Administrador: además gestiona usuarios y configuración.",
      },
    },
  ],
};
