import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, XCircle, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#ORD-8821", customer: "Aria Chen", email: "aria.chen@wavehq.com", product: "Enterprise Plan", amount: 1200, status: "Completed", date: "2024-04-08", avatar: "AC" },
  { id: "#ORD-8820", customer: "Marcus Reed", email: "marcus.reed@northstar.io", product: "Pro Plan — Annual", amount: 480, status: "Processing", date: "2024-04-07", avatar: "MR" },
  { id: "#ORD-8819", customer: "Selin Yildiz", email: "selin@buildcraft.co", product: "Pro Plan — Monthly", amount: 49, status: "Completed", date: "2024-04-07", avatar: "SY" },
  { id: "#ORD-8818", customer: "James Okafor", email: "j.okafor@meridian.tech", product: "Starter Plan", amount: 19, status: "Cancelled", date: "2024-04-06", avatar: "JO" },
  { id: "#ORD-8817", customer: "Priya Kapoor", email: "priya.k@lunastudio.design", product: "Pro Plan — Monthly", amount: 49, status: "Completed", date: "2024-04-05", avatar: "PK" },
  { id: "#ORD-8816", customer: "Liam Torres", email: "liam.t@vaultops.com", product: "Enterprise Plan", amount: 1200, status: "Shipped", date: "2024-04-05", avatar: "LT" },
  { id: "#ORD-8815", customer: "Sophie Martin", email: "sophie@inkbridge.fr", product: "Starter Plan", amount: 19, status: "Pending", date: "2024-04-04", avatar: "SM" },
  { id: "#ORD-8814", customer: "Tariq Hassan", email: "tariq.h@crestline.ae", product: "Enterprise Plan — Annual", amount: 9600, status: "Completed", date: "2024-04-03", avatar: "TH" },
  { id: "#ORD-8813", customer: "Yuna Park", email: "y.park@synapse.kr", product: "Pro Plan — Annual", amount: 480, status: "Completed", date: "2024-04-02", avatar: "YP" },
  { id: "#ORD-8812", customer: "Felix Wagner", email: "felix@arcstack.de", product: "Starter Plan", amount: 19, status: "Refunded", date: "2024-04-01", avatar: "FW" },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  Completed: { label: "Completed", color: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30", icon: CheckCircle2 },
  Processing: { label: "Processing", color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30", icon: Clock },
  Shipped: { label: "Shipped", color: "text-primary bg-primary/10", icon: Truck },
  Pending: { label: "Pending", color: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30", icon: Package },
  Cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30", icon: XCircle },
  Refunded: { label: "Refunded", color: "text-muted-foreground bg-muted", icon: XCircle },
};

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/30 text-accent-foreground",
  "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
];

const summaryStats = [
  { label: "Total Orders", value: orders.length, sub: "All time" },
  { label: "Revenue", value: `$${orders.filter(o => o.status === "Completed").reduce((a, b) => a + b.amount, 0).toLocaleString()}`, sub: "Completed orders" },
  { label: "Pending", value: orders.filter(o => ["Pending", "Processing"].includes(o.status)).length, sub: "Awaiting action" },
  { label: "Cancelled", value: orders.filter(o => ["Cancelled", "Refunded"].includes(o.status)).length, sub: "This month" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.product.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">All Orders</h3>
            <p className="text-[12px] text-muted-foreground">{filtered.length} orders</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
              {["All", "Completed", "Processing", "Pending", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[12px] font-medium whitespace-nowrap transition-all duration-150",
                    statusFilter === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 h-8 px-3 rounded-lg bg-muted border border-border text-sm text-muted-foreground flex-1 sm:w-44">
              <Search size={13} className="flex-shrink-0" />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-[13px] text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Order", "Customer", "Product", "Date", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const sc = statusConfig[order.status];
                const Icon = sc.icon;
                return (
                  <tr key={order.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors duration-100">
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] font-medium text-foreground font-mono">{order.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0", avatarColors[i % avatarColors.length])}>
                          {order.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">{order.customer}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-foreground">{order.product}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] text-muted-foreground">{order.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] font-semibold text-foreground">${order.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full", sc.color)}>
                        <Icon size={10} strokeWidth={2.5} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-[13px]">
                    No orders match your search.
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
