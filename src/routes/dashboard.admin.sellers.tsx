import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AiCard, PageHeader } from "@/components/ds/seller-shell";
import { DataToolbar, FilterSelect, Pager, Panel } from "@/components/ds/admin-shell";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck, ShieldAlert, Store, Clock, Check, X, FileText, Sparkles } from "lucide-react";
import { sellerApplications, type SellerApplication } from "@/lib/admin-data";

export const Route = createFileRoute("/dashboard/admin/sellers")({
  head: () => ({
    meta: [
      { title: "Seller Verification — Nexa Admin" },
      {
        name: "description",
        content:
          "Review seller applications, KYC documents, AI risk scores and approve or reject stores.",
      },
    ],
  }),
  component: SellerVerification,
});

function DocPills({ docs }: { docs: SellerApplication["docs"] }) {
  const entries: [string, boolean][] = [
    ["ID", docs.id],
    ["Tax", docs.tax],
    ["Bank", docs.bank],
    ["Addr", docs.address],
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {entries.map(([label, ok]) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
            ok
              ? "bg-[color:var(--success)]/15 text-[color:var(--success)]"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          {ok ? <Check className="size-3" /> : <X className="size-3" />}
          {label}
        </span>
      ))}
    </div>
  );
}

function SellerVerification() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("all");
  const [risk, setRisk] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [active, setActive] = useState<SellerApplication | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sellerApplications.filter(
      (s) =>
        (stage === "all" || s.stage === stage) &&
        (risk === "all" ||
          (risk === "high"
            ? s.riskScore > 60
            : risk === "medium"
              ? s.riskScore > 35 && s.riskScore <= 60
              : s.riskScore <= 35)) &&
        (!q ||
          s.store.toLowerCase().includes(q) ||
          s.owner.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)),
    );
  }, [query, stage, risk]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const counts = {
    pending: sellerApplications.filter((s) => s.stage === "pending").length,
    review: sellerApplications.filter((s) => s.stage === "in_review").length,
    approved: sellerApplications.filter((s) => s.stage === "approved").length,
    rejected: sellerApplications.filter((s) => s.stage === "rejected").length,
  };

  return (
    <>
      <PageHeader
        title="Seller verification"
        subtitle="KYC review queue with AI risk scoring and document completeness checks."
        actions={
          <Button variant="hero">
            <Sparkles className="size-4" /> Auto-triage queue
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Awaiting review"
          value={String(counts.pending)}
          delta={9}
          icon={Clock}
        />
        <DashboardCard
          label="In review"
          value={String(counts.review)}
          delta={4}
          icon={ShieldAlert}
        />
        <DashboardCard
          label="Approved (30d)"
          value={String(counts.approved * 21)}
          delta={11}
          icon={ShieldCheck}
        />
        <DashboardCard label="Active stores" value="4,208" delta={5} icon={Store} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel>
          <div className="p-4 pb-0">
            <Tabs
              value={stage}
              onValueChange={(v) => {
                setStage(v);
                setPage(1);
              }}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in_review">In review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <DataToolbar
            query={query}
            onQuery={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search store, owner or application ID..."
          >
            <FilterSelect
              label="Risk"
              value={risk}
              onChange={(v) => {
                setRisk(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All risk" },
                { value: "low", label: "Low (≤35)" },
                { value: "medium", label: "Medium (36–60)" },
                { value: "high", label: "High (>60)" },
              ]}
            />
          </DataToolbar>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <p className="text-sm font-medium">{s.store}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.owner} · {s.country} · {s.category}
                      </p>
                    </TableCell>
                    <TableCell>
                      <DocPills docs={s.docs} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          s.riskScore > 60
                            ? "destructive"
                            : s.riskScore > 35
                              ? "warning"
                              : "success"
                        }
                      >
                        {s.riskScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {s.submitted}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={active?.id === s.id}
                        onOpenChange={(o) => setActive(o ? s : null)}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{s.store}</DialogTitle>
                            <DialogDescription>
                              Application {s.id} · submitted {s.submitted} by {s.owner}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-xl border border-border p-3">
                                <p className="text-xs text-muted-foreground">Est. annual GMV</p>
                                <p className="mt-1 font-semibold">
                                  ${s.gmvEstimate.toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-xl border border-border p-3">
                                <p className="text-xs text-muted-foreground">AI risk score</p>
                                <p className="mt-1 font-semibold">{s.riskScore} / 100</p>
                              </div>
                            </div>
                            <div>
                              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Documents
                              </p>
                              <DocPills docs={s.docs} />
                            </div>
                            <div className="rounded-xl border border-primary/20 p-3 [background-image:var(--gradient-subtle)]">
                              <p className="flex items-center gap-2 text-xs font-semibold">
                                <Sparkles className="size-3.5 text-primary" /> AI verification note
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Business registration matches the submitted tax ID.{" "}
                                {s.riskScore > 60
                                  ? "Payout account shares a fingerprint with a previously suspended store — request additional proof."
                                  : "No adverse signals across sanctions, chargeback or duplicate-account checks."}
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">
                              <FileText className="size-4" /> Request docs
                            </Button>
                            <Button variant="outline" className="text-destructive">
                              <X className="size-4" /> Reject
                            </Button>
                            <Button variant="hero">
                              <Check className="size-4" /> Approve store
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      Nothing in this queue.
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

        <AiCard title="AI risk triage" description="How the queue looks to the model right now.">
          <ul className="space-y-3 text-sm">
            <li>
              {sellerApplications.filter((s) => s.riskScore <= 35).length} applications are low-risk
              and safe to auto-approve.
            </li>
            <li>3 stores reuse the same payout IBAN — manual review recommended.</li>
            <li>
              Median time-to-decision is <b>7.4 hours</b>, down from 19 last quarter.
            </li>
          </ul>
          <Button variant="ai" size="sm" className="mt-4 w-full">
            Apply suggested decisions
          </Button>
        </AiCard>
      </div>
    </>
  );
}
