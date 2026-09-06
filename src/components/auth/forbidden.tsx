import { Link } from "@tanstack/react-router";
import { dashboardPathForRole, type Role } from "@/lib/auth/roles";

/** Minimal denied state for an authenticated user with the wrong role. */
export function Forbidden({ role }: { role: Role }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-16">
      <div
        role="alert"
        className="animate-fade-in-up w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]"
      >
        <h1 className="text-h4 font-semibold text-foreground">This area isn't yours</h1>
        <p className="text-small mt-2 text-muted-foreground">
          Your account doesn't have access to this section.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to={dashboardPathForRole(role)}
            className="text-small inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to your dashboard
          </Link>
          <Link
            to="/"
            className="text-small inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-4 font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
