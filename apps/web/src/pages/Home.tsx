import Hero from "../components/sections/Hero";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import CategoryGrid from "../components/sections/CategoryGrid";
import BestSellers from "../components/sections/BestSellers";
import Testimonials from "../components/sections/Testimonials";
import NewsletterCTA from "../components/sections/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <CategoryGrid />
      <BestSellers />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
