import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { ProductCard } from "@/components/ds/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findProduct, products } from "@/lib/shop-data";
import {
  Sparkles, Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw,
  Check, X, ScrollText, GitCompareArrows, Bot,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.product.title ?? "Product"} — Nexa` },
    { name: "description", content: loaderData?.product.description ?? "Product details on Nexa." },
    { property: "og:title", content: `${loaderData?.product.title ?? "Product"} — Nexa` },
    { property: "og:description", content: loaderData?.product.description ?? "" },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const fbt = products.filter((p) => p.id !== product.id).slice(0, 3);
  const compareWith = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 2);
  const bundleTotal = [product, ...fbt].reduce((s, p) => s + p.price, 0);

  return (
    <ShopShell>
      <Breadcrumbs items={[
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: product.title },
      ]} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            {product.badge && <Badge variant={product.badge.variant ?? "ai"}>{product.badge.label}</Badge>}
            <span className="text-sm text-muted-foreground">by <span className="font-medium text-foreground">{product.vendor}</span></span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="size-4 fill-[color:var(--warning)] text-[color:var(--warning)]" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button size="lg" variant="hero" asChild>
              <Link to="/cart"><ShoppingCart /> Add to cart</Link>
            </Button>
            <Button size="lg" variant="outline"><Heart /> Wishlist</Button>
            <Button size="lg" variant="ai" asChild>
              <Link to="/checkout">Buy now</Link>
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <FeatureRow icon={Truck} title="Free shipping" desc="Delivery in 2–4 days" />
            <FeatureRow icon={ShieldCheck} title="1-year warranty" desc="Vendor-backed" />
            <FeatureRow icon={RotateCcw} title="30-day returns" desc="No questions asked" />
          </div>
        </div>
      </div>

      <AiSummaryCard product={product} />

      <section className="mt-10">
        <SectionHeading icon={GitCompareArrows} title="AI Product Comparison" subtitle="Side-by-side with similar picks in this category" />
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-4">Feature</th>
                <th className="p-4">{product.title}</th>
                {compareWith.map((c) => <th key={c.id} className="p-4">{c.title}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <ComparisonRow label="Price" values={[`$${product.price}`, ...compareWith.map((c) => `$${c.price}`)]} />
              <ComparisonRow label="Rating" values={[`${product.rating}★`, ...compareWith.map((c) => `${c.rating}★`)]} />
              <ComparisonRow label="Reviews" values={[product.reviews.toLocaleString(), ...compareWith.map((c) => c.reviews.toLocaleString())]} />
              <ComparisonRow label="Vendor" values={[product.vendor, ...compareWith.map((c) => c.vendor)]} />
              <ComparisonRow label="Free shipping" values={[true, true, true]} />
              <ComparisonRow label="AI Pick" values={[!!product.aiPick, !!compareWith[0]?.aiPick, !!compareWith[1]?.aiPick]} />
            </tbody>
          </table>
        </div>
      </section>

      <AiReviewSummary />

      <section className="mt-10">
        <SectionHeading title="Frequently bought together" />
        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-4">
            {[product, ...fbt].map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                {i < fbt.length && <span className="text-2xl font-light text-muted-foreground">+</span>}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Bundle total</p>
              <p className="mt-1 text-2xl font-bold">${bundleTotal.toFixed(2)}</p>
            </div>
            <Button variant="hero"><ShoppingCart /> Add all {fbt.length + 1} to cart</Button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading title="Related products" />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {related.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      </section>
    </ShopShell>
  );
}

function FeatureRow({ icon: Icon, title, desc }: { icon: typeof Truck; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
      <Icon className="size-5 text-primary" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, subtitle }: { icon?: typeof GitCompareArrows; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          {Icon && <Icon className="size-6 text-primary" />}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

function AiSummaryCard({ product }: { product: { title: string; description: string } }) {
  return (
    <section className="mt-10 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl text-primary-foreground [background-image:var(--gradient-ai)]">
          <Sparkles className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">AI Summary</p>
          <h2 className="mt-1 text-xl font-semibold">In one paragraph</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The {product.title} is a strong value pick in its category — buyers highlight the build quality,
            everyday comfort, and dependable performance. {product.description} It suits people who want a
            polished experience without paying flagship prices, and reviewers consistently mention how well
            it holds up over months of use.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="success" className="gap-1"><Check className="size-3" /> Great value</Badge>
            <Badge variant="success" className="gap-1"><Check className="size-3" /> Durable build</Badge>
            <Badge variant="warning" className="gap-1">Case sold separately</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiReviewSummary() {
  const pros = [
    "Exceptional comfort for long sessions",
    "Battery life exceeds the advertised spec",
    "Noise cancellation works well on flights",
  ];
  const cons = [
    "App could offer more EQ presets",
    "Case footprint is larger than competitors",
  ];
  return (
    <section className="mt-10 rounded-3xl border border-border/60 bg-accent/40 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <ScrollText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">AI Review Summary</p>
          <h2 className="mt-1 text-xl font-semibold">1,240 reviews, distilled</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--success)]">
                <Check className="size-4" /> What buyers love
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {pros.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-[color:var(--success)]" />{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
                <X className="size-4" /> Common complaints
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {cons.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-destructive" />{p}</li>)}
              </ul>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="mt-4"><Bot className="size-4" /> Ask AI about this product</Button>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ label, values }: { label: string; values: (string | number | boolean)[] }) {
  return (
    <tr>
      <td className="p-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-4 font-medium">
          {typeof v === "boolean" ? (v ? <Check className="size-4 text-[color:var(--success)]" /> : <X className="size-4 text-muted-foreground" />) : v}
        </td>
      ))}
    </tr>
  );
}