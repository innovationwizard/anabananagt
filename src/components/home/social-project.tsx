import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// SocialProject — "Sembrando futuro" (Proyecto Estrella).
// Client request (CHANGES-REQUESTED.pdf p.7): present the social-aid initiative
// in a small section where the stats strip used to be. Copy is verbatim from the
// client. The two photos are pending — placeholders until provided.
// ---------------------------------------------------------------------------

const PHOTOS = ["Proyecto Estrella — 1", "Proyecto Estrella — 2"] as const;

export function SocialProject() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Compromiso social
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary leading-tight">
              Sembrando futuro
            </h2>
            <p className="mt-6 text-text-muted leading-relaxed">
              En Anabanana también dedicamos parte de nuestro trabajo a inspirar a
              las nuevas generaciones. Por eso impulsamos Proyecto Estrella, una
              iniciativa con la que llevamos experiencias de aprendizaje a niños y
              jóvenes para inspirarlos a descubrir su potencial.
            </p>
          </div>

          {/* Photos (2) — pending from client */}
          <div className="grid grid-cols-2 gap-4">
            {PHOTOS.map((label) => (
              <PlaceholderMedia
                key={label}
                variant="photo"
                aspectRatio="3/4"
                dark={false}
                label={label}
                instructions={`FOTO PROYECTO ESTRELLA — ${label}
• Niños y jóvenes en una experiencia de aprendizaje de Proyecto Estrella
• Momento genuino: descubrimiento, alegría, participación
• Luz natural y cálida; sin poses forzadas
• Mínimo 2000px de ancho, JPEG calidad 90+`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
