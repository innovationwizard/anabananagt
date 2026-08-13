import { BRAND } from "@/lib/brand";

// ---------------------------------------------------------------------------
// Isotipo del panel (cabecera/navegación). Placa navy por la misma razón que
// el logo: el asset solo existe en blanco.
// ---------------------------------------------------------------------------

export function Icon() {
  return (
    <div
      style={{
        background: BRAND.navy,
        padding: "0.3rem",
        borderRadius: "0.35rem",
        display: "inline-flex",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- el panel de
          Payload no usa el optimizador de next/image; asset local estático */}
      <img
        src="/brand/ab-icono-white.png"
        alt="ana banana Experiences"
        style={{ height: "1.25rem", width: "auto", display: "block" }}
      />
    </div>
  );
}
