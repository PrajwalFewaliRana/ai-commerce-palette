import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Sparkles,
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingBag,
  Tag,
  Star,
  Users,
  BarChart3,
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SignOutIconButton } from "@/components/ds/sign-out-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
};
const NAV: NavItem[] = [
  { to: "/seller/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/seller/products", label: "Products", icon: Package },
  { to: "/seller/inventory", label: "Inventory", icon: Warehouse },
  { to: "/seller/orders", label: "Orders", icon: ShoppingBag },
  { to: "/seller/coupons", label: "Coupons", icon: Tag },
  { to: "/seller/reviews", label: "Reviews", icon: Star },
  { to: "/seller/customers", label: "Customers", icon: Users },
  { to: "/seller/analytics", label: "Analytics", icon: BarChart3 },
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
        className="flex items-center gap-2 border-b border-border/60 px-5 py-4 text-lg font-semibold"
      >
        <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
          <Sparkles className="size-4" />
        </span>
        Nexa
        <Badge variant="ai" className="ml-1 text-[10px]">
          Seller
        </Badge>
      </Link>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3 text-sm">
        <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Manage
        </p>
        {NAV.map(({ to, label, icon: Icon, end }) => {
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
              <Icon className={cn("size-4", active && "text-primary")} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/60 p-3">
        <div className="rounded-xl border border-primary/20 p-3 [background-image:var(--gradient-subtle)]">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Sparkles className="size-3.5 text-primary" /> Nexa AI Copilot
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Generate listings, summarize reviews, and forecast sales.
          </p>
          <Button size="sm" variant="hero" className="mt-3 w-full">
            <Sparkles className="size-3.5" /> Ask AI
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SellerShell() {
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
      {/* Sidebar - desktop */}
      <aside
        aria-label="Seller navigation"
        className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-card/50 lg:block"
      >
        <SidebarInner pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
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
            aria-label="Seller navigation"
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
                className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
                placeholder="Search products, orders, customers..."
                aria-label="Search your store"
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
                to="/customer/notifications"
                aria-label="Notifications, unread"
                className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
              </Link>
              <div className="ml-2 flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1.5">
                <div className="grid size-7 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                  AC
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold leading-tight">Acoustica</p>
                  <p className="text-[10px] text-muted-foreground">Store · Verified</p>
                </div>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </div>
              <SignOutIconButton />
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

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function AiCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-30 blur-3xl [background-image:var(--gradient-ai)]" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
            <Sparkles className="size-3.5" />
          </span>
          <p className="text-sm font-semibold">{title}</p>
          <Badge variant="ai" className="ml-1 text-[10px]">
            AI
          </Badge>
        </div>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
