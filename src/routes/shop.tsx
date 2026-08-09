import { createFileRoute, redirect } from "@tanstack/react-router";

/** /shop is an alias of the existing product listing — one page, two URLs. */
export const Route = createFileRoute("/shop")({
  beforeLoad: () => {
    throw redirect({ to: "/products", replace: true });
  },
});