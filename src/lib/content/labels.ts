// ---------------------------------------------------------------------------
// Etiquetas puras (sin dependencias de Payload) — seguras para importar desde
// cualquier componente. Fuente única de los nombres de pilar; las opciones del
// CMS (src/fields/options.ts) derivan de aquí.
// ---------------------------------------------------------------------------

export const PILLAR_LABELS: Record<string, string> = {
  "desarrollo-profesional": "Desarrollo Profesional",
  "bienestar-corporativo": "Bienestar Corporativo",
  "experiencias-de-integracion": "Experiencias de Integración",
};

export function pillarLabel(slug: string | null | undefined): string {
  return (slug && PILLAR_LABELS[slug]) || "";
}
