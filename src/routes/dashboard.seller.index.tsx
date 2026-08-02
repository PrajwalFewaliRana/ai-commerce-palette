import { createFileRoute, Link } from "@tanstack/react-router";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Star,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueSeries, categoryMix, sellerOrders, sellerProducts } from "@/lib/seller-data";
import { AiSellerInsights } from "@/components/ds/ai/seller-insights";

export const Route = createFileRoute("/dashboard/seller/")({
  head: () => ({ meta: [{ title: "Seller Overview — Nexa" }] }),
  component: SellerOverview,
});

const PIE_COLORS = ["var(--primary)", "var(--primary-glow)", "var(--success)", "var(--warning)"];

function SellerOverview() {
  const lowStock = sellerProducts.filter((p) => p.stock > 0 && p.stock <= 10);
  const recentOrders = sellerOrders.slice(0, 5);

  return (
    <>
      <PageHeader
        title="Store overview"
        subtitle="Welcome back, Acoustica. Here's how your store is performing this week."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button variant="hero">
              <Sparkles className="size-4" /> AI insights
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Revenue (7d)" value="$24,180" delta={18} icon={DollarSign} />
        <DashboardCard label="Orders" value="342" delta={9} icon={ShoppingCart} />
        <DashboardCard label="Active listings" value="87" delta={3} icon={Package} />
        <DashboardCard label="Conversion" value="4.2%" delta={-1} icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Revenue trend</p>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <Badge variant="success">+18.4%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  fill="url(#rev)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold">Sales by category</p>
          <p className="text-xs text-muted-foreground">Share of revenue this month</p>
          <div className="mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={78}
                  paddingAngle={3}
                >
                  {categoryMix.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-y-1.5 text-xs">
            {categoryMix.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="ml-auto font-medium">{c.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold">Orders this week</p>
            <div className="h-40 flex-1" />
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="orders" fill="var(--primary-glow)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <AiCard
          title="AI Sales Insights"
          description="Auto-generated from your last 30 days of sales."
        >
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
              <span>
                <b>Headphones</b> revenue jumped 32% after your AI-generated title — keep the "ANC"
                keyword.
              </span>
            </li>
            <li className="flex gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[color:var(--warning)]" />
              <span>
                <b>Trail Runners v2</b> is still a draft. Similar SKUs sold 42 units last week.
              </span>
            </li>
            <li className="flex gap-2">
              <Star className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Bundle <b>Mug + Espresso Set</b> — 68% of mug buyers also viewed the set.
              </span>
            </li>
          </ul>
          <Button variant="ai" size="sm" className="mt-4 w-full" asChild>
            <Link to="/dashboard/seller/analytics">
              View full analytics <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </AiCard>
      </div>

      <div className="mt-6">
        <AiSellerInsights />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Recent orders</p>
            <Link
              to="/dashboard/seller/orders"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">${o.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="size-4 text-[color:var(--warning)]" /> Low stock alerts
            </p>
            <Link
              to="/dashboard/seller/inventory"
              className="text-xs font-medium text-primary hover:underline"
            >
              Manage →
            </Link>
          </div>
          <ul className="space-y-3">
            {lowStock.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-border p-3"
              >
                <img src={p.image} alt="" loading="lazy" decoding="async" className="size-10 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.sku}</p>
                </div>
                <Badge variant="warning">{p.stock} left</Badge>
              </li>
            ))}
            {lowStock.length === 0 && (
              <li className="text-xs text-muted-foreground">All good — no low-stock SKUs.</li>
            )}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 p-3 text-xs">
            <Users className="size-4 text-primary" />
            <span>
              <b>127</b> new customers this week
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
