import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ds/seller-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Package, AlertTriangle, PackageOpen, Boxes, Upload, Download, Plus } from "lucide-react";
import { sellerProducts } from "@/lib/seller-data";

export const Route = createFileRoute("/dashboard/seller/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Seller · Nexa" }] }),
  component: InventoryPage,
});

function stockBadge(stock: number) {
  if (stock === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (stock <= 10) return <Badge variant="warning">Low ({stock})</Badge>;
  return <Badge variant="success">In stock</Badge>;
}

function InventoryPage() {
  const total = sellerProducts.reduce((n, p) => n + p.stock, 0);
  const low = sellerProducts.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const out = sellerProducts.filter((p) => p.stock === 0).length;

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Track stock levels, receive alerts, and restock in bulk."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline"><Upload className="size-4" /> Import CSV</Button>
            <Button variant="hero"><Plus className="size-4" /> Restock</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total units" value={total.toLocaleString()} delta={4} icon={Boxes} />
        <DashboardCard label="SKUs tracked" value={String(sellerProducts.length)} delta={2} icon={Package} />
        <DashboardCard label="Low stock" value={String(low)} delta={-1} icon={AlertTriangle} />
        <DashboardCard label="Out of stock" value={String(out)} delta={0} icon={PackageOpen} />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <p className="text-sm font-semibold">Stock levels</p>
          <Input placeholder="Filter by SKU..." className="ml-auto w-56" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">On hand</TableHead>
              <TableHead className="text-right">Reserved</TableHead>
              <TableHead className="text-right">Reorder at</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellerProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={${p.image}} alt="" loading="lazy" decoding="async" className="size-9 shrink-0 rounded-lg object-cover" />
                    <span className="line-clamp-1 text-sm font-medium">{p.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{p.stock}</TableCell>
                <TableCell className="text-right text-muted-foreground">{Math.min(p.stock, Math.floor(p.stock / 5))}</TableCell>
                <TableCell className="text-right text-muted-foreground">10</TableCell>
                <TableCell>{stockBadge(p.stock)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Restock</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}