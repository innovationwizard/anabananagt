"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// FeaturedCase — Hero-sized experience preview. Contenido desde el CMS:
// el encabezado/cifras vienen del global Inicio; la experiencia es la marcada
// como «destacada» en Experiencias. Sin experiencia destacada, se muestra el
// marcador de posición (estado actual del sitio, a la espera del cliente).
// ---------------------------------------------------------------------------

type FeaturedCaseProps = {
  tag: string;
  resumen: string;
  statValor: string;
  statEtiqueta: string;
  ctaEtiqueta: string;
  experiencia: {
    titulo: string;
    href: string;
    coverUrl: string;
    coverAlt: string;
  } | null;
};

export function FeaturedCase({
  tag,
  resumen,
  statValor,
  statEtiqueta,
  ctaEtiqueta,
  experiencia,
}: FeaturedCaseProps) {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {experiencia ? (
          <Image
            src={experiencia.coverUrl}
            alt={experiencia.coverAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderMedia
            variant="photo"
            aspectRatio="auto"
            className="!rounded-none !border-0 w-full h-full"
            dark
            label="Fotografía de Experiencia"
            instructions={`EXPERIENCIA DESTACADA — Fotografía:
• Imagen de una experiencia corporativa diseñada por ana banana Experiences
• Mostrar a las personas conectando: energía, cercanía, participación real
• Ambiente cálido y humano, no montaje corporativo frío
• Iluminación natural, sin flash directo
• Alta resolución: mínimo 3000px de ancho
• Color: cálido, ligeramente desaturado`}
          />
        )}
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
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {tag}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-inverse leading-tight">
            {experiencia ? experiencia.titulo : "[Título de la experiencia]"}
          </h2>
          <p className="mt-4 text-text-inverse/60 text-lg">{resumen}</p>
          <div className="mt-4 flex items-center gap-6">
            <span className="text-highlight font-display text-2xl font-semibold">
              {statValor}
            </span>
            <span className="text-text-inverse/40 text-sm uppercase tracking-wider">
              {statEtiqueta}
            </span>
          </div>
          <Link
            href={experiencia ? experiencia.href : "/portafolio"}
            className="inline-flex items-center mt-8 px-8 py-3 border border-highlight
                       text-highlight text-sm font-semibold tracking-[0.08em] uppercase
                       hover:bg-highlight hover:text-primary transition-all duration-300"
          >
            {ctaEtiqueta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
