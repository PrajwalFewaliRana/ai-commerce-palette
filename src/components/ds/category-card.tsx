import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  label: string;
  count: number;
  icon: LucideIcon;
  className?: string;
}

export function CategoryCard({ label, count, icon: Icon, className }: CategoryCardProps) {
  return (
    <button
      className={cn(
        "group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div className="grid size-11 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-primary)]">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{count.toLocaleString()} items</p>
      </div>
    </button>
  );
}
