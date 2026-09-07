import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/orders/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/customer/orders/$id", params: { id: params.id }, replace: true });
  },
});
