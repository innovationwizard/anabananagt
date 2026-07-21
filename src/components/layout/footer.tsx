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
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-center md:text-left">
            Transformemos su organización{" "}
            <span className="italic text-highlight">desde lo humano.</span>
          </h3>
          <Link
            href="/contacto"
            className="inline-flex items-center px-8 py-3 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.08em] uppercase
                       hover:brightness-95 transition-all duration-300 shrink-0"
          >
            Conversemos
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
                src="/brand/ab-isotipo-on-softblue.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-cover"
              />
              <span className="font-display text-lg font-semibold">
                ana banana{" "}
                <span className="text-text-inverse/50 text-sm tracking-[0.2em] uppercase">
                  Experiences
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm text-text-inverse/50 leading-relaxed">
              Experiencias corporativas que desarrollan personas, impulsan el
              bienestar y fortalecen la cultura de cada organización.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex gap-8">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-text-inverse/50 hover:text-highlight
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
              className="text-sm text-text-inverse/50 hover:text-highlight transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/anabanana.gt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse/50 hover:text-highlight transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/50250320841"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse/50 hover:text-highlight transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border-dark
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-inverse/30">
            © {year} ana banana Experiences · Grupo anabanana, S.A. Todos los derechos reservados.
          </span>
          <span className="text-xs text-text-inverse/30">
            Guatemala City, Guatemala
          </span>
        </div>
      </div>
    </footer>
  );
}
