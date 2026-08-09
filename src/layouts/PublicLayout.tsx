import { Outlet } from "@tanstack/react-router";

/**
 * Public shell. The existing public pages already render <ShopShell> (nav +
 * footer) themselves, so this layout only provides the routing seam — adding a
 * second nav here would duplicate the approved UI.
 */
export function PublicLayout() {
  return <Outlet />;
}