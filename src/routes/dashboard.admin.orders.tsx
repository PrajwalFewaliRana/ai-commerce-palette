import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, FilterSelect, Pager, Panel } from "@/components/ds/admin-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, DollarSign, AlertTriangle, RotateCcw, Download, ArrowUpDown } from "lucide-react";
import { adminOrders, type AdminOrderStatus } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard/admin/orders")({
  head: () => ({ meta: [
    { title: "Orders — Nexa Admin" },
    { name: "description", content: "Platform-wide order ledger with status filters, payment methods, commission and dispute tracking." },
  ] }),
  component: AdminOrders,
});

const statusVariant: Record<AdminOrderStatus, "warning" | "secondary" | "success" | "destructive" | "ai"> = {
  pending: "warning", processing: "ai", shipped: "secondary", delivered: "success", refunded: "warning", disputed: "destructive",
};

function AdminOrders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = adminOrders.filter((o) =>
      (status === "all" || o.status === status) &&
      (payment === "all" || o.payment === payment) &&
      (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.store.toLowerCase().includes(q)),
    );
    return [...rows].sort((a, b) => (sortDesc ? b.total - a.total : a.total - b.total));
  }, [query, status, payment, sortDesc]);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const gross = adminOrders.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Every order across all stores, with commission and dispute visibility."
        actions={<Button variant="outline"><Download className="size-4" /> Export ledger</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Orders (30d)" value="13,120" delta={10} icon={ShoppingBag} />
        <DashboardCard label="Gross value" value={`$${Math.round(gross).toLocaleString()}`} delta={12} icon={DollarSign} />
        <DashboardCard label="Refunded" value={String(adminOrders.filter((o) => o.status === "refunded").length)} delta={-4} icon={RotateCcw} />
        <DashboardCard label="Disputed" value={String(adminOrders.filter((o) => o.status === "disputed").length)} delta={-6} icon={AlertTriangle} />
      </div>

      <Panel className="mt-6">
        <div className="p-4 pb-0">
          <Tabs value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
              <TabsTrigger value="disputed">Disputed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <DataToolbar query={query} onQuery={(v) => { setQuery(v); setPage(1); }} placeholder="Search order ID, customer or store...">
          <FilterSelect
            label="Payment" value={payment} onChange={(v) => { setPayment(v); setPage(1); }}
            options={[
              { value: "all", label: "All methods" },
              { value: "card", label: "Card" },
              { value: "wallet", label: "Wallet" },
              { value: "bank", label: "Bank transfer" },
              { value: "cod", label: "Cash on delivery" },
            ]}
          />
        </DataToolbar>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">
                  <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setSortDesc(!sortDesc)}>
                    Total <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{o.store}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="uppercase text-xs text-muted-foreground">{o.payment}</TableCell>
                  <TableCell><Badge variant={statusVariant[o.status]} className="capitalize">{o.status}</Badge></TableCell>
                  <TableCell className="text-right text-muted-foreground">${o.commission.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">${o.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">No orders match these filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pager page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} onPageSize={setPageSize} />
      </Panel>
    </>
  );
}
