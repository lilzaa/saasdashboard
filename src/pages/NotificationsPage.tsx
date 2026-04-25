import { useState } from "react";
import { Bell, ArrowUpCircle, Users, AlertCircle, CheckCircle2, MessageSquare, CreditCard, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, type: "upgrade", title: "New Enterprise Upgrade", message: "Tariq Hassan upgraded from Pro to Enterprise plan.", time: "2 minutes ago", read: false, icon: ArrowUpCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
  { id: 2, type: "alert", title: "Server Response Time Alert", message: "API latency exceeded 800ms threshold for 5 minutes on region EU-West.", time: "18 minutes ago", read: false, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
  { id: 3, type: "user", title: "3 New Users Signed Up", message: "Marcus Reed, Yuna Park, and Felix Wagner joined in the last hour.", time: "1 hour ago", read: false, icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { id: 4, type: "billing", title: "Invoice Generated", message: "Invoice INV-2024-012 for $1,200 has been sent to billing@clearview.io.", time: "3 hours ago", read: true, icon: CreditCard, color: "text-secondary", bg: "bg-secondary/10" },
  { id: 5, type: "message", title: "Support Ticket Resolved", message: "Ticket #2048 from Selin Yildiz has been closed by the support team.", time: "5 hours ago", read: true, icon: MessageSquare, color: "text-accent-foreground", bg: "bg-accent/20" },
  { id: 6, type: "system", title: "Scheduled Maintenance", message: "System maintenance is scheduled for April 15, 2024, 02:00–04:00 UTC.", time: "Yesterday", read: true, icon: Zap, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
  { id: 7, type: "upgrade", title: "Priya Kapoor Invited Team Member", message: "Priya Kapoor sent an invitation to rohit@lunastudio.design.", time: "Yesterday", read: true, icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { id: 8, type: "alert", title: "Low Storage Warning", message: "Your account is at 82% storage capacity. Consider upgrading your plan.", time: "2 days ago", read: true, icon: AlertCircle, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = items.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell size={19} className="text-primary" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Notifications</h3>
            <p className="text-[12px] text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All notifications read"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:underline"
          >
            <CheckCircle2 size={13} />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-card border border-card-border rounded-xl p-1 shadow-sm w-fit">
        {["All", "Unread", "Read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
              filter === f ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-muted-foreground text-[13px]">
              No notifications here.
            </div>
          ) : (
            filtered.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "px-5 py-4 flex items-start gap-4 transition-colors duration-100",
                    !notif.read ? "bg-primary/[0.03]" : "hover:bg-muted/30"
                  )}
                >
                  <div className={cn("mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", notif.bg)}>
                    <Icon size={15} className={notif.color} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn("text-[13px] font-medium", !notif.read ? "text-foreground" : "text-foreground/80")}>
                          {notif.title}
                        </p>
                        <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
                        {!notif.read && (
                          <button
                            onClick={() => markRead(notif.id)}
                            className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                            title="Mark as read"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
