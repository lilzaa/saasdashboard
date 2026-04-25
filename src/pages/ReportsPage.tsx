import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";
import { Download, FileText, TrendingUp, ArrowUpRight } from "lucide-react";
import { revenueData, categoryData } from "@/data/dummy";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} className="text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">
              {entry.dataKey === "revenue" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const savedReports = [
  { name: "Q1 2024 Revenue Summary", type: "Revenue", created: "Apr 2, 2024", size: "142 KB" },
  { name: "User Growth Report — March", type: "Users", created: "Mar 31, 2024", size: "98 KB" },
  { name: "Churn Analysis Q1", type: "Retention", created: "Mar 28, 2024", size: "210 KB" },
  { name: "Plan Conversion Funnel", type: "Conversion", created: "Mar 15, 2024", size: "76 KB" },
  { name: "Support Ticket Summary", type: "Support", created: "Mar 10, 2024", size: "54 KB" },
];

const typeColors: Record<string, string> = {
  Revenue: "text-primary bg-primary/10",
  Users: "text-secondary bg-secondary/10",
  Retention: "text-accent-foreground bg-accent/20",
  Conversion: "text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-900/30",
  Support: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30",
};

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue (YTD)", value: "$692K", change: "+22%", color: "text-primary", bg: "bg-primary/10" },
          { label: "Avg. Revenue / User", value: "$232", change: "+8.4%", color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Customer Lifetime Value", value: "$1,840", change: "+15.2%", color: "text-accent-foreground", bg: "bg-accent/20" },
          { label: "Churn Rate", value: "2.1%", change: "-0.4%", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-900/30" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <div className={`mt-1 inline-flex items-center gap-1 text-[12px] font-semibold px-1.5 py-0.5 rounded-md ${kpi.bg} ${kpi.color}`}>
              <ArrowUpRight size={11} strokeWidth={2.5} />
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Monthly Orders</h3>
            <p className="text-[12px] text-muted-foreground">Order volume per month</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", radius: 4 }} />
              <Bar dataKey="orders" name="Orders" fill="#c9956a" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Revenue Trend</h3>
            <p className="text-[12px] text-muted-foreground">12-month revenue line</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={38} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#7c9e87" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#7c9e87", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category performance */}
      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Category Performance</h3>
            <p className="text-[12px] text-muted-foreground">Revenue and growth by product category</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Category", "Revenue", "Growth", "Share"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryData.map((cat) => {
                const totalRevenue = categoryData.reduce((a, b) => a + b.revenue, 0);
                const share = ((cat.revenue / totalRevenue) * 100).toFixed(1);
                const isPos = cat.growth >= 0;
                return (
                  <tr key={cat.category} className="border-b border-border/50">
                    <td className="py-3 pr-8 text-[13px] font-medium text-foreground">{cat.category}</td>
                    <td className="py-3 pr-8 text-[13px] text-foreground">${cat.revenue.toLocaleString()}</td>
                    <td className="py-3 pr-8">
                      <span className={`inline-flex items-center gap-0.5 text-[12px] font-semibold px-1.5 py-0.5 rounded-md ${isPos ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30" : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30"}`}>
                        <TrendingUp size={10} strokeWidth={2.5} />
                        {isPos ? "+" : ""}{cat.growth}%
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${share}%` }} />
                        </div>
                        <span className="text-[12px] text-muted-foreground">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved reports */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Saved Reports</h3>
            <p className="text-[12px] text-muted-foreground">Recently generated reports</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            + New Report
          </button>
        </div>
        <div className="divide-y divide-border/60">
          {savedReports.map((report) => (
            <div key={report.name} className="px-5 py-3.5 flex items-center gap-3 hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <FileText size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{report.name}</p>
                <p className="text-[11px] text-muted-foreground">Created {report.created} · {report.size}</p>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[report.type] ?? "text-muted-foreground bg-muted"}`}>
                {report.type}
              </span>
              <button className="ml-2 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
                <Download size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
