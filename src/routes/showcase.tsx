import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Search,
  Bell,
  Menu,
  ShoppingBag,
  Home,
  Package,
  Store,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  Plus,
  Filter,
  MoreHorizontal,
  Laptop,
  Shirt,
  Watch,
  Coffee,
  Dumbbell,
  Baby,
  Wrench,
  Book,
  Inbox,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { AiSearch } from "@/components/ds/ai-search";
import { SearchBar } from "@/components/ds/search-bar";
import { ProductCard } from "@/components/ds/product-card";
import { CategoryCard } from "@/components/ds/category-card";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { EmptyState } from "@/components/ds/empty-state";
import { StatusBadge } from "@/components/ds/status-badge";

import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import mug from "@/assets/product-mug.jpg";
import sneakers from "@/assets/product-sneakers.jpg";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Nexa DS — AI Multi-Vendor Commerce Design System" },
      {
        name: "description",
        content:
          "A complete, reusable design language for AI-powered multi-vendor e-commerce platforms — tokens, components, patterns.",
      },
      { property: "og:title", content: "Nexa DS — AI Multi-Vendor Commerce Design System" },
      {
        property: "og:description",
        content: "Tokens, components, and patterns for AI-powered multi-vendor e-commerce.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignSystem,
});

const chartData = [
  { m: "Jan", sales: 4200, orders: 240 },
  { m: "Feb", sales: 5100, orders: 280 },
  { m: "Mar", sales: 4800, orders: 260 },
  { m: "Apr", sales: 6300, orders: 340 },
  { m: "May", sales: 7200, orders: 410 },
  { m: "Jun", sales: 8100, orders: 480 },
  { m: "Jul", sales: 9450, orders: 560 },
];

const chartConfig = {
  sales: { label: "Sales", color: "var(--primary)" },
  orders: { label: "Orders", color: "var(--secondary)" },
};

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{eyebrow}</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  );
}

function DesignSystem() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const nav = [
    { id: "foundations", label: "Foundations" },
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "search", label: "Search" },
    { id: "cards", label: "Cards" },
    { id: "dashboard", label: "Dashboard" },
    { id: "tables", label: "Tables" },
    { id: "overlays", label: "Overlays" },
    { id: "navigation", label: "Navigation" },
    { id: "feedback", label: "Feedback" },
  ];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Toaster richColors position="top-right" />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <a href="#" className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-ai)]">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Nexa<span className="text-primary">DS</span>
            </span>
          </a>
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {nav.slice(0, 6).map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchBar className="hidden w-72 md:flex" placeholder="Search components..." />
            <Button size="icon" variant="ghost" aria-label="Notifications">
              <Bell />
            </Button>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
              <Switch checked={dark} onCheckedChange={toggleDark} aria-label="Toggle dark mode" />
              <span className="hidden text-xs font-medium sm:inline">
                {dark ? "Dark" : "Light"}
              </span>
            </div>
            <Avatar className="size-8">
              <AvatarFallback>NX</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-56 shrink-0 lg:block">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sections
            </p>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-foreground"
                  >
                    <span>{n.label}</span>
                    <ChevronRight className="size-3.5 opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Sections</SheetTitle>
              <SheetDescription>Jump to any part of the design system.</SheetDescription>
            </SheetHeader>
            <ul className="mt-4 space-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent"
                  >
                    {n.label}
                    <ChevronRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        <main className="min-w-0 flex-1 space-y-16">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-subtle)] p-8 shadow-[var(--shadow-lg)] sm:p-12">
            <div className="absolute -right-24 -top-24 size-72 rounded-full [background:var(--gradient-ai)] opacity-30 blur-3xl" />
            <div className="relative max-w-2xl">
              <Badge variant="ai" className="gap-1">
                <Sparkles className="size-3" /> Design System v1.0
              </Badge>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                A design language for{" "}
                <span className="bg-clip-text text-transparent [background-image:var(--gradient-ai)]">
                  AI multi-vendor commerce
                </span>
                .
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Tokens, primitives, and patterns every seller, buyer, and admin surface reuses.
                Built with React, Tailwind v4, shadcn/ui, and Lucide.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" size="lg">
                  Get started
                </Button>
                <Button variant="outline" size="lg">
                  View components
                </Button>
              </div>
              <div className="mt-8">
                <AiSearch
                  onAskAi={(q) =>
                    toast.success("AI searching…", {
                      description: q || "Try: 'linen shirts under $50'",
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Foundations */}
          <Section
            id="foundations"
            eyebrow="Foundations"
            title="Colors, type, spacing, radius, shadows"
            description="Semantic tokens defined in CSS. Never hardcode colors in components."
          >
            {/* Colors */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Color palette</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { name: "Primary", cls: "bg-primary text-primary-foreground" },
                  { name: "Secondary", cls: "bg-secondary text-secondary-foreground" },
                  { name: "Accent", cls: "bg-accent text-accent-foreground" },
                  {
                    name: "Success",
                    cls: "bg-[color:var(--success)] text-[color:var(--success-foreground)]",
                  },
                  {
                    name: "Warning",
                    cls: "bg-[color:var(--warning)] text-[color:var(--warning-foreground)]",
                  },
                  { name: "Destructive", cls: "bg-destructive text-destructive-foreground" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className={`rounded-xl p-4 shadow-[var(--shadow-card)] ${c.cls}`}
                  >
                    <p className="text-xs opacity-80">Token</p>
                    <p className="text-sm font-semibold">{c.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl p-6 text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-primary)]">
                  <p className="text-xs opacity-80">Gradient</p>
                  <p className="font-semibold">Primary</p>
                </div>
                <div className="rounded-xl p-6 text-primary-foreground shadow-[var(--shadow-glow)] [background-image:var(--gradient-ai)]">
                  <p className="text-xs opacity-80">Gradient</p>
                  <p className="font-semibold">AI</p>
                </div>
                <div className="rounded-xl border border-border p-6 [background-image:var(--gradient-subtle)]">
                  <p className="text-xs text-muted-foreground">Gradient</p>
                  <p className="font-semibold">Subtle</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-xs text-muted-foreground">Surface</p>
                  <p className="font-semibold">Card</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Typography scale</h3>
              <div className="space-y-2 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H1</span>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">Headline</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H2</span>
                  <p className="text-3xl font-bold tracking-tight">Section title</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H3</span>
                  <p className="text-2xl font-semibold">Subsection</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H4</span>
                  <p className="text-xl font-semibold">Card title</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H5</span>
                  <p className="text-lg font-semibold">List heading</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">H6</span>
                  <p className="text-base font-semibold">Label</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">Body</span>
                  <p className="text-sm">
                    Standard paragraph text used across product and dashboard surfaces.
                  </p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 text-xs text-muted-foreground">Caption</span>
                  <p className="text-xs text-muted-foreground">
                    Small metadata, timestamps, helper text.
                  </p>
                </div>
              </div>
            </div>

            {/* Spacing / Radius / Shadows */}
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                  Spacing (4px grid)
                </h3>
                <div className="space-y-2">
                  {[4, 8, 16, 24, 32, 48, 64].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <span className="w-10 text-xs text-muted-foreground">{s}px</span>
                      <div className="h-2 rounded-full bg-primary" style={{ width: s * 3 }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Border radius</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: "sm", c: "rounded-sm" },
                    { l: "md", c: "rounded-md" },
                    { l: "lg", c: "rounded-lg" },
                    { l: "xl", c: "rounded-xl" },
                    { l: "2xl", c: "rounded-2xl" },
                    { l: "full", c: "rounded-full" },
                  ].map((r) => (
                    <div key={r.l} className="flex flex-col items-center gap-1.5">
                      <div className={`size-14 border border-border bg-accent ${r.c}`} />
                      <span className="text-xs text-muted-foreground">{r.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Elevation</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "sm", c: "shadow-[var(--shadow-sm)]" },
                    { l: "md", c: "shadow-[var(--shadow-md)]" },
                    { l: "lg", c: "shadow-[var(--shadow-lg)]" },
                    { l: "glow", c: "shadow-[var(--shadow-glow)]" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className={`grid h-16 place-items-center rounded-xl bg-card text-xs text-muted-foreground ${s.c}`}
                    >
                      {s.l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Breakpoints */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Responsive breakpoints
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  ["sm", "640"],
                  ["md", "768"],
                  ["lg", "1024"],
                  ["xl", "1280"],
                  ["2xl", "1536"],
                ].map(([k, v]) => (
                  <span
                    key={k}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 font-mono"
                  >
                    <span className="text-primary font-semibold">{k}</span> · {v}px
                  </span>
                ))}
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <Section
            id="buttons"
            eyebrow="Interactions"
            title="Buttons"
            description="Six variants covering marketing, product, admin, and destructive actions."
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="hero">Hero action</Button>
                <Button variant="ai">
                  <Sparkles /> Ask AI
                </Button>
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="destructive">Delete</Button>
                <Button variant="link">Link</Button>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-wrap items-end gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl" variant="hero">
                  Extra large
                </Button>
                <Button size="icon" variant="outline">
                  <Plus />
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Section>

          {/* Inputs */}
          <Section id="inputs" eyebrow="Forms" title="Inputs & controls">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@vendor.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label>Store name</Label>
                  <Input placeholder="Aurora Studios" />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & living</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea placeholder="Tell buyers what makes this store special..." rows={3} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Enable AI recommendations</p>
                    <p className="text-xs text-muted-foreground">
                      Personalize your storefront with AI
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Search bar</h3>
                  <SearchBar />
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">AI search</h3>
                  <AiSearch onAskAi={(q) => toast("Searching...", { description: q })} />
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                    Status badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="active" />
                    <StatusBadge status="pending" />
                    <StatusBadge status="failed" />
                    <StatusBadge status="draft" />
                    <Badge variant="ai">
                      <Sparkles className="size-3" /> AI pick
                    </Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Search / AI */}
          <Section id="search" eyebrow="AI" title="AI-powered discovery">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-border bg-[image:var(--gradient-subtle)] p-6 shadow-[var(--shadow-card)]">
                <AiSearch
                  onAskAi={(q) =>
                    toast.success("AI is thinking...", { description: q || "Ask anything" })
                  }
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Trending under $50",
                    "Best for hot summer days",
                    "Gift for a coffee lover",
                    "Sustainable brands",
                  ].map((s) => (
                    <button
                      key={s}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs transition hover:border-primary/40 hover:bg-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="size-4 text-primary" /> AI suggestions
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Wireless earbuds</span>
                    <span className="text-muted-foreground">+38%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Linen shirts</span>
                    <span className="text-muted-foreground">+21%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ceramic mugs</span>
                    <span className="text-muted-foreground">+12%</span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Product & Category Cards */}
          <Section id="cards" eyebrow="Commerce" title="Product & category cards">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Categories</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                <CategoryCard label="Electronics" count={12480} icon={Laptop} />
                <CategoryCard label="Fashion" count={8912} icon={Shirt} />
                <CategoryCard label="Watches" count={2340} icon={Watch} />
                <CategoryCard label="Kitchen" count={5601} icon={Coffee} />
                <CategoryCard label="Fitness" count={3120} icon={Dumbbell} />
                <CategoryCard label="Kids" count={4210} icon={Baby} />
                <CategoryCard label="Tools" count={1890} icon={Wrench} />
                <CategoryCard label="Books" count={7623} icon={Book} />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Products</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <ProductCard
                  title="Aurora Wireless Headphones"
                  vendor="Nova Audio"
                  price={129.99}
                  originalPrice={179.99}
                  rating={4.8}
                  reviews={2411}
                  image={headphones}
                  badge={{ label: "AI pick", variant: "ai" }}
                />
                <ProductCard
                  title="Orbit Smart Watch — Purple Edition"
                  vendor="Chrono Labs"
                  price={249}
                  rating={4.6}
                  reviews={1287}
                  image={watch}
                  badge={{ label: "New", variant: "success" }}
                />
                <ProductCard
                  title="Handmade Ceramic Mug"
                  vendor="Clay & Co."
                  price={22}
                  rating={4.9}
                  reviews={532}
                  image={mug}
                  badge={{ label: "-20%", variant: "warning" }}
                />
                <ProductCard
                  title="Featherlight Running Sneakers"
                  vendor="Stride"
                  price={89.5}
                  originalPrice={119}
                  rating={4.7}
                  reviews={3106}
                  image={sneakers}
                />
              </div>
            </div>
          </Section>

          {/* Dashboard */}
          <Section id="dashboard" eyebrow="Admin" title="Dashboard cards & charts">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard label="Revenue" value="$94.5k" delta={12.4} icon={DollarSign} />
              <DashboardCard label="Orders" value="3,204" delta={8.1} icon={ShoppingCart} />
              <DashboardCard label="Vendors" value="128" delta={-2.3} icon={Store} />
              <DashboardCard label="AI conversions" value="1,842" delta={31.7} icon={TrendingUp} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue trend</CardTitle>
                  <CardDescription>Last 7 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-sales)" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="var(--color-sales)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="m" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--color-sales)"
                        fill="url(#fillSales)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Orders per month</CardTitle>
                  <CardDescription>Volume overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="m" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="orders" fill="var(--color-orders)" radius={6} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Tables */}
          <Section id="tables" eyebrow="Data" title="Tables">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2 p-4">
                <div>
                  <p className="font-semibold">Recent orders</p>
                  <p className="text-xs text-muted-foreground">Across all vendors</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter /> Filter
                  </Button>
                  <Button variant="hero" size="sm">
                    <Plus /> New
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "#A-2401",
                      c: "Maya Patel",
                      v: "Nova Audio",
                      s: "active" as const,
                      t: "$129.99",
                    },
                    {
                      id: "#A-2402",
                      c: "Leo Nakamura",
                      v: "Chrono Labs",
                      s: "pending" as const,
                      t: "$249.00",
                    },
                    {
                      id: "#A-2403",
                      c: "Ada Reyes",
                      v: "Clay & Co.",
                      s: "active" as const,
                      t: "$44.00",
                    },
                    {
                      id: "#A-2404",
                      c: "Jonas Weiss",
                      v: "Stride",
                      s: "failed" as const,
                      t: "$89.50",
                    },
                    {
                      id: "#A-2405",
                      c: "Zara Ali",
                      v: "Nova Audio",
                      s: "draft" as const,
                      t: "$32.00",
                    },
                  ].map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>{r.c}</TableCell>
                      <TableCell className="text-muted-foreground">{r.v}</TableCell>
                      <TableCell>
                        <StatusBadge status={r.s} />
                      </TableCell>
                      <TableCell className="text-right font-semibold">{r.t}</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-border p-3">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </Section>

          {/* Overlays */}
          <Section id="overlays" eyebrow="Overlays" title="Modals, drawers & sheets">
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero">Open modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm vendor approval</DialogTitle>
                    <DialogDescription>
                      Approving grants full storefront access. You can revoke anytime.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-xl border border-border bg-accent/40 p-4 text-sm">
                    <p>
                      <strong>Vendor:</strong> Aurora Studios
                    </p>
                    <p>
                      <strong>Category:</strong> Home & living
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="success" onClick={() => toast.success("Vendor approved")}>
                      Approve
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open drawer</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter products</SheetTitle>
                    <SheetDescription>Refine by price, rating, and vendor.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-1.5">
                      <Label>Min price</Label>
                      <Input placeholder="$0" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Max price</Label>
                      <Input placeholder="$500" />
                    </div>
                    <Button variant="hero" className="w-full">
                      Apply filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="secondary"
                onClick={() =>
                  toast("Order placed", {
                    description: "Order #A-2406 · $184.50",
                    action: { label: "View", onClick: () => {} },
                  })
                }
              >
                Trigger toast
              </Button>
              <Button variant="ghost" onClick={() => toast.success("Payout complete")}>
                Success toast
              </Button>
              <Button variant="ghost" onClick={() => toast.error("Payment failed")}>
                Error toast
              </Button>
            </div>
          </Section>

          {/* Navigation */}
          <Section id="navigation" eyebrow="Wayfinding" title="Navigation, tabs & breadcrumbs">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Vendors</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Aurora Studios</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
              <div className="rounded-2xl border border-border bg-card p-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Vendor console
                </p>
                <ul className="space-y-1 text-sm">
                  {[
                    { i: Home, l: "Overview", active: true },
                    { i: Package, l: "Products" },
                    { i: ShoppingBag, l: "Orders" },
                    { i: BarChart3, l: "Analytics" },
                    { i: Users, l: "Customers" },
                    { i: Settings, l: "Settings" },
                  ].map(({ i: Ico, l, active }) => (
                    <li key={l}>
                      <a
                        href="#"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                      >
                        <Ico className="size-4" />
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4 text-sm text-muted-foreground">
                    All products across vendors.
                  </TabsContent>
                  <TabsContent value="active" className="mt-4 text-sm text-muted-foreground">
                    Active listings only.
                  </TabsContent>
                  <TabsContent value="draft" className="mt-4 text-sm text-muted-foreground">
                    Drafts awaiting approval.
                  </TabsContent>
                  <TabsContent value="archived" className="mt-4 text-sm text-muted-foreground">
                    Archived items.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Section>

          {/* Feedback */}
          <Section id="feedback" eyebrow="Feedback" title="Skeletons & empty states">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  Loading skeletons
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((i) => (
                    <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                      <Skeleton className="aspect-square w-full rounded-lg" />
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
              <EmptyState
                icon={Inbox}
                title="No orders yet"
                description="When customers buy from your storefront, their orders will appear here in real time."
                action={
                  <Button variant="hero">
                    <Plus /> Add product
                  </Button>
                }
              />
            </div>
          </Section>

          <footer className="border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
            Nexa Design System · Every future page reuses these tokens & components.
          </footer>
        </main>
      </div>
    </div>
  );
}
