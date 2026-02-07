import * as React from "react";
import { motion } from "motion/react";
import { BrainCircuit, TrendingDown, TrendingUp, Zap, AlertTriangle, Plus, Search, Filter, ToggleLeft, ToggleRight, CheckCircle, XCircle, Clock, Bot, ArrowRight, Eye } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GlassCard, PillTabs, PageHeader, StatusBadge } from "./shared";

// --- Mock Data ---
const INSIGHTS = [
  { id: 1, category: "Revenue Risk", headline: "Raffoul churn probability at 72%", detail: "Three overdue invoices ($12K), two open tickets, and no meeting in 30 days. Historical pattern matches clients who churned within 60 days.", icon: TrendingDown, color: "#f87171" },
  { id: 2, category: "Opportunity", headline: "Caribbean Connect ready for upsell", detail: "Contract renewal in 45 days. Usage up 34% QoQ. Similar clients accept managed services bundle at 68% rate. Estimated incremental MRR: $2,800.", icon: TrendingUp, color: "#34d399" },
  { id: 3, category: "Efficiency", headline: "Ticket resolution bottleneck detected", detail: "Average 'Waiting' stage duration increased from 2.1 days to 4.8 days this month. Root cause: SLA escalation process requires manual approval.", icon: Zap, color: "#818cf8" },
  { id: 4, category: "Alert", headline: "SLA breach imminent for Global Logistics", detail: "Ticket T-1040 has been in 'Waiting' for 9 days. Contractual SLA is 5 business days. Automatic escalation to management recommended.", icon: AlertTriangle, color: "#fbbf24" },
  { id: 5, category: "Revenue Risk", headline: "Pipeline velocity declining", detail: "Average deal cycle time increased from 18 days to 27 days. Two deals in 'Qualified' stage for over 14 days. Consider proactive outreach.", icon: TrendingDown, color: "#f87171" },
  { id: 6, category: "Opportunity", headline: "Cross-sell detected: MegaCorp security", detail: "MegaCorp inquired about firewall audit (ticket T-1036). They have no security package. Win probability for security suite: 85%. Deal value: $52K.", icon: TrendingUp, color: "#34d399" },
];

const AUTOMATIONS = [
  { id: 1, name: "Overdue Invoice Reminders", trigger: "Invoice overdue > 7 days", action: "Send personalized email via AI", active: true, stats: "Sent 14 reminders, collected $8,200" },
  { id: 2, name: "Ticket SLA Monitor", trigger: "Ticket age > 80% of SLA", action: "Alert assigned agent + manager", active: true, stats: "Triggered 6 times, prevented 4 breaches" },
  { id: 3, name: "New Lead Enrichment", trigger: "New contact created (type: Lead)", action: "Enrich with LinkedIn + company data", active: true, stats: "Enriched 12 leads, 3 converted" },
  { id: 4, name: "Client Health Digest", trigger: "Every Monday 8:00 AM", action: "Generate health report for all clients", active: true, stats: "Generated 8 reports" },
  { id: 5, name: "Deal Stale Alert", trigger: "Deal unchanged > 14 days", action: "Notify sales rep with suggested actions", active: false, stats: "Paused — tuning thresholds" },
  { id: 6, name: "Churn Risk Alert", trigger: "Client health score drops below 40", action: "Create retention task + notify CEO", active: true, stats: "Triggered 2 alerts, 1 save in progress" },
];

const CROSS_REFS = [
  { client: "Raffoul", overdue: 12000, tickets: 1, tasks: 2, staleDeals: 1, riskScore: 82 },
  { client: "Global Logistics", overdue: 3200, tickets: 3, tasks: 1, staleDeals: 0, riskScore: 71 },
  { client: "Prime Tech", overdue: 4200, tickets: 0, tasks: 0, staleDeals: 0, riskScore: 45 },
  { client: "SunBridge", overdue: 0, tickets: 1, tasks: 0, staleDeals: 0, riskScore: 28 },
  { client: "TechVista", overdue: 0, tickets: 1, tasks: 1, staleDeals: 0, riskScore: 22 },
  { client: "Caribbean Connect", overdue: 0, tickets: 2, tasks: 0, staleDeals: 0, riskScore: 15 },
  { client: "MegaCorp", overdue: 0, tickets: 0, tasks: 0, staleDeals: 0, riskScore: 5 },
  { client: "EPIC Corp", overdue: 0, tickets: 0, tasks: 0, staleDeals: 0, riskScore: 3 },
];

const ACTIVITY_LOG = [
  { id: 1, timestamp: "2026-02-07 10:14", agent: "ARC", action: "Generated collection email", object: "Raffoul — INV-1083", result: "Success", approval: "Pending" },
  { id: 2, timestamp: "2026-02-07 09:45", agent: "Finance", action: "Flagged overdue invoice", object: "Prime Tech — INV-1082", result: "Success", approval: "Auto" },
  { id: 3, timestamp: "2026-02-07 09:30", agent: "Helpdesk", action: "Escalated ticket", object: "T-1040 — Global Logistics", result: "Success", approval: "Approved" },
  { id: 4, timestamp: "2026-02-07 08:00", agent: "ARC", action: "Generated morning briefing", object: "Daily Briefing — Feb 7", result: "Success", approval: "Auto" },
  { id: 5, timestamp: "2026-02-06 17:30", agent: "Sales", action: "Updated deal stage", object: "D-301 → Proposal", result: "Success", approval: "Auto" },
  { id: 6, timestamp: "2026-02-06 16:15", agent: "Network", action: "Detected anomaly", object: "Sector 7 — Latency spike", result: "Alert Sent", approval: "Auto" },
  { id: 7, timestamp: "2026-02-06 14:00", agent: "Finance", action: "Applied late fee", object: "Raffoul — $150", result: "Blocked", approval: "Rejected" },
  { id: 8, timestamp: "2026-02-06 11:20", agent: "HR", action: "Flagged overtime request", object: "Marcus J. — 4 hours", result: "Success", approval: "Pending" },
  { id: 9, timestamp: "2026-02-06 09:00", agent: "ARC", action: "Client health scan", object: "All clients — Weekly", result: "Success", approval: "Auto" },
  { id: 10, timestamp: "2026-02-05 16:45", agent: "Helpdesk", action: "Auto-triaged ticket", object: "T-1042 — Priority 1", result: "Success", approval: "Auto" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Revenue Risk": "#f87171",
  "Opportunity": "#34d399",
  "Efficiency": "#818cf8",
  "Alert": "#fbbf24",
};

const APPROVAL_STYLES: Record<string, { bg: string; color: string }> = {
  Auto: { bg: "rgba(110,110,138,0.2)", color: "#6e6e8a" },
  Pending: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  Approved: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  Rejected: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
};

// --- Sub-views ---
const InsightsView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {INSIGHTS.map((ins, i) => (
      <motion.div key={ins.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
        <GlassCard className="p-5 border-l-[3px] space-y-3" hover={false} style={{ borderLeftColor: "#a78bfa" }}>
          <div className="flex items-center gap-2">
            <ins.icon className="h-4 w-4" style={{ color: ins.color }} />
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: CATEGORY_COLORS[ins.category] || "#818cf8", backgroundColor: `${CATEGORY_COLORS[ins.category] || "#818cf8"}15` }}>{ins.category}</span>
          </div>
          <h4 className="text-sm font-bold text-white">{ins.headline}</h4>
          <p className="text-xs text-[#c8c8d8] leading-relaxed">{ins.detail}</p>
          <div className="flex gap-2 pt-1">
            <Button size="sm" className="h-7 px-4 text-[10px] font-bold bg-[#a78bfa] hover:bg-[#8b5cf6] rounded-lg gap-1.5"><ArrowRight className="h-3 w-3" />Take Action</Button>
            <Button variant="ghost" size="sm" className="h-7 px-4 text-[10px] font-bold text-[#6e6e8a] hover:text-white rounded-lg">Dismiss</Button>
          </div>
        </GlassCard>
      </motion.div>
    ))}
  </div>
);

const AutomationsView = () => {
  const [automations, setAutomations] = React.useState(AUTOMATIONS);
  const toggle = (id: number) => setAutomations(automations.map((a) => a.id === id ? { ...a, active: !a.active } : a));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="bg-[#818cf8] hover:bg-[#6366f1] h-10 px-5 rounded-xl text-xs font-bold gap-2"><Plus className="h-4 w-4" />New Automation</Button>
      </div>
      <div className="space-y-3">
        {automations.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-5" hover={false}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-white">{a.name}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${a.active ? "text-[#34d399] bg-[#34d399]/15" : "text-[#6e6e8a] bg-white/5"}`}>{a.active ? "Active" : "Paused"}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#6e6e8a]">
                    <span><span className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Trigger:</span> {a.trigger}</span>
                    <span><span className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Action:</span> {a.action}</span>
                  </div>
                  <div className="text-xs font-mono text-[#a78bfa]">{a.stats}</div>
                </div>
                <button onClick={() => toggle(a.id)} className="shrink-0 mt-1">
                  {a.active ? <ToggleRight className="h-7 w-7 text-[#34d399]" /> : <ToggleLeft className="h-7 w-7 text-[#6e6e8a]" />}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CrossRefsView = () => (
  <GlassCard className="p-0 overflow-hidden" hover={false}>
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-white/5">
          {["Client", "Overdue $", "Tickets", "Tasks", "Stale Deals", "Risk Score"].map((h) => (
            <th key={h} className="text-left px-6 py-4 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {CROSS_REFS.map((r, i) => {
          const riskColor = r.riskScore >= 70 ? "#f87171" : r.riskScore >= 40 ? "#fbbf24" : "#34d399";
          const riskBg = r.riskScore >= 70 ? "rgba(248,113,113,0.08)" : r.riskScore >= 40 ? "rgba(251,191,36,0.05)" : "transparent";
          return (
            <motion.tr key={r.client} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-white/5" style={{ backgroundColor: riskBg }}>
              <td className="px-6 py-4 font-bold text-white">{r.client}</td>
              <td className="px-6 py-4 font-mono font-bold" style={{ color: r.overdue > 0 ? "#f87171" : "#6e6e8a" }}>{r.overdue > 0 ? `$${r.overdue.toLocaleString()}` : "—"}</td>
              <td className="px-6 py-4 font-mono text-white">{r.tickets || "—"}</td>
              <td className="px-6 py-4 font-mono text-white">{r.tasks || "—"}</td>
              <td className="px-6 py-4 font-mono text-white">{r.staleDeals || "—"}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.riskScore}%`, backgroundColor: riskColor }} />
                  </div>
                  <span className="font-mono font-bold text-xs" style={{ color: riskColor }}>{r.riskScore}</span>
                </div>
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  </GlassCard>
);

const ActivityLogView = () => {
  const [search, setSearch] = React.useState("");
  const [filterAgent, setFilterAgent] = React.useState("All");
  const agents = ["All", ...Array.from(new Set(ACTIVITY_LOG.map((a) => a.agent)))];
  const filtered = ACTIVITY_LOG.filter(
    (a) => (filterAgent === "All" || a.agent === filterAgent) && (a.action.toLowerCase().includes(search.toLowerCase()) || a.object.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6e6e8a]" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activity..." className="pl-10 bg-white/5 border-white/10 rounded-xl h-10 text-sm" />
        </div>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
          {agents.map((a) => (
            <button key={a} onClick={() => setFilterAgent(a)} className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${filterAgent === a ? "bg-[#818cf8] text-white" : "text-[#6e6e8a] hover:text-white"}`}>{a}</button>
          ))}
        </div>
      </div>
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["Timestamp", "Agent", "Action", "Object", "Result", "Approval"].map((h) => (
                <th key={h} className={`text-left px-6 py-4 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest ${h === "Object" ? "hidden lg:table-cell" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((a, i) => {
              const appr = APPROVAL_STYLES[a.approval] || APPROVAL_STYLES.Auto;
              return (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5">
                  <td className="px-6 py-3 font-mono text-[#6e6e8a] whitespace-nowrap">{a.timestamp}</td>
                  <td className="px-6 py-3"><span className="text-xs font-bold text-[#818cf8] bg-[#818cf8]/10 px-2 py-0.5 rounded-md">{a.agent}</span></td>
                  <td className="px-6 py-3 text-white font-medium">{a.action}</td>
                  <td className="px-6 py-3 text-[#c8c8d8] hidden lg:table-cell">{a.object}</td>
                  <td className="px-6 py-3"><StatusBadge status={a.result === "Blocked" ? "Rejected" : a.result === "Alert Sent" ? "Pending" : "Active"} className="!text-[9px]" /></td>
                  <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-lg text-[10px] font-bold" style={{ color: appr.color, backgroundColor: appr.bg }}>{a.approval}</span></td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

// --- Main Component ---
export const DashboardIntelligence = () => {
  const [tab, setTab] = React.useState("Insights");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Intelligence"
        subtitle="AI insights, automations, and the system activity log."
        action={
          <div className="flex items-center gap-2 text-xs text-[#a78bfa]">
            <BrainCircuit className="h-4 w-4" />
            <span className="font-bold">ARC Engine v2.4</span>
            <span className="h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
          </div>
        }
      />
      <PillTabs tabs={["Insights", "Automations", "Cross-References", "Activity Log"]} active={tab} onChange={setTab} />
      {tab === "Insights" && <InsightsView />}
      {tab === "Automations" && <AutomationsView />}
      {tab === "Cross-References" && <CrossRefsView />}
      {tab === "Activity Log" && <ActivityLogView />}
    </motion.div>
  );
};
