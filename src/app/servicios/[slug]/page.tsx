import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// /servicios/[slug] — Individual Service Page
// Data will come from Sanity once populated. For now, static placeholders.
// ---------------------------------------------------------------------------

const SERVICES_DATA: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    audience: string;
    deliverables: string[];
    outcomes: string[];
    photoInstructions: string;
  }
> = {
  "desarrollo-profesional": {
    title: "Desarrollo Profesional",
    tagline: "Crecer. Liderar. Comunicar.",
    description:
      "Experiencias diseñadas para hacer crecer a las personas —sus capacidades, su liderazgo, su comunicación y su marca profesional. Cada programa se construye a partir del contexto real de su equipo, no de un catálogo.",
    audience:
      "Equipos de liderazgo, ventas, comunicación, RRHH y talento que quieren desarrollar capacidades con impacto medible.",
    deliverables: [
      "Diagnóstico previo: objetivos, contexto y cultura del equipo",
      "Experiencia a la medida (presencial, virtual o híbrida)",
      "Facilitación con dinámicas prácticas y aplicables",
      "Material de apoyo para participantes",
      "Seguimiento y recomendaciones post-experiencia",
    ],
    outcomes: [
      "Personas con nuevas capacidades de liderazgo y comunicación",
      "Equipos más alineados y con una marca profesional más fuerte",
      "Aprendizaje que se aplica desde el día siguiente",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: DESARROLLO PROFESIONAL
• Personas en una experiencia de aprendizaje — participación activa, energía
• Facilitación cercana, no clase magistral fría
• Ambiente de sala de trabajo cálida, luz natural
• Segundo shot: interacción real entre participantes
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  "bienestar-corporativo": {
    title: "Bienestar Corporativo",
    tagline: "Cuidar. Equilibrar. Renovar.",
    description:
      "Experiencias de bienestar que cuidan la energía, la salud y el equilibrio de las personas, dentro y fuera del trabajo. Bienestar que se siente, no que se anuncia.",
    audience:
      "Áreas de RRHH, cultura y bienestar que quieren cuidar a su gente de forma genuina y memorable.",
    deliverables: [
      "Diseño de la experiencia según el momento del equipo",
      "Activaciones de bienestar (wellness day, pausas activas, spa corporativo y más)",
      "Facilitadores y especialistas de bienestar",
      "Producción y cuidado del detalle en sitio",
      "Cierre con sensación de cuidado y renovación",
    ],
    outcomes: [
      "Personas con más energía, equilibrio y sensación de ser cuidadas",
      "Un clima laboral más sano y humano",
      "Bienestar percibido que fortalece el orgullo de pertenecer",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: BIENESTAR CORPORATIVO
• Momento de bienestar en el entorno laboral — calma, cuidado, cercanía
• Personas relajadas y presentes (pausa activa, masaje, wellness day)
• Paleta cálida y luminosa, sensación de cuidado
• Segundo shot: detalle de una activación de bienestar
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  "experiencias-de-integracion": {
    title: "Experiencias de Integración",
    tagline: "Conectar. Pertenecer. Celebrar.",
    description:
      "Experiencias que conectan a las personas: crean pertenencia, confianza y una cultura que se vive en equipo. El momento en que un equipo vuelve a mirarse.",
    audience:
      "Organizaciones y equipos que quieren fortalecer vínculos, confianza y sentido de pertenencia.",
    deliverables: [
      "Diseño temático a la medida de la cultura y el objetivo",
      "Experiencias de integración (team building, kick off, rallys, activaciones)",
      "Facilitación y dinámicas colaborativas",
      "Producción integral del evento o experiencia",
      "Momentos memorables con propósito, no solo entretenimiento",
    ],
    outcomes: [
      "Equipos más unidos, con más confianza y pertenencia",
      "Una cultura que se vive y se recuerda",
      "Vínculos que sostienen la colaboración en el día a día",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: EXPERIENCIAS DE INTEGRACIÓN
• Equipo conectando en una experiencia grupal — risas, colaboración, energía
• Team building o kick off en acción, movimiento real
• Ambiente vibrante, sentido de pertenencia visible
• Segundo shot: el momento en que un equipo "vuelve a mirarse"
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES_DATA[slug];
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.description.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const svc = SERVICES_DATA[slug];
  if (!svc) notFound();

  return (
    <>
      {/* --- Hero --- */}
      <section className="relative bg-primary grain-overlay pt-32 pb-20 md:pb-28">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="inline-block text-highlight text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {svc.tagline}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-inverse leading-tight">
                {svc.title}
              </h1>
              <p className="mt-6 text-text-inverse/60 leading-relaxed">
                {svc.description}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center mt-8 px-8 py-3 bg-highlight text-primary
                           text-sm font-semibold tracking-[0.08em] uppercase
                           hover:brightness-95 transition-all duration-300"
              >
                Diseñemos esta experiencia
              </Link>
            </div>
            <PlaceholderMedia
              variant="photo"
              aspectRatio="4/3"
              dark
              label={svc.title}
              instructions={svc.photoInstructions}
            />
          </div>
        </div>
      </section>

      {/* --- Audience --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Para Quién
          </span>
          <p className="text-lg text-primary leading-relaxed">{svc.audience}</p>
        </div>
      </section>

      {/* --- Deliverables + Outcomes --- */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Deliverables */}
            <div>
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                Qué Incluye
              </span>
              <div className="space-y-4">
                {svc.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 text-sm text-text-muted leading-relaxed"
                  >
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center
                                     bg-accent/10 text-accent text-xs font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div>
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                Resultados Esperados
              </span>
              <div className="space-y-4">
                {svc.outcomes.map((item, i) => (
                  <div
                    key={i}
                    className="pl-4 border-l-2 border-accent/30 text-sm text-text-muted leading-relaxed"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-primary grain-overlay py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-inverse">
            ¿Es esta la experiencia que su equipo necesita?
          </h2>
          <p className="mt-4 text-text-inverse/50 max-w-xl mx-auto">
            Conversemos. Escuchamos sus objetivos y diseñamos una experiencia a la
            medida de su organización.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center mt-8 px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300"
          >
            Conversemos
          </Link>
        </div>
      </section>
    </>
  );
}
