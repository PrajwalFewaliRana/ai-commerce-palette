import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ds/seller-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/seller/products/$id/edit")({
  head: () => ({ meta: [{ title: "Edit product — Nexa Seller" }] }),
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  return (
    <>
      <PageHeader
        title="Edit product"
        subtitle={`Listing ${id}`}
        actions={
          <Button variant="outline" asChild>
            <Link to="/seller/products">
              <ArrowLeft className="size-4" /> Back to products
            </Link>
          </Button>
        }
      />
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <p className="text-small text-muted-foreground">
          The product editing form is connected in a later phase.
        </p>
      </div>
    </>
  );
}
