import type { Option } from "payload";
import { PILLAR_LABELS } from "@/lib/content/labels";

// ---------------------------------------------------------------------------
// Listas cerradas compartidas — guardarraíles: nada de texto libre donde las
// opciones son finitas (rutas internas, pilares, iconos aprobados).
// ---------------------------------------------------------------------------

/** Los 3 pilares — contrato de enrutamiento con /servicios/[slug] y el formulario. */
export const PILAR_OPTIONS: Option[] = Object.entries(PILLAR_LABELS).map(
  ([value, label]) => ({ label, value }),
);

/** Destinos internos permitidos para botones y navegación. */
export const DESTINO_OPTIONS: Option[] = [
  { label: "Contacto", value: "/contacto" },
  { label: "Portafolio", value: "/portafolio" },
  { label: "Nosotros", value: "/nosotros" },
  { label: "Pilar: Desarrollo Profesional", value: "/servicios/desarrollo-profesional" },
  { label: "Pilar: Bienestar Corporativo", value: "/servicios/bienestar-corporativo" },
  { label: "Pilar: Experiencias de Integración", value: "/servicios/experiencias-de-integracion" },
  { label: "Inicio", value: "/" },
];

/** Iconos aprobados (nombres de lucide-react, mapeados a componentes en el sitio). */
export const ICONO_OPTIONS: Option[] = [
  { label: "Birrete (aprendizaje)", value: "graduation-cap" },
  { label: "Corazón (cuidado)", value: "heart" },
  { label: "Personas (equipo)", value: "users" },
  { label: "Destellos (transformación)", value: "sparkles" },
  { label: "Bombilla (creatividad)", value: "lightbulb" },
  { label: "Premio (excelencia)", value: "award" },
];
