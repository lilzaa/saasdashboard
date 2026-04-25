import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { revenueData, categoryData, planDistribution } from "@/data/dummy";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} className="text-muted-foreground">
            {entry.name}:{" "}
            <span className="font-medium text-foreground">
              {entry.dataKey === "revenue" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const kpiCards = [
  { label: "Avg. Session Duration", value: "4m 32s", change: "+12%", icon: Eye, color: "text-primary", bg: "bg-primary/10" },
  { label: "Bounce Rate", value: "32.4%", change: "-4%", icon: MousePointerClick, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Conversion Rate", value: "3.8%", change: "+0.6%", icon: TrendingUp, color: "text-accent-foreground", bg: "bg-accent/20" },
  { label: "Monthly Active Users", value: "9,241", change: "+8.2%", icon: Users, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/30" },
];

const radialData = planDistribution.map((p) => ({ ...p, fill: p.color }));

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change.startsWith("+");
          return (
            <div key={kpi.label} className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                  <Icon size={17} className={kpi.color} strokeWidth={1.8} />
                </div>
                <span
                  className={`text-[12px] font-semibold px-2 py-0.5 rounded-lg ${
                    isPositive
                      ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30"
                      : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30"
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-[14px] font-semibold text-foreground">User Growth vs Revenue</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">12-month comparison</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c9e87" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7c9e87" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c9956a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#c9956a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Area type="monotone" dataKey="users" name="Users" stroke="#7c9e87" strokeWidth={2} fill="url(#colorUsers)" dot={false} activeDot={{ r: 4, fill: "#7c9e87", strokeWidth: 0 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#c9956a" strokeWidth={2} fill="url(#colorRevenue2)" dot={false} activeDot={{ r: 4, fill: "#c9956a", strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category breakdown */}
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Revenue by Category</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Monthly breakdown with growth rates</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip formatter={(v: any) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: "13px" }} />
              <Bar dataKey="revenue" fill="#7c9e87" radius={[0, 4, 4, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan distribution */}
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Plan Distribution</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Users across subscription tiers</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="95%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="count" cornerRadius={4} background={{ fill: "hsl(var(--muted))" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {planDistribution.map((p) => {
                const total = planDistribution.reduce((a, b) => a + b.count, 0);
                const pct = ((p.count / total) * 100).toFixed(1);
                return (
                  <div key={p.plan}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[13px] text-foreground font-medium">{p.plan}</span>
                      </div>
                      <span className="text-[12px] text-muted-foreground">{p.count.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
