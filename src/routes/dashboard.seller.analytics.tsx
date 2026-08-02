import { createFileRoute } from "@tanstack/react-router";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { DollarSign, Eye, ShoppingCart, Users, Sparkles, TrendingUp } from "lucide-react";
import { revenueSeries, trafficSources, sellerProducts } from "@/lib/seller-data";

export const Route = createFileRoute("/dashboard/seller/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Seller · Nexa" }] }),
  component: AnalyticsPage,
});

const funnelSeries = [
  { day: "Mon", views: 1240, add: 210, checkout: 90 },
  { day: "Tue", views: 1310, add: 232, checkout: 102 },
  { day: "Wed", views: 1502, add: 260, checkout: 118 },
  { day: "Thu", views: 1420, add: 240, checkout: 108 },
  { day: "Fri", views: 1780, add: 320, checkout: 148 },
  { day: "Sat", views: 1920, add: 360, checkout: 172 },
  { day: "Sun", views: 1830, add: 348, checkout: 168 },
];

function AnalyticsPage() {
  const topProducts = [...sellerProducts].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Deep-dive into your storefront traffic, funnel, and revenue."
        actions={
          <>
            <Select defaultValue="7d">
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="hero"><Sparkles className="size-4" /> AI insights</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Revenue" value="$24,180" delta={18} icon={DollarSign} />
        <DashboardCard label="Visitors" value="11,020" delta={12} icon={Users} />
        <DashboardCard label="Product views" value="42.6K" delta={7} icon={Eye} />
        <DashboardCard label="Checkouts" value="906" delta={9} icon={ShoppingCart} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold">Conversion funnel</p>
          <p className="text-xs text-muted-foreground">Views → Add to cart → Checkout</p>
          <div className="mt-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={funnelSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="add" stroke="var(--primary-glow)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="checkout" stroke="var(--success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <AiCard title="AI Sales Insights" description="Forecast + recommendations for the next 30 days.">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
              <span>Projected revenue next 30d: <b>$34.8K</b> (+44% vs prev.)</span>
            </li>
            <li className="flex gap-2">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Push <b>Studio Headphones ANC</b> to homepage — AI search matches surged 3.2×.</span>
            </li>
            <li className="flex gap-2">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Bundle <b>Sneakers + Watch</b> for a 12% attach-rate lift based on co-view data.</span>
            </li>
            <li className="flex gap-2">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Drop <b>SPRING20</b> — reactivating expired code could recover $1.4K in Q3.</span>
            </li>
          </ul>
        </AiCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold">Revenue vs orders</p>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="revA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fill="url(#revA)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold">Traffic sources</p>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="source" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="visits" fill="var(--primary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border p-4">
          <p className="text-sm font-semibold">Top performing products</p>
          <p className="text-xs text-muted-foreground">By units sold this month</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" loading="lazy" decoding="async" className="size-9 shrink-0 rounded-lg object-cover" />
                    <span className="line-clamp-1 text-sm font-medium">{p.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{p.sold.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold">${(p.sold * p.price).toLocaleString()}</TableCell>
                <TableCell className="text-right">★ {p.rating}</TableCell>
                <TableCell><Badge variant="success">+{Math.floor(Math.random() * 20 + 4)}%</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}