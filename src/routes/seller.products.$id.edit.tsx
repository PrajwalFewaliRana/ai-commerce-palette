import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/ds/seller-shell";
import { ProductEditor } from "@/components/ds/product-editor";
import { Button } from "@/components/ui/button";
import { sellerProducts } from "@/lib/seller-data";

export const Route = createFileRoute("/seller/products/$id/edit")({
  head: () => ({ meta: [{ title: "Edit product — Seller · Nexa" }] }),
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const product = sellerProducts.find((p) => p.id === id);

  return (
    <>
      <PageHeader
        title={product ? `Edit ${product.title}` : "Edit product"}
        subtitle="Update this listing's details."
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/seller/products">
              <ArrowLeft className="size-4" /> Back to products
            </Link>
          </Button>
        }
      />
      <ProductEditor
        defaultTitle={product?.title ?? ""}
        defaultPrice={product ? String(product.price) : ""}
      />
    </>
  );
}