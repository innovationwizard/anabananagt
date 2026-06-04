import caseStudy from "./case-study";
import testimonial from "./testimonial";
import service from "./service";
import siteSettings from "./site-settings";

// ---------------------------------------------------------------------------
// Sanity Schema Registry
// Import into your sanity.config.ts: schema: { types: schemaTypes }
// ---------------------------------------------------------------------------

export const schemaTypes = [caseStudy, testimonial, service, siteSettings];
