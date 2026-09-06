import { ProtectedRoute } from "@/components/auth/protected-route";
import { SellerShell } from "@/components/ds/seller-shell";

/** Seller area shell: existing seller sidebar + header, gated by role. */
export function SellerLayout() {
  return (
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <SellerShell />
    </ProtectedRoute>
  );
}
