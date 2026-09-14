import { createFileRoute } from "@tanstack/react-router";
import { SellerShell } from "@/components/ds/seller-shell";
import { RoleRoute } from "@/routing/RoleRoute";

function SellerArea() {
  return (
    <RoleRoute allowedRoles={["SELLER"]}>
      <SellerShell />
    </RoleRoute>
  );
}

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: "Seller Dashboard — Nexa" },
      {
        name: "description",
        content:
          "Manage your Nexa store: products, orders, inventory, customers, and AI-powered insights.",
      },
    ],
  }),
  component: SellerArea,
});
