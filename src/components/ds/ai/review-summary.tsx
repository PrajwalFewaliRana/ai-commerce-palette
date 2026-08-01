import { Check, X, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AiPanel } from "./ai-panel";
import { reviewInsight } from "@/lib/ai-mock";
import type { Product } from "@/lib/shop-data";

/** AI Review Summary: sentiment split, recurring themes, pros/cons, verdict. */
export function AiReviewSummary({ product }: { product: Product }) {
  const insight = reviewInsight(product);
  return (
    <AiPanel
      eyebrow="AI Review Summary"
      tone="soft"
      icon={<MessageSquareQuote className="size-5" />}
      title={`${insight.total.toLocaleString()} reviews, distilled`}
      subtitle={insight.verdict}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sentiment</p>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full">
              <div className="bg-[color:var(--success)]" style={{ width: `${insight.sentiment.positive}%` }} />
              <div className="bg-muted" style={{ width: `${insight.sentiment.neutral}%` }} />
              <div className="bg-destructive" style={{ width: `${insight.sentiment.negative}%` }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>{insight.sentiment.positive}% positive</span>
              <span>{insight.sentiment.neutral}% neutral</span>
              <span>{insight.sentiment.negative}% critical</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What reviewers keep mentioning</p>
            <ul className="mt-2 space-y-2">
              {insight.themes.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2 text-sm">
                  <span>{t.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.mentions.toLocaleString()} mentions</span>
                    <Badge variant={t.tone === "positive" ? "success" : t.tone === "negative" ? "destructive" : "warning"}>{t.tone}</Badge>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--success)]"><Check className="size-4" /> What buyers love</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {insight.pros.map((p) => (
                <li key={p} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-[color:var(--success)]" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-destructive"><X className="size-4" /> Common complaints</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {insight.cons.map((p) => (
                <li key={p} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-destructive" />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AiPanel>
  );
}