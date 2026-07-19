import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/ds/dashboard-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Package, Heart, Wallet, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/customer")({
  head: () => ({ meta: [{ title: "Customer Dashboard — Nexa" }] }),
  component: () => (
    <DashboardShell role="customer" title="Welcome back, Sarah">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Active orders" value="3" delta={12} icon={Package} />
        <DashboardCard label="Wishlist" value="18" delta={4} icon={Heart} />
        <DashboardCard label="Wallet balance" value="$248" delta={-2} icon={Wallet} />
        <DashboardCard label="Reviews given" value="27" delta={8} icon={Star} />
      </div>
    </DashboardShell>
  ),
});