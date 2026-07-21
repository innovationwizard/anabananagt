// ---------------------------------------------------------------------------
// sanity.config.ts — Sanity Studio Configuration
// ---------------------------------------------------------------------------
// To launch the Studio, install the Sanity CLI globally and run:
//   npx sanity@latest init --env
//   npx sanity dev
//
// Or embed the Studio in the Next.js app at /studio using next-sanity.
// See: https://www.sanity.io/docs/embed-studio-v3
// ---------------------------------------------------------------------------

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "anabanana",
  title: "ana banana Experiences — Content Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
