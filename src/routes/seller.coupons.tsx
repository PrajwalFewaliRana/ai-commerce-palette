import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ds/seller-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Copy, Trash2, Pencil } from "lucide-react";
import { coupons } from "@/lib/seller-data";

export const Route = createFileRoute("/seller/coupons")({
  head: () => ({ meta: [{ title: "Coupons — Seller · Nexa" }] }),
  component: CouponsPage,
});

const statusVariant = { active: "success", scheduled: "ai", expired: "secondary" } as const;

function CouponsPage() {
  return (
    <>
      <PageHeader
        title="Coupons & promotions"
        subtitle="Create discount codes, free-shipping rules, and time-limited offers."
        actions={<NewCouponDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatBox label="Active codes" value="3" hint="in use right now" />
        <StatBox label="Redemptions (30d)" value="1,710" hint="+22% vs prev." />
        <StatBox label="Discount cost" value="$3,240" hint="revenue given back" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((c) => (
              <TableRow key={c.code}>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1 font-mono text-xs font-semibold">
                    {c.code}
                  </code>
                </TableCell>
                <TableCell className="capitalize text-sm">{c.type}</TableCell>
                <TableCell className="text-right font-semibold">
                  {c.type === "percent"
                    ? `${c.value}%`
                    : c.type === "amount"
                      ? `$${c.value}`
                      : "Free ship"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">
                      {c.redemptions} / {c.limit}
                    </span>
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full [background-image:var(--gradient-ai)]"
                        style={{ width: `${Math.min(100, (c.redemptions / c.limit) * 100)}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{c.expiresOn}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[c.status]} className="capitalize">
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon">
                      <Copy className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function StatBox({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function NewCouponDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="hero">
          <Plus className="size-4" /> New coupon
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create coupon</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Code</Label>
            <Input placeholder="SUMMER25" className="mt-1 uppercase" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <Select defaultValue="percent">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Percent off</SelectItem>
                  <SelectItem value="amount">Amount off</SelectItem>
                  <SelectItem value="shipping">Free shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Value</Label>
              <Input type="number" placeholder="25" className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Usage limit</Label>
              <Input type="number" placeholder="1000" className="mt-1" />
            </div>
            <div>
              <Label>Expires</Label>
              <Input type="date" className="mt-1" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="hero">Create coupon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
