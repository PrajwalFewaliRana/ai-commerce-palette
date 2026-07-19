import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/ds/dashboard-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Users, Store, DollarSign, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Nexa" }] }),
  component: () => (
    <DashboardShell role="admin" title="Platform overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total users" value="128,412" delta={7} icon={Users} />
        <DashboardCard label="Active sellers" value="4,208" delta={5} icon={Store} />
        <DashboardCard label="GMV (30d)" value="$1.24M" delta={14} icon={DollarSign} />
        <DashboardCard label="Pending reviews" value="23" delta={-12} icon={ShieldAlert} />
      </div>
    </DashboardShell>
  ),
});