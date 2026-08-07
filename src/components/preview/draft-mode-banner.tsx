// ---------------------------------------------------------------------------
// Aviso visible mientras el modo borrador está activo, con salida directa.
// También se ve dentro de la Vista previa en vivo del panel: orienta al
// editor («estás viendo un borrador, no el sitio publicado»).
// ---------------------------------------------------------------------------

export function DraftModeBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3
                    bg-primary text-text-inverse text-xs font-semibold tracking-[0.08em] uppercase
                    px-4 py-2.5 shadow-xl border border-highlight/40">
      <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" aria-hidden />
      Viendo borrador
      <a
        href="/next/exit-preview"
        className="underline text-highlight hover:brightness-110 transition-all"
      >
        Salir
      </a>
    </div>
  );
}
