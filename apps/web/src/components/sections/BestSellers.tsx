import FadeUp from "../ui/FadeUp";
import ProductCard from "../ui/ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { useProducts } from "../../hooks/useProducts";

export default function BestSellers() {
  const { data: all, isLoading, isError } = useProducts({ limit: 12 });
  const products = [...(all ?? [])].sort((a, b) => b.salesCount - a.salesCount).slice(0, 6);

  return (
    <section id="best-sellers" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Top Picks
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mt-1">
            Best Sellers
          </h2>
        </FadeUp>

        {isError ? (
          <p className="text-zinc-400 text-sm text-center py-20">
            Couldn't load products — please refresh.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((product, i) => (
                  <FadeUp key={product._id} delay={i * 0.07}>
                    <ProductCard product={product} />
                  </FadeUp>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
