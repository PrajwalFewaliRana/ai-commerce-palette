import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { ProductCard } from "@/components/ds/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, DollarSign, Star } from "lucide-react";
import { products, aiSuggestions } from "@/lib/shop-data";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [
    { title: "AI Search Results — Nexa" },
    { name: "description", content: "AI-curated matches for what you actually meant." },
    { property: "og:title", content: "AI Search Results — Nexa" },
    { property: "og:description", content: "Nexa AI understands natural language and finds the right products." },
  ] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q || "wireless headphones under $200 with great bass";
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Search" }]} />

      <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl text-primary-foreground [background-image:var(--gradient-ai)]">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">AI Interpretation</p>
            <h1 className="mt-1 text-xl font-semibold leading-snug sm:text-2xl">"{term}"</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              I found <span className="font-medium text-foreground">{products.length} matches</span> across{" "}
              <span className="font-medium text-foreground">3 vendors</span>. Prioritizing highly-rated items under
              your budget with strong bass response and active noise cancellation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="ai" className="gap-1"><DollarSign className="size-3" /> Under $200</Badge>
              <Badge variant="secondary" className="gap-1"><Star className="size-3" /> 4.5+ rating</Badge>
              <Badge variant="secondary">Wireless</Badge>
              <Badge variant="secondary">Great bass</Badge>
              <Badge variant="secondary">ANC</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Showing {products.length} results, sorted by AI relevance</p>
        <Button variant="outline" size="sm"><Filter className="size-4" /> Refine</Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <Link key={p.id} to="/product/$id" params={{ id: p.id }}>
            <ProductCard {...p} />
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border/60 bg-accent/40 p-6">
        <p className="text-sm font-semibold">Try refining your search</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {aiSuggestions.map((s) => (
            <Link key={s} to="/search" search={{ q: s }} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-primary/40 hover:text-primary">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </ShopShell>
  );
}