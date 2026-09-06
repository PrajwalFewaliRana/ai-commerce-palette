import { createFileRoute } from "@tanstack/react-router";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Sparkles } from "lucide-react";
import { sellerReviews } from "@/lib/seller-data";

export const Route = createFileRoute("/dashboard/seller/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Seller · Nexa" }] }),
  component: ReviewsPage,
});

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < n ? "fill-[color:var(--warning)] text-[color:var(--warning)]" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

function ReviewsPage() {
  const avg = (sellerReviews.reduce((n, r) => n + r.rating, 0) / sellerReviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: sellerReviews.filter((r) => r.rating === s).length,
  }));
  const max = Math.max(...dist.map((d) => d.count), 1);

  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="Read, respond, and understand what customers are saying."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-bold tracking-tight">{avg}</p>
            <div>
              <Stars n={Math.round(Number(avg))} />
              <p className="mt-0.5 text-xs text-muted-foreground">{sellerReviews.length} reviews</p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-xs">
                <span className="w-6 text-muted-foreground">{d.star}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-[color:var(--warning)]"
                    style={{ width: `${(d.count / max) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-muted-foreground">{d.count}</span>
              </div>
            ))}
          </div>
        </section>

        <AiCard
          title="AI Review Summary"
          description="Synthesized from all 5 recent reviews across your store."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[color:var(--success)]/20 bg-[color:var(--success)]/5 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--success)]">
                <ThumbsUp className="size-3.5" /> What customers love
              </div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• Battery life on the ANC headphones</li>
                <li>• Comfortable fit for long sessions</li>
                <li>• Premium finish on watches and mugs</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-destructive">
                <ThumbsDown className="size-3.5" /> Common concerns
              </div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• Earbud call-mode disconnects (firmware)</li>
                <li>• Watch strap stiffness out of box</li>
                <li>• Sneaker sizing runs narrow</li>
              </ul>
            </div>
          </div>
          <Button variant="ai" size="sm" className="mt-3 w-full">
            <Sparkles className="size-3.5" /> Draft public reply from summary
          </Button>
        </AiCard>
      </div>

      <div className="mt-6 space-y-4">
        {sellerReviews.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex flex-wrap items-start gap-4">
              <img
                src={r.productImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-12 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{r.author}</p>
                  <Stars n={r.rating} />
                  <span className="text-xs text-muted-foreground">· {r.date}</span>
                  <Badge
                    variant={
                      r.sentiment === "positive"
                        ? "success"
                        : r.sentiment === "negative"
                          ? "destructive"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {r.sentiment}
                  </Badge>
                  {r.replied && (
                    <Badge variant="ai" className="gap-1">
                      <MessageSquare className="size-3" /> Replied
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">on {r.product}</p>
                <p className="mt-2 text-sm">{r.body}</p>
                {!r.replied && (
                  <div className="mt-3 rounded-xl border border-border bg-muted/30 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="size-3.5 text-primary" /> AI suggested reply
                    </div>
                    <Textarea
                      rows={2}
                      defaultValue={`Thanks for the honest feedback, ${r.author.split(" ")[0]} — we're rolling out a firmware update next week that fixes this. We'll email you the moment it ships.`}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        Skip
                      </Button>
                      <Button variant="hero" size="sm">
                        Post reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
