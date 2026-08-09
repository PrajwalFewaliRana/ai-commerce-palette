import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/customer/")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/customer/dashboard", replace: true });
  },
});