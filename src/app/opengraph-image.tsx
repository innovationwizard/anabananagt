import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Open Graph / social share card — generated at build time (1200×630).
// Brand lockup + essence line on Deep Navy (brand manual Ch.05).
// ---------------------------------------------------------------------------

export const alt =
  "ana banana Experiences — Transformar desde lo humano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Cream-on-navy full lockup (baked navy bg matches the card background).
  const logo = await readFile(
    join(process.cwd(), "public/brand/ab-lockup-on-navy.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "72px 96px",
          background: "#243054",
        }}
      >
        <img src={logoSrc} alt="" width={560} height={560} style={{ marginTop: -80 }} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginTop: -40,
            fontSize: 40,
            color: "#F4F2EA",
            lineHeight: 1.3,
          }}
        >
          <span>Transformar desde</span>
          <span style={{ color: "#ECFE79", fontStyle: "italic" }}>lo humano.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
