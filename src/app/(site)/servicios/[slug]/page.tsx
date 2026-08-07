import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import {
  getExperiencesByPillar,
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/content";
import { mediaAlt, mediaUrl } from "@/lib/content/media";

// ---------------------------------------------------------------------------
// /servicios/[slug] — Individual Service Page (contenido desde el CMS)
// ---------------------------------------------------------------------------

// Instrucciones de producción para el fotógrafo — visibles solo mientras el
// pilar no tenga foto en el CMS (marcador de posición).
const PHOTO_INSTRUCTIONS: Record<string, string> = {
  "desarrollo-profesional": `FOTOGRAFÍA PILAR: DESARROLLO PROFESIONAL
• Personas en una experiencia de aprendizaje — participación activa, energía
• Facilitación cercana, no clase magistral fría
• Ambiente de sala de trabajo cálida, luz natural
• Segundo shot: interacción real entre participantes
• 3000px ancho mínimo, JPEG calidad 90+`,
  "bienestar-corporativo": `FOTOGRAFÍA PILAR: BIENESTAR CORPORATIVO
• Momento de bienestar en el entorno laboral — calma, cuidado, cercanía
• Personas relajadas y presentes (pausa activa, masaje, wellness day)
• Paleta cálida y luminosa, sensación de cuidado
• Segundo shot: detalle de una activación de bienestar
• 3000px ancho mínimo, JPEG calidad 90+`,
  "experiencias-de-integracion": `FOTOGRAFÍA PILAR: EXPERIENCIAS DE INTEGRACIÓN
• Equipo conectando en una experiencia grupal — risas, colaboración, energía
• Team building o kick off en acción, movimiento real
• Ambiente vibrante, sentido de pertenencia visible
• Segundo shot: el momento en que un equipo "vuelve a mirarse"
• 3000px ancho mínimo, JPEG calidad 90+`,
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) return {};
  return {
    title: svc.seo?.metaTitulo ?? svc.title,
    description: svc.seo?.metaDescripcion ?? svc.description.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) notFound();

  const experiences = await getExperiencesByPillar(svc.slug);
  const fotoUrl = mediaUrl(svc.foto);

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
                {svc.ctaEtiqueta}
              </Link>
            </div>
            {fotoUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={fotoUrl}
                  alt={mediaAlt(svc.foto) || svc.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <PlaceholderMedia
                variant="photo"
                aspectRatio="4/3"
                dark
                label={svc.title}
                instructions={PHOTO_INSTRUCTIONS[svc.slug]}
              />
            )}
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
                    key={item.id ?? item.texto}
                    className="flex gap-4 text-sm text-text-muted leading-relaxed"
                  >
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center
                                     bg-accent/10 text-accent text-xs font-bold">
                      {i + 1}
                    </span>
                    {item.texto}
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
                {svc.outcomes.map((item) => (
                  <div
                    key={item.id ?? item.texto}
                    className="pl-4 border-l-2 border-accent/30 text-sm text-text-muted leading-relaxed"
                  >
                    {item.texto}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Experiencias de este pilar --- */}
      {experiences.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-narrow">
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Experiencias
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-8">
              Experiencias de {svc.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((e) => {
                const coverUrl = mediaUrl(e.cover);
                return (
                  <Link
                    key={e.slug}
                    href={`/portafolio/${e.slug}`}
                    className="group block bg-white border border-border overflow-hidden
                               hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                      {coverUrl && (
                        <Image
                          src={coverUrl}
                          alt={mediaAlt(e.cover) || e.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-primary
                                     group-hover:text-accent transition-colors">
                        {e.title}
                      </h3>
                      <span className="mt-3 inline-block text-xs font-semibold tracking-[0.1em]
                                       uppercase text-text-muted group-hover:text-accent transition-colors">
                        Ver experiencia →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* --- CTA --- */}
      <section className="bg-primary grain-overlay py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-inverse">
            {svc.cierre.titulo}
          </h2>
          <p className="mt-4 text-text-inverse/50 max-w-xl mx-auto">
            {svc.cierre.texto}
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center mt-8 px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300"
          >
            {svc.cierre.ctaEtiqueta}
          </Link>
        </div>
      </section>
    </>
  );
}
