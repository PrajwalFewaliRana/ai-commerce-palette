import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/ds/seller-shell";
import { ProductEditor } from "@/components/ds/product-editor";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/seller/products/new")({
  head: () => ({ meta: [{ title: "New product — Seller · Nexa" }] }),
  component: NewProductPage,
});

function NewProductPage() {
  return (
    <>
      <PageHeader
        title="New product"
        subtitle="Add a listing to your store."
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/seller/products">
              <ArrowLeft className="size-4" /> Back to products
            </Link>
          </Button>
        }
      />
      <ProductEditor />
    </>
  );
}