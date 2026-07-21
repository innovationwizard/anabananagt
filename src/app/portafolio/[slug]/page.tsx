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
    title: "Kick Off que volvió a unir a un banco regional",
    clientAlias: "Banco regional",
    industry: "Banca y Finanzas",
    serviceType: "Experiencias de Integración",
    attendance: 500,
    challenge:
      "[Placeholder] Describe el desafío del cliente. Ejemplo: tras una fusión regional, 500 personas de distintas culturas necesitaban reconocerse como un solo equipo y recuperar el sentido de pertenencia.",
    solution:
      "[Placeholder] Describe la experiencia diseñada. Ejemplo: un kick off de integración de dos días con dinámicas colaborativas, experiencias temáticas y momentos de conexión genuina.",
    results: [
      "500+ personas vivieron la experiencia de integración",
      "94% de satisfacción en la encuesta posterior",
      "Mejora percibida en pertenencia y confianza entre equipos",
    ],
    testimonial: {
      quote:
        "[Placeholder] Inserte cita real del cliente. Ejemplo: 'La experiencia de ana banana Experiences volvió a unir a nuestra gente. El cambio en el clima fue inmediato.'",
      author: "Nombre del líder",
      role: "Gerencia de Talento",
    },
  },
  "caso-2": {
    title: "Programa de bienestar para una compañía industrial",
    clientAlias: "Compañía industrial",
    industry: "Manufactura",
    serviceType: "Bienestar Corporativo",
    attendance: 120,
    challenge:
      "[Placeholder] Describe el desafío de bienestar del equipo (energía, clima, equilibrio).",
    solution:
      "[Placeholder] Describe la experiencia de bienestar diseñada por ana banana Experiences.",
    results: [
      "120 personas participaron en las activaciones de bienestar",
      "92% de satisfacción posterior",
      "Personas con más energía y sensación de ser cuidadas",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del sponsor del proyecto.",
      author: "Nombre del líder",
      role: "Dirección de RRHH",
    },
  },
  "caso-3": {
    title: "Experiencia de desarrollo para una convención nacional",
    clientAlias: "Empresa de telecomunicaciones",
    industry: "Telecomunicaciones",
    serviceType: "Desarrollo Profesional",
    attendance: 300,
    challenge:
      "[Placeholder] Describe el contexto de la convención y el objetivo de desarrollo.",
    solution:
      "[Placeholder] Describe la experiencia de desarrollo entregada, temas y formato.",
    results: [
      "300+ personas participaron en la experiencia",
      "Evaluada como #1 del evento en la encuesta de salida",
      "5 solicitudes de experiencias de seguimiento en las 2 semanas posteriores",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del organizador del evento.",
      author: "Nombre del líder",
      role: "Dirección de Eventos Corporativos",
    },
  },
  "caso-4": {
    title: "Desarrollo de marca profesional para líderes",
    clientAlias: "Firma de servicios profesionales",
    industry: "Servicios Profesionales",
    serviceType: "Desarrollo Profesional",
    attendance: 8,
    challenge:
      "[Placeholder] Describe el desafío de desarrollo y posicionamiento del equipo directivo.",
    solution:
      "[Placeholder] Describe la experiencia de desarrollo: diagnóstico, diseño y acompañamiento.",
    results: [
      "8 líderes completaron el programa de 12 semanas",
      "Presencia profesional de los participantes fortalecida",
      "3 invitaciones a paneles de industria generadas para el equipo",
    ],
    testimonial: {
      quote: "[Placeholder] Cita del sponsor del programa.",
      author: "Nombre del líder",
      role: "Dirección General",
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
                             bg-highlight/20 text-highlight">
              {c.serviceType}
            </span>
            <span className="text-xs text-text-inverse/40">{c.industry}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-text-inverse leading-tight max-w-3xl">
            {c.title}
          </h1>
          <div className="flex items-center gap-6 mt-6">
            <div>
              <span className="block text-highlight font-display text-3xl font-semibold">
                {c.attendance}+
              </span>
              <span className="text-xs text-text-inverse/40 uppercase tracking-wider">
                Personas
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
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            Resultados
          </span>
          <div className="space-y-6">
            {c.results.map((r, i) => (
              <div
                key={i}
                className="flex gap-4 items-start text-text-inverse/80"
              >
                <span className="shrink-0 w-8 h-8 flex items-center justify-center
                                 bg-highlight/10 text-highlight text-sm font-bold">
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-inverse">
              ¿Busca una experiencia como esta?
            </h2>
            <p className="mt-2 text-text-inverse/50">
              Cada experiencia inicia con una conversación.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300 shrink-0"
          >
            Conversemos
          </Link>
        </div>
      </section>
    </>
  );
}
