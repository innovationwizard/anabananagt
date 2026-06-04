import type { Metadata } from "next";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  GraduationCap,
  Award,
  Briefcase,
  Globe,
} from "lucide-react";

// ---------------------------------------------------------------------------
// /nosotros — About Page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conozca a Ana Gabriela — conferencista corporativa, facilitadora ejecutiva y estratega de marca con trayectoria internacional.",
};

const CREDENTIALS = [
  {
    icon: GraduationCap,
    title: "Formación Académica",
    items: [
      "Lic. Ciencias de la Comunicación y Administración Industrial",
      "MBA — Maestría en Administración de Empresas",
    ],
  },
  {
    icon: Award,
    title: "Certificaciones",
    items: [
      "Coaching Ontológico",
      "Liderazgo para la Nueva Manera de Trabajar",
      "Transformación Digital",
      "Trainer Certificada de META (Mercadeo Digital)",
      "Metodologías Ágiles",
    ],
  },
  {
    icon: Briefcase,
    title: "Experiencia Corporativa",
    items: [
      "Mercadeo y Desarrollo de Negocios",
      "User Experience (UX)",
      "Comunicación Corporativa",
      "Relaciones Públicas y Publicidad",
    ],
  },
  {
    icon: Globe,
    title: "Fundadora",
    items: [
      "Grupo anabanana, S.A.",
      "Wellnest, S.A.",
    ],
  },
] as const;

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Escuchamos. Mapeamos sus objetivos, cultura organizacional y puntos de dolor. Cada programa parte de un entendimiento profundo de su realidad.",
  },
  {
    step: "02",
    title: "Diseño a la Medida",
    description:
      "Creamos una propuesta única. Ni genérica, ni reciclada. Contenido, formato y dinámica se diseñan específicamente para su equipo.",
  },
  {
    step: "03",
    title: "Ejecución + Impacto",
    description:
      "Entregamos con estándar premium. Medimos resultados. Le acompañamos en el seguimiento post-evento para asegurar que el impacto perdure.",
  },
] as const;

export default function NosotrosPage() {
  return (
    <>
      {/* --- Hero + Bio --- */}
      <section className="bg-primary grain-overlay pt-32 pb-20 md:pb-28">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Portrait */}
            <PlaceholderMedia
              variant="photo"
              aspectRatio="3/4"
              dark
              label="Retrato Ejecutivo"
              instructions={`RETRATO EJECUTIVO — Especificaciones:
• Setup A: Headshot, contacto visual directo, expresión confiada y accesible, fondo oscuro neutro.
• Setup B: 3/4 cuerpo, postura de poder (de pie, brazos relajados o cruzados), vestuario corporativo (blazer estructurado, tonos oscuros sólidos), profundidad de campo reducida.
• Iluminación: Rembrandt o loop. Sin flash directo.
• Retoque: natural, sin filtros pesados.
• Entrega: mínimo 3000px de ancho. TIFF (master) + JPEG (web, calidad 90).`}
            />

            {/* Bio */}
            <div>
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Sobre Ana Gabriela
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-inverse leading-tight">
                Comunicadora. Facilitadora. Estratega.
              </h1>
              <div className="mt-8 space-y-4 text-text-inverse/70 leading-relaxed">
                <p>
                  Comunicadora corporativa, facilitadora ejecutiva y estratega de marca
                  con más de [X] años liderando procesos de transformación en empresas
                  de alto rendimiento.
                </p>
                <p>
                  Como fundadora de Grupo anabanana, S.A. y Wellnest, S.A., ha
                  diseñado y ejecutado programas de entrenamiento, conferencias y
                  consultorías estratégicas para organizaciones que exigen resultados
                  medibles — desde programas de marca personal para equipos de liderazgo
                  hasta estrategias de comunicación corporativa para compañías con
                  presupuestos superiores al millón de quetzales.
                </p>
                <p>
                  A lo largo de su trayectoria, ha liderado áreas de Mercadeo,
                  Desarrollo de Negocios, User Experience, Comunicación, Relaciones
                  Públicas y Publicidad. Como facilitadora y conferencista, ha
                  compartido escenario en foros nacionales e internacionales sobre
                  Identidad Digital, Storytelling Corporativo y Marca Personal
                  Ejecutiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Credentials Grid --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <SectionHeading
            tag="Trayectoria"
            title="Formación y credenciales"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CREDENTIALS.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="p-8 bg-white border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold text-primary">
                    {title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-text-muted leading-relaxed pl-4
                                 border-l-2 border-accent/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Methodology --- */}
      <section className="section-padding bg-primary grain-overlay">
        <div className="container-narrow">
          <SectionHeading
            tag="Metodología"
            title="Cómo trabajamos"
            description="Un proceso riguroso diseñado para generar impacto real — no eventos genéricos."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {METHODOLOGY_STEPS.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <span className="block font-display text-6xl font-bold text-accent/15 mb-2">
                  {step}
                </span>
                <h3 className="font-display text-xl font-bold text-text-inverse mt-[-0.5rem]">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-text-inverse/50 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
