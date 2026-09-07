import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/payment")({
  beforeLoad: () => {
    throw redirect({ to: "/customer/payment", replace: true });
  },
});
