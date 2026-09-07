import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /auth/* addresses now live at the top level. */
const LEGACY = {
  login: "/login",
  register: "/register",
  signup: "/register",
  "forgot-password": "/forgot-password",
  "reset-password": "/reset-password",
  "verify-email": "/verify-email",
} as const;

export const Route = createFileRoute("/auth/$")({
  beforeLoad: ({ params }) => {
    const key = (params._splat ?? "").replace(/^\/+|\/+$/g, "");
    const target = key in LEGACY ? LEGACY[key as keyof typeof LEGACY] : "/login";
    throw redirect({ to: target, replace: true });
  },
});
