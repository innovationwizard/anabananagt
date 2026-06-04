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
  keynotes: {
    title: "Keynotes y Conferencias",
    tagline: "Inspirar. Provocar. Movilizar.",
    description:
      "Conferencias magistrales de 45 a 90 minutos diseñadas para transformar la manera en que su equipo piensa, se comunica y se posiciona. Cada keynote es una pieza única — investigada, contextualizada y adaptada a la cultura, industria y objetivos estratégicos de su organización.",
    audience:
      "Eventos corporativos de 50 a 5,000+ asistentes. Convenciones anuales, cumbres de liderazgo, kick-offs de ventas, y eventos de marca empleadora.",
    deliverables: [
      "Keynote de 45-90 minutos (presencial, virtual o híbrido)",
      "Pre-producción: reunión de briefing con equipo organizador",
      "Material de apoyo visual (presentación branded)",
      "Sesión de Q&A post-conferencia (30 min)",
      "Grabación autorizada para uso interno",
    ],
    outcomes: [
      "Alineación del equipo en torno a un mensaje estratégico unificado",
      "Activación de cambio cultural a través de narrativas poderosas",
      "Posicionamiento de la marca empleadora ante audiencias internas y externas",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: KEYNOTES
• Ana en el escenario de un auditorio corporativo grande (500+ asientos)
• Ángulo lateral que capture speaker + audiencia en el mismo frame
• Iluminación de escenario dramática, fondo oscuro
• Segundo shot: close-up de Ana hablando, expresión apasionada y profesional
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  "talleres-corporativos": {
    title: "Talleres Corporativos",
    tagline: "Entrenar. Practicar. Transformar.",
    description:
      "Programas de entrenamiento inmersivos donde los participantes no solo aprenden — practican, reciben feedback y salen con un plan de acción individual. Cada taller combina teoría, dinámica grupal y ejercicios prácticos calibrados al nivel y contexto de su equipo.",
    audience:
      "Equipos de liderazgo, ventas, marketing, RRHH y comunicación. Grupos de 15 a 500+ participantes. Empresas con facturación anual superior a Q50M.",
    deliverables: [
      "Programa de medio día o día completo (presencial o virtual)",
      "Diagnóstico pre-taller: encuesta o entrevistas con stakeholders clave",
      "Material de trabajo para participantes (workbook branded)",
      "Facilitación con dinámicas interactivas y ejercicios prácticos",
      "Reporte post-taller: observaciones, recomendaciones, próximos pasos",
    ],
    outcomes: [
      "Equipos con herramientas prácticas aplicables desde el día siguiente",
      "Mejora medible en métricas de comunicación, ventas o liderazgo",
      "Cohesión de equipo fortalecida a través de la experiencia compartida",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: TALLERES CORPORATIVOS
• Grupo de 20-30 ejecutivos en mesa de trabajo colaborativo
• Ana de pie facilitando, interactuando directamente con participantes
• Capturar materiales branded sobre la mesa (workbooks, post-its, markers)
• Ambiente de hotel business center o sala de entrenamiento premium
• Segundo shot: participantes en dinámica grupal, energía visible
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  "consultoria-estrategica": {
    title: "Consultoría Estratégica",
    tagline: "Diagnosticar. Diseñar. Acompañar.",
    description:
      "Asesoría personalizada para líderes y equipos de dirección que necesitan claridad estratégica en comunicación, marca y posicionamiento. No es coaching genérico — es un diagnóstico riguroso, un plan de acción concreto y acompañamiento en la ejecución.",
    audience:
      "C-suite, directores y equipos de liderazgo. Empresas en procesos de transformación, reposicionamiento de marca, o preparación para expansión regional/internacional.",
    deliverables: [
      "Sesión de diagnóstico estratégico (2-4 horas)",
      "Auditoría de comunicación corporativa y presencia digital",
      "Plan estratégico de marca / comunicación (documento ejecutivo)",
      "Sesiones de acompañamiento (retainer mensual o por proyecto)",
      "Coaching ejecutivo individual (metodología ontológica)",
    ],
    outcomes: [
      "Claridad estratégica en posicionamiento y comunicación de marca",
      "Plan de acción ejecutable con métricas y timeline",
      "Líderes más efectivos en su comunicación interna y externa",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: CONSULTORÍA ESTRATÉGICA
• Reunión ejecutiva en sala de juntas premium — Ana con 2-3 ejecutivos
• Ambiente de confianza: conversación natural, no posada
• Mesa de conferencia de alta gama, iluminación natural lateral
• Segundo shot: Ana revisando documentos o presentación con un ejecutivo 1:1
• Detalles: laptops, café, documentos estratégicos sobre la mesa
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
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {svc.tagline}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-inverse leading-tight">
                {svc.title}
              </h1>
              <p className="mt-6 text-text-inverse/60 leading-relaxed">
                {svc.description}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center mt-8 px-8 py-3 bg-accent text-primary
                           text-sm font-semibold tracking-[0.08em] uppercase
                           hover:bg-accent-hover transition-colors duration-300"
              >
                Solicitar Propuesta
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-inverse">
            ¿Este servicio es lo que su equipo necesita?
          </h2>
          <p className="mt-4 text-text-inverse/50 max-w-xl mx-auto">
            Agende una consulta privada. Evaluaremos sus objetivos y le enviaremos
            una propuesta personalizada.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center mt-8 px-10 py-4 bg-accent text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:bg-accent-hover transition-colors duration-300"
          >
            Agendar Consulta
          </Link>
        </div>
      </section>
    </>
  );
}
