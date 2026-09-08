import { Outlet } from "@tanstack/react-router";

/**
 * Public shell: the existing ShopNav + ShopFooter chrome already ships inside
 * `ShopShell`, which each public page composes, so this layout only provides
 * the nesting point. Kept as a named layout so future public pages have one
 * obvious place to hook shared chrome.
 */
export function PublicLayout() {
  return <Outlet />;
}
