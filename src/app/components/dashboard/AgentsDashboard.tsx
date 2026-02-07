import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Ticket, TrendingUp, Users, Wrench, Wifi, User, X, Send, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const agents = [
  { id: "eric", name: "Eric", role: "Owner", icon: User, status: "normal" as const, actions: 0, level: "owner" },
  { id: "arc", name: "ARC", role: "CEO Agent", icon: BrainCircuit, status: "busy" as const, actions: 124, level: "ceo",
    lastAction: "Deprioritized Sector 2 based on low pipeline", uptime: "99.8%",
    permissions: [
      { action: "delegate_to_agents", level: 0 },
      { action: "approve_level_0_actions", level: 0 },
      { action: "escalate_to_owner", level: 0 },
      { action: "modify_agent_config", level: 2 },
    ],
    recentActions: [
      { time: "13:22", text: "Deprioritized Sector 2 based on low pipeline activity" },
      { time: "12:00", text: "Morning briefing delivered to Eric" },
      { time: "11:45", text: "Cross-referenced helpdesk + finance for Raffoul" },
      { time: "10:30", text: "Delegated overdue follow-up to Finance agent" },
      { time: "09:00", text: "Full business pulse generated" },
    ]
  },
  { id: "helpdesk", name: "Helpdesk", role: "Support", icon: Ticket, status: "critical" as const, actions: 842,
    lastAction: "Triaged ticket #9102 → Hardware Tier 2", uptime: "99.2%",
    permissions: [
      { action: "assign_ticket", level: 0 },
      { action: "escalate_priority", level: 1 },
      { action: "close_ticket", level: 0 },
      { action: "contact_customer", level: 2 },
    ],
    recentActions: [
      { time: "14:22", text: "Triaged ticket #9102 → Hardware Tier 2" },
      { time: "14:10", text: "Auto-replied to ticket #9101 with KB article" },
      { time: "13:55", text: "Escalated #8492 — SLA breach imminent" },
      { time: "13:40", text: "Closed ticket #9095 — resolved" },
      { time: "13:20", text: "Assigned 3 new tickets to Hakeem" },
    ]
  },
  { id: "finance", name: "Finance", role: "Finance", icon: TrendingUp, status: "normal" as const, actions: 156,
    lastAction: "Flagged churn risk for Domino Ltd", uptime: "99.9%",
    permissions: [
      { action: "send_collection_email", level: 3 },
      { action: "flag_churn_risk", level: 0 },
      { action: "generate_invoice", level: 2 },
      { action: "apply_late_fee", level: 3 },
    ],
    recentActions: [
      { time: "14:18", text: "Flagged churn risk for Domino Ltd" },
      { time: "13:30", text: "Generated 14 collection reminder notices" },
      { time: "12:15", text: "AR aging report compiled" },
      { time: "11:00", text: "Payment received: MegaCorp $22,000" },
      { time: "10:45", text: "Invoice INV-1084 sent to Caribbean Connect" },
    ]
  },
  { id: "sales", name: "Sales", role: "Pipeline", icon: TrendingUp, status: "normal" as const, actions: 89,
    lastAction: "Enriched lead via CRM + helpdesk cross-ref", uptime: "99.7%",
    permissions: [
      { action: "enrich_lead", level: 0 },
      { action: "send_proposal", level: 2 },
      { action: "update_deal_stage", level: 0 },
      { action: "contact_prospect", level: 2 },
    ],
    recentActions: [
      { time: "13:58", text: "Enriched lead: cross-referenced CRM + helpdesk" },
      { time: "12:35", text: "Moved Caribbean Connect to Proposal stage" },
      { time: "11:20", text: "Flagged stale deal: Dragon Windows (14d)" },
      { time: "10:00", text: "Daily pipeline summary generated" },
      { time: "09:30", text: "New lead captured: CloudNet Partners" },
    ]
  },
  { id: "fieldservice", name: "Field Svc", role: "Operations", icon: Wrench, status: "yellow" as const, actions: 45,
    lastAction: "Dispatched Marcus to Sector 4 hardware swap", uptime: "98.5%",
    permissions: [
      { action: "assign_task", level: 0 },
      { action: "dispatch_technician", level: 1 },
      { action: "order_parts", level: 3 },
      { action: "close_task", level: 0 },
    ],
    recentActions: [
      { time: "14:00", text: "Dispatched Marcus to Sector 4 hardware swap" },
      { time: "13:15", text: "Scheduled 3 site visits for tomorrow" },
      { time: "12:30", text: "Parts request: 2x Ubiquiti APs for Sector 4" },
      { time: "11:00", text: "Task #705 completed by Desmond" },
      { time: "10:15", text: "Backlog report: 18 tasks, 6 critical" },
    ]
  },
  { id: "network", name: "Network", role: "Infrastructure", icon: Wifi, status: "busy" as const, actions: 2405,
    lastAction: "Auto-recovered Sector 4 backup gateway", uptime: "99.1%",
    permissions: [
      { action: "restart_device", level: 0 },
      { action: "push_firmware", level: 1 },
      { action: "modify_config", level: 2 },
      { action: "decommission_device", level: 3 },
    ],
    recentActions: [
      { time: "14:05", text: "Auto-recovered Sector 4 backup gateway" },
      { time: "12:50", text: "Firmware update pushed to 12 access points" },
      { time: "12:00", text: "Network health: 142/173 devices online" },
      { time: "11:30", text: "Alert: 3 devices in Sector 7 intermittent" },
      { time: "10:00", text: "Daily topology scan completed" },
    ]
  },
  { id: "hr", name: "HR", role: "Admin", icon: Users, status: "normal" as const, actions: 12,
    lastAction: "Rebalanced workload: Marcus → Sarah", uptime: "100%",
    permissions: [
      { action: "rebalance_workload", level: 1 },
      { action: "approve_overtime", level: 3 },
      { action: "update_schedule", level: 0 },
      { action: "flag_capacity_issue", level: 0 },
    ],
    recentActions: [
      { time: "13:45", text: "Rebalanced: 4 tasks from Marcus to Sarah" },
      { time: "12:00", text: "Capacity report: Hakeem at 420% utilization" },
      { time: "11:00", text: "Schedule updated for next week" },
      { time: "10:00", text: "Attendance logged: 13/13 present" },
      { time: "09:00", text: "Daily HR summary generated" },
    ]
  },
];

const statusColor = (s: string) => s === "critical" ? "#f87171" : s === "busy" ? "#fbbf24" : "#34d399";
const levelLabels = ["Auto", "Auto+Log", "CEO Appr", "Owner Appr", "Disabled"];
const levelColors = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#6e6e8a"];

export const AgentsDashboard = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [directive, setDirective] = React.useState("");
  const agent = agents.find((a) => a.id === selected);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Agent Fleet</h1>
        <p className="text-sm text-[#6e6e8a] font-medium mt-1">Your autonomous workforce</p>
      </div>

      {/* Org Chart */}
      <div className="flex flex-col items-center gap-6">
        {/* Owner */}
        <AgentNode agent={agents[0]} isSelected={selected === "eric"} onClick={() => setSelected("eric")} />
        <div className="w-px h-6 bg-white/10" />
        {/* CEO */}
        <AgentNode agent={agents[1]} isSelected={selected === "arc"} onClick={() => setSelected("arc")} />
        <div className="w-px h-6 bg-white/10" />
        {/* Department Heads */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {agents.slice(2).map((a) => (
            <AgentNode key={a.id} agent={a} isSelected={selected === a.id} onClick={() => setSelected(a.id)} small />
          ))}
        </div>
      </div>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {agent && agent.level !== "owner" && (agent as any).permissions && (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#0c0d19]/55 backdrop-blur-[20px] border border-white/[0.06] rounded-2xl overflow-hidden"
          >
            {/* Panel Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-[#818cf8]/10 flex items-center justify-center">
                  <agent.icon className="h-5 w-5 text-[#818cf8]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">{agent.name}</h2>
                  <p className="text-[10px] font-bold text-[#818cf8] uppercase tracking-[0.2em]">{agent.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-widest">Uptime</div>
                  <div className="font-mono text-sm font-bold text-[#34d399]">{(agent as any).uptime}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-widest">Actions</div>
                  <div className="font-mono text-sm font-bold text-white">{agent.actions}</div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-white/5 rounded-lg text-[#6e6e8a] hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              {/* Autonomy Controls */}
              <div className="p-6 space-y-3">
                <h3 className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-[0.2em] mb-4">Autonomy Levels</h3>
                {(agent as any).permissions.map((p: any) => (
                  <div key={p.action} className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-[#c8c8d8] truncate flex-1">{p.action}</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((l) => (
                        <button
                          key={l}
                          onClick={() => toast.success(`${p.action} → ${levelLabels[l]}`)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                            p.level === l ? "text-white scale-105 shadow-lg" : "bg-white/5 text-[#6e6e8a] hover:bg-white/10"
                          }`}
                          style={p.level === l ? { backgroundColor: levelColors[l] } : {}}
                          title={levelLabels[l]}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-3 border-t border-white/5 mt-4">
                  {levelLabels.map((label, i) => (
                    <div key={i} className="text-center flex-1">
                      <div className="text-[10px] font-black" style={{ color: levelColors[i] }}>{i}</div>
                      <div className="text-[7px] font-bold text-[#6e6e8a] uppercase leading-tight">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Actions */}
              <div className="p-6">
                <h3 className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-[0.2em] mb-4">Recent Actions</h3>
                <div className="space-y-2.5">
                  {(agent as any).recentActions.map((a: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-[#6e6e8a] w-10 shrink-0 pt-0.5">{a.time}</span>
                      <span className="text-xs text-[#c8c8d8] leading-relaxed">{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Directive */}
              <div className="p-6">
                <h3 className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-[0.2em] mb-4">Give Directive</h3>
                <textarea
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  placeholder={`Tell ${agent.name} what to focus on...`}
                  className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-[#6e6e8a] focus:border-[#818cf8]/50 outline-none transition-colors resize-none"
                />
                <Button
                  onClick={() => {
                    if (directive.trim()) {
                      toast.success(`Directive sent to ${agent.name}`);
                      setDirective("");
                    }
                  }}
                  className="w-full mt-3 bg-[#818cf8] hover:bg-[#6366f1] h-10 rounded-xl font-bold text-sm gap-2"
                >
                  <Send className="h-3.5 w-3.5" /> Send Directive
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AgentNode = ({ agent, isSelected, onClick, small = false }: { agent: any; isSelected: boolean; onClick: () => void; small?: boolean }) => {
  const dur = agent.status === "critical" ? 0.8 : agent.status === "busy" ? 1.5 : 3;
  return (
    <motion.div whileHover={{ scale: 1.05 }} onClick={onClick} className="cursor-pointer flex flex-col items-center gap-2">
      <div className={`relative ${small ? "w-14 h-14" : "w-16 h-16"}`}>
        <div
          className={`absolute inset-0 rounded-2xl flex items-center justify-center border transition-colors shadow-lg ${
            isSelected ? "bg-[#818cf8] border-[#818cf8] shadow-indigo-600/20" : "bg-white/5 border-white/10"
          }`}
        >
          <agent.icon className={`${small ? "h-6 w-6" : "h-7 w-7"} ${isSelected ? "text-white" : "text-[#6e6e8a]"}`} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: dur, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#05060f]"
          style={{ backgroundColor: statusColor(agent.status) }}
        />
      </div>
      <div className="text-center">
        <p className={`font-bold leading-tight ${isSelected ? "text-white" : "text-[#c8c8d8]"} ${small ? "text-[10px]" : "text-xs"}`}>
          {agent.name}
        </p>
        {!small && <p className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-[0.15em]">{agent.role}</p>}
      </div>
    </motion.div>
  );
};
