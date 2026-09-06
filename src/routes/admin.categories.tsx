import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, Pager, Panel } from "@/components/ds/admin-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FloatingInput } from "@/components/ds/floating-input";
import { FolderTree, Layers, EyeOff, Plus, CornerDownRight, Pencil } from "lucide-react";
import { adminCategories } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Category Management — Nexa Admin" },
      {
        name: "description",
        content:
          "Manage the marketplace taxonomy: parent and child categories, commission rates and visibility.",
      },
    ],
  }),
  component: CategoryManagement,
});

function CategoryManagement() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hidden, setHidden] = useState<string[]>(
    adminCategories.filter((c) => !c.visible).map((c) => c.id),
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminCategories.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.slug.includes(q),
    );
  }, [query]);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <PageHeader
        title="Category management"
        subtitle="Taxonomy powering navigation, AI search filters and commission rules."
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="size-4" /> New category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create category</DialogTitle>
                <DialogDescription>
                  Categories appear in navigation and AI search facets within a few minutes.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <FloatingInput label="Category name" />
                <FloatingInput label="URL slug" />
                <FloatingInput label="Parent category (optional)" />
                <FloatingInput label="Commission %" type="number" />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="hero">Create category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Categories"
          value={String(adminCategories.length)}
          delta={4}
          icon={FolderTree}
        />
        <DashboardCard
          label="Top-level"
          value={String(adminCategories.filter((c) => !c.parent).length)}
          delta={0}
          icon={Layers}
        />
        <DashboardCard label="Hidden" value={String(hidden.length)} delta={-1} icon={EyeOff} />
        <DashboardCard label="Avg commission" value="10.1%" delta={2} icon={Pencil} />
      </div>

      <Panel className="mt-6">
        <DataToolbar
          query={query}
          onQuery={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder="Search categories or slugs..."
        />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">GMV (30d)</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Visible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {c.parent && (
                        <CornerDownRight className="size-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{c.name}</span>
                      {c.parent && (
                        <Badge variant="secondary" className="text-[10px]">
                          {c.parent}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    /{c.slug}
                  </TableCell>
                  <TableCell className="text-right">{c.products.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${c.gmv.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{c.commission}%</TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={!hidden.includes(c.id)}
                      onCheckedChange={(v) =>
                        setHidden(v ? hidden.filter((id) => id !== c.id) : [...hidden, c.id])
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pager
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPage={setPage}
          onPageSize={setPageSize}
        />
      </Panel>
    </>
  );
}
