import { Link } from "@tanstack/react-router";
import { Sparkles, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DashboardShell({
  role,
  title,
  children,
}: {
  role: "customer" | "seller" | "admin";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
              <Sparkles className="size-4" />
            </span>
            Nexa
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="ai" className="capitalize">{role}</Badge>
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth/login">
                <LogOut className="size-4" /> Sign out
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a placeholder {role} dashboard. Build your workflows on top of the Nexa design system.
        </p>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}