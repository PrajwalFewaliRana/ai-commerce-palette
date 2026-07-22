import { createFileRoute } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { EmptyState } from "@/components/ds/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Sparkles, Tag, Settings2 } from "lucide-react";
import { notifications } from "@/lib/shop-data";

const iconFor = { order: Package, ai: Sparkles, deal: Tag, system: Settings2 } as const;

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [
    { title: "Notifications — Nexa" },
    { name: "description", content: "Order updates, AI picks, deals, and system alerts on Nexa." },
    { property: "og:title", content: "Notifications — Nexa" },
    { property: "og:description", content: "All your Nexa notifications." },
  ] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Notifications" }]} />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{notifications.filter((n) => n.unread).length} unread</p>
        </div>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" description="New alerts and AI picks will show up here." />
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconFor[n.type];
            return (
              <li key={n.id} className={`flex items-start gap-4 rounded-2xl border border-border p-4 transition ${n.unread ? "bg-primary/5" : "bg-card"}`}>
                <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${n.type === "ai" ? "text-primary-foreground [background-image:var(--gradient-ai)]" : "bg-accent text-accent-foreground"}`}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {n.unread && <Badge variant="ai" className="h-4 px-1.5 text-[10px]">New</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </ShopShell>
  );
}