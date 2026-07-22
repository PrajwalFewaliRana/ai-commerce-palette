import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { ProductCard } from "@/components/ds/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Heart, Wallet, Star, ArrowRight, Sparkles, Bell, User, Truck } from "lucide-react";
import { orders, products, notifications } from "@/lib/shop-data";

export const Route = createFileRoute("/dashboard/customer")({
  head: () => ({ meta: [
    { title: "Customer Dashboard — Nexa" },
    { name: "description", content: "Your Nexa dashboard: orders, wishlist, AI picks, and notifications." },
    { property: "og:title", content: "Customer Dashboard — Nexa" },
    { property: "og:description", content: "Everything about your Nexa account, in one place." },
  ] }),
  component: CustomerDashboardPage,
});

const statusVariant = {
  processing: "warning",
  shipped: "ai",
  out_for_delivery: "ai",
  delivered: "success",
} as const;

function CustomerDashboardPage() {
  const active = orders.filter((o) => o.status !== "delivered");
  const picks = products.filter((p) => p.aiPick);
  const unread = notifications.filter((n) => n.unread);

  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Dashboard" }]} />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Sarah</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's new for you today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link to="/profile"><User className="size-4" /> Profile</Link></Button>
          <Button variant="outline" asChild><Link to="/notifications"><Bell className="size-4" /> Notifications</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Active orders" value={String(active.length)} delta={12} icon={Package} />
        <DashboardCard label="Wishlist" value="18" delta={4} icon={Heart} />
        <DashboardCard label="Wallet balance" value="$248" delta={-2} icon={Wallet} />
        <DashboardCard label="Reviews given" value="27" delta={8} icon={Star} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold"><Truck className="size-4 text-primary" /> Active orders</p>
            <Link to="/orders" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <ul className="space-y-3">
            {active.map((o) => (
              <li key={o.id}>
                <Link to="/orders/$id" params={{ id: o.id }} className="flex items-center gap-4 rounded-xl border border-border p-3 hover:border-primary/40">
                  <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${o.items[0].product.image})` }} />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold">{o.items[0].product.title}</p>
                    <p className="text-xs text-muted-foreground">{o.id} · ETA {o.eta}</p>
                  </div>
                  <Badge variant={statusVariant[o.status]}>{o.status.replace(/_/g, " ")}</Badge>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold"><Bell className="size-4 text-primary" /> Notifications</p>
            <Link to="/notifications" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <ul className="space-y-3">
            {unread.slice(0, 4).map((n) => (
              <li key={n.id} className="flex gap-3 rounded-xl border border-border p-3">
                <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{n.title}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{n.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="size-5 text-primary" /> AI picks for you</p>
          <Link to="/search" className="text-sm font-medium text-primary hover:underline">Ask AI →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {picks.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      </section>
    </ShopShell>
  );
}