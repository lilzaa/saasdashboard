import { CheckCircle2, CreditCard, Download, Zap, Shield, Users, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "INV-2024-012", date: "Apr 1, 2024", amount: 1200, status: "Paid", plan: "Enterprise" },
  { id: "INV-2024-011", date: "Mar 1, 2024", amount: 1200, status: "Paid", plan: "Enterprise" },
  { id: "INV-2024-010", date: "Feb 1, 2024", amount: 1200, status: "Paid", plan: "Enterprise" },
  { id: "INV-2024-009", date: "Jan 1, 2024", amount: 1200, status: "Paid", plan: "Enterprise" },
  { id: "INV-2023-012", date: "Dec 1, 2023", amount: 980, status: "Paid", plan: "Pro" },
  { id: "INV-2023-011", date: "Nov 1, 2023", amount: 980, status: "Paid", plan: "Pro" },
];

const plans = [
  {
    name: "Starter",
    price: 19,
    description: "For individuals and small projects",
    features: ["Up to 5 users", "10 GB storage", "Basic analytics", "Email support"],
    color: "text-accent-foreground",
    bg: "bg-accent/10",
    current: false,
  },
  {
    name: "Pro",
    price: 49,
    description: "For growing teams",
    features: ["Up to 25 users", "100 GB storage", "Advanced analytics", "Priority support", "Custom integrations"],
    color: "text-secondary",
    bg: "bg-secondary/10",
    current: false,
  },
  {
    name: "Enterprise",
    price: 1200,
    description: "For large organizations",
    features: ["Unlimited users", "1 TB storage", "Full analytics suite", "Dedicated support", "SLA guarantee", "Custom contracts"],
    color: "text-primary",
    bg: "bg-primary/10",
    current: true,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-5">
      {/* Current plan */}
      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap size={22} className="text-primary" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[15px] font-semibold text-foreground">Enterprise Plan</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Current</span>
              </div>
              <p className="text-[13px] text-muted-foreground">$1,200 / month · Renews on May 1, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground border border-border hover:bg-muted transition-colors duration-150">
              Cancel Plan
            </button>
            <button className="px-3 py-2 rounded-lg text-[13px] font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-150">
              Manage Plan
            </button>
          </div>
        </div>
      </div>

      {/* Payment method & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payment method */}
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Payment Method</h3>
            <button className="text-[12px] text-primary hover:underline font-medium">Update</button>
          </div>
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-border bg-muted/30">
            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <CreditCard size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-[12px] text-muted-foreground">Expires 09/26</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} strokeWidth={2} />
              <span className="text-[12px] font-medium">Active</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Shield size={13} strokeWidth={1.8} />
            <span>Payments processed securely via Stripe</span>
          </div>
        </div>

        {/* Usage */}
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-foreground">Usage This Month</h3>
          </div>
          <div className="space-y-3.5">
            {[
              { label: "Team Members", used: 38, limit: "Unlimited", pct: 38 },
              { label: "Storage", used: "412 GB", limit: "1 TB", pct: 40 },
              { label: "API Requests", used: "842K", limit: "Unlimited", pct: 28 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-foreground">{item.label}</span>
                  <span className="text-[12px] text-muted-foreground">
                    {item.used} / {item.limit}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h3 className="text-[14px] font-semibold text-foreground mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-xl border p-4 transition-all duration-150",
                plan.current
                  ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", plan.bg)}>
                  <Users size={15} className={plan.color} strokeWidth={1.8} />
                </div>
                {plan.current && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Active</span>
                )}
              </div>
              <p className="text-[15px] font-bold text-foreground">{plan.name}</p>
              <p className="text-[12px] text-muted-foreground mb-3">{plan.description}</p>
              <p className="text-xl font-bold text-foreground mb-3">
                ${plan.price.toLocaleString()}<span className="text-[13px] font-normal text-muted-foreground">/mo</span>
              </p>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <CheckCircle2 size={12} className={plan.color} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  "w-full py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                  plan.current
                    ? "bg-muted text-muted-foreground cursor-default"
                    : "border border-border hover:bg-muted text-foreground"
                )}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Switch Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-[14px] font-semibold text-foreground">Invoice History</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">All past invoices and receipts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Invoice", "Date", "Plan", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5 text-[13px] font-medium text-foreground font-mono">{inv.id}</td>
                  <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-3.5 text-[13px] text-foreground">{inv.plan}</td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-foreground">${inv.amount.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                      <Download size={13} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
