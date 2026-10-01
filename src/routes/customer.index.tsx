import { createFileRoute } from "@tanstack/react-router";
import { CustomerDashboardPage } from "./customer.dashboard";

/** /customer renders the customer home directly — no redirect to /customer/dashboard. */
export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Customer Home — Nexa" },
      {
        name: "description",
        content: "Your Nexa home: orders, wishlist, AI picks, and notifications.",
      },
      { property: "og:title", content: "Customer Home — Nexa" },
      { property: "og:description", content: "Everything about your Nexa account, in one place." },
    ],
  }),
  component: CustomerDashboardPage,
});
