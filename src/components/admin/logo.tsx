import { BRAND } from "@/lib/brand";

// ---------------------------------------------------------------------------
// Marca del panel de administración (pantalla de inicio de sesión).
// El lockup existe solo en blanco: se monta sobre una placa navy de marca
// para funcionar igual en tema claro y oscuro del panel.
// ---------------------------------------------------------------------------

export function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.1rem",
      }}
    >
      <div
        style={{
          background: BRAND.navy,
          padding: "1.4rem 2rem",
          borderRadius: "0.5rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- el panel de
            Payload no usa el optimizador de next/image; asset local estático */}
        <img
          src="/brand/ab-lockup-white.png"
          alt="ana banana Experiences"
          style={{ height: "3.25rem", width: "auto", display: "block" }}
        />
      </div>
      <span
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        Content Management System
      </span>
    </div>
  );
}
