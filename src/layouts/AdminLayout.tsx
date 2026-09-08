import { AdminShell } from "@/components/ds/admin-shell";
import { RoleRoute } from "@/routing/RoleRoute";

/** Admin area: authenticated + ADMIN role, wrapped in the existing admin shell. */
export function AdminLayout() {
  return (
    <RoleRoute allowedRoles={["ADMIN"]}>
      <AdminShell />
    </RoleRoute>
  );
}
