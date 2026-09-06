import type { ReactNode } from "react";
import { Forbidden } from "./forbidden";
import { useAuth } from "@/lib/auth/auth-context";
import type { Role } from "@/lib/auth/roles";

/**
 * Role guard. Assumes an authenticated user (compose inside ProtectedRoute).
 * The role always comes from authenticated user data — never hardcoded.
 */
export function RoleRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: readonly Role[];
  children: ReactNode;
}) {
  const { user } = useAuth();
  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return <Forbidden role={user.role} />;
  return <>{children}</>;
}
