import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, FilterSelect, Panel } from "@/components/ds/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, CheckCircle2, Info, ShieldAlert, CheckCheck } from "lucide-react";
import { adminNotifications } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/admin/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Nexa Admin" },
      {
        name: "description",
        content:
          "Operational alerts for moderation, seller verification, payouts, AI systems and platform settings.",
      },
    ],
  }),
  component: AdminNotifications,
});

const ICONS = {
  critical: ShieldAlert,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
} as const;

const TONE = {
  critical: "text-destructive",
  warning: "text-[color:var(--warning)]",
  info: "text-primary",
  success: "text-[color:var(--success)]",
} as const;

function AdminNotifications() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("all");
  const [severity, setSeverity] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminNotifications.filter(
      (n) =>
        (channel === "all" || n.channel === channel) &&
        (severity === "all" || n.severity === severity) &&
        (!q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)),
    );
  }, [query, channel, severity]);

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={`${adminNotifications.filter((n) => n.unread).length} unread operational alerts`}
        actions={
          <Button variant="outline">
            <CheckCheck className="size-4" /> Mark all read
          </Button>
        }
      />

      <Panel>
        <div className="p-4 pb-0">
          <Tabs value={channel} onValueChange={setChannel}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <DataToolbar query={query} onQuery={setQuery} placeholder="Search alerts...">
          <FilterSelect
            label="Severity"
            value={severity}
            onChange={setSeverity}
            options={[
              { value: "all", label: "All severities" },
              { value: "critical", label: "Critical" },
              { value: "warning", label: "Warning" },
              { value: "info", label: "Info" },
              { value: "success", label: "Success" },
            ]}
          />
        </DataToolbar>
        <ul className="divide-y divide-border">
          {rows.map((n) => {
            const Icon = ICONS[n.severity];
            return (
              <li key={n.id} className={cn("flex gap-3 p-4", n.unread && "bg-accent/40")}>
                <Icon className={cn("mt-0.5 size-5 shrink-0", TONE[n.severity])} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize">
                      {n.channel}
                    </Badge>
                    {n.unread && <span className="size-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                </div>
              </li>
            );
          })}
          {rows.length === 0 && (
            <li className="flex flex-col items-center gap-2 p-12 text-center text-sm text-muted-foreground">
              <Bell className="size-6" /> No alerts match these filters.
            </li>
          )}
        </ul>
      </Panel>
    </>
  );
}
