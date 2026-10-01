import type { ReactNode } from "react";
import type { Role } from "@/lib/auth/roles";

/** Guards disabled: role areas are open to everyone. */
export function RoleRoute({ children }: { allowedRoles: readonly Role[]; children: ReactNode }) {
  return <>{children}</>;
}
