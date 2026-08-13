import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getExperienceBySlug,
  getExperienceSlugs,
  getPortfolioPage,
} from "@/lib/content";
import { mediaAlt, mediaUrl } from "@/lib/content/media";
import { pageMetadata } from "@/lib/content/seo";
import { pillarLabel } from "@/lib/content/labels";

// ---------------------------------------------------------------------------
// /portafolio/[slug] — Experience detail (contenido desde el CMS). Secciones
// por cliente: Objetivo · Resultados esperados · Contenido/Descripción
// (+ Temas a trabajar).
// ---------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);
  if (!exp) return {};
  return pageMetadata({
    titulo: exp.title,
    descripcion: exp.objetivo.slice(0, 160),
    seo: exp.seo,
  });
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const [exp, page] = await Promise.all([
    getExperienceBySlug(slug),
    getPortfolioPage(),
  ]);
  if (!exp) notFound();

  const coverUrl = mediaUrl(exp.cover);
  const contenidoItems = exp.contenidoItems ?? [];
  const temas = exp.temas ?? [];
  const cierre = page.cierreExperiencia;

  return (
    <>
      {/* --- Cover --- */}
      <section className="pt-20 bg-primary">
        <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={mediaAlt(exp.cover) || exp.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>
      </section>

      {/* --- Header --- */}
      <section className="bg-primary grain-overlay pb-14 pt-12">
        <div className="container-narrow">
          <Link
            href="/portafolio"
            className="text-xs text-text-inverse/50 hover:text-highlight tracking-[0.1em] uppercase transition-colors"
          >
            ← Experiencias
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase
                             bg-highlight/20 text-highlight">
              {pillarLabel(exp.pillar)}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-text-inverse leading-tight">
            {exp.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-text-inverse/60">
            <span>
              <span className="text-text-inverse/40 uppercase tracking-[0.1em] text-xs mr-2">
                Duración
              </span>
              {exp.duracion}
            </span>
            <span>
              <span className="text-text-inverse/40 uppercase tracking-[0.1em] text-xs mr-2">
                Modalidad
              </span>
              {exp.modalidad}
            </span>
          </div>
        </div>
      </section>

      {/* --- Objetivo --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Objetivo
          </span>
          <p className="text-lg text-primary leading-relaxed">{exp.objetivo}</p>
        </div>
      </section>

      {/* --- Resultados esperados --- */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Resultados esperados
          </span>
          <ul className="space-y-4">
            {exp.resultados.map((r) => (
              <li
                key={r.id ?? r.texto}
                className="flex gap-4 text-text-muted leading-relaxed"
              >
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                {r.texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Contenido / Descripción --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Contenido / Descripción
          </span>
          {exp.contenido && (
            <p className="text-primary leading-relaxed">{exp.contenido}</p>
          )}
          {contenidoItems.length > 0 && (
            <div className={`space-y-4 ${exp.contenido ? "mt-6" : ""}`}>
              {contenidoItems.map((item, i) => (
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
          )}

          {temas.length > 0 && (
            <div className="mt-10">
              {exp.temasIntro && (
                <p className="text-primary leading-relaxed mb-4">{exp.temasIntro}</p>
              )}
              <ul className="space-y-3">
                {temas.map((t) => (
                  <li
                    key={t.id ?? t.texto}
                    className="pl-4 border-l-2 border-accent/30 text-sm text-text-muted leading-relaxed"
                  >
                    {t.texto}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-primary grain-overlay py-16 md:py-20">
        <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-inverse">
              {cierre.titulo}
            </h2>
            <p className="mt-2 text-text-inverse/50">
              {cierre.texto}
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300 shrink-0"
          >
            {cierre.ctaEtiqueta}
          </Link>
        </div>
      </section>
    </>
  );
}
