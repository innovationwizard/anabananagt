"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// StatsStrip — Animated counters with scroll trigger
// ---------------------------------------------------------------------------

const STATS = [
  { value: "XX+", label: "Empresas Impactadas" },
  { value: "XX+", label: "Ejecutivos Entrenados" },
  { value: "XX+", label: "Años de Experiencia" },
  { value: "XX+", label: "Países" },
] as const;

// NOTE: Replace "XX+" with real numbers once client provides them.
// These are the single most persuasive element on the page.

export function StatsStrip() {
  return (
    <section className="bg-primary grain-overlay">
      <div className="container-narrow py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <span className="block font-display text-4xl md:text-5xl font-bold text-accent">
                {value}
              </span>
              <span className="block mt-2 text-xs font-semibold tracking-[0.12em] uppercase text-text-inverse/40">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
