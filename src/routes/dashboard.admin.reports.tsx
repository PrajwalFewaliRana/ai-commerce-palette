import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, FilterSelect, Pager, Panel } from "@/components/ds/admin-shell";
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
import { FileBarChart, Download, Clock, Plus, Sparkles } from "lucide-react";
import { adminReports } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Nexa Admin" },
      {
        name: "description",
        content:
          "Generate, schedule and download finance, sales, seller and compliance reports for the marketplace.",
      },
    ],
  }),
  component: Reports,
});

const TEMPLATES = [
  {
    name: "GMV & commission statement",
    desc: "Monthly platform revenue with per-category breakdown.",
    type: "Finance",
  },
  {
    name: "Seller payout reconciliation",
    desc: "Payout batches, fees, holds and failed transfers.",
    type: "Finance",
  },
  {
    name: "Verification audit trail",
    desc: "Every KYC decision with reviewer and timestamp.",
    type: "Compliance",
  },
  {
    name: "AI search intent report",
    desc: "Top natural-language queries and their conversion.",
    type: "Traffic",
  },
];

function Reports() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminReports.filter(
      (r) =>
        (type === "all" || r.type === type) &&
        (!q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)),
    );
  }, [query, type]);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Scheduled and on-demand exports across finance, sales, sellers and compliance."
        actions={
          <Button variant="hero">
            <Plus className="size-4" /> New report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.name}
            className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <FileBarChart className="size-5" />
            </div>
            <p className="mt-3 text-sm font-semibold">{t.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
            <Badge variant="secondary" className="mt-3 text-[10px]">
              {t.type}
            </Badge>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel title="Report library">
          <DataToolbar
            query={query}
            onQuery={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search reports..."
          >
            <FilterSelect
              label="Type"
              value={type}
              onChange={(v) => {
                setType(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All types" },
                ...["Finance", "Sales", "Sellers", "Compliance", "Traffic"].map((t) => ({
                  value: t,
                  label: t,
                })),
              ]}
            />
          </DataToolbar>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Range</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.id} · {r.type} · {r.size}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {r.range}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {r.generated}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.status === "ready"
                            ? "success"
                            : r.status === "generating"
                              ? "warning"
                              : "secondary"
                        }
                        className="capitalize"
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" disabled={r.status !== "ready"}>
                        {r.status === "ready" ? (
                          <>
                            <Download className="size-3.5" /> CSV
                          </>
                        ) : (
                          <>
                            <Clock className="size-3.5" /> Queued
                          </>
                        )}
                      </Button>
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

        <AiCard
          title="AI report assistant"
          description="Describe the numbers you need in plain language."
        >
          <textarea
            rows={4}
            defaultValue="Compare commission revenue for Electronics vs Fashion over the last two quarters, split by store tier."
            className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary/50"
          />
          <Button variant="ai" size="sm" className="mt-3 w-full">
            <Sparkles className="size-3.5" /> Build report
          </Button>
        </AiCard>
      </div>
    </>
  );
}
