import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Shared frame for every in-context AI surface. Signals "assistant built into the page". */
export function AiPanel({
  eyebrow = "Nexa Assistant",
  title,
  subtitle,
  icon,
  tone = "default",
  actions,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  tone?: "default" | "soft";
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border p-6 shadow-[var(--shadow-card)] sm:p-8",
        tone === "soft" ? "border-border/60 bg-accent/40" : "border-primary/20 bg-card/70",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full opacity-20 blur-3xl [background-image:var(--gradient-ai)]" />
      <div className="relative flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl text-primary-foreground [background-image:var(--gradient-ai)]">
          {icon ?? <Sparkles className="size-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
            <Badge variant="ai" className="text-[10px]">
              AI
            </Badge>
          </div>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold leading-snug">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function ConfidenceMeter({ value, label = "Match" }: { value: number; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full [background-image:var(--gradient-ai)]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {value}% {label}
      </span>
    </div>
  );
}
