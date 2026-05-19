export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-[3/4] rounded-2xl bg-zinc-200" />
      <div className="pt-3 space-y-2">
        <div className="h-3 bg-zinc-200 rounded w-1/4" />
        <div className="h-4 bg-zinc-200 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 rounded w-1/5" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return <div className="aspect-[4/5] rounded-2xl bg-zinc-200 animate-pulse" />;
}
