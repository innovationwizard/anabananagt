import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import { SectionHeading } from "@/components/ui/section-heading";
import { iconFor } from "@/components/ui/icons";
import { getAboutPage } from "@/lib/content";
import { mediaAlt, mediaUrl } from "@/lib/content/media";
import { pageMetadata } from "@/lib/content/seo";

// ---------------------------------------------------------------------------
// /nosotros — About: the Ana Banana Experiences brand (manual Ch.01–02, 04).
// Contenido desde el CMS (global Nosotros).
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return pageMetadata({ titulo: "Nosotros", seo: page.seo });
}

export default async function NosotrosPage() {
  const page = await getAboutPage();
  const fotoUrl = mediaUrl(page.hero.foto);

  return (
    <>
      {/* --- Hero + Historia --- */}
      <section className="bg-primary grain-overlay pt-32 pb-20 md:pb-28">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block text-highlight text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {page.hero.eyebrow}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-inverse leading-tight">
                {page.hero.titulo}{" "}
                <span className="italic text-highlight">{page.hero.tituloDestacado}</span>
              </h1>
              <div className="mt-8 space-y-4 text-text-inverse/70 leading-relaxed">
                {page.hero.historia.map((p) => (
                  <p key={p.id ?? p.parrafo}>{p.parrafo}</p>
                ))}
              </div>
            </div>

            {/* Image */}
            {fotoUrl ? (
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={fotoUrl}
                  alt={mediaAlt(page.hero.foto)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>

      {/* --- Esencia · Promesa · Mensaje --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-3xl text-center">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            {page.esencia.tag}
          </span>
          <p className="font-display text-3xl md:text-4xl text-primary leading-tight">
            {page.esencia.titulo}{" "}
            <span className="italic">{page.esencia.tituloDestacado}</span>
          </p>
          <p className="mt-8 text-lg text-text-muted leading-relaxed">
            {page.esencia.texto}
          </p>
        </div>
      </section>

      {/* --- Valores --- */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            tag={page.valores.tag}
            title={page.valores.titulo}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.valores.items.map(({ id, icono, titulo, descripcion }) => {
              const Icon = iconFor(icono);
              return (
                <div key={id ?? titulo} className="p-8 bg-surface border border-border">
                  <div className="w-12 h-12 flex items-center justify-center bg-soft/40 text-primary">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-primary">
                    {titulo}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Arquetipos --- */}
      <section className="section-padding bg-primary grain-overlay">
        <div className="container-narrow">
          <SectionHeading
            tag={page.arquetipos.tag}
            title={page.arquetipos.titulo}
            description={page.arquetipos.descripcion}
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {page.arquetipos.items.map(({ id, titulo, descripcion }) => (
              <div key={id ?? titulo} className="md:border-l md:border-border-dark md:pl-8">
                <h3 className="font-display text-2xl font-semibold text-text-inverse">
                  {titulo}
                </h3>
                <p className="mt-4 text-sm text-text-inverse/60 leading-relaxed">
                  {descripcion}
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
            {page.cierre.titulo}{" "}
            <span className="italic">{page.cierre.tituloDestacado}</span>
          </h2>
          <Link
            href="/contacto"
            className="inline-flex items-center mt-8 px-10 py-4 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.1em] uppercase
                       hover:brightness-95 transition-all duration-300"
          >
            {page.cierre.ctaEtiqueta}
          </Link>
        </div>
      </section>
    </>
  );
}
