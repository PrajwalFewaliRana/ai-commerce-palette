import { TrendingUp, AlertTriangle, Lightbulb, ArrowRight, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiPanel, ConfidenceMeter } from "./ai-panel";
import { sellerInsights, type SellerInsight } from "@/lib/ai-mock";

const toneMeta: Record<SellerInsight["tone"], { icon: typeof TrendingUp; badge: "success" | "warning" | "ai"; label: string }> = {
  opportunity: { icon: Lightbulb, badge: "success", label: "Opportunity" },
  risk: { icon: AlertTriangle, badge: "warning", label: "Needs attention" },
  trend: { icon: TrendingUp, badge: "ai", label: "Trend" },
};

/** AI Seller Insights: prioritised, explained actions with projected impact. */
export function AiSellerInsights({ items = sellerInsights, limit }: { items?: SellerInsight[]; limit?: number }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <AiPanel
      eyebrow="AI Seller Insights"
      icon={<LineChart className="size-5" />}
      title="What I'd do next in your store"
      subtitle="Ranked by projected impact this month, with the reasoning shown."
    >
      <ul className="grid gap-3 lg:grid-cols-2">
        {list.map((insight) => {
          const meta = toneMeta[insight.tone];
          const Icon = meta.icon;
          return (
            <li key={insight.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{insight.title}</p>
                    <Badge variant={meta.badge} className="text-[10px]">{meta.label}</Badge>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{insight.detail}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[color:var(--success)]">{insight.impact}</p>
                  <ConfidenceMeter value={insight.confidence} label="confidence" />
                </div>
                <Button variant="outline" size="sm">{insight.action} <ArrowRight className="size-4" /></Button>
              </div>
            </li>
          );
        })}
      </ul>
    </AiPanel>
  );
}