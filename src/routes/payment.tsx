import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ds/floating-input";
import { CreditCard, Wallet, ShieldCheck, Lock, Check } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [
    { title: "Payment — Nexa" },
    { name: "description", content: "Secure PCI-DSS encrypted payment on Nexa." },
    { property: "og:title", content: "Payment — Nexa" },
    { property: "og:description", content: "Complete your purchase securely." },
  ] }),
  component: PaymentPage,
});

function PaymentPage() {
  const [method, setMethod] = useState<"card" | "wallet" | "cod">("card");
  return (
    <ShopShell compactNav>
      <Breadcrumbs items={[{ label: "Checkout", to: "/checkout" }, { label: "Payment" }]} />
      <Stepper current={2} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-4 text-sm font-semibold">Payment method</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <MethodCard selected={method === "card"} onSelect={() => setMethod("card")} icon={CreditCard} title="Card" desc="Visa, Master, Amex" />
              <MethodCard selected={method === "wallet"} onSelect={() => setMethod("wallet")} icon={Wallet} title="Wallet" desc="Apple/Google Pay" />
              <MethodCard selected={method === "cod"} onSelect={() => setMethod("cod")} icon={ShieldCheck} title="Cash on delivery" desc="Pay at doorstep" />
            </div>

            {method === "card" && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <FloatingInput label="Card number" className="sm:col-span-2" />
                <FloatingInput label="Name on card" />
                <div className="grid grid-cols-2 gap-3">
                  <FloatingInput label="MM/YY" />
                  <FloatingInput label="CVC" />
                </div>
              </div>
            )}

            {method === "wallet" && (
              <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                You'll be redirected to your wallet provider to complete payment.
              </div>
            )}

            {method === "cod" && (
              <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Pay the courier when your order arrives. Small COD fee may apply.
              </div>
            )}
          </section>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> All transactions are PCI-DSS encrypted and never stored on our servers.
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" asChild><Link to="/checkout">← Back</Link></Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/orders/$id" params={{ id: "NX-10428" }}>Pay & place order</Link>
            </Button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <p className="text-lg font-semibold">Total due</p>
          <p className="mt-2 text-4xl font-bold">$246.32</p>
          <p className="mt-1 text-xs text-muted-foreground">Includes shipping and tax</p>
          <div className="mt-4 space-y-2 rounded-xl bg-accent/60 p-3 text-xs">
            <p className="flex items-center gap-2 text-foreground"><ShieldCheck className="size-3.5 text-[color:var(--success)]" /> Buyer protection included</p>
            <p className="flex items-center gap-2 text-foreground"><Lock className="size-3.5 text-[color:var(--success)]" /> 256-bit SSL encryption</p>
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

function MethodCard({ selected, onSelect, icon: Icon, title, desc }: { selected: boolean; onSelect: () => void; icon: typeof CreditCard; title: string; desc: string }) {
  return (
    <button type="button" onClick={onSelect} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${selected ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-background hover:border-primary/40"}`}>
      <Icon className={`size-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}