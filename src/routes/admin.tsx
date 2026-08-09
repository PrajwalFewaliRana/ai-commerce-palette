import { createFileRoute } from "@tanstack/react-router";

import { ProtectedRoute, RoleRoute } from "@/guards";
import { AdminLayout } from "@/layouts/AdminLayout";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: () => (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
});