import Badge from "./Badge";
import Button from "./Button";
import type { Product } from "../../hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = Boolean(product.comparePrice);

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && <Badge label="Featured" variant="accent" />}
          {hasDiscount && <Badge label="Sale" variant="accent" />}
          {!product.inStock && <Badge label="Sold Out" variant="neutral" />}
        </div>

        {/* Quick-add overlay — slides up on hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="bg-primary/90 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs text-zinc-400 mb-2 font-medium">Quick Add</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="text-xs font-semibold text-white border border-zinc-600 rounded-lg px-2.5 py-1 hover:bg-white hover:text-zinc-900 hover:border-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
            <Button size="sm" className="w-full text-sm">
              Add to Bag
            </Button>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="pt-3 px-0.5">
        <p className="text-xs text-zinc-400 mb-0.5 capitalize">{product.category.name}</p>
        <h3 className="font-semibold text-zinc-900 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-bold text-zinc-900">${product.price}</span>
          {product.comparePrice && (
            <span className="text-sm text-zinc-400 line-through">${product.comparePrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
