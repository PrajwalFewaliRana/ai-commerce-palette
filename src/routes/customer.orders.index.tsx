import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ds/empty-state";
import { Package, ArrowRight } from "lucide-react";
import { orders } from "@/lib/shop-data";

const statusMap = {
  processing: { variant: "warning" as const, label: "Processing" },
  shipped: { variant: "ai" as const, label: "Shipped" },
  out_for_delivery: { variant: "ai" as const, label: "Out for delivery" },
  delivered: { variant: "success" as const, label: "Delivered" },
};

export const Route = createFileRoute("/customer/orders/")({
  head: () => ({
    meta: [
      { title: "Your Orders — Nexa" },
      {
        name: "description",
        content: "Track every Nexa order in one place with live status and AI-powered ETA.",
      },
      { property: "og:title", content: "Your Orders — Nexa" },
      { property: "og:description", content: "Track your Nexa orders." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orders" }]} />
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your orders</h1>

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Your purchases will appear here."
        />
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const s = statusMap[o.status];
            return (
              <Link
                key={o.id}
                to="/customer/orders/$id"
                params={{ id: o.id }}
                className="block rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex -space-x-3">
                      {o.items.map((it) => (
                        <img
                          key={it.product.id}
                          src={it.product.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="size-14 shrink-0 rounded-xl border-2 border-card object-cover"
                        />
                      ))}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Order {o.id} · {o.placedOn}
                      </p>
                      <p className="mt-0.5 line-clamp-1 font-semibold">
                        {o.items.map((it) => it.product.title).join(", ")}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant={s.variant}>{s.label}</Badge>
                        <span className="text-xs text-muted-foreground">ETA {o.eta}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">${o.total.toFixed(2)}</p>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </ShopShell>
  );
}
