import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Sparkles, ShoppingCart, Heart, Bell, User, Menu, ArrowUp, Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { aiSuggestions } from "@/lib/shop-data";

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };
  return { dark, toggle };
}

export function ShopNav({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { dark, toggle } = useDarkMode();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);

  const submit = () => {
    const term = q.trim();
    navigate({ to: "/search", search: { q: term || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold">
          <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">Nexa</span>
        </Link>

        {!compact && (
          <div className="relative hidden flex-1 md:block">
            <div className={cn(
              "flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-1.5 transition",
              focus && "border-primary/50 shadow-[var(--shadow-glow)]"
            )}>
              <Sparkles className="size-4 shrink-0 text-primary" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 120)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Ask AI: 'wireless headphones under $200 with great bass'"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={submit}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]"
                aria-label="Ask AI"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
            {focus && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-lg)]">
                <p className="border-b border-border/60 px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">Try asking</p>
                {aiSuggestions.map((s) => (
                  <button
                    key={s}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-accent"
                    onMouseDown={() => { setQ(s); navigate({ to: "/search", search: { q: s } as never }); }}
                  >
                    <Sparkles className="size-3.5 text-primary" /> {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <nav className="ml-auto flex items-center gap-1">
          <Link to="/categories" className={cn("hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground lg:inline-flex", pathname.startsWith("/categor") && "text-foreground")}>
            Categories
          </Link>
          <Link to="/products" className={cn("hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground lg:inline-flex", pathname === "/products" && "text-foreground")}>
            Deals
          </Link>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Link to="/notifications" className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </Link>
          <Link to="/wishlist" className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex">
            <Heart className="size-4" />
          </Link>
          <Link to="/cart" className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
            <ShoppingCart className="size-4" />
            <Badge variant="ai" className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1 text-[10px]">2</Badge>
          </Link>
          <Link to="/dashboard/customer" className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex">
            <User className="size-4" />
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-4" />
          </Button>
        </nav>
      </div>

      {!compact && (
        <div className="border-t border-border/40 bg-background/50 md:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card px-3">
              <Sparkles className="size-4 shrink-0 text-primary" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Ask AI what you need..."
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="button"
              onClick={submit}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground [background-image:var(--gradient-ai)]"
              aria-label="Ask AI"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function ShopFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
              <Sparkles className="size-4" />
            </span>
            Nexa
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The AI-powered marketplace that finds what you actually meant.
          </p>
        </div>
        <FooterCol title="Shop" links={[["Categories", "/categories"], ["All products", "/products"], ["Wishlist", "/wishlist"], ["Cart", "/cart"]]} />
        <FooterCol title="Account" links={[["Dashboard", "/dashboard/customer"], ["Orders", "/orders"], ["Profile", "/profile"], ["Notifications", "/notifications"]]} />
        <FooterCol title="Company" links={[["About", "/"], ["Become a seller", "/auth/register"], ["Help", "/"], ["Privacy", "/"]]} />
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nexa. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShopShell({ children, compactNav }: { children: ReactNode; compactNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShopNav compact={compactNav} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      <ShopFooter />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">{item.label}</Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-muted-foreground/50">/</span>}
        </span>
      ))}
    </nav>
  );
}