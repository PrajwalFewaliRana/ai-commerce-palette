import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PublicRoute } from "@/routing/PublicRoute";

/** Login/register/reset pages are public-only: signed-in users bounce to their home. */
export const Route = createFileRoute("/_auth")({
  component: () => (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  ),
});
