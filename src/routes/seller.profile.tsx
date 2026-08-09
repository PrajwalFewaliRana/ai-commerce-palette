import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/ds/seller-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/auth-context";

export const Route = createFileRoute("/seller/profile")({
  head: () => ({ meta: [{ title: "Store profile — Seller · Nexa" }] }),
  component: SellerProfilePage,
});

function SellerProfilePage() {
  const { user } = useAuthContext();

  return (
    <>
      <PageHeader title="Store profile" subtitle="How buyers see your store on Nexa." />
      <div className="max-w-2xl space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="store-name">Store name</Label>
          <Input id="store-name" placeholder="Your store name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-email">Contact email</Label>
          <Input id="store-email" type="email" defaultValue={user?.email ?? ""} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-bio">About your store</Label>
          <Textarea id="store-bio" rows={4} placeholder="Tell buyers what you sell." />
        </div>
        <Button>Save changes</Button>
      </div>
    </>
  );
}