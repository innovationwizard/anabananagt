"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

// ---------------------------------------------------------------------------
// Testimonials — Dark cards. Contenido desde el CMS (Testimonios destacados).
// Las comillas «» las agrega el componente; la cita se guarda sin ellas.
// ---------------------------------------------------------------------------

type TestimonialsProps = {
  tag: string;
  titulo: string;
  descripcion: string;
  items: ReadonlyArray<{
    cita: string;
    autor: string;
    cargo: string;
    empresa: string;
  }>;
};

export function Testimonials({ tag, titulo, descripcion, items }: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <SectionHeading tag={tag} title={titulo} description={descripcion} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={`${t.empresa}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-primary p-8 md:p-10 flex flex-col justify-between"
            >
              <p className="text-text-inverse/70 text-sm leading-relaxed italic">
                «{t.cita}»
              </p>
              <div className="mt-8 pt-6 border-t border-border-dark">
                <span className="block text-text-inverse font-semibold text-sm">
                  {t.autor}
                </span>
                <span className="block text-text-inverse/40 text-xs mt-1">
                  {t.cargo}, {t.empresa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
