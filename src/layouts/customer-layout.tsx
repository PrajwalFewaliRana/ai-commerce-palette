import { Outlet } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/auth/protected-route";

/** Customer area shell. Pages keep their existing shop navigation/footer. */
export function CustomerLayout() {
  return (
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <Outlet />
    </ProtectedRoute>
  );
}
