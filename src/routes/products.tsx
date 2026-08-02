import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { ProductCard } from "@/components/ds/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/lib/shop-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Nexa" },
      {
        name: "description",
        content: "Browse every product on Nexa's AI-powered multi-vendor marketplace.",
      },
      { property: "og:title", content: "All Products — Nexa" },
      { property: "og:description", content: "Every product on Nexa, curated by AI." },
    ],
  }),
  component: ProductListingPage,
});

function ProductListingPage() {
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Products" }]} />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} results across {categories.length} categories
          </p>
        </div>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="size-4" /> Filters
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-semibold">Category</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <span>{c.label}</span>
                    <span className="text-xs">{c.count.toLocaleString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-sm font-semibold">Price</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Under $50", "$50–$100", "$100–$200", "$200+"].map((p) => (
                  <Badge key={p} variant="secondary" className="cursor-pointer hover:bg-accent">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold">Rating</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["4.5+", "4.0+", "3.5+"].map((p) => (
                  <Badge key={p} variant="secondary" className="cursor-pointer hover:bg-accent">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      </div>
    </ShopShell>
  );
}
