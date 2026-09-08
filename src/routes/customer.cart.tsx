import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ds/empty-state";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, Tag } from "lucide-react";
import { products, initialCart } from "@/lib/shop-data";

export const Route = createFileRoute("/customer/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — Nexa" },
      {
        name: "description",
        content: "Review your cart before secure AI-assisted checkout on Nexa.",
      },
      { property: "og:title", content: "Shopping Cart — Nexa" },
      { property: "og:description", content: "Your cart on Nexa." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState(initialCart);
  const rows = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! }));
  const subtotal = rows.reduce((s, r) => s + r.product.price * r.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const setQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.productId === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.productId !== id));

  return (
    <ShopShell>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping cart</h1>

      {rows.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add products to see them here — or ask AI to find something for you."
          action={
            <Button asChild variant="hero">
              <Link to="/products">Start shopping</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.productId}
                className="flex gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <img
                  src={r.product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-24 shrink-0 overflow-hidden rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{r.product.vendor}</p>
                  <Link
                    to="/products/$id"
                    params={{ id: r.product.id }}
                    className="line-clamp-2 text-sm font-semibold hover:text-primary"
                  >
                    {r.product.title}
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-border">
                      <button
                        onClick={() => setQty(r.productId, r.qty - 1)}
                        className="grid size-8 place-items-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{r.qty}</span>
                      <button
                        onClick={() => setQty(r.productId, r.qty + 1)}
                        className="grid size-8 place-items-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-bold">${(r.product.price * r.qty).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => remove(r.productId)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="size-5 shrink-0 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">AI tip</p>
                  <p className="mt-1 text-muted-foreground">
                    Add $12 more to your order to unlock free shipping. Try the Ceramic Espresso Cup
                    Set.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6">
            <p className="text-lg font-semibold">Order summary</p>
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row
              label="Shipping"
              value={
                shipping === 0 ? <Badge variant="success">Free</Badge> : `$${shipping.toFixed(2)}`
              }
            />
            <Row label="Estimated tax" value={`$${tax.toFixed(2)}`} />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border p-2">
              <Tag className="size-4 text-muted-foreground" />
              <input
                placeholder="Promo code"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm" variant="ghost">
                Apply
              </Button>
            </div>
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
            <Link
              to="/products"
              className="block text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </ShopShell>
  );
}

function Row({ label, value, bold }: { label: string; value: ReactNode; bold?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between text-sm ${bold ? "text-base font-bold" : "text-muted-foreground"}`}
    >
      <span>{label}</span>
      <span className={bold ? "text-foreground" : "font-medium text-foreground"}>{value}</span>
    </div>
  );
}
