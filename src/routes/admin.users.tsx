import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ds/seller-shell";
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
import {
  Users,
  UserPlus,
  UserX,
  Store,
  Download,
  Ban,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";
import { adminUsers, type UserStatus } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — Nexa Admin" },
      {
        name: "description",
        content:
          "Search, filter, sort and moderate every customer, seller and admin account on Nexa.",
      },
    ],
  }),
  component: UserManagement,
});

const statusVariant: Record<UserStatus, "success" | "warning" | "destructive"> = {
  active: "success",
  pending: "warning",
  suspended: "destructive",
};

function UserManagement() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [country, setCountry] = useState("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  const countries = useMemo(() => Array.from(new Set(adminUsers.map((u) => u.country))).sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = adminUsers.filter(
      (u) =>
        (role === "all" || u.role === role) &&
        (status === "all" || u.status === status) &&
        (country === "all" || u.country === country) &&
        (!q ||
          u.name.toLowerCase().includes(q) ||
          u.email.includes(q) ||
          u.id.toLowerCase().includes(q)),
    );
    return [...rows].sort((a, b) => (sortDesc ? b.spent - a.spent : a.spent - b.spent));
  }, [query, role, status, country, sortDesc]);

  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allChecked = pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id));

  return (
    <>
      <PageHeader
        title="User management"
        subtitle={`${adminUsers.length.toLocaleString()} accounts in scope · customers, sellers and admins`}
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Total accounts" value="128,412" delta={7} icon={Users} />
        <DashboardCard label="New this week" value="1,284" delta={12} icon={UserPlus} />
        <DashboardCard label="Seller accounts" value="4,208" delta={5} icon={Store} />
        <DashboardCard label="Suspended" value="312" delta={-8} icon={UserX} />
      </div>

      <Panel className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 pb-0">
          <Tabs
            value={role}
            onValueChange={(v) => {
              setRole(v);
              setPage(1);
            }}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="customer">Customers</TabsTrigger>
              <TabsTrigger value="seller">Sellers</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
            </TabsList>
          </Tabs>
          {selected.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">{selected.length} selected</span>
              <Button size="sm" variant="outline">
                <CheckCircle2 className="size-3.5" /> Activate
              </Button>
              <Button size="sm" variant="outline" className="text-destructive">
                <Ban className="size-3.5" /> Suspend
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
          placeholder="Search by name, email or user ID..."
        >
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={[
              { value: "all", label: "All statuses" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "suspended", label: "Suspended" },
            ]}
          />
          <FilterSelect
            label="Country"
            value={country}
            onChange={(v) => {
              setCountry(v);
              setPage(1);
            }}
            options={[
              { value: "all", label: "All countries" },
              ...countries.map((c) => ({ value: c, label: c })),
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
                          ? Array.from(new Set([...selected, ...pageRows.map((r) => r.id)]))
                          : selected.filter((id) => !pageRows.some((r) => r.id === id)),
                      )
                    }
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">
                  <button
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    onClick={() => setSortDesc(!sortDesc)}
                  >
                    Spent <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(u.id)}
                      onCheckedChange={(v) =>
                        setSelected(v ? [...selected, u.id] : selected.filter((id) => id !== u.id))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-xs font-semibold">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.role === "admin" ? "ai" : "secondary"} className="capitalize">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[u.status]} className="capitalize">
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.country}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {u.joined}
                  </TableCell>
                  <TableCell className="text-right">{u.orders}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${u.spent.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {pageRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No users match these filters.
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
    </>
  );
}
