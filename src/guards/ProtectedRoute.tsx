import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

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
  const navigate = useNavigate();
  // Captured once, and never an auth URL: re-reading it while the redirect is in
  // flight would fold the login URL back into its own redirect param.
  const requested = useRef(href.startsWith("/login") ? undefined : href);
  const sent = useRef(false);

  const blocked = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (!blocked || sent.current) return;
    if (window.location.pathname.startsWith("/login")) return;
    sent.current = true;
    const target = window.location.pathname + window.location.search;
    void navigate({ to: "/login", search: { redirect: target }, replace: true });
  }, [blocked, navigate]);

  if (isLoading || blocked) return <RoutePendingSkeleton />;
  return <>{children}</>;
}