import type { ReactNode } from "react";

/** Guards disabled: auth pages are always reachable. */
export function PublicRoute({ children }: { children: ReactNode; redirect?: string }) {
  return <>{children}</>;
}
