import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { ProductCard } from "@/components/ds/product-card";
import { Button } from "@/components/ui/button";
import { findCategory, products } from "@/lib/shop-data";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/_public/categories/$category")({
  loader: ({ params }) => {
    const cat = findCategory(params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.label ?? "Category"} — Nexa` },
      {
        name: "description",
        content: `Shop ${loaderData?.cat.label ?? ""} on Nexa's AI-powered marketplace.`,
      },
      { property: "og:title", content: `${loaderData?.cat.label ?? "Category"} — Nexa` },
      {
        property: "og:description",
        content: `Curated ${loaderData?.cat.label ?? "products"} from trusted vendors.`,
      },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <ShopShell>
      <p className="py-20 text-center text-muted-foreground">Category not found.</p>
    </ShopShell>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const items = products.filter((p) => p.category === cat.slug);
  const Icon = cat.icon;
  return (
    <ShopShell>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Categories", to: "/categories" },
          { label: cat.label },
        ]}
      />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl text-primary-foreground [background-image:var(--gradient-primary)]">
            <Icon className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{cat.label}</h1>
            <p className="text-sm text-muted-foreground">
              {cat.count.toLocaleString()} items · Curated by AI
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="size-4" /> Filters
        </Button>
      </div>
      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No products in this category yet.</p>
          <Link
            to="/search"
            search={{ q: cat.label }}
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            Ask AI to find similar items →
          </Link>
        </div>
      )}
    </ShopShell>
  );
}
