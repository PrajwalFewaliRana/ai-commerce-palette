import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingInput } from "@/components/ds/floating-input";
import { Check, Truck, MapPin } from "lucide-react";
import { products, initialCart } from "@/lib/shop-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — Nexa" },
    { name: "description", content: "Complete your purchase securely on Nexa." },
    { property: "og:title", content: "Checkout — Nexa" },
    { property: "og:description", content: "Secure checkout on Nexa." },
  ] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const rows = initialCart.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! }));
  const subtotal = rows.reduce((s, r) => s + r.product.price * r.qty, 0);
  const ship = shipping === "express" ? 19 : subtotal > 100 ? 0 : 9;
  const tax = subtotal * 0.08;
  const total = subtotal + ship + tax;

  return (
    <ShopShell compactNav>
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <Stepper current={1} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Section title="Contact information">
            <div className="grid gap-3 sm:grid-cols-2">
              <FloatingInput label="Email" type="email" />
              <FloatingInput label="Phone" />
            </div>
          </Section>

          <Section title="Shipping address" icon={MapPin}>
            <div className="grid gap-3 sm:grid-cols-2">
              <FloatingInput label="First name" />
              <FloatingInput label="Last name" />
              <FloatingInput label="Address" className="sm:col-span-2" />
              <FloatingInput label="Apartment, suite (optional)" className="sm:col-span-2" />
              <FloatingInput label="City" />
              <FloatingInput label="Postal code" />
              <FloatingInput label="Country" className="sm:col-span-2" />
            </div>
          </Section>

          <Section title="Delivery method" icon={Truck}>
            <div className="grid gap-3 sm:grid-cols-2">
              <ShippingOption
                selected={shipping === "standard"}
                onSelect={() => setShipping("standard")}
                title="Standard delivery"
                desc="2–4 business days"
                price={subtotal > 100 ? "Free" : "$9.00"}
              />
              <ShippingOption
                selected={shipping === "express"}
                onSelect={() => setShipping("express")}
                title="Express delivery"
                desc="Next business day"
                price="$19.00"
              />
            </div>
          </Section>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" asChild><Link to="/cart">← Back to cart</Link></Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/payment">Continue to payment</Link>
            </Button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <p className="text-lg font-semibold">Your order</p>
          <ul className="mt-4 space-y-3">
            {rows.map((r) => (
              <li key={r.productId} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${r.product.image})` }}>
                  <Badge variant="secondary" className="absolute -right-1 -top-1 h-5 min-w-5 justify-center p-1 text-[10px]">{r.qty}</Badge>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{r.product.title}</p>
                  <p className="text-xs text-muted-foreground">{r.product.vendor}</p>
                </div>
                <p className="text-sm font-semibold">${(r.product.price * r.qty).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <SumRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <SumRow label="Shipping" value={ship === 0 ? "Free" : `$${ship.toFixed(2)}`} />
            <SumRow label="Tax" value={`$${tax.toFixed(2)}`} />
            <div className="flex items-center justify-between pt-2 text-base font-bold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </ShopShell>
  );
}

function Stepper({ current }: { current: number }) {
  const steps = ["Cart", "Shipping", "Payment", "Confirmation"];
  return (
    <ol className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span className={`grid size-6 place-items-center rounded-full text-xs font-semibold ${done ? "bg-[color:var(--success)] text-[color:var(--success-foreground)]" : active ? "text-primary-foreground [background-image:var(--gradient-ai)]" : "border border-border bg-card text-muted-foreground"}`}>
              {done ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={active ? "font-semibold" : "text-muted-foreground"}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon?: typeof Truck; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
        {Icon && <Icon className="size-4 text-primary" />}
        {title}
      </p>
      {children}
    </section>
  );
}

function ShippingOption({ selected, onSelect, title, desc, price }: { selected: boolean; onSelect: () => void; title: string; desc: string; price: string }) {
  return (
    <button type="button" onClick={onSelect} className={`flex items-start justify-between rounded-xl border p-4 text-left transition ${selected ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-background hover:border-primary/40"}`}>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <p className="text-sm font-semibold">{price}</p>
    </button>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between text-muted-foreground"><span>{label}</span><span className="font-medium text-foreground">{value}</span></div>;
}