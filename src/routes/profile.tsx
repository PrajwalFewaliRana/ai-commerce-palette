import { createFileRoute } from "@tanstack/react-router";
import { ShopShell, Breadcrumbs } from "@/components/ds/shop-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingInput } from "@/components/ds/floating-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, CreditCard, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Nexa" },
      { name: "description", content: "Manage your Nexa profile, addresses, and payment methods." },
      { property: "og:title", content: "Your Profile — Nexa" },
      { property: "og:description", content: "Manage your Nexa account." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <ShopShell>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/customer" },
          { label: "Profile" },
        ]}
      />
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="text-lg font-semibold">SA</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sarah Ahmed</h1>
          <p className="text-sm text-muted-foreground">
            Customer since 2024 · <Badge variant="ai">Nexa Plus</Badge>
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 text-sm font-semibold">Personal info</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <FloatingInput label="First name" defaultValue="Sarah" />
            <FloatingInput label="Last name" defaultValue="Ahmed" />
            <FloatingInput
              label="Email"
              defaultValue="sarah@example.com"
              className="sm:col-span-2"
            />
            <FloatingInput label="Phone" defaultValue="+1 555 010 0110" className="sm:col-span-2" />
          </div>
          <div className="mt-4">
            <Button variant="hero">Save changes</Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <MapPin className="size-4 text-primary" /> Saved addresses
          </p>
          <ul className="space-y-3">
            <AddressRow name="Home" line="221B Baker St, Karachi 74000" primary />
            <AddressRow name="Office" line="Nexus Tower, Level 12, Islamabad" />
          </ul>
          <Button variant="outline" size="sm" className="mt-4">
            <Plus className="size-4" /> Add address
          </Button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <CreditCard className="size-4 text-primary" /> Payment methods
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            <PaymentRow brand="Visa" last4="4242" exp="08/28" primary />
            <PaymentRow brand="Mastercard" last4="1119" exp="03/27" />
          </ul>
          <Button variant="outline" size="sm" className="mt-4">
            <Plus className="size-4" /> Add card
          </Button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <p className="mb-4 text-sm font-semibold">Preferences</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Email notifications" desc="Order updates & AI picks" defaultChecked />
            <Toggle label="SMS updates" desc="Delivery-day alerts" defaultChecked />
            <Toggle
              label="Personalized AI recommendations"
              desc="Let AI learn from your activity"
              defaultChecked
            />
            <Toggle label="Marketing emails" desc="Weekly deals & new arrivals" />
          </div>
        </section>
      </div>
    </ShopShell>
  );
}

function AddressRow({ name, line, primary }: { name: string; line: string; primary?: boolean }) {
  return (
    <li className="flex items-start justify-between rounded-xl border border-border p-3">
      <div>
        <p className="text-sm font-semibold">
          {name}{" "}
          {primary && (
            <Badge variant="success" className="ml-1">
              Default
            </Badge>
          )}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{line}</p>
      </div>
      <button className="text-muted-foreground hover:text-destructive">
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}

function PaymentRow({
  brand,
  last4,
  exp,
  primary,
}: {
  brand: string;
  last4: string;
  exp: string;
  primary?: boolean;
}) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-border p-3">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-accent text-xs font-bold">
          {brand}
        </div>
        <div>
          <p className="text-sm font-semibold">
            •••• {last4}{" "}
            {primary && (
              <Badge variant="success" className="ml-1">
                Default
              </Badge>
            )}
          </p>
          <p className="text-xs text-muted-foreground">Expires {exp}</p>
        </div>
      </div>
      <button className="text-muted-foreground hover:text-destructive">
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}

function Toggle({
  label,
  desc,
  defaultChecked,
}: {
  label: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-xl border border-border p-3">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 size-4 accent-primary"
      />
    </label>
  );
}
