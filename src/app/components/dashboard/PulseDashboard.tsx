import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Ticket, TrendingUp, Wifi, AlertTriangle, Wrench, BrainCircuit, Check, X, ChevronRight, Clock } from "lucide-react";
import { Button } from "../ui/button";

// --- Vital Signs Data ---
const vitals = [
  { label: "Revenue", value: "$124,500", sub: "MRR (Subscriptions)", status: "green" as const, icon: TrendingUp },
  { label: "Helpdesk", value: "74", sub: "12 urgent", status: "red" as const, icon: Ticket },
  { label: "Network", value: "82%", sub: "142 / 173 online", status: "yellow" as const, icon: Wifi },
  { label: "Overdue", value: "$28,400", sub: "AR collection needed", status: "red" as const, icon: AlertTriangle },
  { label: "Pipeline", value: "$64,200", sub: "Active deals", status: "green" as const, icon: TrendingUp },
  { label: "Field Svc", value: "18", sub: "Backlog tasks", status: "yellow" as const, icon: Wrench },
];

const statusColor = (s: "green" | "yellow" | "red") =>
  s === "green" ? "#34d399" : s === "yellow" ? "#fbbf24" : "#f87171";

// --- Insights ---
const insights = [
  "Raffoul churn risk at 72%. Three overdue invoices totaling $12K, no contact in 30 days. Recommended: schedule call this week.",
  "Caribbean Connect contract renewal in 45 days. Usage up 34% QoQ — strong upsell candidate for managed services bundle.",
  "Ticket resolution time increased from 2.1 to 4.8 days this month. Root cause: manual SLA escalation bottleneck.",
  "Network Sector 4 showing pattern of intermittent failures. Correlated with 6 support tickets this week.",
  "Collections pipeline recovered $8,200 this month via automated reminders. 4 clients still in escalation stage.",
];

// --- Approvals ---
const initialApprovals = [
  { id: 1, agent: "Finance", agentColor: "#34d399", action: "Send collection notice to Raffoul ($3,800 overdue, 37 days)", time: "2m ago" },
  { id: 2, agent: "Helpdesk", agentColor: "#818cf8", action: "Escalate ticket #8492 — SLA breach in 4 hours", time: "8m ago" },
  { id: 3, agent: "HR", agentColor: "#a78bfa", action: "Approve overtime for Marcus J. (4 hours field work)", time: "14m ago" },
  { id: 4, agent: "Sales", agentColor: "#fbbf24", action: "Send proposal follow-up to TechVista ($15K deal)", time: "22m ago" },
];

// --- Activity ---
const activity = [
  { time: "14:22", agent: "Helpdesk", action: "Triaged ticket #9102 → Hardware Tier 2", color: "#818cf8" },
  { time: "14:18", agent: "Finance", action: "Flagged churn risk for Domino Ltd", color: "#34d399" },
  { time: "14:05", agent: "Network", action: "Auto-recovered Sector 4 backup gateway", color: "#fbbf24" },
  { time: "13:58", agent: "Sales", action: "Enriched lead: cross-referenced CRM + helpdesk", color: "#a78bfa" },
  { time: "13:45", agent: "HR", action: "Rebalanced workload: 4 tasks Marcus → Sarah", color: "#34d399" },
  { time: "13:30", agent: "Finance", action: "Generated 14 collection reminder notices", color: "#818cf8" },
  { time: "13:22", agent: "ARC", action: "Deprioritized Sector 2 based on low pipeline activity", color: "#a78bfa" },
  { time: "12:50", agent: "Helpdesk", action: "Resolved ticket #9098 — password reset", color: "#818cf8" },
  { time: "12:35", agent: "Network", action: "Firmware update pushed to 12 access points", color: "#fbbf24" },
  { time: "12:10", agent: "Sales", action: "Moved Caribbean Connect deal to Proposal stage", color: "#34d399" },
];

export const PulseDashboard = () => {
  const [insightIdx, setInsightIdx] = React.useState(0);
  const [approvals, setApprovals] = React.useState(initialApprovals);

  React.useEffect(() => {
    const t = setInterval(() => setInsightIdx((i) => (i + 1) % insights.length), 8000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const greeting = now.getUTCHours() < 12 ? "Good morning" : now.getUTCHours() < 18 ? "Good afternoon" : "Good evening";

  const handleApprove = (id: number) => {
    setApprovals((a) => a.filter((x) => x.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{greeting}, Eric.</h1>
          <p className="text-sm text-[#6e6e8a] font-medium mt-1">
            {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-[10px] font-bold text-[#34d399] uppercase tracking-widest">Systems Online</span>
        </div>
      </div>

      {/* Vital Signs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {vitals.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0d19]/55 backdrop-blur-[20px] border border-white/[0.06] rounded-2xl p-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-[0.15em]">{v.label}</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.5, 0.8] }}
                transition={{ duration: v.status === "red" ? 1 : v.status === "yellow" ? 2 : 3, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: statusColor(v.status), boxShadow: `0 0 12px ${statusColor(v.status)}60` }}
              />
            </div>
            <div className="font-mono text-xl font-black text-white leading-none">{v.value}</div>
            <div className="text-[10px] text-[#6e6e8a] font-medium mt-1.5">{v.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Insight Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0c0d19]/55 backdrop-blur-[20px] border border-[#a78bfa]/20 rounded-2xl p-5 flex items-start gap-4"
      >
        <div className="shrink-0 h-9 w-9 rounded-xl bg-[#a78bfa]/15 flex items-center justify-center mt-0.5">
          <BrainCircuit className="h-4.5 w-4.5 text-[#a78bfa]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-1.5">ARC Insight</div>
          <AnimatePresence mode="wait">
            <motion.p
              key={insightIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-[#c8c8d8] leading-relaxed"
            >
              {insights[insightIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-1 shrink-0 mt-2">
          {insights.map((_, i) => (
            <div key={i} className={`h-1 w-3 rounded-full transition-colors ${i === insightIdx ? "bg-[#a78bfa]" : "bg-white/10"}`} />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Needs Your Call */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#0c0d19]/55 backdrop-blur-[20px] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#818cf8]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Needs Your Call</span>
            </div>
            {approvals.length > 0 && (
              <span className="text-[10px] font-bold font-mono text-[#818cf8] bg-[#818cf8]/10 px-2.5 py-1 rounded-full">
                {approvals.length}
              </span>
            )}
          </div>
          <div className="p-3 space-y-2 max-h-[340px] overflow-y-auto no-scrollbar">
            <AnimatePresence>
              {approvals.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
                  <Check className="h-8 w-8 text-[#34d399]/30 mx-auto mb-3" />
                  <p className="text-xs font-bold text-[#6e6e8a] uppercase tracking-widest">All clear</p>
                  <p className="text-[10px] text-[#6e6e8a] mt-1">Your agents are handling it.</p>
                </motion.div>
              ) : (
                approvals.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0, padding: 0 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: a.agentColor }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: a.agentColor }}>
                        {a.agent}
                      </span>
                      <span className="text-[9px] text-[#6e6e8a] ml-auto font-mono">{a.time}</span>
                    </div>
                    <p className="text-xs text-[#c8c8d8] leading-relaxed mb-3">{a.action}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(a.id)}
                        size="sm"
                        className="flex-1 h-8 bg-[#818cf8] hover:bg-[#6366f1] text-[10px] font-bold rounded-lg"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleApprove(a.id)}
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-8 text-[10px] font-bold text-[#6e6e8a] hover:text-white rounded-lg border border-white/5"
                      >
                        Reject
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3 bg-[#0c0d19]/55 backdrop-blur-[20px] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="h-4 w-4 text-[#818cf8]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Agent Activity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-[9px] font-bold text-[#34d399] uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.03] max-h-[340px] overflow-y-auto no-scrollbar">
            {activity.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-[10px] font-mono text-[#6e6e8a] w-10 shrink-0">{a.time}</span>
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md w-20 text-center shrink-0"
                  style={{ color: a.color, backgroundColor: `${a.color}15` }}
                >
                  {a.agent}
                </span>
                <span className="text-xs text-[#c8c8d8] truncate">{a.action}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
