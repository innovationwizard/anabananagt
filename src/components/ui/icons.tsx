import {
  Award,
  GraduationCap,
  Heart,
  Lightbulb,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mapa nombre→componente para los iconos aprobados en el CMS
// (src/fields/options.ts · ICONO_OPTIONS). Ambas listas deben coincidir.
// ---------------------------------------------------------------------------

export const ICONS: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  heart: Heart,
  users: Users,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  award: Award,
};

export function iconFor(name: string | null | undefined): LucideIcon {
  return (name && ICONS[name]) || Sparkles;
}
