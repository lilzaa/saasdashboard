import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import DashboardPage from "@/pages/DashboardPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import UsersPage from "@/pages/UsersPage";
import OrdersPage from "@/pages/OrdersPage";
import BillingPage from "@/pages/BillingPage";
import ReportsPage from "@/pages/ReportsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";
import MobileNav from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard Overview",
  analytics: "Analytics",
  users: "User Management",
  orders: "Orders",
  billing: "Billing",
  reports: "Reports",
  notifications: "Notifications",
  settings: "Settings",
  help: "Help & Support",
};

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "users":
        return <UsersPage />;
      case "orders":
        return <OrdersPage />;
      case "billing":
        return <BillingPage />;
      case "reports":
        return <ReportsPage />;
      case "notifications":
        return <NotificationsPage />;
      case "settings":
        return <SettingsPage />;
      case "help":
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* Navbar */}
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        pageTitle={pageTitles[activePage] ?? activePage}
      />

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300 ease-in-out pt-16 pb-20 md:pb-6",
          "hidden md:block",
          sidebarCollapsed ? "md:pl-[68px]" : "md:pl-[240px]"
        )}
      >
        <div className="px-5 py-6 max-w-[1400px] mx-auto">{renderPage()}</div>
      </main>

      {/* Mobile layout */}
      <main className="block md:hidden pt-16 pb-20">
        <div className="px-4 py-5">{renderPage()}</div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <MobileNav activePage={activePage} onNavigate={setActivePage} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
