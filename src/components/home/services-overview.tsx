"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

// ---------------------------------------------------------------------------
// ServicesOverview — The three brand pillars (manual Ch.03 · Pilares)
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    icon: GraduationCap,
    title: "Desarrollo Profesional",
    description:
      "Hacer crecer a las personas: sus capacidades, su liderazgo, su comunicación y su marca profesional.",
    href: "/servicios/desarrollo-profesional",
  },
  {
    icon: Heart,
    title: "Bienestar Corporativo",
    description:
      "Cuidar a las personas: su energía, su salud y su equilibrio, dentro y fuera del trabajo.",
    href: "/servicios/bienestar-corporativo",
  },
  {
    icon: Users,
    title: "Experiencias de Integración",
    description:
      "Conectar a las personas: crear pertenencia, confianza y una cultura que se vive en equipo.",
    href: "/servicios/experiencias-de-integracion",
  },
] as const;

export function ServicesOverview() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <SectionHeading
          tag="Nuestros pilares"
          title="Tres pilares para transformar desde lo humano"
          description="Cada experiencia se diseña a la medida de su realidad, sus objetivos y la cultura de su organización."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map(({ icon: Icon, title, description, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <Link
                href={href}
                className="group block h-full p-8 md:p-10 bg-white border border-border
                           hover:border-accent/30 hover:shadow-lg
                           transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center
                                bg-primary/5 text-primary group-hover:bg-accent/10
                                group-hover:text-accent transition-colors duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-primary">
                  {title}
                </h3>

                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {description}
                </p>

                <span className="inline-block mt-6 text-xs font-semibold tracking-[0.1em]
                                 uppercase text-accent group-hover:tracking-[0.15em]
                                 transition-all duration-300">
                  Explorar →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
