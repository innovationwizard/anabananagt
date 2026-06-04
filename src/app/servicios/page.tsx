import type { Metadata } from "next";
import Link from "next/link";
import { Mic2, Users, Compass } from "lucide-react";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// /servicios — Services Hub Page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Keynotes, talleres corporativos y consultoría estratégica. Servicios de transformación ejecutiva diseñados a la medida de su organización.",
};

const SERVICES = [
  {
    icon: Mic2,
    slug: "keynotes",
    title: "Keynotes y Conferencias",
    tagline: "Inspirar. Provocar. Movilizar.",
    description:
      "Conferencias magistrales de 45 a 90 minutos diseñadas para eventos corporativos, convenciones y cumbres de liderazgo. Cada keynote se personaliza para su industria, cultura y objetivos estratégicos.",
    audience: "Eventos corporativos de 50 a 5,000+ asistentes",
    topics: [
      "Marca Personal Ejecutiva",
      "Comunicación Corporativa de Alto Impacto",
      "Identidad Digital y Reputación",
      "Liderazgo y Transformación Cultural",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: KEYNOTES
• Ana en el escenario, hablando ante una audiencia corporativa grande
• Ángulo desde un costado del escenario, capturando tanto a la speaker como al público
• Iluminación de escenario dramática, fondo oscuro
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  {
    icon: Users,
    slug: "talleres-corporativos",
    title: "Talleres Corporativos",
    tagline: "Entrenar. Practicar. Transformar.",
    description:
      "Programas de entrenamiento inmersivos de medio día o día completo para equipos de 15 a 500+ participantes. Metodología práctica con dinámicas, ejercicios y planes de acción individuales.",
    audience: "Equipos de liderazgo, ventas, RRHH y marketing",
    topics: [
      "Personal Branding para Equipos",
      "Storytelling para Equipos de Ventas",
      "LinkedIn Estratégico",
      "Negociación y Prospección",
      "Identidad, Imagen y Reputación",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: TALLERES
• Grupo de ejecutivos en un taller interactivo — manos activas, colaboración visible
• Sala de entrenamiento corporativa premium
• Ana facilitando, de pie, interactuando con los participantes
• Capturar materiales de trabajo sobre la mesa (post-its, workbooks branded)
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  {
    icon: Compass,
    slug: "consultoria-estrategica",
    title: "Consultoría Estratégica",
    tagline: "Diagnosticar. Diseñar. Acompañar.",
    description:
      "Asesoría ejecutiva personalizada para líderes y equipos de dirección. Desde auditorías de comunicación corporativa hasta estrategias integrales de marca y presencia digital.",
    audience: "C-suite, directores y equipos de liderazgo",
    topics: [
      "Estrategia de Marca Corporativa",
      "Auditoría de Comunicación",
      "Transformación de Presencia Digital",
      "Coaching Ejecutivo (Ontológico)",
    ],
    photoInstructions: `FOTOGRAFÍA SERVICIO: CONSULTORÍA
• Reunión ejecutiva en sala de juntas premium — 2-4 personas
• Ana en conversación 1:1 o small group, ambiente de confianza
• Mesa de conferencia de alta gama, iluminación natural lateral
• Enfoque en gestos de comunicación, sin posar
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
] as const;

export default function ServiciosPage() {
  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Servicios
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverse leading-tight">
            Transformación ejecutiva a la medida
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            Tres pilares de servicio diseñados para organizaciones que no buscan
            eventos genéricos — buscan resultados.
          </p>
        </div>
      </section>

      {/* --- Service Cards --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow space-y-16 md:space-y-24">
          {SERVICES.map(
            (
              {
                icon: Icon,
                slug,
                title,
                tagline,
                description,
                audience,
                topics,
                photoInstructions,
              },
              i,
            ) => (
              <div
                key={slug}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center
                  ${i % 2 === 1 ? "md:[direction:rtl] md:[&>*]:[direction:ltr]" : ""}`}
              >
                {/* Image */}
                <PlaceholderMedia
                  variant="photo"
                  aspectRatio="4/3"
                  dark={false}
                  label={title}
                  instructions={photoInstructions}
                />

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
                      {tagline}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">
                    {title}
                  </h2>

                  <p className="mt-4 text-text-muted leading-relaxed">
                    {description}
                  </p>

                  <div className="mt-6 p-4 bg-primary/5 border-l-2 border-accent">
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary/50">
                      Para quién
                    </span>
                    <p className="mt-1 text-sm text-primary">{audience}</p>
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary/50 mb-2 block">
                      Temas
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 text-xs bg-primary/5 text-primary/80
                                     border border-border"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="inline-flex items-center mt-8 px-8 py-3 bg-accent text-primary
                               text-sm font-semibold tracking-[0.08em] uppercase
                               hover:bg-accent-hover transition-colors duration-300"
                  >
                    Solicitar Propuesta
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}
