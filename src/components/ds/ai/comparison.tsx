import { Link } from "@tanstack/react-router";
import { Check, X, GitCompareArrows, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiPanel } from "./ai-panel";
import type { Product } from "@/lib/shop-data";

type Cell = string | number | boolean;

/** AI Product Comparison: table plus the assistant's verdict on which one wins and why. */
export function AiProductComparison({ base, rivals }: { base: Product; rivals: Product[] }) {
  const all = [base, ...rivals];
  const bestValue = all.reduce((a, b) => (b.rating / b.price > a.rating / a.price ? b : a));
  const rows: { label: string; values: Cell[] }[] = [
    { label: "Price", values: all.map((p) => `$${p.price.toFixed(2)}`) },
    { label: "Rating", values: all.map((p) => `${p.rating}★`) },
    { label: "Reviews", values: all.map((p) => p.reviews.toLocaleString()) },
    { label: "Vendor", values: all.map((p) => p.vendor) },
    { label: "Discounted", values: all.map((p) => !!p.originalPrice) },
    { label: "Free shipping", values: all.map(() => true) },
    { label: "Assistant pick", values: all.map((p) => p.id === bestValue.id) },
  ];

  return (
    <AiPanel
      eyebrow="AI Product Comparison"
      icon={<GitCompareArrows className="size-5" />}
      title="How this compares to the close alternatives"
      subtitle={`I compared ${all.length} similar listings on price, ratings and review themes.`}
      actions={<Button variant="outline" size="sm" asChild><Link to="/products">Compare more</Link></Button>}
    >
      <div className="rounded-2xl border border-primary/20 bg-accent/40 p-4 text-sm leading-relaxed">
        <p className="flex items-center gap-2 font-semibold"><Trophy className="size-4 text-primary" /> Verdict</p>
        <p className="mt-1.5 text-muted-foreground">
          <span className="font-medium text-foreground">{bestValue.title}</span> gives the most rating per dollar here
          ({bestValue.rating}★ at ${bestValue.price.toFixed(2)}).
          {bestValue.id === base.id
            ? " You're already looking at the strongest option in this set."
            : ` Pick ${base.title} only if you prefer ${base.vendor}'s finish or warranty.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-4">Attribute</th>
              {all.map((p) => (
                <th key={p.id} className="p-4">
                  <span className="flex flex-col gap-1">
                    <span className="normal-case text-foreground">{p.title}</span>
                    {p.id === bestValue.id && <Badge variant="ai" className="w-fit text-[10px]">Best value</Badge>}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="p-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="p-4 font-medium">
                    {typeof v === "boolean"
                      ? (v ? <Check className="size-4 text-[color:var(--success)]" /> : <X className="size-4 text-muted-foreground" />)
                      : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AiPanel>
  );
}