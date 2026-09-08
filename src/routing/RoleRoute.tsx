import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { hasAllowedRole, roleHomePath, type Role } from "@/lib/auth/roles";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * Requires an authenticated session AND one of `allowedRoles`. The role always
 * comes from the authenticated user — never from the URL or local state.
 * A signed-in user with the wrong role is sent to their own home instead.
 */
export function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: readonly Role[];
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <RoleGate allowedRoles={allowedRoles}>{children}</RoleGate>
    </ProtectedRoute>
  );
}

function RoleGate({
  allowedRoles,
  children,
}: {
  allowedRoles: readonly Role[];
  children: ReactNode;
}) {
  const { user } = useAuth();
  if (!hasAllowedRole(user?.role, allowedRoles)) {
    return <Navigate to={roleHomePath(user?.role) as never} replace />;
  }
  return <>{children}</>;
}
