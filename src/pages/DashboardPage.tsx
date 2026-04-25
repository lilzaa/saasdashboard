import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TrafficChart from "@/components/dashboard/TrafficChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import WeeklyVisitorsChart from "@/components/dashboard/WeeklyVisitorsChart";

const stats = [
  {
    title: "Total Users",
    value: "2,980",
    change: 12.4,
    changeLabel: "vs last month",
    icon: Users,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "Monthly Revenue",
    value: "82,000",
    change: 9.7,
    changeLabel: "vs last month",
    icon: DollarSign,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    prefix: "$",
  },
  {
    title: "Total Orders",
    value: "6,738",
    change: 5.2,
    changeLabel: "vs last month",
    icon: ShoppingCart,
    iconColor: "text-accent-foreground",
    iconBg: "bg-accent/20",
  },
  {
    title: "Growth Rate",
    value: "18.3%",
    change: 3.1,
    changeLabel: "vs last month",
    icon: TrendingUp,
    iconColor: "text-pink-500 dark:text-pink-400",
    iconBg: "bg-pink-50 dark:bg-pink-900/30",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TrafficChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityFeed />
        <WeeklyVisitorsChart />
      </div>
    </div>
  );
}
