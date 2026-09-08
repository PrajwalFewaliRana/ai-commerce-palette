import { SellerShell } from "@/components/ds/seller-shell";
import { RoleRoute } from "@/routing/RoleRoute";

/** Seller area: authenticated + SELLER role, wrapped in the existing seller shell. */
export function SellerLayout() {
  return (
    <RoleRoute allowedRoles={["SELLER"]}>
      <SellerShell />
    </RoleRoute>
  );
}
