import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /dashboard/* addresses now live under each role area. */
const LEGACY = {
  customer: "/customer/dashboard",
  seller: "/seller/dashboard",
  admin: "/admin/dashboard",
} as const;

export const Route = createFileRoute("/dashboard/$")({
  beforeLoad: ({ params }) => {
    const key = (params._splat ?? "").replace(/^\/+|\/+$/g, "").split("/")[0];
    const target = key in LEGACY ? LEGACY[key as keyof typeof LEGACY] : "/customer/dashboard";
    throw redirect({ to: target, replace: true });
  },
});
