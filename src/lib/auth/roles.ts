/**
 * Single source of truth for roles and role-based destinations.
 * Extensible: adding "RIDER" here (plus a layout + route folder) is all a future
 * rider role needs — no guard or redirect logic has to change.
 */
export const ROLES = ["CUSTOMER", "SELLER", "ADMIN"] as const;

export type Role = (typeof ROLES)[number];

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

/** Where each role lands after authentication. */
export const ROLE_HOME: Record<Role, string> = {
  CUSTOMER: "/customer/dashboard",
  SELLER: "/seller/dashboard",
  ADMIN: "/admin/dashboard",
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export function roleHomePath(role: Role | null | undefined): string {
  return role ? ROLE_HOME[role] : "/";
}

export function hasAllowedRole(
  role: Role | null | undefined,
  allowedRoles: readonly Role[],
): boolean {
  return !!role && allowedRoles.includes(role);
}

/** Only same-origin relative paths are honoured as post-login destinations. */
export function safeRedirect(redirect: string | undefined, role: Role | null | undefined): string {
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) return redirect;
  return roleHomePath(role);
}
