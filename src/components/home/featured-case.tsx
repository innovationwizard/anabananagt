"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// FeaturedCase — Hero-sized case study preview
// ---------------------------------------------------------------------------

export function FeaturedCase() {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0">
        <PlaceholderMedia
          variant="photo"
          aspectRatio="auto"
          className="!rounded-none !border-0 w-full h-full"
          dark
          label="Fotografía de Evento"
          instructions={`CASO DE ÉXITO DESTACADO — Fotografía:
• Imagen panorámica de un evento corporativo ejecutado por anabanana
• Mostrar escala: auditorio lleno, producción profesional
• Ángulo desde el fondo del salón hacia el escenario
• Iluminación ambiental, sin flash directo
• Alta resolución: mínimo 3000px de ancho
• Color: alto contraste, ligeramente desaturado`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Caso Destacado
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-inverse leading-tight">
            [Título del Caso de Éxito]
          </h2>
          <p className="mt-4 text-text-inverse/60 text-lg">
            Placeholder — Breve resumen del impacto: número de participantes,
            tipo de evento, resultado clave medible.
          </p>
          <div className="mt-4 flex items-center gap-6">
            <span className="text-accent font-display text-2xl font-bold">
              XX+
            </span>
            <span className="text-text-inverse/40 text-sm uppercase tracking-wider">
              Participantes
            </span>
          </div>
          <Link
            href="/portafolio"
            className="inline-flex items-center mt-8 px-8 py-3 border border-accent
                       text-accent text-sm font-semibold tracking-[0.08em] uppercase
                       hover:bg-accent hover:text-primary transition-all duration-300"
          >
            Ver Caso Completo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
