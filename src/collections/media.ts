import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isAdminOrEditor } from "@/access";
import { collectionRevalidation } from "@/hooks/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Archivo",
    plural: "Biblioteca de medios",
  },
  admin: {
    group: "Contenido",
    description:
      "Fotos, logos y videos del sitio. Sube archivos con buena resolución (fotos: mínimo 2000 px de ancho) y sin oscurecer: el sitio aplica sus propios filtros.",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: collectionRevalidation("media"),
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    crop: true,
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 1024 },
      { name: "hero", width: 1920 },
      { name: "og", width: 1200, height: 630, crop: "center" },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Texto alternativo",
      type: "text",
      admin: {
        description:
          "Describe lo que se ve, para personas que usan lector de pantalla y para Google. Ej.: «Equipo pintando un lienzo colectivo en el Taller Florecer».",
        condition: (_, siblingData) => !siblingData?.decorativa,
      },
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: unknown },
      ) => {
        const decorativa = Boolean(
          (siblingData as { decorativa?: boolean } | undefined)?.decorativa,
        );
        if (decorativa) return true;
        if (typeof value === "string" && value.trim().length > 0) return true;
        return "Describe la imagen, o marca «¿Es decorativa?» si no aporta información.";
      },
    },
    {
      name: "decorativa",
      label: "¿Es decorativa?",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Marca esto solo si la imagen es puramente decorativa (texturas, fondos) y no aporta información. Los lectores de pantalla la ignorarán.",
      },
    },
    {
      name: "credito",
      label: "Crédito (opcional)",
      type: "text",
      admin: {
        description: "Fotógrafo o fuente, si aplica. No se muestra en el sitio.",
      },
    },
  ],
};
