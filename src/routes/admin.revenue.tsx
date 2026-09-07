import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/revenue")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/analytics", replace: true });
  },
});
