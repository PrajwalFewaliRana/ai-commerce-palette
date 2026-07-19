import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/ds/dashboard-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/seller")({
  head: () => ({ meta: [{ title: "Seller Dashboard — Nexa" }] }),
  component: () => (
    <DashboardShell role="seller" title="Store overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Revenue (30d)" value="$24,180" delta={18} icon={DollarSign} />
        <DashboardCard label="Orders" value="342" delta={9} icon={ShoppingCart} />
        <DashboardCard label="Active listings" value="87" delta={3} icon={Package} />
        <DashboardCard label="Conversion" value="4.2%" delta={-1} icon={TrendingUp} />
      </div>
    </DashboardShell>
  ),
});