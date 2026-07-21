import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Heart, Users } from "lucide-react";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// /servicios — Pillars Hub Page (manual Ch.03 · Pilares)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Tres pilares — Desarrollo Profesional, Bienestar Corporativo y Experiencias de Integración — para transformar organizaciones desde lo humano.",
};

const SERVICES = [
  {
    icon: GraduationCap,
    slug: "desarrollo-profesional",
    title: "Desarrollo Profesional",
    tagline: "Crecer. Liderar. Comunicar.",
    description:
      "Hacemos crecer a las personas: sus capacidades, su liderazgo, su comunicación y su marca profesional. Experiencias diseñadas para desarrollar talento con impacto medible.",
    audience: "Equipos de liderazgo, ventas, comunicación y talento.",
    topics: [
      "Marca Personal",
      "LinkedIn Estratégico",
      "Storytelling",
      "Data Storytelling",
      "Cultura Organizacional",
      "Liderazgo",
      "Comunicación",
      "Ventas",
      "Negociación",
      "Reputación Profesional",
      "Desarrollo de Equipos",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: DESARROLLO PROFESIONAL
• Personas en una experiencia de aprendizaje — participación activa, energía
• Facilitación cercana, no clase magistral fría
• Ambiente de sala de trabajo cálida, luz natural
• Capturar interacción real entre participantes
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  {
    icon: Heart,
    slug: "bienestar-corporativo",
    title: "Bienestar Corporativo",
    tagline: "Cuidar. Equilibrar. Renovar.",
    description:
      "Cuidamos a las personas: su energía, su salud y su equilibrio, dentro y fuera del trabajo. Experiencias de bienestar que se sienten y se recuerdan.",
    audience: "Áreas de RRHH, cultura y bienestar; equipos completos.",
    topics: [
      "Wellness Day",
      "Masajes en oficina",
      "Aromaterapia",
      "Yoga Facial",
      "Taller de Automaquillaje",
      "Spa Corporativo",
      "Pausas Activas",
      "Activaciones de Bienestar",
      "Bienestar Integral",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: BIENESTAR CORPORATIVO
• Momento de bienestar en el entorno laboral — calma, cuidado, cercanía
• Personas relajadas y presentes (pausa activa, masaje, wellness day)
• Paleta cálida y luminosa, sensación de cuidado
• Sin poses forzadas; capturar el bienestar real
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
  {
    icon: Users,
    slug: "experiencias-de-integracion",
    title: "Experiencias de Integración",
    tagline: "Conectar. Pertenecer. Celebrar.",
    description:
      "Conectamos a las personas: creamos pertenencia, confianza y una cultura que se vive en equipo. Experiencias que unen y dejan huella.",
    audience: "Organizaciones completas, equipos y liderazgo.",
    topics: [
      "Team Building",
      "Kick Off",
      "Rallys",
      "Workshops",
      "Actividades Colaborativas",
      "Experiencias Temáticas",
      "Dinámicas de Cultura",
      "Activaciones Corporativas",
    ],
    photoInstructions: `FOTOGRAFÍA PILAR: EXPERIENCIAS DE INTEGRACIÓN
• Equipo conectando en una experiencia grupal — risas, colaboración, energía
• Team building o kick off en acción, movimiento real
• Ambiente vibrante, sentido de pertenencia visible
• Capturar el momento en que un equipo "vuelve a mirarse"
• 3000px ancho mínimo, JPEG calidad 90+`,
  },
] as const;

export default function ServiciosPage() {
  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Nuestros pilares
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-inverse leading-tight">
            Experiencias que transforman desde lo humano
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            Tres pilares para desarrollar, cuidar y conectar a las personas —
            diseñados a la medida de la realidad de cada organización.
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
                    className="inline-flex items-center mt-8 px-8 py-3 bg-highlight text-primary
                               text-sm font-semibold tracking-[0.08em] uppercase
                               hover:brightness-95 transition-all duration-300"
                  >
                    Diseñemos esta experiencia
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
