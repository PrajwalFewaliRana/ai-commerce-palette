import { ProtectedRoute } from "@/components/auth/protected-route";
import { AdminShell } from "@/components/ds/admin-shell";

/** Admin area shell: existing admin sidebar + header, gated by role. */
export function AdminLayout() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminShell />
    </ProtectedRoute>
  );
}
