import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor } from "@/access";

// ---------------------------------------------------------------------------
// Solicitudes — cada envío del formulario de contacto, persistido como fuente
// de verdad ANTES de intentar el correo. Solo las crea el sistema (la API);
// en el panel son de lectura, salvo el campo «Estado» para seguimiento.
// ---------------------------------------------------------------------------

const soloLectura = {
  create: () => true,
  update: () => false,
} as const;

export const IntakeSubmissions: CollectionConfig = {
  slug: "intakeSubmissions",
  labels: {
    singular: "Solicitud",
    plural: "Solicitudes",
  },
  defaultSort: "-createdAt",
  admin: {
    group: "Solicitudes",
    useAsTitle: "companyName",
    defaultColumns: [
      "companyName",
      "contactName",
      "serviceType",
      "estado",
      "correoEnviado",
      "createdAt",
    ],
    description:
      "Consultas recibidas desde el formulario de contacto. Si «Correo enviado» está desmarcado, la notificación por correo falló: contacta a ese lead manualmente. Usa «Estado» para llevar el seguimiento.",
  },
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: "companyName",
      label: "Empresa",
      type: "text",
      required: true,
      access: soloLectura,
    },
    {
      name: "contactName",
      label: "Nombre de contacto",
      type: "text",
      required: true,
      access: soloLectura,
    },
    {
      name: "corporateEmail",
      label: "Correo corporativo",
      type: "email",
      required: true,
      access: soloLectura,
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "text",
      access: soloLectura,
    },
    {
      name: "serviceType",
      label: "Tipo de servicio",
      type: "select",
      required: true,
      access: soloLectura,
      options: [
        { label: "Desarrollo Profesional", value: "desarrollo-profesional" },
        { label: "Bienestar Corporativo", value: "bienestar-corporativo" },
        { label: "Experiencias de Integración", value: "experiencias-de-integracion" },
        { label: "No está seguro — necesita asesoría", value: "no-estoy-seguro" },
      ],
    },
    {
      name: "participantRange",
      label: "Participantes",
      type: "select",
      required: true,
      access: soloLectura,
      options: ["1-20", "20-50", "50-100", "100-500", "500+"].map((v) => ({
        label: v,
        value: v,
      })),
    },
    {
      name: "tentativeDate",
      label: "Fecha tentativa",
      type: "text",
      access: soloLectura,
    },
    {
      name: "eventFormat",
      label: "Formato",
      type: "select",
      required: true,
      access: soloLectura,
      options: [
        { label: "Presencial", value: "presencial" },
        { label: "Virtual", value: "virtual" },
        { label: "Híbrido", value: "hibrido" },
      ],
    },
    {
      name: "eventObjective",
      label: "Objetivo del evento",
      type: "textarea",
      required: true,
      access: soloLectura,
    },
    {
      name: "referralSource",
      label: "Cómo nos encontró",
      type: "text",
      access: soloLectura,
    },
    {
      name: "privacyConsent",
      label: "Aceptó la política de privacidad",
      type: "checkbox",
      required: true,
      access: soloLectura,
    },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      required: true,
      defaultValue: "nueva",
      options: [
        { label: "Nueva", value: "nueva" },
        { label: "Contactada", value: "contactada" },
        { label: "Cerrada", value: "cerrada" },
      ],
      admin: {
        position: "sidebar",
        description: "Único campo editable: úsalo para el seguimiento del lead.",
      },
    },
    {
      name: "correoEnviado",
      label: "Correo enviado",
      type: "checkbox",
      defaultValue: false,
      access: soloLectura,
      admin: {
        position: "sidebar",
        description:
          "Lo marca el sistema. Si está desmarcado, el correo de notificación falló y este lead requiere contacto manual.",
      },
    },
  ],
};
