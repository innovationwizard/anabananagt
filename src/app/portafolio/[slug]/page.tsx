import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// /portafolio/[slug] — Case Study Detail Page
// Placeholder data — replaced by Sanity once populated.
// ---------------------------------------------------------------------------

const CASES_DATA: Record<
  string,
  {
    title: string;
    clientAlias: string;
    industry: string;
    serviceType: string;
    attendance: number;
    challenge: string;
    solution: string;
    results: string[];
    testimonial: { quote: string; author: string; role: string };
  }
> = {
  "caso-1": {
    title: "Evento Integral de Liderazgo para Banco Tier 1 Regional",
    clientAlias: "Banco Tier 1 Regional",
    industry: "Banca y Finanzas",
    serviceType: "Evento Integral",
    attendance: 500,
    challenge:
      "[Placeholder] Describe el desafío específico que enfrentaba el cliente. Ejemplo: El equipo de liderazgo de 500 ejecutivos necesitaba alinearse en torno a la nueva estrategia digital del banco tras una fusión regional.",
    solution:
      "[Placeholder] Describe la solución entregada. Ejemplo: Diseñamos un programa de dos días que combinó keynotes sobre transformación digital, talleres de marca personal para líderes, y sesiones de coaching ejecutivo.",
    results: [
      "500+ ejecutivos participaron en el programa de 2 días",
      "94% de satisfacción en encuesta post-evento",
      "Incremento del 35% en engagement de marca empleadora (medido a 90 días)",
    ],
    testimonial: {
      quote:
        "[Placeholder] Inserte cita real del cliente. Ejemplo: 'El programa de anabanana transformó la manera en que nuestros líderes se comunican. El impacto fue inmediato y medible.'",
      author: "Nombre del Ejecutivo",
      role: "VP de Talento Humano",
    },
  },
  "caso-2": {
    title: "Taller de Storytelling para Equipo Comercial",
    clientAlias: "Corporación Industrial",
    industry: "Manufactura",
    serviceType: "Taller Corporativo",
    attendance: 120,
    challenge:
      "[Placeholder] Describe el desafío del cliente en ventas, comunicación o liderazgo.",
    solution:
      "[Placeholder] Describe el programa diseñado y ejecutado por anabanana.",
    results: [
      "120 vendedores entrenados en storytelling de ventas",
      "92% de satisfacción post-taller",
      "Pipeline de ventas incrementó 22% en el trimestre siguiente",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del sponsor del proyecto.",
      author: "Nombre del Ejecutivo",
      role: "Director Comercial",
    },
  },
  "caso-3": {
    title: "Keynote de Identidad Digital para Convención Nacional",
    clientAlias: "Empresa de Telecomunicaciones",
    industry: "Telecomunicaciones",
    serviceType: "Keynote",
    attendance: 300,
    challenge:
      "[Placeholder] Describe el contexto de la convención y el objetivo del keynote.",
    solution:
      "[Placeholder] Describe el keynote entregado, temas cubiertos, y formato.",
    results: [
      "300+ ejecutivos presentes en la convención",
      "Keynote evaluada como #1 del evento en encuesta de salida",
      "5 solicitudes de taller de seguimiento generadas en las 2 semanas posteriores",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del organizador del evento.",
      author: "Nombre del Ejecutivo",
      role: "Directora de Eventos Corporativos",
    },
  },
  "caso-4": {
    title: "Consultoría de Marca Personal para C-Suite",
    clientAlias: "Firma de Servicios Profesionales",
    industry: "Servicios Profesionales",
    serviceType: "Consultoría",
    attendance: 8,
    challenge:
      "[Placeholder] Describe el desafío de posicionamiento del equipo directivo.",
    solution:
      "[Placeholder] Describe el programa de consultoría: diagnóstico, plan, ejecución.",
    results: [
      "8 socios del C-suite completaron el programa de 12 semanas",
      "LinkedIn engagement de los participantes creció 4x",
      "3 invitaciones a paneles de industria generadas para los socios",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del managing partner.",
      author: "Nombre del Socio",
      role: "Managing Partner",
    },
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(CASES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES_DATA[slug];
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.clientAlias} — ${c.serviceType}. ${c.results[0]}`,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const c = CASES_DATA[slug];
  if (!c) notFound();

  return (
    <>
      {/* --- Hero --- */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <PlaceholderMedia
            variant="photo"
            aspectRatio="auto"
            className="!rounded-none !border-0 w-full h-full"
            dark
            label="Fotografía del Evento"
            instructions={`FOTOGRAFÍA CASO: ${c.clientAlias}
• Wide shot panorámico del evento/sesión
• Mostrar escala: audiencia de ${c.attendance}+ personas
• Alto contraste, ligeramente desaturado
• Mínimo 3000px de ancho, JPEG calidad 90+`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
        </div>

        <div className="relative z-10 container-narrow py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase
                             bg-accent/20 text-accent">
              {c.serviceType}
            </span>
            <span className="text-xs text-text-inverse/40">{c.industry}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-text-inverse leading-tight max-w-3xl">
            {c.title}
          </h1>
          <div className="flex items-center gap-6 mt-6">
            <div>
              <span className="block text-accent font-display text-3xl font-bold">
                {c.attendance}+
              </span>
              <span className="text-xs text-text-inverse/40 uppercase tracking-wider">
                Participantes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Challenge / Solution --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <div className="space-y-12">
            <div>
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                El Desafío
              </span>
              <p className="text-primary leading-relaxed">{c.challenge}</p>
            </div>
            <div>
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                La Solución
              </span>
              <p className="text-primary leading-relaxed">{c.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Results --- */}
      <section className="section-padding bg-primary grain-overlay">
        <div className="container-narrow max-w-3xl">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            Resultados
          </span>
          <div className="space-y-6">
            {c.results.map((r, i) => (
              <div
                key={i}
                className="flex gap-4 items-start text-text-inverse/80"
              >
                <span className="shrink-0 w-8 h-8 flex items-center justify-center
                                 bg-accent/10 text-accent text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-lg leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonial --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-2xl text-center">
          <p className="font-display text-xl md:text-2xl text-primary italic leading-relaxed">
            &ldquo;{c.testimonial.quote}&rdquo;
          </p>
          <div className="mt-6">
            <span className="block font-semibold text-primary">
              {c.testimonial.author}
            </span>
            <span className="text-sm text-text-muted">
              {c.testimonial.role}, {c.clientAlias}
            </span>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-primary grain-overlay py-16 md:py-20">
        <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-inverse">
              ¿Busca resultados similares?
            </h2>
            <p className="mt-2 text-text-inverse/50">
              Cada proyecto inicia con una conversación.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center px-10 py-4 bg-accent text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:bg-accent-hover transition-colors duration-300 shrink-0"
          >
            Agendar Consulta
          </Link>
        </div>
      </section>
    </>
  );
}
