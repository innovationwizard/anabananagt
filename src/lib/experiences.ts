// ---------------------------------------------------------------------------
// Placeholder experiences — shared by /portafolio and the pillar pages so the
// "portfolio by section" view (client change #12) stays in sync with the
// portfolio listing. Replaced by Sanity content once the CMS is wired (deferred).
// ---------------------------------------------------------------------------

export type PillarSlug =
  | "desarrollo-profesional"
  | "bienestar-corporativo"
  | "experiencias-de-integracion";

export type Experience = {
  slug: string;
  clientAlias: string;
  industry: string;
  serviceType: string; // pillar display label (matches PILLAR_LABELS values)
  metric: string;
};

export const PILLAR_LABELS: Record<PillarSlug, string> = {
  "desarrollo-profesional": "Desarrollo Profesional",
  "bienestar-corporativo": "Bienestar Corporativo",
  "experiencias-de-integracion": "Experiencias de Integración",
};

export const PLACEHOLDER_EXPERIENCES: Experience[] = [
  {
    slug: "caso-1",
    clientAlias: "Banco regional",
    industry: "Banca y Finanzas",
    serviceType: "Experiencias de Integración",
    metric: "500+ personas",
  },
  {
    slug: "caso-2",
    clientAlias: "Compañía industrial",
    industry: "Manufactura",
    serviceType: "Bienestar Corporativo",
    metric: "92% satisfacción",
  },
  {
    slug: "caso-3",
    clientAlias: "Empresa de telecomunicaciones",
    industry: "Telecomunicaciones",
    serviceType: "Desarrollo Profesional",
    metric: "300+ personas",
  },
  {
    slug: "caso-4",
    clientAlias: "Firma de servicios profesionales",
    industry: "Servicios Profesionales",
    serviceType: "Desarrollo Profesional",
    metric: "12 semanas",
  },
];

/** Experiences that belong to a given pillar (by matching serviceType label). */
export function experiencesByPillar(pillar: PillarSlug): Experience[] {
  return PLACEHOLDER_EXPERIENCES.filter(
    (e) => e.serviceType === PILLAR_LABELS[pillar],
  );
}
