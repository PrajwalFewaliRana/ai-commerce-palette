import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Sparkles,
  LayoutDashboard,
  LineChart,
  Users,
  ShieldCheck,
  PackageSearch,
  FolderTree,
  ShoppingBag,
  FileBarChart,
  Bell,
  Settings,
  Search,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/ds/sign-out-button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/admin/revenue", label: "Revenue analytics", icon: LineChart },
  { to: "/dashboard/admin/users", label: "User management", icon: Users },
  { to: "/dashboard/admin/sellers", label: "Seller verification", icon: ShieldCheck, badge: "12" },
  {
    to: "/dashboard/admin/moderation",
    label: "Product moderation",
    icon: PackageSearch,
    badge: "23",
  },
  { to: "/dashboard/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/dashboard/admin/reports", label: "Reports", icon: FileBarChart },
  { to: "/dashboard/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  return {
    dark,
    toggle: () => {
      const next = !dark;
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
    },
  };
}

function SidebarInner({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link
        to="/"
        className="flex items-center gap-2 border-b border-border/60 px-5 py-4 text-h6 font-semibold"
      >
        <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
          <Sparkles className="size-4" />
        </span>
        Nexa
        <Badge variant="ai" className="ml-1 text-[10px]">
          Admin
        </Badge>
      </Link>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3 text-small">
        <p className="px-3 pb-1 pt-2 text-caption font-medium uppercase tracking-wider text-muted-foreground">
          Platform
        </p>
        {NAV.map(({ to, label, icon: Icon, end, badge }) => {
          const active = end ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground shadow-[var(--shadow-sm)]",
              )}
            >
              <Icon className={cn("size-4 shrink-0", active && "text-primary")} />
              <span className="truncate">{label}</span>
              {badge && (
                <Badge variant="warning" className="ml-auto text-[10px]">
                  {badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/60 p-3">
        <div className="rounded-xl border border-primary/20 p-3 [background-image:var(--gradient-subtle)]">
          <div className="flex items-center gap-2 text-caption font-semibold">
            <Sparkles className="size-3.5 text-primary" /> Trust & Safety AI
          </div>
          <p className="mt-1 text-caption text-muted-foreground">
            23 listings and 4 stores need a human decision today.
          </p>
          <Button size="sm" variant="hero" className="mt-3 w-full" asChild>
            <Link to="/dashboard/admin/moderation" onClick={onNavigate}>
              Review queue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AdminShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { dark, toggle } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside
        aria-label="Admin navigation"
        className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-card/50 lg:block"
      >
        <SidebarInner pathname={pathname} />
      </aside>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="animate-fade-in fixed inset-0 z-40 bg-background/70 backdrop-blur lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="animate-slide-in-left fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-card lg:hidden"
          >
            <SidebarInner pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-small outline-none placeholder:text-muted-foreground focus:border-primary/50"
                placeholder="Search users, stores, orders, listings..."
                aria-label="Search the platform"
              />
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                aria-pressed={dark}
                aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <Link
                to="/dashboard/admin/notifications"
                aria-label="Notifications, unread"
                className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
              </Link>
              <div className="ml-2 flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1.5">
                <div className="grid size-7 place-items-center rounded-lg bg-primary text-caption font-semibold text-primary-foreground">
                  NX
                </div>
                <div className="hidden sm:block">
                  <p className="text-caption font-semibold leading-tight">Nexa Ops</p>
                  <p className="text-[10px] text-muted-foreground">Super admin</p>
                </div>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </div>
              <SignOutButton />
            </div>
          </div>
        </header>
        <main
          id="main-content"
          className="animate-fade-in mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ---------- shared data-heavy table primitives ---------- */

export function DataToolbar({
  query,
  onQuery,
  placeholder,
  children,
}: {
  query: string;
  onQuery: (v: string) => void;
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-4">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder ?? "Search..."}
          className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-small outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />
      </div>
      {children}
    </div>
  );
}

export function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-caption text-muted-foreground">
      {label && <span className="hidden sm:inline">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-background px-3 py-2 text-small text-foreground outline-none focus:border-primary/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Pager({
  page,
  pageSize,
  total,
  onPage,
  onPageSize,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
  onPageSize?: (n: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const window = useMemo(() => {
    const start = Math.max(1, Math.min(page - 2, pages - 4));
    return Array.from({ length: Math.min(5, pages) }, (_, i) => start + i);
  }, [page, pages]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 p-4 text-caption text-muted-foreground">
      <p>
        Showing{" "}
        <b className="text-foreground">
          {from}–{to}
        </b>{" "}
        of <b className="text-foreground">{total.toLocaleString()}</b>
      </p>
      <div className="flex items-center gap-2">
        {onPageSize && (
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSize(Number(e.target.value));
              onPage(1);
            }}
            className="rounded-lg border border-border bg-background px-2 py-1.5 text-caption text-foreground outline-none"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        )}
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        {window.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon"
            className="size-8 text-caption"
            onClick={() => onPage(p)}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
          <div>
            {title && <p className="text-small font-semibold">{title}</p>}
            {subtitle && <p className="text-caption text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
