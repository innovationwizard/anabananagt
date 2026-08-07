import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { IntakeSchema, SERVICE_LABELS } from "@/lib/validations/intake";
import { getSiteSettings } from "@/lib/content";
import { BRAND } from "@/lib/brand";

// ---------------------------------------------------------------------------
// POST /api/intake — Formulario B2B de contacto.
// 1. Valida (Zod).
// 2. PERSISTE la solicitud en el CMS — fuente de verdad. Éxito para el lead
//    ⇔ la solicitud quedó guardada.
// 3. Intenta los correos (Resend). Si fallan o falta la clave, la solicitud
//    queda marcada «correoEnviado: false» y se registra el error en voz alta:
//    ningún camino pierde un lead en silencio.
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = IntakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // --- 1. Persistir (fuente de verdad) -------------------------------------
  const payload = await getPayload({ config });
  let submissionId: number;
  try {
    const created = await payload.create({
      collection: "intakeSubmissions",
      data: { ...data, estado: "nueva", correoEnviado: false },
      overrideAccess: true,
    });
    submissionId = created.id;
  } catch (err) {
    payload.logger.error({ err }, "intake: no se pudo persistir la solicitud");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }

  // --- 2. Correos (mejor esfuerzo, con fallo VISIBLE) -----------------------
  const emailOk = await sendEmails(data).catch((err: unknown) => {
    payload.logger.error({ err }, "intake: fallo inesperado enviando correos");
    return false;
  });

  if (emailOk) {
    await payload.update({
      collection: "intakeSubmissions",
      id: submissionId,
      data: { correoEnviado: true },
      overrideAccess: true,
    });
  } else {
    payload.logger.error(
      `intake: solicitud #${submissionId} guardada SIN correo de notificación ` +
        `(RESEND_API_KEY ${process.env.RESEND_API_KEY ? "presente — envío falló" : "ausente"}). ` +
        "Revisar «Solicitudes» en /admin y contactar al lead manualmente.",
    );
  }

  // El lead ve éxito porque su solicitud SÍ fue recibida (persistida).
  return NextResponse.json({ success: true });
}

// ---------------------------------------------------------------------------
// Correos
// ---------------------------------------------------------------------------

type IntakeData = ReturnType<typeof IntakeSchema.parse>;

async function sendEmails(data: IntakeData): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return false;

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "consultas@anabanana.gt";
  const toEmail = process.env.RESEND_TO_EMAIL ?? "equipo@anabanana.gt";
  const settings = await getSiteSettings();
  const whatsappUrl = `https://wa.me/${settings.contacto.whatsapp}`;

  const send = async (payload: Record<string, string>) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Resend ${res.status}: ${await res.text()}`);
    }
  };

  await send({
    from: fromEmail,
    to: toEmail,
    subject: `[LEAD] ${data.companyName} — ${SERVICE_LABELS[data.serviceType] ?? data.serviceType}`,
    html: buildTeamEmail(data),
  });
  await send({
    from: fromEmail,
    to: data.corporateEmail,
    subject: "Solicitud recibida — ana banana Experiences",
    html: buildConfirmationEmail(data.contactName, whatsappUrl),
  });
  return true;
}

// ---------------------------------------------------------------------------
// Plantillas (HTML inline; colores desde src/lib/brand.ts)
// ---------------------------------------------------------------------------

function buildTeamEmail(data: IntakeData) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: ${BRAND.navy}; border-bottom: 2px solid ${BRAND.blue}; padding-bottom: 12px;">
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
        ${row("Referencia", data.referralSource ?? "No especificada")}
      </table>
      <div style="margin-top: 24px; padding: 16px; background: ${BRAND.emailSurface}; border-left: 3px solid ${BRAND.blue};">
        <strong style="color: ${BRAND.navy};">Objetivo del evento:</strong>
        <p style="color: ${BRAND.emailText}; margin-top: 8px;">${escapeHtml(data.eventObjective)}</p>
      </div>
    </div>
  `;
}

function buildConfirmationEmail(name: string, whatsappUrl: string) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: ${BRAND.navy};">Gracias, ${escapeHtml(name)}</h2>
      <p style="color: ${BRAND.emailText}; line-height: 1.7;">
        Hemos recibido su solicitud de consulta. Nuestro equipo la revisará y le
        contactará en las próximas <strong>24 horas hábiles</strong>.
      </p>
      <p style="color: ${BRAND.emailText}; line-height: 1.7;">
        Si tiene alguna pregunta urgente, puede escribirnos directamente por
        <a href="${whatsappUrl}" style="color: ${BRAND.blue};">WhatsApp</a>.
      </p>
      <hr style="border: none; border-top: 1px solid ${BRAND.emailBorder}; margin: 24px 0;" />
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
      <td style="padding: 8px 12px; color: ${BRAND.emailMuted}; font-size: 14px; border-bottom: 1px solid ${BRAND.emailBorder}; width: 140px;">
        ${label}
      </td>
      <td style="padding: 8px 12px; color: ${BRAND.navy}; font-size: 14px; border-bottom: 1px solid ${BRAND.emailBorder}; font-weight: 500;">
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
