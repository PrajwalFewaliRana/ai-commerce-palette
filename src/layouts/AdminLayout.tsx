import { AdminShell } from "@/components/ds/admin-shell";

/** Existing admin sidebar + header; renders child routes via <Outlet />. */
export function AdminLayout() {
  return <AdminShell />;
}