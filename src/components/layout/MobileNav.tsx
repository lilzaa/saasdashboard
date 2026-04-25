import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, Users, Settings, Package } from "lucide-react";

interface MobileNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const mobileNavItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "orders", label: "Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav({ activePage, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-3 transition-colors duration-150 min-w-0",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
              <span className="text-[10px] font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
