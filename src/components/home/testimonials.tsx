"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

// ---------------------------------------------------------------------------
// Testimonials — Dark cards with placeholder quotes
// ---------------------------------------------------------------------------

const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "«Placeholder: Inserte testimonio real de un cliente corporativo. Idealmente 2-3 oraciones describiendo el impacto del servicio en su organización.»",
    author: "Nombre del Ejecutivo",
    role: "Director/a de RRHH",
    company: "Empresa Fortune 500 Regional",
  },
  {
    quote:
      "«Placeholder: Segundo testimonio. Enfóquese en resultados medibles — participación del equipo, cambio cultural, ROI del evento.»",
    author: "Nombre del Ejecutivo",
    role: "Gerente General",
    company: "Banco Tier 1",
  },
  {
    quote:
      "«Placeholder: Tercer testimonio. Destaque la experiencia premium, la personalización del servicio y la profesionalidad.»",
    author: "Nombre del Ejecutivo",
    role: "VP de Talento Humano",
    company: "Corporación Industrial",
  },
] as const;

export function Testimonials() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <SectionHeading
          tag="Testimonios"
          title="Lo que dicen nuestros clientes"
          description="Cada proyecto es una relación de confianza con equipos ejecutivos que exigen excelencia."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-primary p-8 md:p-10 flex flex-col justify-between"
            >
              <p className="text-text-inverse/70 text-sm leading-relaxed italic">
                {t.quote}
              </p>
              <div className="mt-8 pt-6 border-t border-border-dark">
                <span className="block text-text-inverse font-semibold text-sm">
                  {t.author}
                </span>
                <span className="block text-text-inverse/40 text-xs mt-1">
                  {t.role}, {t.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
