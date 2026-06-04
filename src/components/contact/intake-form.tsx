"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import {
  IntakeSchema,
  type IntakeFormValues,
  BUDGET_LABELS,
  SERVICE_LABELS,
} from "@/lib/validations/intake";

// ---------------------------------------------------------------------------
// IntakeForm — Multi-step B2B lead qualification form
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 4;

const PARTICIPANT_OPTIONS = [
  { value: "1-20", label: "1 – 20" },
  { value: "20-50", label: "20 – 50" },
  { value: "50-100", label: "50 – 100" },
  { value: "100-500", label: "100 – 500" },
  { value: "500+", label: "500+" },
] as const;

const FORMAT_OPTIONS = [
  { value: "presencial", label: "Presencial" },
  { value: "virtual", label: "Virtual" },
  { value: "hibrido", label: "Híbrido" },
] as const;

const REFERRAL_OPTIONS = [
  "Referencia de un colega",
  "LinkedIn",
  "Instagram",
  "Búsqueda en Google",
  "Evento anterior",
  "Otro",
] as const;

export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IntakeFormValues>({
    resolver: zodResolver(IntakeSchema),
    mode: "onTouched",
    defaultValues: {
      privacyConsent: false,
    },
  });

  // Step-specific field groups for validation
  const stepFields: Record<number, (keyof IntakeFormValues)[]> = {
    1: ["companyName", "contactName", "corporateEmail"],
    2: ["serviceType", "participantRange", "eventFormat"],
    3: ["eventObjective", "budgetRange"],
    4: ["privacyConsent"],
  };

  async function nextStep() {
    const valid = await trigger(stepFields[step]);
    if (valid && step < TOTAL_STEPS) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  const onSubmit: SubmitHandler<IntakeFormValues> = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently handle — user sees generic error state
    } finally {
      setSubmitting(false);
    }
  };

  // --- Success State ---
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-display text-2xl font-bold text-primary">
          Solicitud recibida
        </h3>
        <p className="mt-4 text-text-muted max-w-md mx-auto">
          Gracias por su interés. Nuestro equipo revisará su solicitud y le
          contactará en las próximas 24 horas hábiles.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* --- Progress Bar --- */}
      <div className="flex items-center gap-2 mb-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-border">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: i < step ? "100%" : "0%" }}
            />
          </div>
        ))}
        <span className="text-xs text-text-muted ml-2 shrink-0">
          {step}/{TOTAL_STEPS}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* --- Step 1: Company --- */}
          {step === 1 && (
            <StepWrapper key="step1">
              <StepTitle
                number="01"
                title="Información de la empresa"
                subtitle="Cuéntenos sobre su organización."
              />
              <Field label="Empresa" error={errors.companyName?.message}>
                <input
                  {...register("companyName")}
                  placeholder="Nombre de la empresa"
                  className="form-input"
                />
              </Field>
              <Field label="Persona de contacto" error={errors.contactName?.message}>
                <input
                  {...register("contactName")}
                  placeholder="Nombre completo"
                  className="form-input"
                />
              </Field>
              <Field label="Correo corporativo" error={errors.corporateEmail?.message}>
                <input
                  {...register("corporateEmail")}
                  type="email"
                  placeholder="nombre@suempresa.com"
                  className="form-input"
                />
              </Field>
              <Field label="Teléfono (opcional)">
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+502 ..."
                  className="form-input"
                />
              </Field>
            </StepWrapper>
          )}

          {/* --- Step 2: Event Details --- */}
          {step === 2 && (
            <StepWrapper key="step2">
              <StepTitle
                number="02"
                title="Detalles del evento"
                subtitle="Ayúdenos a entender el alcance de lo que necesita."
              />
              <Field label="Servicio de interés" error={errors.serviceType?.message}>
                <select {...register("serviceType")} className="form-input">
                  <option value="">Seleccione...</option>
                  {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Número de participantes" error={errors.participantRange?.message}>
                <div className="flex flex-wrap gap-2">
                  {PARTICIPANT_OPTIONS.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`px-4 py-2 border cursor-pointer text-sm transition-colors
                        ${
                          watch("participantRange") === value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-accent/30"
                        }`}
                    >
                      <input
                        {...register("participantRange")}
                        type="radio"
                        value={value}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Fecha tentativa (opcional)">
                <input
                  {...register("tentativeDate")}
                  type="date"
                  className="form-input"
                />
              </Field>
              <Field label="Formato" error={errors.eventFormat?.message}>
                <div className="flex gap-2">
                  {FORMAT_OPTIONS.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`flex-1 text-center px-4 py-2 border cursor-pointer text-sm
                        transition-colors
                        ${
                          watch("eventFormat") === value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-accent/30"
                        }`}
                    >
                      <input
                        {...register("eventFormat")}
                        type="radio"
                        value={value}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </Field>
            </StepWrapper>
          )}

          {/* --- Step 3: Scope & Budget --- */}
          {step === 3 && (
            <StepWrapper key="step3">
              <StepTitle
                number="03"
                title="Alcance e inversión"
                subtitle="Esto nos permite preparar una propuesta relevante."
              />
              <Field label="Objetivo del evento" error={errors.eventObjective?.message}>
                <textarea
                  {...register("eventObjective")}
                  rows={4}
                  placeholder="Describa brevemente qué quiere lograr con este servicio..."
                  className="form-input resize-none"
                />
              </Field>
              <Field label="Rango de inversión estimado" error={errors.budgetRange?.message}>
                <div className="space-y-2">
                  {Object.entries(BUDGET_LABELS).map(([val, label]) => (
                    <label
                      key={val}
                      className={`block px-4 py-3 border cursor-pointer text-sm transition-colors
                        ${
                          watch("budgetRange") === val
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-accent/30"
                        }`}
                    >
                      <input
                        {...register("budgetRange")}
                        type="radio"
                        value={val}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="¿Cómo nos conoció? (opcional)">
                <select {...register("referralSource")} className="form-input">
                  <option value="">Seleccione...</option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
            </StepWrapper>
          )}

          {/* --- Step 4: Confirmation --- */}
          {step === 4 && (
            <StepWrapper key="step4">
              <StepTitle
                number="04"
                title="Confirmación"
                subtitle="Revise su información antes de enviar."
              />
              <div className="space-y-4 p-6 bg-primary/5 border border-border text-sm">
                <SummaryRow label="Empresa" value={watch("companyName")} />
                <SummaryRow label="Contacto" value={watch("contactName")} />
                <SummaryRow label="Email" value={watch("corporateEmail")} />
                <SummaryRow
                  label="Servicio"
                  value={SERVICE_LABELS[watch("serviceType")] ?? "—"}
                />
                <SummaryRow label="Participantes" value={watch("participantRange")} />
                <SummaryRow label="Formato" value={watch("eventFormat")} />
                <SummaryRow
                  label="Inversión"
                  value={BUDGET_LABELS[watch("budgetRange")] ?? "—"}
                />
                <SummaryRow label="Objetivo" value={watch("eventObjective")} />
              </div>

              <Field error={errors.privacyConsent?.message}>
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    {...register("privacyConsent")}
                    type="checkbox"
                    className="mt-1 w-4 h-4 accent-accent"
                  />
                  <span className="text-sm text-text-muted">
                    Acepto la política de privacidad y autorizo a anabanana a
                    contactarme respecto a esta solicitud.
                  </span>
                </label>
              </Field>
            </StepWrapper>
          )}
        </AnimatePresence>

        {/* --- Navigation Buttons --- */}
        <div className="flex items-center justify-between mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-sm text-text-muted
                         hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-accent text-primary
                         text-sm font-semibold tracking-[0.06em] uppercase
                         hover:bg-accent-hover transition-colors"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-accent text-primary
                         text-sm font-semibold tracking-[0.06em] uppercase
                         hover:bg-accent-hover transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Solicitud
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

function StepTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
        Paso {number}
      </span>
      <h3 className="font-display text-2xl font-bold text-primary mt-1">
        {title}
      </h3>
      <p className="text-sm text-text-muted mt-1">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-primary mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-text-muted shrink-0">{label}</span>
      <span className="text-primary font-medium text-right">
        {value || "—"}
      </span>
    </div>
  );
}
