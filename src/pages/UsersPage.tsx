import { useState } from "react";
import { users } from "@/data/dummy";
import { cn } from "@/lib/utils";
import { Search, Filter, MoreHorizontal, ChevronUp, ChevronDown, Mail, UserCheck, UserX } from "lucide-react";

type SortField = "name" | "role" | "plan" | "revenue" | "joined" | "status";
type SortDir = "asc" | "desc";

const statusConfig: Record<string, { label: string; color: string }> = {
  Active: { label: "Active", color: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30" },
  Inactive: { label: "Inactive", color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30" },
  Pending: { label: "Pending", color: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30" },
};

const planConfig: Record<string, string> = {
  Enterprise: "text-primary bg-primary/10",
  Pro: "text-secondary bg-secondary/10",
  Starter: "text-accent-foreground bg-accent/20",
};

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/30 text-accent-foreground",
  "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = users
    .filter((u) => {
      const q = search.toLowerCase();
      const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let va: any = a[sortField];
      let vb: any = b[sortField];
      if (sortField === "revenue") {
        va = Number(va);
        vb = Number(vb);
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp
        size={10}
        strokeWidth={3}
        className={cn("transition-colors", sortField === field && sortDir === "asc" ? "text-primary" : "text-muted-foreground/40")}
      />
      <ChevronDown
        size={10}
        strokeWidth={3}
        className={cn("-mt-0.5 transition-colors", sortField === field && sortDir === "desc" ? "text-primary" : "text-muted-foreground/40")}
      />
    </span>
  );

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: users.length, icon: UserCheck, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active", value: users.filter((u) => u.status === "Active").length, icon: UserCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
          { label: "Inactive", value: users.filter((u) => u.status !== "Active").length, icon: UserX, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-card border border-card-border rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", card.bg)}>
                <Icon size={17} className={card.color} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{card.value}</p>
                <p className="text-[12px] text-muted-foreground">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table container */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">All Users</h3>
            <p className="text-[12px] text-muted-foreground">{filtered.length} of {users.length} users</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Status filter */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {["All", "Active", "Inactive", "Pending"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-150",
                    statusFilter === s
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="flex items-center gap-2 h-8 px-3 rounded-lg bg-muted border border-border text-sm text-muted-foreground flex-1 sm:w-48">
              <Search size={13} className="flex-shrink-0" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-[13px] text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  { field: "name", label: "User" },
                  { field: "role", label: "Role" },
                  { field: "status", label: "Status" },
                  { field: "plan", label: "Plan" },
                  { field: "joined", label: "Joined" },
                  { field: "revenue", label: "Revenue" },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                    onClick={() => handleSort(field as SortField)}
                  >
                    <span className="flex items-center">
                      {label}
                      <SortIcon field={field as SortField} />
                    </span>
                  </th>
                ))}
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const avatarColor = avatarColors[i % avatarColors.length];
                return (
                  <tr
                    key={user.id}
                    className="border-b border-border/60 hover:bg-muted/30 transition-colors duration-100"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold", avatarColor)}>
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">{user.name}</p>
                          <p className="text-[12px] text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-foreground">{user.role}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[11px] font-semibold px-2 py-1 rounded-full", statusConfig[user.status]?.color)}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[11px] font-semibold px-2 py-1 rounded-full", planConfig[user.plan])}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-muted-foreground">{user.joined}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] font-medium text-foreground">${user.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <Mail size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-[13px]">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
