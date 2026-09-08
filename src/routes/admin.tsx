import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ds/admin-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — Nexa" },
      {
        name: "description",
        content:
          "Nexa platform admin: KPIs, revenue analytics, users, seller verification, moderation, categories, orders, reports and settings.",
      },
      { property: "og:title", content: "Admin Console — Nexa" },
      {
        property: "og:description",
        content:
          "Operate the Nexa marketplace: revenue analytics, trust & safety queues, and platform settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminShell,
});
