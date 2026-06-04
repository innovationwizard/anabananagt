import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Open Graph / social share card — generated at build time (1200×630).
// Brand emblem + wordmark + tagline on the "Quiet Authority" deep navy.
// ---------------------------------------------------------------------------

export const alt =
  "anabanana — Keynotes, facilitación y entrenamiento ejecutivo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/anabananagt_logo_mark.png"),
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
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          padding: "0 96px",
          background:
            "radial-gradient(120% 120% at 30% 20%, #1A2332 0%, #0A0F1C 60%)",
        }}
      >
        <img src={logoSrc} alt="" width={300} height={300} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 620,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#F7F5F0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            anabanana
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#C9A96E",
              lineHeight: 1.4,
            }}
          >
            Keynotes, facilitación y entrenamiento ejecutivo para las empresas
            más exigentes de la región.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
