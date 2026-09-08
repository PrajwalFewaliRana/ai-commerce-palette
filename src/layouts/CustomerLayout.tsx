import { Outlet } from "@tanstack/react-router";
import { RoleRoute } from "@/routing/RoleRoute";

/**
 * Customer area: authenticated + CUSTOMER role. The customer chrome is the
 * existing shopping navigation (ShopShell) rendered by each page, so this
 * layout adds the guard and the nesting point only.
 */
export function CustomerLayout() {
  return (
    <RoleRoute allowedRoles={["CUSTOMER"]}>
      <Outlet />
    </RoleRoute>
  );
}
