import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/seller/dashboard", replace: true });
  },
});