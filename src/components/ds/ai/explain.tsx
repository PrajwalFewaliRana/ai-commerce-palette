import { useState } from "react";
import { BookOpen, Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiPanel } from "./ai-panel";
import { explainProduct } from "@/lib/ai-mock";
import type { Product } from "@/lib/shop-data";

/** AI Product Explanation: plain-English breakdown, who it's for, and jargon decoded. */
export function AiProductExplanation({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const info = explainProduct(product);

  return (
    <AiPanel
      eyebrow="AI Explanation"
      icon={<BookOpen className="size-5" />}
      title="What this product actually is"
      subtitle="No spec-sheet decoding required."
      actions={
        <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
          <Sparkles className="size-4" /> {open ? "Hide jargon buster" : "Decode the jargon"}
        </Button>
      }
    >
      <p className="text-sm leading-relaxed text-muted-foreground">{info.plain}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--success)]">
            <Check className="size-4" /> Buy it if
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {info.goodFor.map((g) => (
              <Badge key={g} variant="success">
                {g}
              </Badge>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <X className="size-4" /> Skip it if
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {info.skipIf.map((g) => (
              <Badge key={g} variant="secondary">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {info.jargon.map((j) => (
            <div key={j.term} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
              <dt className="w-40 shrink-0 text-sm font-semibold">{j.term}</dt>
              <dd className="text-sm text-muted-foreground">{j.meaning}</dd>
            </div>
          ))}
        </dl>
      )}
    </AiPanel>
  );
}
