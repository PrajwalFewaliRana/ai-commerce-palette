import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Check,
  Sparkles,
  MessageSquareText,
} from "lucide-react";
import { findOrder, type Order } from "@/lib/shop-data";

const STEPS = [
  { key: "placed", label: "Order placed", icon: Check },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for delivery", icon: MapPin },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

const statusIndex: Record<Order["status"], number> = {
  processing: 1,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,
};

export const Route = createFileRoute("/orders/$id")({
  loader: ({ params }): { order: Order } => ({ order: findOrder(params.id) }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `Order ${loaderData?.order.id ?? ""} — Nexa` },
      { name: "description", content: "Live order tracking with AI-predicted delivery." },
      { property: "og:title", content: `Order ${loaderData?.order.id ?? ""} — Nexa` },
      { property: "og:description", content: "Track your Nexa order." },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const { order } = Route.useLoaderData() as { order: Order };
  const current = statusIndex[order.status];
  const total = order.items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <ShopShell>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Orders", to: "/orders" },
          { label: order.id },
        ]}
      />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order {order.id}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {order.placedOn} · Tracking {order.tracking}
          </p>
        </div>
        <Badge variant="ai" className="text-sm">
          ETA {order.eta}
        </Badge>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
        <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {STEPS.map((s, i) => {
            const done = i <= current;
            const active = i === current;
            const Icon = s.icon;
            return (
              <li
                key={s.key}
                className="flex flex-1 items-center gap-3 sm:flex-col sm:items-center sm:text-center"
              >
                <div
                  className={`grid size-10 place-items-center rounded-full transition ${done ? "text-primary-foreground [background-image:var(--gradient-ai)]" : "border border-border bg-card text-muted-foreground"} ${active ? "ring-4 ring-primary/20" : ""}`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="sm:mt-3">
                  <p
                    className={`text-sm font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </p>
                  {active && <p className="mt-0.5 text-xs text-primary">In progress</p>}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="size-5 shrink-0 text-primary" />
            <div className="text-sm">
              <p className="font-semibold">AI ETA</p>
              <p className="mt-1 text-muted-foreground">
                Based on carrier routing and traffic, your order will most likely arrive{" "}
                <span className="font-medium text-foreground">{order.eta}</span>. We'll notify you
                as soon as the driver is 15 minutes away.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 text-sm font-semibold">Items in this order</p>
          <ul className="divide-y divide-border">
            {order.items.map((it) => (
              <li key={it.product.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <img
                  src={it.product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0 overflow-hidden rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{it.product.vendor}</p>
                  <Link
                    to="/product/$id"
                    params={{ id: it.product.id }}
                    className="line-clamp-1 text-sm font-semibold hover:text-primary"
                  >
                    {it.product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">Qty {it.qty}</p>
                </div>
                <p className="text-sm font-semibold">${(it.product.price * it.qty).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold">Summary</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-foreground">Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <MessageSquareText className="size-4" /> Contact vendor
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/orders">All orders</Link>
          </Button>
        </aside>
      </div>
    </ShopShell>
  );
}
