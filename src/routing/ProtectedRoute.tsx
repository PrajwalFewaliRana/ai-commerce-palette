import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/**
 * Requires an authenticated session. While the session check is in flight the
 * existing route skeleton is shown; unauthenticated visitors are sent to
 * /login?redirect=<originally requested url>.
 *
 * NOTE: this is navigation UX only. It is NOT security — the backend must
 * independently verify identity, role and resource ownership on every request.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const href = useRouterState({ select: (s) => s.location.href });

  if (isLoading) return <RoutePendingSkeleton />;
  if (!isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: href }} replace />;
  }
  return <>{children}</>;
}
