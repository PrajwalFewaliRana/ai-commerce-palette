import { createFileRoute } from "@tanstack/react-router";

import { ProtectedRoute, RoleRoute } from "@/guards";
import { SellerLayout } from "@/layouts/SellerLayout";

export const Route = createFileRoute("/seller")({
  ssr: false,
  component: () => (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["seller", "admin"]}>
        <SellerLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
});