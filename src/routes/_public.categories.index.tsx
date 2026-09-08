import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { CategoryCard } from "@/components/ds/category-card";
import { categories } from "@/lib/shop-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop by Category — Nexa" },
      {
        name: "description",
        content: "Browse every category on Nexa. Electronics, fashion, home, and more.",
      },
      { property: "og:title", content: "Shop by Category — Nexa" },
      { property: "og:description", content: "Explore all Nexa marketplace categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Categories" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop by category</h1>
        <p className="mt-2 text-muted-foreground">
          Or tell our AI what you need and skip the browsing.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}>
            <CategoryCard label={c.label} count={c.count} icon={c.icon} />
          </Link>
        ))}
      </div>
    </ShopShell>
  );
}
