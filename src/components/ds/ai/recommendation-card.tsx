import { Link } from "@tanstack/react-router";
import { Sparkles, Star, ShoppingCart, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "./ai-panel";
import type { Ranked } from "@/lib/ai-mock";
import { cn } from "@/lib/utils";

/** Product recommendation card: a product plus the assistant's reasoning for surfacing it. */
export function RecommendationCard({ item, className }: { item: Ranked; className?: string }) {
  const { product, score, reason } = item;
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full  transition-transform duration-500 group-hover:scale-105 object-cover"
        />
        <Badge variant="ai" className="absolute left-3 top-3 gap-1">
          <Sparkles className="size-3" /> AI Pick
        </Badge>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-muted-foreground">{product.vendor}</p>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="line-clamp-2 text-sm font-semibold leading-tight hover:text-primary"
        >
          {product.title}
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <p className="rounded-xl bg-accent/50 p-2.5 text-xs leading-relaxed text-muted-foreground">
          <Sparkles className="mr-1 inline size-3 text-primary" />
          {reason}
        </p>
        <div className="mt-auto space-y-3 pt-1">
          <ConfidenceMeter value={score} />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" aria-label="Not relevant">
                <ThumbsDown />
              </Button>
              <Button size="icon" variant="hero" aria-label="Add to cart" asChild>
                <Link to="/cart">
                  <ShoppingCart />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RecommendationRow({
  items,
  title = "Recommended for you",
  note,
}: {
  items: Ranked[];
  title?: string;
  note?: string;
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="size-5 text-primary" /> {title}
          </h2>
          {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <RecommendationCard key={item.product.id} item={item} />
        ))}
      </div>
    </section>
  );
}
