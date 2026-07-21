import { z } from "zod";

// ---------------------------------------------------------------------------
// Intake Form — Zod Schema
// Shared between client (React Hook Form) and server (API route)
// ---------------------------------------------------------------------------

const BLOCKED_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "yahoo.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
] as const;

export const IntakeSchema = z.object({
  // Step 1 — Company
  companyName: z.string().min(2, "Nombre de empresa requerido."),
  contactName: z.string().min(2, "Nombre de contacto requerido."),
  corporateEmail: z
    .string()
    .email("Correo electrónico inválido.")
    .refine(
      (val) =>
        !BLOCKED_DOMAINS.some((d) => val.toLowerCase().endsWith(`@${d}`)),
      { message: "Por favor utilice su correo corporativo." },
    ),
  phone: z.string().optional(),

  // Step 2 — Experience Details
  serviceType: z.enum([
    "desarrollo-profesional",
    "bienestar-corporativo",
    "experiencias-de-integracion",
    "no-estoy-seguro",
  ]),
  participantRange: z.enum(["1-20", "20-50", "50-100", "100-500", "500+"]),
  tentativeDate: z.string().optional(),
  eventFormat: z.enum(["presencial", "virtual", "hibrido"]),

  // Step 3 — Scope & Budget
  eventObjective: z
    .string()
    .min(20, "Describa el objetivo (mínimo 20 caracteres)."),
  budgetRange: z.enum([
    "100k-250k",
    "250k-500k",
    "500k-1M",
    "1M+",
    "prefer-to-discuss",
  ]),
  referralSource: z.string().optional(),

  // Step 4 — Consent
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debe aceptar la política de privacidad.",
    }),
});

export type IntakeFormValues = z.infer<typeof IntakeSchema>;

/** Budget labels for display */
export const BUDGET_LABELS: Record<string, string> = {
  "100k-250k": "Q100k – Q250k",
  "250k-500k": "Q250k – Q500k",
  "500k-1M": "Q500k – Q1M",
  "1M+": "Q1M+",
  "prefer-to-discuss": "Prefiero discutirlo en la consulta",
};

/** Service (pillar) labels for display */
export const SERVICE_LABELS: Record<string, string> = {
  "desarrollo-profesional": "Desarrollo Profesional",
  "bienestar-corporativo": "Bienestar Corporativo",
  "experiencias-de-integracion": "Experiencias de Integración",
  "no-estoy-seguro": "No estoy seguro — necesito asesoría",
};
