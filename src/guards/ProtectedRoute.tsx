import { Navigate, useRouterState } from "@tanstack/react-router";
import { useRef, type ReactNode } from "react";

import { useAuthContext } from "@/context/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/**
 * Requires an authenticated session. Unauthenticated visitors are sent to
 * /login?redirect=<original-url> so they land back where they intended.
 *
 * NOTE: this is UX only. Route guards are not security — the backend
 * independently verifies identity, role and resource ownership.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const href = useRouterState({ select: (s) => s.location.href });
  // Captured once: re-reading it while the redirect is in flight would fold the
  // login URL back into its own redirect param.
  const requested = useRef(href);

  if (isLoading) return <RoutePendingSkeleton />;
  if (!isAuthenticated)
    return <Navigate to="/login" search={{ redirect: requested.current }} replace />;
  return <>{children}</>;
}