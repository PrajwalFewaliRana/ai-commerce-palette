import { Outlet } from "@tanstack/react-router";

/** Customer area seam. Pages keep their existing <ShopShell> chrome. */
export function CustomerLayout() {
  return <Outlet />;
}