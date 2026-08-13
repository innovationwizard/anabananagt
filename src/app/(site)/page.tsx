import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { SocialProject } from "@/components/home/social-project";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedCase } from "@/components/home/featured-case";
import {
  getClientLogos,
  getFeaturedExperience,
  getFeaturedTestimonials,
  getHomePage,
  getServices,
} from "@/lib/content";
import type { Metadata } from "next";
import { mediaAlt, mediaDoc, mediaUrl } from "@/lib/content/media";

// ---------------------------------------------------------------------------
// Home Page — Server Component: obtiene todo el contenido del CMS y lo pasa
// como props a las secciones (client components donde hay animación).
// ---------------------------------------------------------------------------

// El inicio hereda título/descripción/OG del layout (Ajustes del sitio);
// la pestaña SEO del global Inicio solo SOBREESCRIBE lo que el editor defina.
export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  const seo = page.seo;
  const og = mediaDoc(seo?.ogImagen);
  const ogUrl = og?.sizes?.og?.url ?? og?.url;
  return {
    ...(seo?.metaTitulo ? { title: { absolute: seo.metaTitulo } } : {}),
    ...(seo?.metaDescripcion ? { description: seo.metaDescripcion } : {}),
    ...(ogUrl
      ? {
          openGraph: {
            type: "website",
            locale: "es_GT",
            siteName: "ana banana Experiences",
            images: [{ url: ogUrl, width: 1200, height: 630 }],
          },
        }
      : {}),
  };
}

export default async function HomePage() {
  const [page, services, logos, testimonials, featured] = await Promise.all([
    getHomePage(),
    getServices(),
    getClientLogos(),
    getFeaturedTestimonials(),
    getFeaturedExperience(),
  ]);

  const fondo = mediaDoc(page.hero.fondo);
  const featuredCover = featured ? mediaUrl(featured.cover) : null;

  return (
    <>
      <Hero
        eyebrow={page.hero.eyebrow}
        titulo={page.hero.titulo}
        tituloDestacado={page.hero.tituloDestacado}
        subtitulo={page.hero.subtitulo}
        ctaEtiqueta={page.hero.ctaEtiqueta}
        fondo={
          fondo?.url
            ? { url: fondo.url, mimeType: fondo.mimeType ?? "", alt: mediaAlt(fondo) }
            : null
        }
        marcasTitulo={page.marcas.titulo}
        marcasTexto={page.marcas.texto}
        brands={logos.flatMap((l) => {
          const url = mediaUrl(l.logo);
          return url ? [{ src: url, alt: l.nombre }] : [];
        })}
      />
      <ServicesOverview
        tag={page.pilares.tag}
        titulo={page.pilares.titulo}
        descripcion={page.pilares.descripcion}
        services={services.map((s) => ({
          icon: s.icon,
          title: s.title,
          description: s.resumen,
          href: `/servicios/${s.slug}`,
        }))}
      />
      <SocialProject
        tag={page.sembrando.tag}
        titulo={page.sembrando.titulo}
        texto={page.sembrando.texto}
        fotos={(page.sembrando.fotos ?? []).flatMap((f) => {
          const url = mediaUrl(f.foto);
          return url ? [{ url, alt: mediaAlt(f.foto) }] : [];
        })}
      />
      <FeaturedCase
        tag={page.destacada.tag}
        resumen={page.destacada.resumen}
        statValor={page.destacada.statValor}
        statEtiqueta={page.destacada.statEtiqueta}
        ctaEtiqueta={page.destacada.ctaEtiqueta}
        experiencia={
          featured && featuredCover
            ? {
                titulo: featured.title,
                href: `/portafolio/${featured.slug}`,
                coverUrl: featuredCover,
                coverAlt: mediaAlt(featured.cover) || featured.title,
              }
            : null
        }
      />
      <Testimonials
        tag={page.testimonios.tag}
        titulo={page.testimonios.titulo}
        descripcion={page.testimonios.descripcion}
        items={testimonials.map((t) => ({
          cita: t.cita,
          autor: t.autor,
          cargo: t.cargo,
          empresa: t.empresa,
        }))}
      />
    </>
  );
}
