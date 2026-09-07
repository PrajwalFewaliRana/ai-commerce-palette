import { createFileRoute } from "@tanstack/react-router";
import { SellerLayout } from "@/layouts/seller-layout";

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: "Seller Dashboard — Nexa" },
      {
        name: "description",
        content:
          "Manage your Nexa store: products, orders, inventory, customers, and AI-powered insights.",
      },
      { property: "og:title", content: "Seller Dashboard — Nexa" },
      {
        property: "og:description",
        content: "Run your Nexa store with AI insights, inventory and order tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SellerLayout,
});
