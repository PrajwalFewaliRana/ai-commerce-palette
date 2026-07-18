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
}

export function ProductCard({
  title, vendor, price, originalPrice, rating, reviews, image, badge, className,
}: ProductCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]", className)}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
        {badge && (
          <Badge variant={badge.variant ?? "ai"} className="absolute left-3 top-3">
            {badge.label}
          </Badge>
        )}
        <button className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background">
          <Heart className="size-4" />
        </button>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs text-muted-foreground">{vendor}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
          <span className="font-medium text-foreground">{rating}</span>
          <span>({reviews})</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            {originalPrice && <span className="text-xs text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>}
          </div>
          <Button size="icon" variant="hero" className="rounded-lg">
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
}
