import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Sparkles, ShoppingCart, Heart, Bell, User, Menu, ArrowUp, Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { aiSuggestions } from "@/lib/shop-data";
import { ShoppingAssistant } from "@/components/ds/ai/assistant";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = () => {
    const term = q.trim();
    navigate({ to: "/search", search: { q: term || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link to="/" aria-label="Nexa home" className="inline-flex items-center gap-2 text-lg font-semibold">
          <span className="grid size-8 place-items-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]">
            <Sparkles aria-hidden="true" className="size-4" />
          </span>
          <span className="hidden sm:inline">Nexa</span>
        </Link>

        {!compact && (
          <search className="relative hidden min-w-0 flex-1 md:block">
            <div
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-1.5 transition",
                focus && "border-primary/50 shadow-[var(--shadow-glow)]",
              )}
            >
              <Sparkles aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 120)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Ask AI: 'wireless headphones under $200 with great bass'"
                aria-label="Search products with AI"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={submit}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-primary-foreground [background-image:var(--gradient-ai)]"
                aria-label="Search with AI"
              >
                <ArrowUp aria-hidden="true" className="size-4" />
              </button>
            </div>
            {focus && (
              <div className="animate-fade-in absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-lg)]">
                <p className="border-b border-border/60 px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Try asking
                </p>
                {aiSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-accent"
                    onMouseDown={() => {
                      setQ(s);
                      navigate({ to: "/search", search: { q: s } as never });
                    }}
                  >
                    <Sparkles aria-hidden="true" className="size-3.5 text-primary" /> {s}
                  </button>
                ))}
              </div>
            )}
          </search>
        )}

        <nav aria-label="Main" className="ml-auto flex items-center gap-1">
          <Link
            to="/categories"
            className={cn(
              "hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground lg:inline-flex",
              pathname.startsWith("/categor") && "text-foreground",
            )}
          >
            Categories
          </Link>
          <Link
            to="/products"
            className={cn(
              "hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground lg:inline-flex",
              pathname === "/products" && "text-foreground",
            )}
          >
            Deals
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
          </Button>
          <Link
            to="/notifications"
            aria-label="Notifications, unread"
            className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Bell aria-hidden="true" className="size-4" />
            <span aria-hidden="true" className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <Heart aria-hidden="true" className="size-4" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart, 2 items"
            className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ShoppingCart aria-hidden="true" className="size-4" />
            <Badge
              variant="ai"
              aria-hidden="true"
              className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1 text-[10px]"
            >
              2
            </Badge>
          </Link>
          <Link
            to="/dashboard/customer"
            aria-label="Your account"
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <User aria-hidden="true" className="size-4" />
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu aria-hidden="true" className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[18rem] p-0">
              <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
                <SheetTitle>Browse Nexa</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="space-y-1 p-3 text-sm">
                {MOBILE_LINKS.map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
                      pathname === to && "bg-accent text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>

      {!compact && (
        <search className="block border-t border-border/40 bg-background/50 md:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card px-3">
              <Sparkles aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Ask AI what you need..."
                aria-label="Search products with AI"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="button"
              onClick={submit}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground [background-image:var(--gradient-ai)]"
              aria-label="Search with AI"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
            </button>
          </div>
        </search>
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
        <FooterCol
          title="Shop"
          links={[
            ["Categories", "/categories"],
            ["All products", "/products"],
            ["Wishlist", "/wishlist"],
            ["Cart", "/cart"],
          ]}
        />
        <FooterCol
          title="Account"
          links={[
            ["Dashboard", "/dashboard/customer"],
            ["Orders", "/orders"],
            ["Profile", "/profile"],
            ["Notifications", "/notifications"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About", "/"],
            ["Become a seller", "/auth/register"],
            ["Help", "/"],
            ["Privacy", "/"],
          ]}
        />
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
            <Link to={href} className="hover:text-foreground">
              {label}
            </Link>
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
      <main className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6">{children}</main>
      <ShopFooter />
      <ShoppingAssistant />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-muted-foreground/50">/</span>}
        </span>
      ))}
    </nav>
  );
}
