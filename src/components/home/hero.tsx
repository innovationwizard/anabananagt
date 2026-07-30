"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// Hero — Full-viewport dark hero with video placeholder + staggered text
// ---------------------------------------------------------------------------

const STAGGER_DELAY = 0.15;

// Client-provided brand logos ("Marcas que han confiado en nosotros").
const BRANDS = [
  { src: "/brands/5b.png", alt: "5B" },
  { src: "/brands/clarity-law.png", alt: "Clarity Law" },
  { src: "/brands/rosal.png", alt: "Rosal" },
  { src: "/brands/pradera-concepcion.png", alt: "Pradera Concepción" },
  { src: "/brands/spectrum-brands.png", alt: "Spectrum Brands" },
  { src: "/brands/dorival.png", alt: "Dorival" },
  { src: "/brands/fundacion-novella.png", alt: "Fundación Carlos F. Novella" },
  { src: "/brands/intcomex.png", alt: "Intcomex" },
  { src: "/brands/bayer.png", alt: "Bayer" },
  { src: "/brands/mariscal.png", alt: "Distribuidora Mariscal" },
  { src: "/brands/oster.png", alt: "Oster" },
  { src: "/brands/canesten.png", alt: "Canesten" },
  { src: "/brands/bantrab.png", alt: "Bantrab" },
  { src: "/brands/ifx.png", alt: "ifx" },
] as const;

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
          className="inline-block text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        >
          Experiencias corporativas · Desde lo humano
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 1, duration: 0.8 }}
          className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-text-inverse
                     leading-[1.08] text-balance max-w-4xl mx-auto"
        >
          Las empresas crecen cuando{" "}
          <span className="italic text-highlight">las personas crecen.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 2, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-text-inverse/60 max-w-2xl mx-auto leading-relaxed"
        >
          Diseñamos experiencias corporativas personalizadas que desarrollan
          personas, impulsan el bienestar y fortalecen la cultura de su
          organización.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER_DELAY * 3, duration: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300"
          >
            Agenda una conversación
          </Link>
        </motion.div>

        {/* --- Trust Bar (Client Logos) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: STAGGER_DELAY * 5, duration: 1 }}
          className="mt-20 pt-10 border-t border-text-inverse/10"
        >
          <span className="block text-xs text-text-inverse/40 tracking-[0.18em] uppercase">
            Marcas que han confiado en nosotros
          </span>
          <p className="mt-3 text-sm text-text-inverse/50 max-w-2xl mx-auto leading-relaxed">
            Cada experiencia ha sido diseñada a la medida de las personas, los
            objetivos y la cultura de cada organización.
          </p>
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {BRANDS.map((b) => (
              <div
                key={b.alt}
                className="flex items-center justify-center rounded-lg bg-white px-4 py-3"
              >
                <div className="relative h-9 w-full">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 640px) 30vw, (max-width: 768px) 22vw, 130px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
