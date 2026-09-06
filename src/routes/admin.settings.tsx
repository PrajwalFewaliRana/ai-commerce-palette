import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
import { Panel } from "@/components/ds/admin-shell";
import { FloatingInput } from "@/components/ds/floating-input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings — Nexa Admin" },
      {
        name: "description",
        content:
          "Configure marketplace identity, commission and payout rules, AI moderation thresholds and admin access.",
      },
    ],
  }),
  component: AdminSettings,
});

function ToggleRow({
  title,
  description,
  defaultOn,
}: {
  title: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}

function AdminSettings() {
  return (
    <>
      <PageHeader
        title="Platform settings"
        subtitle="Global rules applied across every store, listing and checkout."
        actions={
          <Button variant="hero">
            <Save className="size-4" /> Save changes
          </Button>
        }
      />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="commerce">Commerce</TabsTrigger>
          <TabsTrigger value="ai">AI & moderation</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Marketplace identity" subtitle="Shown across storefront and emails">
            <div className="space-y-4 p-5 pt-0">
              <FloatingInput label="Platform name" defaultValue="Nexa" />
              <FloatingInput label="Support email" defaultValue="support@nexa.co" />
              <FloatingInput label="Default currency" defaultValue="USD" />
              <FloatingInput label="Default locale" defaultValue="en-US" />
            </div>
          </Panel>
          <Panel title="Operations" subtitle="Maintenance and availability">
            <div className="px-5 pb-2">
              <ToggleRow
                title="Maintenance mode"
                description="Show a maintenance page to shoppers while keeping admin access."
              />
              <ToggleRow
                title="New seller signups"
                description="Allow new stores to submit verification applications."
                defaultOn
              />
              <ToggleRow
                title="Guest checkout"
                description="Let shoppers order without creating an account."
                defaultOn
              />
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="commerce" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Commission & payouts" subtitle="Platform take rate and payout cadence">
            <div className="space-y-4 p-5 pt-0">
              <FloatingInput label="Default commission %" defaultValue="10" type="number" />
              <FloatingInput label="Payout hold (days)" defaultValue="7" type="number" />
              <FloatingInput label="Minimum payout amount" defaultValue="50" type="number" />
              <FloatingInput label="Refund window (days)" defaultValue="30" type="number" />
            </div>
          </Panel>
          <Panel title="Order rules" subtitle="Applies to all stores">
            <div className="px-5 pb-2">
              <ToggleRow
                title="Auto-approve refunds under $25"
                description="Skip manual review for low-value refund requests."
                defaultOn
              />
              <ToggleRow
                title="Escalate disputes above 3%"
                description="Auto-schedule a store review when dispute rate exceeds the limit."
                defaultOn
              />
              <ToggleRow
                title="Allow cash on delivery"
                description="Enable COD in supported countries."
              />
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="ai" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel
            title="AI moderation"
            subtitle="Thresholds for automated decisions"
            actions={<Badge variant="ai">AI</Badge>}
          >
            <div className="space-y-4 p-5 pt-0">
              <FloatingInput label="Auto-remove confidence %" defaultValue="90" type="number" />
              <FloatingInput label="Escalate above confidence %" defaultValue="60" type="number" />
              <FloatingInput
                label="Seller risk auto-reject score"
                defaultValue="85"
                type="number"
              />
            </div>
          </Panel>
          <Panel title="AI features" subtitle="Shopper and seller experiences">
            <div className="px-5 pb-2">
              <ToggleRow
                title="AI natural-language search"
                description="Primary discovery experience on the storefront."
                defaultOn
              />
              <ToggleRow
                title="AI review summaries"
                description="Generate pros and cons on product pages."
                defaultOn
              />
              <ToggleRow
                title="AI listing generator for sellers"
                description="Let sellers draft titles, descriptions and SEO keywords."
                defaultOn
              />
              <ToggleRow
                title="AI price anomaly detection"
                description="Flag sudden price manipulation patterns for review."
                defaultOn
              />
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="access" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Admin security" subtitle="Protect privileged accounts">
            <div className="px-5 pb-2">
              <ToggleRow
                title="Require 2FA for admins"
                description="Enforce authenticator apps for every admin login."
                defaultOn
              />
              <ToggleRow
                title="IP allowlist"
                description="Restrict the admin console to approved office IP ranges."
              />
              <ToggleRow
                title="Audit log export"
                description="Stream every admin action to your SIEM daily."
                defaultOn
              />
            </div>
          </Panel>
          <Panel title="Admin team" subtitle="Who can access this console">
            <ul className="divide-y divide-border px-5 pb-2">
              {[
                { name: "Nexa Ops", email: "ops@nexa.co", role: "Super admin" },
                { name: "Dana Reyes", email: "dana@nexa.co", role: "Trust & safety" },
                { name: "Kwame Boateng", email: "kwame@nexa.co", role: "Finance" },
                { name: "Iris Lund", email: "iris@nexa.co", role: "Support lead" },
              ].map((m) => (
                <li key={m.email} className="flex items-center gap-3 py-3">
                  <div className="grid size-8 place-items-center rounded-lg bg-accent text-xs font-semibold">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                  </div>
                  <Badge variant="secondary">{m.role}</Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
