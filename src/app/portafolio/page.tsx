import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// /portafolio — Portfolio Listing Page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Experiencias corporativas de desarrollo, bienestar e integración que transformaron equipos y culturas desde lo humano.",
};

// Placeholder experiences — replaced by Sanity content once populated
const PLACEHOLDER_CASES = [
  {
    slug: "caso-1",
    clientAlias: "Banco regional",
    industry: "Banca y Finanzas",
    serviceType: "Experiencias de Integración",
    metric: "500+ personas",
  },
  {
    slug: "caso-2",
    clientAlias: "Compañía industrial",
    industry: "Manufactura",
    serviceType: "Bienestar Corporativo",
    metric: "92% satisfacción",
  },
  {
    slug: "caso-3",
    clientAlias: "Empresa de telecomunicaciones",
    industry: "Telecomunicaciones",
    serviceType: "Desarrollo Profesional",
    metric: "300+ personas",
  },
  {
    slug: "caso-4",
    clientAlias: "Firma de servicios profesionales",
    industry: "Servicios Profesionales",
    serviceType: "Desarrollo Profesional",
    metric: "12 semanas",
  },
] as const;

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

      {/* --- Case Study Grid --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PLACEHOLDER_CASES.map(
              ({ slug, clientAlias, industry, serviceType, metric }) => (
                <Link
                  key={slug}
                  href={`/portafolio/${slug}`}
                  className="group block bg-white border border-border
                             hover:border-accent/30 hover:shadow-lg
                             transition-all duration-500 overflow-hidden"
                >
                  {/* Image */}
                  <PlaceholderMedia
                    variant="photo"
                    aspectRatio="16/10"
                    dark={false}
                    label={clientAlias}
                    className="!rounded-none !border-0 !border-b border-border"
                    instructions={`FOTOGRAFÍA EXPERIENCIA: ${clientAlias}
• Imagen principal del evento o sesión
• Wide shot que muestre escala y producción
• Alto contraste, ligeramente desaturado
• Mínimo 3000px de ancho`}
                  />

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase
                                       text-accent bg-accent/10 px-2 py-0.5">
                        {serviceType}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-text-muted">
                        {industry}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-primary
                                   group-hover:text-accent transition-colors duration-300">
                      {clientAlias}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-accent font-display text-lg font-bold">
                        {metric}
                      </span>
                    </div>

                    <span className="inline-block mt-4 text-xs font-semibold tracking-[0.1em]
                                     uppercase text-text-muted group-hover:text-accent
                                     transition-colors duration-300">
                      Ver experiencia →
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
