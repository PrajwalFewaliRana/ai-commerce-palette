import { createFileRoute } from "@tanstack/react-router";
import { SellerShell } from "@/components/ds/seller-shell";

export const Route = createFileRoute("/dashboard/seller")({
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
  component: SellerShell,
});
