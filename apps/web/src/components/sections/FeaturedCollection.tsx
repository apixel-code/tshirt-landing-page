import FadeUp from "../ui/FadeUp";
import ProductCard from "../ui/ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { useProducts } from "../../hooks/useProducts";

export default function FeaturedCollection() {
  const { data: products, isLoading } = useProducts({ featured: true, limit: 8 });

  return (
    <section id="featured" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              New Arrivals
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mt-1">
              Featured Collection
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </FadeUp>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : (products ?? []).map((product, i) => (
                <FadeUp key={product._id} delay={i * 0.06}>
                  <ProductCard product={product} />
                </FadeUp>
              ))}
        </div>
      </div>
    </section>
  );
}
