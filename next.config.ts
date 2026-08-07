import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Host público de Supabase Storage (p. ej. "abc123.supabase.co"). Solo existe
// en entornos con S3 configurado (producción/preview); en dev local las
// imágenes se sirven desde disco vía Payload y no se necesita patrón remoto.
const supabaseHostname = process.env.SUPABASE_PUBLIC_HOSTNAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // SAMEORIGIN (no DENY): la Vista previa en vivo de Payload muestra
          // el sitio dentro de un iframe del propio origen en /admin.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
