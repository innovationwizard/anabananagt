// ---------------------------------------------------------------------------
// GROQ Queries — Centralized data-fetching queries for Sanity
// ---------------------------------------------------------------------------

/** Home page: featured case study, testimonials, services, and site settings */
export const HOME_QUERY = /* groq */ `{
  "settings": *[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubheadline,
    stats,
    clientLogos,
    contactEmail,
    whatsapp,
    socialLinks
  },
  "services": *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon
  },
  "testimonials": *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    avatar
  },
  "featuredCase": *[_type == "caseStudy" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    clientAlias,
    industry,
    heroImage,
    results
  }
}`;

/** All case studies for the portfolio listing */
export const PORTFOLIO_QUERY = /* groq */ `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    clientAlias,
    industry,
    serviceType,
    heroImage,
    budgetRange,
    attendance,
    results[0]
  }
`;

/** Single case study by slug */
export const CASE_STUDY_QUERY = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientAlias,
    industry,
    budgetRange,
    attendance,
    serviceType,
    heroImage,
    gallery,
    challenge,
    solution,
    results,
    testimonial,
    publishedAt
  }
`;

/** All case study slugs for static generation */
export const CASE_STUDY_SLUGS_QUERY = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current)].slug.current
`;

/** All services */
export const SERVICES_QUERY = /* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    audience,
    deliverables,
    outcomes,
    heroImage
  }
`;

/** Single service by slug */
export const SERVICE_QUERY = /* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    audience,
    deliverables,
    outcomes,
    heroImage
  }
`;

/** Service slugs for static generation */
export const SERVICE_SLUGS_QUERY = /* groq */ `
  *[_type == "service" && defined(slug.current)].slug.current
`;

/** Site settings singleton */
export const SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubheadline,
    stats,
    clientLogos,
    contactEmail,
    whatsapp,
    socialLinks
  }
`;
