import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EXPERIENCES, PILLAR_LABELS } from "@/lib/experiences";

// ---------------------------------------------------------------------------
// /portafolio — Experiences listing
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Experiencias corporativas de desarrollo, bienestar e integración que transforman equipos y culturas desde lo humano.",
};

export default function PortafolioPage() {
  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Experiencias
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-inverse leading-tight">
            Experiencias que dejan huella
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            Una selección de experiencias corporativas que transformaron equipos y culturas desde lo humano.
          </p>
        </div>
      </section>

      {/* --- Experiences Grid --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERIENCES.map((exp) => (
              <Link
                key={exp.slug}
                href={`/portafolio/${exp.slug}`}
                className="group block bg-white border border-border
                           hover:border-accent/30 hover:shadow-lg
                           transition-all duration-500 overflow-hidden"
              >
                {/* Cover */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                  <Image
                    src={exp.cover}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase
                                   text-accent bg-accent/10 px-2 py-0.5">
                    {PILLAR_LABELS[exp.pillar]}
                  </span>

                  <h3 className="mt-4 font-display text-xl font-semibold text-primary
                                 group-hover:text-accent transition-colors duration-300">
                    {exp.title}
                  </h3>

                  <span className="inline-block mt-4 text-xs font-semibold tracking-[0.1em]
                                   uppercase text-text-muted group-hover:text-accent
                                   transition-colors duration-300">
                    Ver experiencia →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
