import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type Plugin } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import sharp from "sharp";

import { previewUrl } from "@/lib/preview";
import { Users } from "@/collections/users";
import { Media } from "@/collections/media";
import { Experiences } from "@/collections/experiences";
import { Services } from "@/collections/services";
import { Testimonials } from "@/collections/testimonials";
import { ClientLogos } from "@/collections/client-logos";
import { IntakeSubmissions } from "@/collections/intake-submissions";
import { HomePage } from "@/globals/home-page";
import { AboutPage } from "@/globals/about-page";
import { ContactPage } from "@/globals/contact-page";
import { PortfolioPage } from "@/globals/portfolio-page";
import { SiteSettings } from "@/globals/site-settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Sin valores de relleno: si falta una variable requerida, el arranque falla
// con un mensaje claro (contrato de _THE_RULES.md — nada de fallbacks mudos).
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

// Supabase Storage (API compatible con S3) solo cuando las variables existen
// (producción/preview). En dev local, Payload guarda en disco (./media).
// Si S3_BUCKET está presente, el resto de variables S3 pasa a ser requerido.
function buildPlugins(): Plugin[] {
  if (!process.env.S3_BUCKET) return [];
  const bucket = requireEnv("S3_BUCKET");
  const publicHost = requireEnv("SUPABASE_PUBLIC_HOSTNAME");
  return [
    s3Storage({
      collections: {
        media: {
          // El bucket es público: URLs directas al CDN de Supabase, sin pasar
          // cada imagen por una función serverless.
          disablePayloadAccessControl: true,
          prefix: "media",
          generateFileURL: ({ filename: file, prefix }: { filename: string; prefix?: string }) =>
            `https://${publicHost}/storage/v1/object/public/${bucket}/${prefix ? `${prefix}/` : ""}${file}`,
        },
      },
      bucket,
      // Subidas directas del navegador al bucket: evita el límite (~4.5 MB)
      // del cuerpo de las funciones de Vercel.
      clientUploads: true,
      config: {
        credentials: {
          accessKeyId: requireEnv("S3_ACCESS_KEY_ID"),
          secretAccessKey: requireEnv("S3_SECRET_ACCESS_KEY"),
        },
        region: requireEnv("S3_REGION"),
        endpoint: requireEnv("S3_ENDPOINT"),
        forcePathStyle: true,
      },
    }),
  ];
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — ana banana · Estudio de contenido",
      description:
        "Panel de administración de contenido del sitio anabanana.gt — ana banana Experiences.",
      icons: [{ url: "/icon.png" }],
      openGraph: {
        title: "ana banana · Estudio de contenido",
        description:
          "Panel de administración de contenido del sitio anabanana.gt.",
        siteName: "ana banana Experiences",
        // Tarjeta de marca del sitio en URL estable (relativa: resuelve contra
        // el host real, que hoy difiere de NEXT_PUBLIC_SERVER_URL).
        images: [{ url: "/og-card", width: 1200, height: 630 }],
      },
    },
    components: {
      graphics: {
        Logo: "./src/components/admin/logo#Logo",
        Icon: "./src/components/admin/icon#Icon",
      },
    },
    // Vista previa en vivo: el sitio real dentro del panel, con borradores,
    // en tres tamaños de pantalla.
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) =>
        previewUrl({
          collection: collectionConfig?.slug,
          global: globalConfig?.slug,
          slug: typeof data?.slug === "string" ? data.slug : null,
        }),
      collections: ["experiences", "services", "testimonials", "clientLogos"],
      globals: [
        "homePage",
        "aboutPage",
        "contactPage",
        "portfolioPage",
        "siteSettings",
      ],
      breakpoints: [
        { label: "Móvil", name: "movil", width: 375, height: 667 },
        { label: "Tableta", name: "tableta", width: 768, height: 1024 },
        { label: "Escritorio", name: "escritorio", width: 1440, height: 900 },
      ],
    },
  },
  // Interfaz del panel en español (paquete oficial); inglés disponible por
  // usuario desde su perfil.
  i18n: {
    fallbackLanguage: "es",
    supportedLanguages: { es, en },
  },
  collections: [
    Media,
    Experiences,
    Services,
    Testimonials,
    ClientLogos,
    IntakeSubmissions,
    Users,
  ],
  globals: [HomePage, AboutPage, ContactPage, PortfolioPage, SiteSettings],
  editor: lexicalEditor(),
  secret: requireEnv("PAYLOAD_SECRET"),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: requireEnv("DATABASE_URL"),
      // En serverless (Vercel) cada instancia abre su propio pool contra el
      // pooler de Supabase (6543): mantenerlo pequeño evita agotar conexiones.
      max: process.env.NODE_ENV === "production" ? 5 : 10,
    },
    migrationDir: path.resolve(dirname, "src/migrations"),
  }),
  sharp,
  plugins: buildPlugins(),
});
