import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { trafficSources } from "@/data/dummy";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-foreground">{payload[0].name}</p>
        <p className="text-muted-foreground mt-0.5">
          Share: <span className="font-medium text-foreground">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function TrafficChart() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm overflow-hidden">
      <div className="mb-3">
        <h3 className="text-[14px] font-semibold text-foreground">Traffic Sources</h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">Where your users come from</p>
      </div>
      <div className="flex items-center justify-center mb-3">
        <PieChart width={160} height={160}>
          <Pie
            data={trafficSources}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={3}
            dataKey="value"
          >
            {trafficSources.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
      <div className="space-y-2">
        {trafficSources.map((source) => (
          <div key={source.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }} />
            <span className="text-[12px] text-muted-foreground flex-1 truncate">{source.name}</span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden flex-shrink-0">
              <div
                className="h-full rounded-full"
                style={{ width: `${source.value}%`, backgroundColor: source.color }}
              />
            </div>
            <span className="text-[12px] font-medium text-foreground w-7 text-right flex-shrink-0">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
