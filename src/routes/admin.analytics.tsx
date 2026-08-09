import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { FilterSelect, Panel } from "@/components/ds/admin-shell";
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
import { DollarSign, Percent, Receipt, Wallet, Download, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { gmvSeries, cohortRetention, topCategoriesByGmv, adminOrders } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Revenue Analytics — Nexa Admin" },
      {
        name: "description",
        content:
          "GMV, commission, take rate, refunds, retention cohorts and category revenue for the Nexa marketplace.",
      },
    ],
  }),
  component: RevenueAnalytics,
});

function RevenueAnalytics() {
  const [range, setRange] = useState("6m");
  const commissionRows = topCategoriesByGmv.map((c) => ({
    ...c,
    commission: Math.round(c.gmv * 0.1),
    orders: Math.round(c.gmv / 96),
  }));
  const topStores = Object.entries(
    adminOrders.reduce<Record<string, number>>((acc, o) => {
      acc[o.store] = (acc[o.store] ?? 0) + o.total;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <>
      <PageHeader
        title="Revenue analytics"
        subtitle="Gross merchandise value, platform take rate and payout exposure."
        actions={
          <>
            <FilterSelect
              label="Range"
              value={range}
              onChange={setRange}
              options={[
                { value: "30d", label: "Last 30 days" },
                { value: "3m", label: "Last 3 months" },
                { value: "6m", label: "Last 6 months" },
                { value: "12m", label: "Last 12 months" },
              ]}
            />
            <Button variant="outline">
              <Download className="size-4" /> CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="GMV" value="$1.24M" delta={11} icon={DollarSign} />
        <DashboardCard label="Platform revenue" value="$121.6K" delta={13} icon={Wallet} />
        <DashboardCard label="Take rate" value="9.8%" delta={1} icon={Percent} />
        <DashboardCard label="Refund rate" value="2.2%" delta={-3} icon={Receipt} />
      </div>

      <Panel
        className="mt-6"
        title="GMV growth"
        subtitle="Monthly gross merchandise value"
        actions={<Badge variant="ai">AI forecast: $1.38M in Aug</Badge>}
      >
        <div className="h-80 px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gmvSeries}>
              <defs>
                <linearGradient id="rgmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
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
                tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`}
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
                dataKey="gmv"
                stroke="var(--primary)"
                fill="url(#rgmv)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Retention cohorts" subtitle="Customer vs seller weekly retention">
          <div className="h-64 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortRetention}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="week"
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
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="customer"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="seller"
                  stroke="var(--success)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="GMV by category" subtitle="Last 30 days">
          <div className="h-64 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCategoriesByGmv} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={90}
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
                <Bar dataKey="gmv" fill="var(--primary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Commission by category" subtitle="10% blended take rate">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">GMV</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionRows.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-right">${r.gmv.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{r.orders.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${r.commission.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <div className="space-y-6">
          <Panel title="Top stores by revenue" subtitle="Rolling 30 days">
            <ul className="space-y-2.5 p-5 pt-0 text-sm">
              {topStores.map(([store, total], i) => (
                <li key={store} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-accent text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{store}</span>
                  <span className="font-semibold">${Math.round(total).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <AiCard title="AI revenue insights" description="Signals worth acting on this week.">
            <ul className="space-y-3 text-sm">
              <li>
                Beauty commission uplift to 14% added <b>$4.2K</b> with no churn.
              </li>
              <li>
                Refunds cluster in Fashion footwear sizing — size-guide prompts could cut 18%.
              </li>
              <li>
                Top 5% of stores drive <b>46%</b> of GMV; consider tiered payout terms.
              </li>
            </ul>
            <Button variant="ai" size="sm" className="mt-4 w-full">
              <Sparkles className="size-3.5" /> Generate board summary
            </Button>
          </AiCard>
        </div>
      </div>
    </>
  );
}
