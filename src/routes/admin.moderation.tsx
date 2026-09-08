import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, FilterSelect, Pager, Panel } from "@/components/ds/admin-shell";
import { DashboardCard } from "@/components/ds/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, Flag, ShieldCheck, Trash2, Check, X, Sparkles } from "lucide-react";
import { moderationQueue, type ModerationState } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard/admin/moderation")({
  head: () => ({
    meta: [
      { title: "Product Moderation — Nexa Admin" },
      {
        name: "description",
        content:
          "AI-flagged listings queue with policy reasons, confidence scores and bulk approve or remove actions.",
      },
    ],
  }),
  component: Moderation,
});

const stateVariant: Record<ModerationState, "destructive" | "warning" | "success" | "secondary"> = {
  flagged: "destructive",
  pending: "warning",
  approved: "success",
  removed: "secondary",
};

function Moderation() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [category, setCategory] = useState("all");
  const [confidence, setConfidence] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  const categories = useMemo(
    () => Array.from(new Set(moderationQueue.map((m) => m.category))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return moderationQueue.filter(
      (m) =>
        (state === "all" || m.state === state) &&
        (category === "all" || m.category === category) &&
        (confidence === "all" ||
          (confidence === "high" ? m.aiConfidence >= 80 : m.aiConfidence < 80)) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.store.toLowerCase().includes(q) ||
          m.reason.toLowerCase().includes(q)),
    );
  }, [query, state, category, confidence]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allChecked = rows.length > 0 && rows.every((r) => selected.includes(r.id));

  return (
    <>
      <PageHeader
        title="Product moderation"
        subtitle="Every listing the AI policy model escalated for a human decision."
        actions={
          <Button variant="hero">
            <Sparkles className="size-4" /> Re-run policy scan
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="In queue"
          value={String(moderationQueue.length)}
          delta={14}
          icon={PackageSearch}
        />
        <DashboardCard
          label="Flagged"
          value={String(moderationQueue.filter((m) => m.state === "flagged").length)}
          delta={16}
          icon={Flag}
        />
        <DashboardCard label="Approved (7d)" value="184" delta={6} icon={ShieldCheck} />
        <DashboardCard label="Removed (7d)" value="37" delta={-9} icon={Trash2} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 pb-0">
            <Tabs
              value={state}
              onValueChange={(v) => {
                setState(v);
                setPage(1);
              }}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="removed">Removed</TabsTrigger>
              </TabsList>
            </Tabs>
            {selected.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{selected.length} selected</span>
                <Button size="sm" variant="outline">
                  <Check className="size-3.5" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="text-destructive">
                  <X className="size-3.5" /> Remove
                </Button>
              </div>
            )}
          </div>
          <DataToolbar
            query={query}
            onQuery={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search listing, store or policy reason..."
          >
            <FilterSelect
              label="Category"
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All categories" },
                ...categories.map((c) => ({ value: c, label: c })),
              ]}
            />
            <FilterSelect
              label="AI confidence"
              value={confidence}
              onChange={(v) => {
                setConfidence(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "Any confidence" },
                { value: "high", label: "High (≥80%)" },
                { value: "low", label: "Below 80%" },
              ]}
            />
          </DataToolbar>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={(v) =>
                        setSelected(
                          v
                            ? Array.from(new Set([...selected, ...rows.map((r) => r.id)]))
                            : selected.filter((id) => !rows.some((r) => r.id === id)),
                        )
                      }
                    />
                  </TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Policy reason</TableHead>
                  <TableHead className="text-right">AI</TableHead>
                  <TableHead className="text-right">Reports</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(m.id)}
                        onCheckedChange={(v) =>
                          setSelected(
                            v ? [...selected, m.id] : selected.filter((id) => id !== m.id),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1 text-sm font-medium">{m.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.store} · ${m.price} · {m.category}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-[220px] text-xs text-muted-foreground">
                      {m.reason}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={m.aiConfidence >= 80 ? "destructive" : "ai"}>
                        {m.aiConfidence}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{m.reports}</TableCell>
                    <TableCell>
                      <Badge variant={stateVariant[m.state]} className="capitalize">
                        {m.state}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8"
                          aria-label="Approve"
                        >
                          <Check className="size-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8 text-destructive"
                          aria-label="Remove"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      Queue is clear for these filters.
                    </TableCell>
                  </TableRow>
                )}
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

        <AiCard title="AI moderation summary" description="Patterns across the current queue.">
          <ul className="space-y-3 text-sm">
            <li>
              Counterfeit-brand claims are the top reason (31% of the queue), concentrated in
              Electronics.
            </li>
            <li>
              Listings above 80% confidence are removed correctly <b>96%</b> of the time — safe to
              auto-action.
            </li>
            <li>Two stores account for 9 flags; a store-level review would clear them faster.</li>
          </ul>
          <Button variant="ai" size="sm" className="mt-4 w-full">
            Auto-action high confidence
          </Button>
        </AiCard>
      </div>
    </>
  );
}
