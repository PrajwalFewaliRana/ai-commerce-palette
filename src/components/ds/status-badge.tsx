import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "active" | "pending" | "failed" | "draft";

const map: Record<
  Status,
  { label: string; variant: "success" | "warning" | "destructive" | "secondary"; dot: string }
> = {
  active: { label: "Active", variant: "success", dot: "bg-[color:var(--success)]" },
  pending: { label: "Pending", variant: "warning", dot: "bg-[color:var(--warning)]" },
  failed: { label: "Failed", variant: "destructive", dot: "bg-destructive" },
  draft: { label: "Draft", variant: "secondary", dot: "bg-muted-foreground" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = map[status];
  return (
    <Badge variant={s.variant} className="gap-1.5">
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label}
    </Badge>
  );
}
