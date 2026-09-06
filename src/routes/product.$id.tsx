import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy address. Kept so existing links keep working. */
export const Route = createFileRoute("/product/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/products/$id", params: { id: params.id }, replace: true });
  },
});
