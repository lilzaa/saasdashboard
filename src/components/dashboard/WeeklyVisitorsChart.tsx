import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyVisitors } from "@/data/dummy";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className="text-muted-foreground">
          Visitors: <span className="font-medium text-foreground">{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function WeeklyVisitorsChart() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold text-foreground">Weekly Visitors</h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">Unique visitors this week</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyVisitors} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", radius: 4 }} />
          <Bar dataKey="visitors" fill="#b5c9d4" radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
