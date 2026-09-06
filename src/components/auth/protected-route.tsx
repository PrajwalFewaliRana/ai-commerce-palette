import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RoleRoute } from "./role-route";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";
import { useAuth } from "@/lib/auth/auth-context";
import type { Role } from "@/lib/auth/roles";

/**
 * Requires an authenticated session, optionally narrowed to specific roles.
 * NOTE: this is a UI guard only. It hides screens; it does not secure data.
 * Every backend endpoint must independently verify token, identity, role and
 * resource ownership.
 */
export function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles?: readonly Role[];
  children: ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();
  const href = useRouterState({ select: (s) => s.location.href });

  if (isLoading) return <RoutePendingSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" search={{ redirect: href }} replace />;
  if (allowedRoles) return <RoleRoute allowedRoles={allowedRoles}>{children}</RoleRoute>;
  return <>{children}</>;
}
