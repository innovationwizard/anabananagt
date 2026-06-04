import type { Metadata } from "next";
import { IntakeForm } from "@/components/contact/intake-form";

// ---------------------------------------------------------------------------
// /contacto — Contact / Intake Page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agende una consulta privada. Cuéntenos sobre su organización y objetivos para recibir una propuesta personalizada.",
};

export default function ContactoPage() {
  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Contacto
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-inverse leading-tight">
            Agendar una consulta privada
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            Complete este formulario para iniciar una conversación. Nuestro equipo
            revisará su solicitud y le contactará en las próximas 24 horas hábiles.
          </p>
        </div>
      </section>

      {/* --- Form --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-2xl">
          <div className="bg-white border border-border p-8 md:p-12">
            <IntakeForm />
          </div>

          {/* Alternative contact */}
          <div className="mt-8 text-center text-sm text-text-muted">
            <p>
              ¿Prefiere hablar directamente?{" "}
              <a
                href="https://wa.me/50250320841"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors font-semibold"
              >
                Escríbanos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
