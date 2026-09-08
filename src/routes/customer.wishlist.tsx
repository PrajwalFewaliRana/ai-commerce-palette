import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { ProductCard } from "@/components/ds/product-card";
import { EmptyState } from "@/components/ds/empty-state";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { products, initialWishlist } from "@/lib/shop-data";

export const Route = createFileRoute("/customer/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Nexa" },
      {
        name: "description",
        content: "Saved products, tracked prices, and AI suggestions on Nexa.",
      },
      { property: "og:title", content: "Your Wishlist — Nexa" },
      { property: "og:description", content: "Everything you're keeping an eye on." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = products.filter((p) => initialWishlist.includes(p.id));
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} items saved · AI will notify you on price drops.
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/cart">Move all to cart</Link>
        </Button>
      </div>
      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <Link key={p.id} to="/products/$id" params={{ id: p.id }}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Tap the heart on any product to save it here. Our AI will watch prices for you."
          action={
            <Button asChild variant="hero">
              <Link to="/products">Browse products</Link>
            </Button>
          }
        />
      )}
    </ShopShell>
  );
}
