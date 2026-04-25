import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  FileText,
  CreditCard,
  Package,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "orders", label: "Orders", icon: Package },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "reports", label: "Reports", icon: FileText },
];

const bottomItems = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

export default function Sidebar({ activePage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <Zap size={15} className="text-primary-foreground" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span className="font-semibold text-[15px] tracking-tight text-sidebar-foreground truncate">
              Clearview
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className={cn(
            "ml-auto flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center",
            "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
            "transition-colors duration-150"
          )}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {!collapsed && (
          <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </p>
        )}
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon size={17} className="flex-shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {!collapsed && (
          <p className="px-2 mt-5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Account
          </p>
        )}
        {collapsed && <div className="mt-4 border-t border-sidebar-border mx-1" />}
        <ul className="space-y-0.5 mt-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon size={17} className="flex-shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User profile */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors duration-150",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-primary">LN</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Liza Naveed</p>
              <p className="text-[11px] text-muted-foreground truncate">liza@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
