import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ds/seller-shell";

export const Route = createFileRoute("/seller/profile")({
  head: () => ({ meta: [{ title: "Store profile — Nexa Seller" }] }),
  component: SellerProfilePage,
});

function SellerProfilePage() {
  return (
    <>
      <PageHeader title="Store profile" subtitle="Your storefront details and payout settings." />
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <p className="text-small text-muted-foreground">
          Store profile settings are connected in a later phase.
        </p>
      </div>
    </>
  );
}
