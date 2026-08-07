import type { Metadata } from "next";
import { IntakeForm } from "@/components/contact/intake-form";
import { getContactPage, getSiteSettings } from "@/lib/content";

// ---------------------------------------------------------------------------
// /contacto — Contact / Intake Page (textos desde el CMS; el formulario es
// parte del sistema y vive en código)
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {
    title: page.seo?.metaTitulo ?? "Contacto",
    description: page.seo?.metaDescripcion ?? undefined,
  };
}

export default async function ContactoPage() {
  const [page, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);
  const whatsappUrl = `https://wa.me/${settings.contacto.whatsapp}`;

  return (
    <>
      {/* --- Page Header --- */}
      <section className="bg-primary grain-overlay pt-32 pb-16 md:pb-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {page.header.eyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-text-inverse leading-tight">
            {page.header.titulo}
          </h1>
          <p className="mt-6 text-lg text-text-inverse/60 max-w-2xl mx-auto">
            {page.header.texto}
          </p>
        </div>
      </section>

      {/* --- Form --- */}
      <section className="section-padding bg-surface">
        <div className="container-narrow max-w-2xl">
          <div className="bg-white border border-border p-8 md:p-12">
            <IntakeForm />
          </div>

          {/* Alternative contact */}
          <div className="mt-8 text-center text-sm text-text-muted">
            <p>
              {page.altContacto.texto}{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition-colors font-semibold"
              >
                {page.altContacto.etiquetaEnlace}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
