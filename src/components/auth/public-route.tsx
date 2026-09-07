import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";
import { useAuth } from "@/lib/auth/auth-context";
import { dashboardPathForRole } from "@/lib/auth/roles";

/**
 * Public-only wrapper for authentication screens (login, register, password
 * and verification flows). Signed-in visitors are sent to their role home.
 * Public shopping pages are NOT wrapped in this.
 */
export function PublicRoute({ children }: { children: ReactNode }) {
  const { isLoading, user } = useAuth();
  if (isLoading) return <RoutePendingSkeleton />;
  if (user) return <Navigate to={dashboardPathForRole(user.role) as "/"} replace />;
  return <>{children}</>;
}
