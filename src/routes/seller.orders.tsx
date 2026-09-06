import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter } from "lucide-react";
import { sellerOrders, type SellerOrderStatus } from "@/lib/seller-data";

export const Route = createFileRoute("/seller/orders")({
  head: () => ({ meta: [{ title: "Orders — Seller · Nexa" }] }),
  component: OrdersPage,
});

const statusVariant: Record<
  SellerOrderStatus,
  "warning" | "ai" | "success" | "destructive" | "secondary"
> = {
  pending: "warning",
  processing: "ai",
  shipped: "ai",
  delivered: "success",
  refunded: "destructive",
};
const paymentVariant = { paid: "success", pending: "warning", refunded: "destructive" } as const;

function OrdersPage() {
  const [tab, setTab] = useState<"all" | SellerOrderStatus>("all");
  const [q, setQ] = useState("");
  const [range, setRange] = useState("7d");

  const filtered = useMemo(
    () =>
      sellerOrders.filter((o) => {
        if (tab !== "all" && o.status !== tab) return false;
        if (
          q &&
          !o.id.toLowerCase().includes(q.toLowerCase()) &&
          !o.customer.toLowerCase().includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [tab, q],
  );

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Fulfill, track, and refund orders across your store."
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export CSV
          </Button>
        }
      />

      <div className="mb-4 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <div className="flex flex-wrap items-center gap-3">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex flex-1 flex-wrap items-center gap-2 sm:flex-nowrap">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search order or customer..."
                  className="pl-9"
                />
              </div>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="size-4" /> Filters
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs font-semibold">{o.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{o.date}</TableCell>
                <TableCell className="text-right">{o.items}</TableCell>
                <TableCell className="text-right font-semibold">${o.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={paymentVariant[o.payment]} className="capitalize">
                    {o.payment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[o.status]} className="capitalize">
                    {o.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
