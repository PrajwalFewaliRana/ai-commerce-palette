import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy address. Kept so existing links keep working. */
export const Route = createFileRoute("/category/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/categories/$category",
      params: { category: params.slug },
      replace: true,
    });
  },
});
