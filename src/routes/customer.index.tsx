import { createFileRoute, redirect } from "@tanstack/react-router";

/** /customer always lands on the customer home (dashboard). */
export const Route = createFileRoute("/customer/")({
  beforeLoad: () => {
    throw redirect({ to: "/customer/dashboard" });
  },
});
