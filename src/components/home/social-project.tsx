import Image from "next/image";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

// ---------------------------------------------------------------------------
// SocialProject — "Sembrando futuro" (Proyecto Estrella).
// Contenido desde el CMS (global Inicio → Compromiso social). Mientras las dos
// fotos no estén cargadas, se muestran marcadores de posición con las
// especificaciones para el cliente.
// ---------------------------------------------------------------------------

const PLACEHOLDER_LABELS = ["Proyecto Estrella — 1", "Proyecto Estrella — 2"] as const;

type SocialProjectProps = {
  tag: string;
  titulo: string;
  texto: string;
  fotos: ReadonlyArray<{ url: string; alt: string }>;
};

export function SocialProject({ tag, titulo, texto, fotos }: SocialProjectProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {tag}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary leading-tight">
              {titulo}
            </h2>
            <p className="mt-6 text-text-muted leading-relaxed">{texto}</p>
          </div>

          {/* Photos (2) */}
          <div className="grid grid-cols-2 gap-4">
            {PLACEHOLDER_LABELS.map((label, i) => {
              const foto = fotos[i];
              return foto ? (
                <div key={label} className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={foto.url}
                    alt={foto.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : (
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
