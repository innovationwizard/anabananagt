import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { StatsStrip } from "@/components/home/stats-strip";
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
      <StatsStrip />
      <FeaturedCase />
      <Testimonials />
    </>
  );
}
