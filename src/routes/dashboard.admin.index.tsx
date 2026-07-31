import { createFileRoute, Link } from "@tanstack/react-router";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { Panel } from "@/components/ds/admin-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign, Users, Store, ShoppingCart, Sparkles, ArrowRight, ShieldAlert,
  AlertTriangle, TrendingUp, PackageSearch, Download,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { gmvSeries, revenueSplit, sellerApplications, moderationQueue, adminOrders } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard/admin/")({
  head: () => ({ meta: [
    { title: "Platform Overview — Nexa Admin" },
    { name: "description", content: "Marketplace KPIs, GMV trend, revenue mix and the live trust & safety queues." },
  ] }),
  component: AdminOverview,
});

const PIE = ["var(--primary)", "var(--primary-glow)", "var(--success)", "var(--warning)"];

function AdminOverview() {
  const pendingSellers = sellerApplications.filter((s) => s.stage === "pending" || s.stage === "in_review");
  const flagged = moderationQueue.filter((m) => m.state === "flagged");
  const disputed = adminOrders.filter((o) => o.status === "disputed");

  return (
    <>
      <PageHeader
        title="Platform overview"
        subtitle="Live health of the Nexa marketplace — 128,412 users across 4,208 active stores."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="hero"><Sparkles className="size-4" /> AI briefing</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="GMV (30d)" value="$1.24M" delta={11} icon={DollarSign} />
        <DashboardCard label="Total users" value="128,412" delta={7} icon={Users} />
        <DashboardCard label="Active sellers" value="4,208" delta={5} icon={Store} />
        <DashboardCard label="Orders (30d)" value="13,120" delta={10} icon={ShoppingCart} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Take rate" value="9.8%" delta={1} icon={TrendingUp} />
        <DashboardCard label="Pending verifications" value={String(pendingSellers.length)} delta={-4} icon={ShieldAlert} />
        <DashboardCard label="Flagged listings" value={String(flagged.length)} delta={16} icon={PackageSearch} />
        <DashboardCard label="Open disputes" value={String(disputed.length)} delta={-6} icon={AlertTriangle} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="GMV & orders" subtitle="Last 6 months" actions={<Badge variant="success">+67% YoY</Badge>}>
          <div className="h-72 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gmvSeries}>
                <defs>
                  <linearGradient id="agmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="gmv" stroke="var(--primary)" fill="url(#agmv)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Revenue mix" subtitle="Where platform revenue comes from">
          <div className="h-52 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueSplit} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
                  {revenueSplit.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="grid grid-cols-2 gap-y-1.5 p-5 pt-3 text-xs">
            {revenueSplit.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: PIE[i] }} />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="ml-auto font-medium">{c.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Refunds vs orders" subtitle="Monthly volume">
          <div className="h-60 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gmvSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="orders" fill="var(--primary-glow)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="refunds" fill="var(--warning)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <AiCard title="AI platform insights" description="Generated from the last 30 days of marketplace activity.">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
              <span><b>Electronics</b> drives 39% of GMV but only 22% of listings — worth a homepage slot.</span>
            </li>
            <li className="flex gap-2">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[color:var(--warning)]" />
              <span>4 new stores share a payout account — likely one operator. Flagged for verification.</span>
            </li>
            <li className="flex gap-2">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>AI search converts <b>2.1×</b> better than keyword search; 61% of sessions now start there.</span>
            </li>
          </ul>
          <Button variant="ai" size="sm" className="mt-4 w-full" asChild>
            <Link to="/dashboard/admin/revenue">Open revenue analytics <ArrowRight className="size-3.5" /></Link>
          </Button>
        </AiCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Sellers awaiting verification"
          actions={<Link to="/dashboard/admin/sellers" className="text-xs font-medium text-primary hover:underline">View all →</Link>}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingSellers.slice(0, 5).map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.store}</TableCell>
                  <TableCell className="text-muted-foreground">{s.country}</TableCell>
                  <TableCell>
                    <Badge variant={s.riskScore > 60 ? "destructive" : s.riskScore > 35 ? "warning" : "success"}>{s.riskScore}</Badge>
                  </TableCell>
                  <TableCell className="text-right capitalize">{s.stage.replace("_", " ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <Panel
          title="Moderation queue"
          actions={<Link to="/dashboard/admin/moderation" className="text-xs font-medium text-primary hover:underline">Review →</Link>}
        >
          <ul className="space-y-3 p-5 pt-0">
            {flagged.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">{m.title}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{m.store} · {m.reason}</p>
                </div>
                <Badge variant="ai" className="shrink-0">{m.aiConfidence}%</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
