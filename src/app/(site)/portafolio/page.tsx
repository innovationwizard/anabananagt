import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getExperiences, getPortfolioPage } from "@/lib/content";
import { mediaAlt, mediaUrl } from "@/lib/content/media";
import { pillarLabel } from "@/lib/content/labels";

// ---------------------------------------------------------------------------
// /portafolio — Experiences listing (contenido desde el CMS)
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPortfolioPage();
  return {
    title: page.seo?.metaTitulo ?? page.header.titulo,
    description: page.seo?.metaDescripcion ?? page.header.texto,
  };
}

export default async function PortafolioPage() {
  const [page, experiences] = await Promise.all([
    getPortfolioPage(),
    getExperiences(),
  ]);

  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {page.header.eyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-inverse leading-tight">
            {page.header.titulo}
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            {page.header.texto}
          </p>
        </div>
      </section>

      {/* --- Experiences Grid --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => {
              const coverUrl = mediaUrl(exp.cover);
              return (
                <Link
                  key={exp.slug}
                  href={`/portafolio/${exp.slug}`}
                  className="group block bg-white border border-border
                             hover:border-accent/30 hover:shadow-lg
                             transition-all duration-500 overflow-hidden"
                >
                  {/* Cover */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                    {coverUrl && (
                      <Image
                        src={coverUrl}
                        alt={mediaAlt(exp.cover) || exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase
                                     text-accent bg-accent/10 px-2 py-0.5">
                      {pillarLabel(exp.pillar)}
                    </span>

                    <h3 className="mt-4 font-display text-xl font-semibold text-primary
                                   group-hover:text-accent transition-colors duration-300">
                      {exp.title}
                    </h3>

                    <span className="inline-block mt-4 text-xs font-semibold tracking-[0.1em]
                                     uppercase text-text-muted group-hover:text-accent
                                     transition-colors duration-300">
                      Ver experiencia →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
