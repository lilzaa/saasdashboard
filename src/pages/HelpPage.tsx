import { useState } from "react";
import { Search, ChevronDown, ChevronUp, MessageSquare, Book, Video, ExternalLink, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How do I invite team members to my workspace?", a: "Go to Settings → Integrations, or use the team management section under your account. Click 'Invite Members', enter their email addresses, and choose their roles. Invitations expire after 7 days." },
  { q: "Can I change my subscription plan at any time?", a: "Yes. You can upgrade or downgrade your plan at any time from the Billing page. Upgrades take effect immediately and you'll be charged a prorated amount. Downgrades take effect at the end of your billing cycle." },
  { q: "How do I export my data?", a: "Navigate to Reports and click '+ New Report'. Select the date range and data type, then export as CSV or PDF. Enterprise users can also schedule automated exports." },
  { q: "Is my data encrypted and backed up?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We perform automated backups every 6 hours with a 30-day retention policy. Enterprise plans include dedicated backup snapshots." },
  { q: "How do I reset my password?", a: "On the login screen, click 'Forgot Password'. Enter your email and we'll send a reset link valid for 1 hour. You can also change your password anytime under Settings → Security." },
  { q: "What payment methods are accepted?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), ACH transfers for Enterprise plans, and annual invoicing. All payments are processed securely via Stripe." },
];

const tickets = [
  { id: "#2050", subject: "Export not working for date range > 90 days", status: "Open", priority: "High", updated: "2 hours ago" },
  { id: "#2048", subject: "Chart data not matching CSV export", status: "Resolved", priority: "Medium", updated: "Yesterday" },
  { id: "#2041", subject: "Integration with Zapier returning 401 errors", status: "In Progress", priority: "High", updated: "2 days ago" },
  { id: "#2035", subject: "Request: bulk user import via CSV", status: "Resolved", priority: "Low", updated: "Apr 2, 2024" },
];

const statusConfig: Record<string, { color: string; icon: any }> = {
  Open: { color: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30", icon: Clock },
  "In Progress": { color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30", icon: AlertCircle },
  Resolved: { color: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30", icon: CheckCircle2 },
};

const priorityColors: Record<string, string> = {
  High: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30",
  Medium: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30",
  Low: "text-muted-foreground bg-muted",
};

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Hero search */}
      <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center">
        <h2 className="text-lg font-bold text-foreground mb-1">How can we help?</h2>
        <p className="text-[13px] text-muted-foreground mb-4">Search our knowledge base or browse popular topics below.</p>
        <div className="flex items-center gap-2 h-10 px-4 rounded-xl bg-muted border border-border max-w-md mx-auto">
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-[13px] text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Book, label: "Documentation", desc: "Guides, API reference, and tutorials", color: "text-primary", bg: "bg-primary/10" },
          { icon: Video, label: "Video Tutorials", desc: "Step-by-step walkthroughs", color: "text-secondary", bg: "bg-secondary/10" },
          { icon: MessageSquare, label: "Live Chat", desc: "Talk to our support team", color: "text-accent-foreground", bg: "bg-accent/20" },
        ].map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.label}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-muted-foreground/30 bg-card shadow-sm text-left transition-all duration-150 hover:shadow-md group"
            >
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", link.bg)}>
                <Icon size={17} className={link.color} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-[13px] font-semibold text-foreground">{link.label}</p>
                  <ExternalLink size={11} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[12px] text-muted-foreground truncate">{link.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-[14px] font-semibold text-foreground">Frequently Asked Questions</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">{filteredFaqs.length} results</p>
        </div>
        <div className="divide-y divide-border/60">
          {filteredFaqs.length === 0 ? (
            <div className="px-5 py-8 text-center text-muted-foreground text-[13px]">No results found for "{search}"</div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="text-[13px] font-medium text-foreground">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={15} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown size={15} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Support tickets */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">My Support Tickets</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Recent support requests</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            + New Ticket
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Ticket", "Subject", "Priority", "Status", "Last Updated"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const sc = statusConfig[ticket.status];
                const StatusIcon = sc.icon;
                return (
                  <tr key={ticket.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5 text-[13px] font-mono font-medium text-foreground">{ticket.id}</td>
                    <td className="px-5 py-3.5 text-[13px] text-foreground max-w-xs truncate">{ticket.subject}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", priorityColors[ticket.priority])}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full", sc.color)}>
                        <StatusIcon size={10} strokeWidth={2.5} />
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{ticket.updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
