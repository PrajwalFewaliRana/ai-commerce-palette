import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { safeRedirect } from "@/lib/auth/roles";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/**
 * Auth-only pages (login, register, password reset, verification).
 * An already authenticated visitor is bounced to their requested destination or
 * their role home. Public shopping pages must NOT use this guard.
 */
export function PublicRoute({ children, redirect }: { children: ReactNode; redirect?: string }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <RoutePendingSkeleton />;
  if (isAuthenticated) return <Navigate to={safeRedirect(redirect, user?.role) as never} replace />;
  return <>{children}</>;
}
