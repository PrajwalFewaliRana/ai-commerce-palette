import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardCardProps {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  className?: string;
}

export function DashboardCard({ label, value, delta, icon: Icon, className }: DashboardCardProps) {
  const positive = delta >= 0;
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </div>
      </div>
      <div className={cn("mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        positive ? "bg-[color:var(--success)]/15 text-[color:var(--success)]" : "bg-destructive/15 text-destructive")}>
        {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {positive ? "+" : ""}{delta}% vs last week
      </div>
    </div>
  );
}
