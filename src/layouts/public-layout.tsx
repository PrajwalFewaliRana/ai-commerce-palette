import { Outlet } from "@tanstack/react-router";

/**
 * Public area shell. Public pages already compose the existing shop
 * navigation and footer themselves, so this layout only hosts child routes.
 */
export function PublicLayout() {
  return <Outlet />;
}
