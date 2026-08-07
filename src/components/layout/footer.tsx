import Link from "next/link";
import Image from "next/image";
import type { SiteSetting } from "@/payload-types";

// ---------------------------------------------------------------------------
// Footer — Minimal corporate footer with CTA repeat.
// Todo el contenido viene del CMS (Ajustes del sitio).
// ---------------------------------------------------------------------------

type FooterProps = {
  settings: SiteSetting;
};

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  const { footer, redes, contacto } = settings;

  const socials: Array<{ label: string; url: string }> = [
    ...(redes?.linkedin ? [{ label: "LinkedIn", url: redes.linkedin }] : []),
    ...(redes?.instagram ? [{ label: "Instagram", url: redes.instagram }] : []),
    { label: "WhatsApp", url: `https://wa.me/${contacto.whatsapp}` },
    ...(redes?.tiktok ? [{ label: "TikTok", url: redes.tiktok }] : []),
  ];

  return (
    <footer className="bg-primary text-text-inverse">
      {/* --- CTA Strip --- */}
      <div className="border-b border-border-dark">
        <div className="container-narrow flex flex-col md:flex-row items-center
                        justify-between gap-6 py-12 md:py-16">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-center md:text-left">
            {footer.ctaTitulo}{" "}
            <span className="italic text-highlight">{footer.ctaTituloDestacado}</span>
          </h3>
          <Link
            href="/contacto"
            className="inline-flex items-center px-8 py-3 bg-highlight text-primary
                       text-sm font-semibold tracking-[0.08em] uppercase
                       hover:brightness-95 transition-all duration-300 shrink-0"
          >
            {footer.ctaEtiqueta}
          </Link>
        </div>
      </div>

      {/* --- Links + Info --- */}
      <div className="container-narrow py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Image
              src="/brand/ab-lockup-white.png"
              alt="ana banana Experiences"
              width={1430}
              height={445}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-sm text-text-inverse/50 leading-relaxed">
              {footer.blurb}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex gap-8">
            {footer.enlaces.map(({ etiqueta, destino }) => (
              <Link
                key={destino}
                href={destino}
                className="text-sm text-text-inverse/50 hover:text-highlight
                           transition-colors duration-300"
              >
                {etiqueta}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-text-inverse/30 mb-1">
              Conectar
            </span>
            {socials.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-inverse/50 hover:text-highlight transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border-dark
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-inverse/30">
            © {year} ana banana Experiences · {footer.entidad} Todos los derechos reservados.
          </span>
          <span className="text-xs text-text-inverse/30">
            {footer.ubicacion}
          </span>
        </div>
      </div>
    </footer>
  );
}
