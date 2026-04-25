import { useState } from "react";
import { User, Bell, Shield, Globe, Palette, Key, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
];

function ProfileTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5 pb-5 border-b border-border">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-primary">LN</span>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-foreground">Profile Photo</p>
          <p className="text-[12px] text-muted-foreground mb-2">JPG, PNG or GIF. Max 2MB.</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Upload Photo
            </button>
            <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "First Name", value: "Liza", type: "text" },
          { label: "Last Name", value: "Naveed", type: "text" },
          { label: "Email Address", value: "liza@gmail.com", type: "email" },
          { label: "Phone Number", value: "+1 (555) 867-5309", type: "tel" },
          { label: "Company", value: "Clearview Inc.", type: "text" },
          { label: "Job Title", value: "Frontend Developer", type: "text" },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-[12px] font-medium text-foreground mb-1.5">{field.label}</label>
            <input
              type={field.type}
              defaultValue={field.value}
              className="w-full h-9 px-3 rounded-lg bg-background border border-border text-[13px] text-foreground outline-none focus:border-primary/60 transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-foreground mb-1.5">Bio</label>
        <textarea
          defaultValue="Specialize in building modern, responsive and user-focused web applications using React.js and modern frontend technologies."
          rows={3}
          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-[13px] text-foreground outline-none focus:border-primary/60 transition-colors resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity">
          <Save size={14} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    newUser: true, planChange: true, payment: true, support: false,
    weeklyReport: true, monthlyReport: true, security: true, marketing: false,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const rows = [
    { key: "newUser", label: "New user registrations", desc: "Get notified when a new user signs up" },
    { key: "planChange", label: "Plan upgrades & downgrades", desc: "Alerts when a user changes their subscription" },
    { key: "payment", label: "Payment events", desc: "Successful payments, failed charges, and refunds" },
    { key: "support", label: "Support ticket updates", desc: "New replies and status changes on tickets" },
    { key: "weeklyReport", label: "Weekly digest", desc: "Summary of activity and metrics every Monday" },
    { key: "monthlyReport", label: "Monthly report", desc: "Full monthly analytics report via email" },
    { key: "security", label: "Security alerts", desc: "Unusual login attempts and security events" },
    { key: "marketing", label: "Product updates & news", desc: "New features and announcements from Clearview" },
  ];

  return (
    <div className="space-y-1">
      {rows.map((row, i) => (
        <div key={row.key} className={cn("flex items-center justify-between py-3.5 gap-4", i < rows.length - 1 && "border-b border-border/60")}>
          <div>
            <p className="text-[13px] font-medium text-foreground">{row.label}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{row.desc}</p>
          </div>
          <button
            onClick={() => toggle(row.key as keyof typeof prefs)}
            className={cn(
              "relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200",
              prefs[row.key as keyof typeof prefs] ? "bg-primary" : "bg-muted border border-border"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                prefs[row.key as keyof typeof prefs] ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20 flex items-center gap-3">
        <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        <p className="text-[13px] text-emerald-800 dark:text-emerald-300">Your account is secured with two-factor authentication.</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-[13px] font-semibold text-foreground">Change Password</h4>
        {["Current Password", "New Password", "Confirm New Password"].map((label) => (
          <div key={label}>
            <label className="block text-[12px] font-medium text-foreground mb-1.5">{label}</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full max-w-sm h-9 px-3 rounded-lg bg-background border border-border text-[13px] text-foreground outline-none focus:border-primary/60 transition-colors"
            />
          </div>
        ))}
        <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>

      <div className="border-t border-border pt-5 space-y-3">
        <h4 className="text-[13px] font-semibold text-foreground">Active Sessions</h4>
        {[
          { device: "MacBook Pro — Chrome 123", location: "San Francisco, CA", time: "Current session", current: true },
          { device: "iPhone 15 — Safari", location: "San Francisco, CA", time: "2 hours ago", current: false },
          { device: "Windows PC — Edge", location: "New York, NY", time: "3 days ago", current: false },
        ].map((session) => (
          <div key={session.device} className="flex items-center justify-between py-3 border-b border-border/60">
            <div>
              <p className="text-[13px] font-medium text-foreground">{session.device}</p>
              <p className="text-[12px] text-muted-foreground">{session.location} · {session.time}</p>
            </div>
            {session.current ? (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30">Active</span>
            ) : (
              <button className="text-[12px] text-red-500 hover:text-red-600 font-medium">Revoke</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceTab() {
  const [density, setDensity] = useState("comfortable");
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-[13px] font-semibold text-foreground mb-3">Interface Density</h4>
        <div className="grid grid-cols-3 gap-3">
          {["compact", "comfortable", "spacious"].map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={cn(
                "p-3 rounded-xl border text-[12px] font-medium capitalize transition-all duration-150",
                density === d ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-foreground mb-3">Font Size</h4>
        <div className="grid grid-cols-3 gap-3">
          {["small", "medium", "large"].map((s) => (
            <button
              key={s}
              onClick={() => setFontSize(s)}
              className={cn(
                "p-3 rounded-xl border text-[12px] font-medium capitalize transition-all duration-150",
                fontSize === s ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-foreground mb-3">Accent Color</h4>
        <div className="flex gap-2.5">
          {["#7c9e87", "#c9956a", "#b5c9d4", "#d4a0a0", "#8b7fb8", "#4f8bc2"].map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border-2 border-transparent hover:border-foreground/40 transition-colors"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity">
          <Save size={14} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Slack", desc: "Send notifications and alerts to Slack channels.", connected: true, logo: "SL" },
    { name: "GitHub", desc: "Link repositories and track deployment events.", connected: true, logo: "GH" },
    { name: "Stripe", desc: "Sync billing data and payment events.", connected: false, logo: "ST" },
    { name: "HubSpot", desc: "Sync customers to your CRM automatically.", connected: false, logo: "HS" },
    { name: "Google Analytics", desc: "Import web analytics into your dashboard.", connected: true, logo: "GA" },
    { name: "Zapier", desc: "Automate workflows with 5,000+ apps.", connected: false, logo: "ZP" },
  ];

  const colors = ["bg-primary/10 text-primary", "bg-secondary/10 text-secondary", "bg-accent/20 text-accent-foreground", "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"];

  return (
    <div className="space-y-3">
      {integrations.map((int, i) => (
        <div key={int.name} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors bg-muted/20">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[11px] flex-shrink-0", colors[i % colors.length])}>
            {int.logo}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground">{int.name}</p>
            <p className="text-[12px] text-muted-foreground truncate">{int.desc}</p>
          </div>
          <button
            className={cn(
              "px-3 py-1.5 rounded-lg text-[12px] font-medium flex-shrink-0 transition-all duration-150",
              int.connected
                ? "border border-border text-muted-foreground hover:bg-muted"
                : "bg-primary text-primary-foreground hover:opacity-90"
            )}
          >
            {int.connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile": return <ProfileTab />;
      case "notifications": return <NotificationsTab />;
      case "security": return <SecurityTab />;
      case "appearance": return <AppearanceTab />;
      case "integrations": return <IntegrationsTab />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 max-w-5xl">
      {/* Sidebar tabs */}
      <div className="lg:w-48 flex-shrink-0">
        <div className="bg-card border border-card-border rounded-xl p-2 shadow-sm">
          <ul className="space-y-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-card border border-card-border rounded-xl p-5 shadow-sm min-w-0">
        <h3 className="text-[15px] font-semibold text-foreground mb-4 pb-4 border-b border-border">
          {tabs.find((t) => t.id === activeTab)?.label}
        </h3>
        {renderTab()}
      </div>
    </div>
  );
}
