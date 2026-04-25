import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  prefix?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor,
  iconBg,
  prefix,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground tracking-tight">
            {prefix}
            {value}
          </p>
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon size={19} className={iconColor} strokeWidth={1.8} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "flex items-center gap-0.5 text-[12px] font-medium px-1.5 py-0.5 rounded-md",
            isPositive
              ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30"
              : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30"
          )}
        >
          {isPositive ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
          {isPositive ? "+" : ""}
          {change}%
        </div>
        <span className="text-[12px] text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  );
}
