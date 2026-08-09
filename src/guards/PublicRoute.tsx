import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useAuthContext } from "@/context/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/**
 * For auth-only pages (login, register, password recovery). Signed-in users are
 * bounced to their role home. Public shopping pages must NOT use this.
 */
export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, homePath } = useAuthContext();

  if (isLoading) return <RoutePendingSkeleton />;
  if (isAuthenticated) return <Navigate to={homePath} replace />;
  return <>{children}</>;
}