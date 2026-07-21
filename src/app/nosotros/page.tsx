import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import { SectionHeading } from "@/components/ui/section-heading";
import { Heart, Users, Sparkles, Lightbulb, Award } from "lucide-react";

// ---------------------------------------------------------------------------
// /nosotros — About: the Ana Banana Experiences brand (manual Ch.01–02, 04)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Ana Banana Experiences diseña experiencias corporativas que transforman organizaciones desde lo humano. Esencia, valores y arquetipos de la marca.",
};

// Valores (manual Ch.02 · Valores) — descriptions verbatim
const VALORES = [
  {
    icon: Heart,
    title: "Humanidad",
    description:
      "Ponemos a las personas en el centro de cada experiencia, creando espacios donde puedan crecer, conectar y sentirse valoradas.",
  },
  {
    icon: Users,
    title: "Conexión",
    description:
      "Fomentamos relaciones auténticas que fortalecen la colaboración, la confianza y el sentido de pertenencia dentro de las organizaciones.",
  },
  {
    icon: Sparkles,
    title: "Transformación",
    description:
      "Diseñamos experiencias con propósito que generan cambios positivos y duraderos en las personas, los equipos y la cultura organizacional.",
  },
  {
    icon: Lightbulb,
    title: "Creatividad",
    description:
      "Desarrollamos experiencias innovadoras y personalizadas que responden a las necesidades de cada organización.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description:
      "Trabajamos con profesionalismo y atención al detalle para ofrecer experiencias de alto valor e impacto.",
  },
] as const;

// Arquetipos (manual Ch.02 · Arquetipos) — descriptions verbatim
const ARQUETIPOS = [
  {
    title: "El Cuidador",
    description:
      "Existe para proteger, acompañar y hacer sentir bien a las personas. Es la raíz de nuestra empatía y de nuestro foco en el bienestar.",
  },
  {
    title: "El Creador",
    description:
      "Aporta la imaginación y el diseño. Nos impulsa a construir experiencias originales, memorables y a medida, en lugar de repetir fórmulas.",
  },
  {
    title: "El Sabio",
    description:
      "Aporta criterio, estrategia y credibilidad. Es la razón por la que trabajamos desde el porqué y no solo desde la actividad.",
  },
] as const;

export default function NosotrosPage() {
  return (
    <>
      {/* --- Hero + Historia --- */}
      <section className="bg-primary grain-overlay pt-32 pb-20 md:pb-28">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block text-highlight text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Quiénes somos
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-inverse leading-tight">
                Transformamos organizaciones{" "}
                <span className="italic text-highlight">desde las personas.</span>
              </h1>
              <div className="mt-8 space-y-4 text-text-inverse/70 leading-relaxed">
                <p>
                  Hay un momento que se repite en casi todas las organizaciones:
                  la gente deja de mirarse. Las metas se cumplen, las reuniones
                  se suceden, y en medio de todo eso las personas se vuelven
                  invisibles entre sí. La empresa avanza, pero algo esencial se
                  apaga.
                </p>
                <p>
                  Ana Banana Experiences nació para encender de nuevo ese algo.
                  No para dar un taller más, sino para crear el momento en que un
                  equipo vuelve a verse, a reírse, a confiar y a recordar por qué
                  eligió trabajar junto.
                </p>
                <p>
                  Creemos que las empresas crecen cuando las personas crecen. Por
                  eso diseñamos experiencias que desarrollan, cuidan y conectan a
                  la gente —siempre desde la estrategia, siempre con cuidado del
                  detalle, siempre con las personas en el centro.
                </p>
              </div>
            </div>

            {/* Image */}
            <PlaceholderMedia
              variant="photo"
              aspectRatio="3/4"
              dark
              label="Experiencia Ana Banana"
              instructions={`IMAGEN NOSOTROS — Especificaciones:
• Personas conectando en una experiencia corporativa real
• Calidez humana: sonrisas genuinas, cercanía, presencia
• NO retrato ejecutivo frío ni montaje corporativo
• Luz natural, paleta cálida, ligeramente desaturada
• Entrega: mínimo 3000px de ancho, JPEG calidad 90+`}
            />
          </div>
        </div>
      </section>

      {/* --- Esencia · Promesa · Mensaje --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl text-center">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Nuestra esencia
          </span>
          <p className="font-display text-3xl md:text-4xl text-primary leading-tight">
            Transformar{" "}
            <span className="italic">desde lo humano.</span>
          </p>
          <p className="mt-8 text-lg text-text-muted leading-relaxed">
            Nuestra promesa: cada experiencia que diseñamos deja a las personas y
            a su organización mejor de lo que las encontramos. No prometemos
            actividades entretenidas —prometemos impacto real, medible en cultura,
            vínculos y desarrollo.
          </p>
        </div>
      </section>

      {/* --- Valores --- */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            tag="Valores"
            title="Lo que nos sostiene"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALORES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-8 bg-surface border border-border">
                <div className="w-12 h-12 flex items-center justify-center bg-soft/40 text-primary">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-primary">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Arquetipos --- */}
      <section className="section-padding bg-primary grain-overlay">
        <div className="container-narrow">
          <SectionHeading
            tag="Arquetipos"
            title="El carácter de la marca"
            description="Ana Banana Experiences combina tres arquetipos: uno que la define, uno que le da forma y uno que le da autoridad."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {ARQUETIPOS.map(({ title, description }) => (
              <div key={title} className="md:border-l md:border-border-dark md:pl-8">
                <h3 className="font-display text-2xl font-semibold text-text-inverse">
                  {title}
                </h3>
                <p className="mt-4 text-sm text-text-inverse/60 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">
            Las organizaciones más fuertes no son las que más exigen,{" "}
            <span className="italic">sino las que mejor cuidan.</span>
          </h2>
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
