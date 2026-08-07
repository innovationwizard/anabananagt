import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import type {
  AboutPage,
  ClientLogo,
  ContactPage,
  Experience,
  HomePage,
  PortfolioPage,
  Service,
  SiteSetting,
  Testimonial,
} from "@/payload-types";

// ---------------------------------------------------------------------------
// Capa de datos — ÚNICO punto de acceso a contenido del CMS para las páginas.
//
// Publicado: Local API + unstable_cache con etiquetas (los hooks de Payload
// revalidan al publicar). Modo borrador (vista previa del panel): se salta la
// caché y lee la última versión borrador. Si falta contenido requerido, el
// build falla con un mensaje claro: nunca se publica una página vacía.
//
// generateStaticParams debe usar getExperienceSlugs/getServiceSlugs (solo
// publicado): las APIs de petición como draftMode no existen en ese contexto.
// ---------------------------------------------------------------------------

export const TAGS = {
  settings: "global_siteSettings",
  home: "global_homePage",
  about: "global_aboutPage",
  contact: "global_contactPage",
  portfolio: "global_portfolioPage",
  experiences: "experiences",
  services: "services",
  testimonials: "testimonials",
  logos: "clientLogos",
  media: "media",
} as const;

function missing(what: string): never {
  throw new Error(
    `Contenido requerido ausente en el CMS: ${what}. Ejecuta \`npm run seed\` o publica el documento en /admin.`,
  );
}

async function db() {
  return getPayload({ config });
}

async function isDraft(): Promise<boolean> {
  const { isEnabled } = await draftMode();
  return isEnabled;
}

// --- Globals ----------------------------------------------------------------

type GlobalSlug =
  | "siteSettings"
  | "homePage"
  | "aboutPage"
  | "contactPage"
  | "portfolioPage";

function cachedGlobal<T>(
  slug: GlobalSlug,
  depth: number,
  tags: string[],
  validate: (doc: T) => boolean,
  label: string,
) {
  const cached = unstable_cache(
    async (): Promise<T> => {
      const payload = await db();
      const doc = (await payload.findGlobal({ slug, depth })) as T;
      if (!validate(doc)) missing(label);
      return doc;
    },
    [slug],
    { tags },
  );

  return async (): Promise<T> => {
    if (await isDraft()) {
      const payload = await db();
      const doc = (await payload.findGlobal({ slug, depth, draft: true })) as T;
      if (!validate(doc)) missing(label);
      return doc;
    }
    return cached();
  };
}

export const getSiteSettings = cachedGlobal<SiteSetting>(
  "siteSettings",
  1,
  [TAGS.settings, TAGS.media],
  (doc) => Boolean(doc?.identidad?.tituloBase),
  "Ajustes del sitio (siteSettings)",
);

export const getHomePage = cachedGlobal<HomePage>(
  "homePage",
  2,
  [TAGS.home, TAGS.media],
  (doc) => Boolean(doc?.hero?.titulo),
  "Página de inicio (homePage)",
);

export const getAboutPage = cachedGlobal<AboutPage>(
  "aboutPage",
  2,
  [TAGS.about, TAGS.media],
  (doc) => Boolean(doc?.hero?.titulo),
  "Página Nosotros (aboutPage)",
);

export const getContactPage = cachedGlobal<ContactPage>(
  "contactPage",
  1,
  [TAGS.contact, TAGS.media],
  (doc) => Boolean(doc?.header?.titulo),
  "Página de contacto (contactPage)",
);

export const getPortfolioPage = cachedGlobal<PortfolioPage>(
  "portfolioPage",
  1,
  [TAGS.portfolio, TAGS.media],
  (doc) => Boolean(doc?.header?.titulo),
  "Portada del portafolio (portfolioPage)",
);

// --- Experiencias -----------------------------------------------------------

const getExperiencesCached = unstable_cache(
  async (): Promise<Experience[]> => {
    const payload = await db();
    const res = await payload.find({
      collection: "experiences",
      depth: 2,
      sort: "-fecha",
      limit: 100,
    });
    return res.docs;
  },
  ["experiences"],
  { tags: [TAGS.experiences, TAGS.media] },
);

export async function getExperiences(): Promise<Experience[]> {
  if (await isDraft()) {
    const payload = await db();
    const res = await payload.find({
      collection: "experiences",
      depth: 2,
      sort: "-fecha",
      limit: 100,
      draft: true,
    });
    return res.docs;
  }
  return getExperiencesCached();
}

/** Solo publicado — para generateStaticParams (sin APIs de petición). */
export async function getExperienceSlugs(): Promise<string[]> {
  const docs = await getExperiencesCached();
  return docs.flatMap((e) => (e.slug ? [e.slug] : []));
}

export async function getExperienceBySlug(
  slug: string,
): Promise<Experience | undefined> {
  const all = await getExperiences();
  return all.find((e) => e.slug === slug);
}

export async function getExperiencesByPillar(
  pillar: string,
): Promise<Experience[]> {
  const all = await getExperiences();
  return all.filter((e) => e.pillar === pillar);
}

export async function getFeaturedExperience(): Promise<Experience | undefined> {
  const all = await getExperiences();
  return all.find((e) => e.destacada === true);
}

// --- Pilares de servicio ----------------------------------------------------

const getServicesCached = unstable_cache(
  async (): Promise<Service[]> => {
    const payload = await db();
    const res = await payload.find({
      collection: "services",
      depth: 2,
      sort: "orden",
      limit: 10,
    });
    if (res.docs.length === 0) missing("Pilares de servicio (services)");
    return res.docs;
  },
  ["services"],
  { tags: [TAGS.services, TAGS.media] },
);

export async function getServices(): Promise<Service[]> {
  if (await isDraft()) {
    const payload = await db();
    const res = await payload.find({
      collection: "services",
      depth: 2,
      sort: "orden",
      limit: 10,
      draft: true,
    });
    if (res.docs.length === 0) missing("Pilares de servicio (services)");
    return res.docs;
  }
  return getServicesCached();
}

/** Solo publicado — para generateStaticParams (sin APIs de petición). */
export async function getServiceSlugs(): Promise<string[]> {
  const docs = await getServicesCached();
  return docs.map((s) => s.slug);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

// --- Testimonios y logos ----------------------------------------------------

const getFeaturedTestimonialsCached = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const payload = await db();
    const res = await payload.find({
      collection: "testimonials",
      where: { destacado: { equals: true } },
      sort: "orden",
      limit: 3,
    });
    return res.docs;
  },
  ["featuredTestimonials"],
  { tags: [TAGS.testimonials] },
);

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (await isDraft()) {
    const payload = await db();
    const res = await payload.find({
      collection: "testimonials",
      where: { destacado: { equals: true } },
      sort: "orden",
      limit: 3,
      draft: true,
    });
    return res.docs;
  }
  return getFeaturedTestimonialsCached();
}

const getClientLogosCached = unstable_cache(
  async (): Promise<ClientLogo[]> => {
    const payload = await db();
    const res = await payload.find({
      collection: "clientLogos",
      depth: 1,
      sort: "orden",
      limit: 100,
    });
    return res.docs;
  },
  ["clientLogos"],
  { tags: [TAGS.logos, TAGS.media] },
);

export async function getClientLogos(): Promise<ClientLogo[]> {
  // Sin borradores en esta colección: la versión cacheada es siempre correcta,
  // pero en modo borrador se lee directo para reflejar cambios inmediatos.
  if (await isDraft()) {
    const payload = await db();
    const res = await payload.find({
      collection: "clientLogos",
      depth: 1,
      sort: "orden",
      limit: 100,
    });
    return res.docs;
  }
  return getClientLogosCached();
}
