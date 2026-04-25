import { Moon, Sun, Bell, Search, ChevronDown, Settings } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface NavbarProps {
  sidebarCollapsed: boolean;
  pageTitle: string;
}

export default function Navbar({ sidebarCollapsed, pageTitle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 h-16 bg-card/90 backdrop-blur-sm border-b border-border",
        "flex items-center px-4 gap-4 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "left-[68px]" : "left-[240px]"
      )}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[15px] font-semibold text-foreground truncate">{pageTitle}</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-muted border border-border text-sm text-muted-foreground w-48 lg:w-64 cursor-text hover:border-primary/40 transition-colors duration-150">
        <Search size={14} className="flex-shrink-0" />
        <span className="truncate">Search...</span>
        <kbd className="ml-auto text-[10px] font-medium bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {/* Notifications */}
        {/* <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary border-2 border-card" />
        </button> */}

        {/* Settings */}
        {/* <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150">
          <Settings size={17} />
        </button> */}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Divider */}
        {/* <div className="w-px h-5 bg-border mx-1" /> */}

        {/* Profile */}
        {/* <button className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-lg hover:bg-muted transition-colors duration-150">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-semibold text-primary">AJ</span>
          </div>
          <span className="hidden sm:block text-sm font-medium text-foreground">Alex</span>
          <ChevronDown size={13} className="text-muted-foreground" />
        </button> */}
      </div>
    </header>
  );
}
