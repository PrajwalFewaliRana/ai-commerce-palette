import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useAuthContext } from "@/context/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";
import type { AppRole } from "@/lib/auth";

/**
 * Role gate. Roles always come from the authenticated user's granted roles —
 * never hardcoded. Extensible: add "rider" to AppRole and pass it here later.
 */
export function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: AppRole[];
  children: ReactNode;
}) {
  const { roles, isLoading, homePath } = useAuthContext();

  if (isLoading) return <RoutePendingSkeleton />;
  if (!roles.some((r) => allowedRoles.includes(r))) return <Navigate to={homePath} replace />;
  return <>{children}</>;
}