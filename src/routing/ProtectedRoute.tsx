import type { ReactNode } from "react";

/** Guards disabled: every route is open without signing in. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
