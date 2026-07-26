import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Sparkles, Filter, Copy, Pencil, Trash2 } from "lucide-react";
import { sellerProducts, type ListingStatus } from "@/lib/seller-data";

export const Route = createFileRoute("/dashboard/seller/products")({
  head: () => ({ meta: [{ title: "Products — Seller · Nexa" }] }),
  component: ProductsPage,
});

const statusVariant: Record<ListingStatus, "success" | "secondary" | "warning" | "destructive"> = {
  active: "success", draft: "secondary", out_of_stock: "warning", archived: "destructive",
};

function ProductsPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | ListingStatus>("all");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => sellerProducts.filter((p) => {
    if (tab !== "all" && p.status !== tab) return false;
    if (cat !== "all" && p.category !== cat) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.sku.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, tab, cat]);

  return (
    <>
      <PageHeader
        title="Products"
        subtitle={`${sellerProducts.length} total listings across your store`}
        actions={
          <>
            <AiTools />
            <Button variant="hero"><Plus className="size-4" /> New product</Button>
          </>
        }
      />

      <div className="mb-4 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <div className="flex flex-wrap items-center gap-3">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="out_of_stock">Out of stock</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex flex-1 flex-wrap items-center gap-2 sm:flex-nowrap">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or SKU..." className="pl-9" />
              </div>
              <Select value={cat} onValueChange={setCat}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm"><Filter className="size-4" /> More</Button>
            </div>
          </div>
        </Tabs>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Sold</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-10 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-semibold">{p.title}</p>
                      <p className="text-xs text-muted-foreground">★ {p.rating || "—"}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                <TableCell className="text-sm">{p.category}</TableCell>
                <TableCell className="text-right font-semibold">${p.price}</TableCell>
                <TableCell className="text-right">{p.stock}</TableCell>
                <TableCell className="text-right">{p.sold.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[p.status]} className="capitalize">{p.status.replace(/_/g, " ")}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon"><Pencil className="size-4" /></Button>
                    <Button variant="ghost" size="icon"><Copy className="size-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="size-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">No products match your filters.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {sellerProducts.length}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">Prev</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <AiCard title="AI Product Description Generator" description="Turn a short brief into a polished, keyword-rich listing.">
          <Textarea placeholder="e.g. Over-ear studio headphones, ANC, 40h battery, memory foam..." rows={3} />
          <div className="mt-3 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            <b className="text-foreground">Preview:</b> Immerse yourself in studio-grade sound with adaptive active noise cancellation, 40 hours of battery life, and plush memory-foam earcups engineered for all-day wear...
          </div>
          <Button variant="ai" size="sm" className="mt-3 w-full"><Sparkles className="size-3.5" /> Generate description</Button>
        </AiCard>

        <AiCard title="AI SEO Keywords" description="Rank higher in Nexa search and external engines.">
          <div className="flex flex-wrap gap-1.5">
            {["wireless headphones", "noise cancelling", "over-ear ANC", "40h battery", "studio monitor", "bluetooth 5.3", "audiophile", "travel headphones"].map((k) => (
              <Badge key={k} variant="secondary" className="cursor-pointer hover:bg-accent">{k}</Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Estimated monthly reach: <b className="text-foreground">42.1K</b> · Competition: <b className="text-foreground">Medium</b></p>
          <Button variant="ai" size="sm" className="mt-3 w-full"><Sparkles className="size-3.5" /> Regenerate keywords</Button>
        </AiCard>
      </div>
    </>
  );
}

function AiTools() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ai"><Sparkles className="size-4" /> AI tools</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> AI Product Copilot</DialogTitle>
          <DialogDescription>Generate a full listing from a title. Runs in ~5s.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Product title (e.g. Studio Headphones ANC)" />
          <Textarea placeholder="Key features (comma separated)..." rows={3} />
          <Select defaultValue="professional">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="hero"><Sparkles className="size-4" /> Generate listing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}