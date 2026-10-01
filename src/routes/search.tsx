import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { NaturalLanguageSearch } from "@/components/ds/ai/nl-search";
import { RecommendationCard } from "@/components/ds/ai/recommendation-card";
import { AiPanel } from "@/components/ds/ai/ai-panel";
import { parseQuery, rankProducts } from "@/lib/ai-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Wand2 } from "lucide-react";
import { aiSuggestions } from "@/lib/shop-data";
import { EmptyState } from "@/components/ds/empty-state";
import { SearchX } from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "AI Search Results — Nexa" },
      { name: "description", content: "AI-curated matches for what you actually meant." },
      { property: "og:title", content: "AI Search Results — Nexa" },
      {
        property: "og:description",
        content: "Nexa AI understands natural language and finds the right products.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q || "wireless headphones under $200 with great bass";
  const parsed = parseQuery(term);
  const ranked = rankProducts(parsed);
  const vendors = new Set(ranked.map((r) => r.product.vendor)).size;
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Search" }]} />

      <NaturalLanguageSearch defaultValue={term} className="mb-6" />

      <AiPanel
        eyebrow="AI Interpretation"
        icon={<Wand2 className="size-5" />}
        title={`"${term}"`}
        subtitle={parsed.interpretation}
      >
        <p className="text-sm text-muted-foreground">
          I found <span className="font-medium text-foreground">{ranked.length} matches</span>{" "}
          across <span className="font-medium text-foreground">{vendors} vendors</span>, ranked by
          how well each one answers your sentence.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {parsed.facets.length ? (
            parsed.facets.map((f) => (
              <Badge
                key={f.label}
                variant={f.kind === "budget" || f.kind === "rating" ? "ai" : "secondary"}
              >
                {f.label}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">Broad search — add a budget or use case to narrow it</Badge>
          )}
        </div>
      </AiPanel>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Showing {ranked.length} results, sorted by AI relevance
        </p>
        <Button variant="outline" size="sm">
          <Filter aria-hidden="true" className="size-4" /> Refine
        </Button>
      </div>

      {ranked.length ? (
        <div className="animate-fade-in mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ranked.map((item) => (
            <RecommendationCard key={item.product.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          icon={SearchX}
          title="No matches for that sentence"
          description="Try loosening the budget, or describe the use case instead of the product name."
          action={
            <Button asChild variant="ai" size="sm">
              <Link to="/products">Browse all products</Link>
            </Button>
          }
        />
      )}

      <div className="mt-10 rounded-2xl border border-border/60 bg-accent/40 p-6">
        <p className="text-sm font-semibold">Try refining your search</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {aiSuggestions.map((s) => (
            <Link
              key={s}
              to="/search"
              search={{ q: s }}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-primary/40 hover:text-primary"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </ShopShell>
  );
}
