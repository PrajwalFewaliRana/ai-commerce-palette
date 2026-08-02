import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ds/seller-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, UserPlus, Star, DollarSign, Search, Mail, Download } from "lucide-react";
import { sellerCustomers } from "@/lib/seller-data";

export const Route = createFileRoute("/dashboard/seller/customers")({
  head: () => ({ meta: [{ title: "Customers — Seller · Nexa" }] }),
  component: CustomersPage,
});

const tierVariant = { new: "secondary", returning: "ai", vip: "success" } as const;

function CustomersPage() {
  const total = sellerCustomers.length;
  const vip = sellerCustomers.filter((c) => c.tier === "vip").length;
  const totalSpend = sellerCustomers.reduce((n, c) => n + c.spent, 0);

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Everyone who's ever bought from your store."
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total customers" value={String(total)} delta={11} icon={Users} />
        <DashboardCard label="VIPs" value={String(vip)} delta={6} icon={Star} />
        <DashboardCard label="New (30d)" value="127" delta={14} icon={UserPlus} />
        <DashboardCard
          label="Lifetime value"
          value={`$${totalSpend.toLocaleString()}`}
          delta={9}
          icon={DollarSign}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <p className="text-sm font-semibold">All customers</p>
          <div className="relative ml-auto w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead>Last order</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellerCustomers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={tierVariant[c.tier]} className="capitalize">
                    {c.tier}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{c.orders}</TableCell>
                <TableCell className="text-right font-semibold">
                  ${c.spent.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm">{c.lastOrder}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Mail className="size-3.5" /> Contact
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
