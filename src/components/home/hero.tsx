"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// Hero — Full-viewport dark hero with video placeholder + staggered text
// ---------------------------------------------------------------------------

const STAGGER_DELAY = 0.15;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* --- Background (placeholder for video) --- */}
      <div className="absolute inset-0 z-0">
        <PlaceholderMedia
          variant="video"
          aspectRatio="auto"
          className="!rounded-none !border-0 w-full h-full"
          dark
          label="Hero Video"
          instructions={`HERO VIDEO — Especificaciones:
• 4K (3840×2160), 60fps, loop de 8-12 segundos
• Contenido: Dolly lento a través de espacio corporativo premium — salón de eventos, auditorio ejecutivo
• Iluminación dramática, tenue. Sin rostros en foco.
• Capturar: rigs de iluminación de escenario, sillas ejecutivas vacías, líneas arquitectónicas del venue
• Color grade: desaturado, tonos fríos (navy/charcoal). Ligeramente subexpuesto.
• Entrega: .mp4 (H.264, CRF 23) + .webm (VP9), máximo 8MB por archivo
• El overlay oscuro se aplica por CSS — no oscurecer el video en postproducción.`}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        {/* Grain texture */}
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 container-narrow text-center px-6 py-32">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 0, duration: 0.7 }}
          className="inline-block text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        >
          Keynotes · Facilitación · Entrenamiento Ejecutivo
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 1, duration: 0.8 }}
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-text-inverse
                     leading-[1.08] text-balance max-w-4xl mx-auto"
        >
          Transformamos el talento de su equipo en resultados corporativos medibles.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 2, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-text-inverse/60 max-w-2xl mx-auto leading-relaxed"
        >
          Conferencias, talleres y consultoría estratégica para las empresas
          más exigentes de la región.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 3, duration: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center px-10 py-4 bg-accent text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:bg-accent-hover transition-colors duration-300"
          >
            Agendar Consulta Privada
          </Link>
        </motion.div>

        {/* --- Trust Bar (Client Logos) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: STAGGER_DELAY * 5, duration: 1 }}
          className="mt-20 pt-10 border-t border-text-inverse/10"
        >
          <span className="text-xs text-text-inverse/30 tracking-[0.15em] uppercase">
            Confían en nosotros
          </span>
          <div className="mt-6 flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-10 rounded bg-text-inverse/5 border border-text-inverse/10
                           flex items-center justify-center"
              >
                <span className="text-[10px] text-text-inverse/20 uppercase tracking-wider">
                  Logo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
