import { recentActivity } from "@/data/dummy";
import { cn } from "@/lib/utils";
import { UserPlus, ArrowUpCircle, MessageSquare, UserMinus, Star } from "lucide-react";

const activityConfig: Record<string, { icon: any; color: string; bg: string }> = {
  upgrade: { icon: ArrowUpCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
  create: { icon: Star, color: "text-primary", bg: "bg-primary/10" },
  support: { icon: MessageSquare, color: "text-accent-foreground", bg: "bg-accent/30" },
  deactivate: { icon: UserMinus, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
  invite: { icon: UserPlus, color: "text-secondary", bg: "bg-secondary/10" },
};

export default function ActivityFeed() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold text-foreground">Recent Activity</h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">Latest actions across your workspace</p>
      </div>
      <div className="space-y-3">
        {recentActivity.map((item, i) => {
          const config = activityConfig[item.type] ?? activityConfig.create;
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 pb-3 transition-opacity duration-150",
                i < recentActivity.length - 1 && "border-b border-border"
              )}
            >
              <div className={cn("mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", config.bg)}>
                <Icon size={13} className={config.color} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{item.user}</p>
                <p className="text-[12px] text-muted-foreground truncate">{item.action}</p>
              </div>
              <span className="text-[11px] text-muted-foreground flex-shrink-0 mt-0.5">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
