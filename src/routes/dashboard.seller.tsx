import { createFileRoute } from "@tanstack/react-router";
import { SellerShell } from "@/components/ds/seller-shell";
import { requireRole } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/seller")({
  ssr: false,
  beforeLoad: async () => {
    await requireRole("seller");
  },
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
