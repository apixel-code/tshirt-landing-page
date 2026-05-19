import { motion } from "framer-motion";
import FadeUp from "../ui/FadeUp";
import { CategoryCardSkeleton } from "../ui/Skeleton";
import { useCategories } from "../../hooks/useCategories";

const FALLBACK_IMAGES: Record<string, string> = {
  oversized: "https://picsum.photos/seed/cat-oversized/800/1000",
  graphics: "https://picsum.photos/seed/cat-graphics/800/1000",
  basics: "https://picsum.photos/seed/cat-basics/800/1000",
  collabs: "https://picsum.photos/seed/cat-collabs/800/1000",
};

export default function CategoryGrid() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Shop By
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mt-1">
            Categories
          </h2>
        </FadeUp>

        {isError && (
          <p className="text-zinc-400 text-sm text-center py-20">
            Couldn't load categories — please refresh.
          </p>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <CategoryCardSkeleton key={i} />)
            : (categories ?? []).map((cat, i) => {
                const imgUrl =
                  cat.image ??
                  FALLBACK_IMAGES[cat.slug] ??
                  `https://picsum.photos/seed/${cat.slug}/800/1000`;

                return (
                  <FadeUp key={cat._id} delay={i * 0.08}>
                    <motion.a
                      href="#featured"
                      className="relative group block overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <img
                        src={imgUrl}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {/* Accent hover tint */}
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />

                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <h3 className="font-display text-xl font-bold text-white">{cat.name}</h3>
                        {cat.description && (
                          <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-accent font-semibold mt-3 group-hover:gap-2 transition-all duration-200">
                          Shop now
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </motion.a>
                  </FadeUp>
                );
              })}
        </div>
      </div>
    </section>
  );
}
