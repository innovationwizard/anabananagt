"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

// ---------------------------------------------------------------------------
// Testimonials — Dark cards with placeholder quotes
// ---------------------------------------------------------------------------

const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "«Placeholder: testimonio real de un cliente. Idealmente 2-3 oraciones sobre cómo la experiencia impactó a las personas y la cultura de la organización.»",
    author: "Nombre del líder",
    role: "Dirección de RRHH",
    company: "Empresa regional",
  },
  {
    quote:
      "«Placeholder: segundo testimonio. Enfóquese en el cambio en clima, vínculos y sentido de pertenencia del equipo tras la experiencia.»",
    author: "Nombre del líder",
    role: "Gerencia General",
    company: "Grupo corporativo",
  },
  {
    quote:
      "«Placeholder: tercer testimonio. Destaque el cuidado del detalle, la personalización y el bienestar que sintieron las personas.»",
    author: "Nombre del líder",
    role: "Gerencia de Talento",
    company: "Compañía industrial",
  },
] as const;

export function Testimonials() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <SectionHeading
          tag="Testimonios"
          title="Lo que dicen quienes confían en nosotros"
          description="Cada experiencia es una relación de confianza con organizaciones que ponen a las personas en el centro."
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
