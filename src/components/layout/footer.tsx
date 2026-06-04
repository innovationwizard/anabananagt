import Link from "next/link";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Footer — Minimal corporate footer with CTA repeat
// ---------------------------------------------------------------------------

const FOOTER_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-text-inverse">
      {/* --- CTA Strip --- */}
      <div className="border-b border-border-dark">
        <div className="container-narrow flex flex-col md:flex-row items-center
                        justify-between gap-6 py-12 md:py-16">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center md:text-left">
            ¿Listo para transformar a su equipo?
          </h3>
          <Link
            href="/contacto"
            className="inline-flex items-center px-8 py-3 bg-accent text-primary
                       text-sm font-semibold tracking-[0.08em] uppercase
                       hover:bg-accent-hover transition-colors duration-300 shrink-0"
          >
            Agendar Consulta Privada
          </Link>
        </div>
      </div>

      {/* --- Links + Info --- */}
      <div className="container-narrow py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/anabananagt_logo_mark.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-lg font-bold">anabanana</span>
            </div>
            <p className="mt-3 text-sm text-text-inverse/50 leading-relaxed">
              Keynotes, facilitación y entrenamiento ejecutivo para las empresas
              más exigentes de la región.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex gap-8">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-text-inverse/50 hover:text-accent
                           transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-text-inverse/30 mb-1">
              Conectar
            </span>
            <a
              href="https://www.linkedin.com/company/grupoanabanana/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse/50 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/anabanana.gt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse/50 hover:text-accent transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/50250320841"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse/50 hover:text-accent transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border-dark
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-inverse/30">
            © {year} Grupo anabanana, S.A. Todos los derechos reservados.
          </span>
          <span className="text-xs text-text-inverse/30">
            Guatemala City, Guatemala
          </span>
        </div>
      </div>
    </footer>
  );
}
