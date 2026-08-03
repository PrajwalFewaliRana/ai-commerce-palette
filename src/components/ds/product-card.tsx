import { Heart, Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  title: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: { label: string; variant?: "ai" | "success" | "warning" | "destructive" };
  className?: string;
  /** Set for the first above-the-fold card so the LCP image is not lazy-loaded. */
  priority?: boolean;
}

export function ProductCard({
  title,
  vendor,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
  className,
  priority = false,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {badge && (
          <Badge variant={badge.variant ?? "ai"} className="absolute left-3 top-3">
            {badge.label}
          </Badge>
        )}
        <button
          type="button"
          aria-label={`Save ${title} to wishlist`}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-background"
        >
          <Heart className="size-4" />
        </button>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-small font-medium text-muted-foreground">{vendor}</p>
        <h3 className="line-clamp-2 text-h6 font-semibold">{title}</h3>
        <div className="flex items-center gap-1 text-small text-muted-foreground">
          <Star
            aria-hidden="true"
            className="size-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]"
          />
          <span className="font-medium text-foreground">{rating}</span>
          <span>
            <span className="sr-only">rating from </span>({reviews}
            <span className="sr-only"> reviews</span>)
          </span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-h4 font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <s className="text-caption text-muted-foreground">
                <span className="sr-only">was </span>${originalPrice.toFixed(2)}
              </s>
            )}
          </div>
          <Button
            size="icon"
            variant="hero"
            aria-label={`Add ${title} to cart`}
            className="min-h-11 min-w-11 rounded-lg sm:min-h-9 sm:min-w-9"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </article>
  );
}
