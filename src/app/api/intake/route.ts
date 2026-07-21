import { NextResponse } from "next/server";
import { IntakeSchema, BUDGET_LABELS, SERVICE_LABELS } from "@/lib/validations/intake";

// ---------------------------------------------------------------------------
// POST /api/intake — Process B2B lead qualification form
// Validates with Zod, then sends notification emails via Resend.
// ---------------------------------------------------------------------------

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = IntakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // --- Send notification to Ana's team via Resend ---
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "consultas@anabanana.gt";
    const toEmail = process.env.RESEND_TO_EMAIL ?? "equipo@anabanana.gt";

    if (resendKey) {
      // Notification to team
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: `[LEAD] ${data.companyName} — ${SERVICE_LABELS[data.serviceType] ?? data.serviceType}`,
          html: buildTeamEmail(data),
        }),
      });

      // Confirmation to lead
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: data.corporateEmail,
          subject: "Solicitud recibida — ana banana Experiences",
          html: buildConfirmationEmail(data.contactName),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------------------------
// Email Templates (inline HTML for simplicity; migrate to React Email later)
// ---------------------------------------------------------------------------

function buildTeamEmail(data: {
  companyName: string;
  contactName: string;
  corporateEmail: string;
  phone?: string;
  serviceType: string;
  participantRange: string;
  tentativeDate?: string;
  eventFormat: string;
  eventObjective: string;
  budgetRange: string;
  referralSource?: string;
}) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #243054; border-bottom: 2px solid #2E46D4; padding-bottom: 12px;">
        Nueva Solicitud de Consulta
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        ${row("Empresa", data.companyName)}
        ${row("Contacto", data.contactName)}
        ${row("Email", data.corporateEmail)}
        ${row("Teléfono", data.phone ?? "No proporcionado")}
        ${row("Servicio", SERVICE_LABELS[data.serviceType] ?? data.serviceType)}
        ${row("Participantes", data.participantRange)}
        ${row("Fecha tentativa", data.tentativeDate ?? "No especificada")}
        ${row("Formato", data.eventFormat)}
        ${row("Inversión", BUDGET_LABELS[data.budgetRange] ?? data.budgetRange)}
        ${row("Referencia", data.referralSource ?? "No especificada")}
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #F6F7F9; border-left: 3px solid #2E46D4;">
        <strong style="color: #243054;">Objetivo del evento:</strong>
        <p style="color: #374151; margin-top: 8px;">${escapeHtml(data.eventObjective)}</p>
      </div>
    </div>
  `;
}

function buildConfirmationEmail(name: string) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #243054;">Gracias, ${escapeHtml(name)}</h2>
      <p style="color: #374151; line-height: 1.7;">
        Hemos recibido su solicitud de consulta. Nuestro equipo la revisará y le
        contactará en las próximas <strong>24 horas hábiles</strong>.
      </p>
      <p style="color: #374151; line-height: 1.7;">
        Si tiene alguna pregunta urgente, puede escribirnos directamente por
        <a href="https://wa.me/50250320841" style="color: #2E46D4;">WhatsApp</a>.
      </p>
      <hr style="border: none; border-top: 1px solid #E2E2E2; margin: 24px 0;" />
      <p style="color: #9CA3AF; font-size: 12px;">
        ana banana Experiences — Transformar desde lo humano<br />
        Guatemala City, Guatemala
      </p>
    </div>
  `;
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 12px; color: #6B7280; font-size: 14px; border-bottom: 1px solid #E2E2E2; width: 140px;">
        ${label}
      </td>
      <td style="padding: 8px 12px; color: #243054; font-size: 14px; border-bottom: 1px solid #E2E2E2; font-weight: 500;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
