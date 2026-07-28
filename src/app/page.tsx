import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { SocialProject } from "@/components/home/social-project";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedCase } from "@/components/home/featured-case";

// ---------------------------------------------------------------------------
// Home Page — Server Component (children are client where needed)
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <SocialProject />
      <FeaturedCase />
      <Testimonials />
    </>
  );
}
