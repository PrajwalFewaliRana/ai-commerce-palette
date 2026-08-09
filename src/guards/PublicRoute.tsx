import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useAuthContext } from "@/context/auth-context";
import { RoutePendingSkeleton } from "@/components/ds/skeletons";

/**
 * Only same-origin, absolute in-app paths may be used as a redirect target.
 * Auth pages are rejected so a redirect target can never nest inside itself.
 */
export function safeRedirect(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  const path = value.split("?")[0];
  const authOnly = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
  if (authOnly.includes(path)) return null;
  return value;
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