import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useAuthContext } from "@/context/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/** Only same-origin, absolute in-app paths may be used as a redirect target. */
export function safeRedirect(value: unknown): string | null {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : null;
}

/**
 * For auth-only pages (login, register, password recovery). Signed-in users are
 * bounced to their role home. Public shopping pages must NOT use this.
 */
export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, homePath } = useAuthContext();
  const search = useRouterState({ select: (s) => s.location.search as Record<string, unknown> });

  if (isLoading) return <RoutePendingSkeleton />;
  if (isAuthenticated) return <Navigate to={safeRedirect(search.redirect) ?? homePath} replace />;
  return <>{children}</>;
}