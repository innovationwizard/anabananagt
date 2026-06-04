import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

// ---------------------------------------------------------------------------
// Sanity Client — Server-side only (uses token for draft access)
// ---------------------------------------------------------------------------
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-06-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

// ---------------------------------------------------------------------------
// Image URL Builder
// ---------------------------------------------------------------------------
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
