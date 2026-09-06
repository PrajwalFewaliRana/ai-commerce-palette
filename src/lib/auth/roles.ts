/**
 * Single source of truth for application roles and role-based destinations.
 * A future role (e.g. RIDER) only needs to be added here and given a layout
 * plus a route folder — no other logic changes.
 */
export const ROLES = ["CUSTOMER", "SELLER", "ADMIN"] as const;

export type Role = (typeof ROLES)[number];

const ROLE_HOME: Record<Role, string> = {
  CUSTOMER: "/customer/dashboard",
  SELLER: "/seller/dashboard",
  ADMIN: "/admin/dashboard",
};

/** Centralized post-authentication destination for a role. */
export function dashboardPathForRole(role: Role): string {
  return ROLE_HOME[role];
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** Normalizes a role value coming from an API/session payload. */
export function parseRole(value: unknown): Role | null {
  if (typeof value !== "string") return null;
  const upper = value.toUpperCase();
  return isRole(upper) ? upper : null;
}
