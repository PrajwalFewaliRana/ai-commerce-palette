import { createFileRoute } from "@tanstack/react-router";

import { ProtectedRoute } from "@/guards";
import { CustomerLayout } from "@/layouts/CustomerLayout";

export const Route = createFileRoute("/customer")({
  ssr: false,
  component: () => (
    <ProtectedRoute>
      <CustomerLayout />
    </ProtectedRoute>
  ),
});