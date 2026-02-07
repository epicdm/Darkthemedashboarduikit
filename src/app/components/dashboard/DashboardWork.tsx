import * as React from "react";
import { motion } from "motion/react";
import { Search, Filter, Ticket, CheckSquare, Briefcase, Calendar, ChevronDown, ChevronRight, Clock, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GlassCard, PillTabs, PageHeader, PriorityDot, AgeBadge, KanbanColumn, KanbanCard, StatusBadge } from "./shared";

// --- Mock Data ---
const WORK_ITEMS = [
  { id: 1, type: "ticket", title: "Network outage — Sector 7", assignee: "Marcus J.", age: 1, priority: "high" as const, status: "In Progress" },
  { id: 2, type: "task", title: "Update DNS records for Raffoul", assignee: "Sarah K.", age: 5, priority: "medium" as const, status: "Review" },
  { id: 3, type: "deal", title: "EPIC Expansion — Phase 2", assignee: "Carlos M.", age: 12, priority: "high" as const, status: "Proposal" },
  { id: 4, type: "ticket", title: "Billing discrepancy — Prime Tech", assignee: "Ana R.", age: 2, priority: "medium" as const, status: "New" },
  { id: 5, type: "task", title: "Deploy monitoring on edge nodes", assignee: "Marcus J.", age: 8, priority: "low" as const, status: "To Do" },
  { id: 6, type: "meeting", title: "Q1 Planning Review", assignee: "Eric G.", age: 0, priority: "medium" as const, status: "Scheduled" },
  { id: 7, type: "deal", title: "Caribbean Connect — ISP Bundle", assignee: "Carlos M.", age: 4, priority: "high" as const, status: "Qualified" },
  { id: 8, type: "ticket", title: "SLA breach warning — Global Logistics", assignee: "Ana R.", age: 9, priority: "high" as const, status: "Waiting" },
  { id: 9, type: "task", title: "Finalize onboarding checklist v2", assignee: "Sarah K.", age: 3, priority: "low" as const, status: "In Progress" },
  { id: 10, type: "deal", title: "TechVista — Managed Services", assignee: "Carlos M.", age: 6, priority: "medium" as const, status: "New" },
];

const TICKETS = [
  { id: "T-1042", title: "Network outage — Sector 7", client: "Raffoul", age: 1, priority: "high" as const, stage: "In Progress" },
  { id: "T-1041", title: "Billing discrepancy", client: "Prime Tech", age: 2, priority: "medium" as const, stage: "New" },
  { id: "T-1040", title: "SLA breach warning", client: "Global Logistics", age: 9, priority: "high" as const, stage: "Waiting" },
  { id: "T-1039", title: "Email config issue", client: "TechVista", age: 4, priority: "low" as const, stage: "New" },
  { id: "T-1038", title: "Firewall rule update", client: "Caribbean Connect", age: 6, priority: "medium" as const, stage: "In Progress" },
  { id: "T-1037", title: "VPN tunnel dropping", client: "SunBridge", age: 3, priority: "high" as const, stage: "Waiting" },
  { id: "T-1036", title: "Speed test results low", client: "MegaCorp", age: 11, priority: "medium" as const, stage: "Resolved" },
  { id: "T-1035", title: "Router replacement", client: "Raffoul", age: 5, priority: "low" as const, stage: "Resolved" },
];

const TASKS = [
  { id: "TK-201", title: "Update DNS records", assignee: "Sarah K.", stage: "To Do" },
  { id: "TK-202", title: "Deploy monitoring", assignee: "Marcus J.", stage: "In Progress" },
  { id: "TK-203", title: "Finalize onboarding v2", assignee: "Sarah K.", stage: "In Progress" },
  { id: "TK-204", title: "Audit firewall rules", assignee: "Marcus J.", stage: "Review" },
  { id: "TK-205", title: "Client documentation", assignee: "Ana R.", stage: "To Do" },
  { id: "TK-206", title: "Backup verification", assignee: "Sarah K.", stage: "Done" },
  { id: "TK-207", title: "Patch management", assignee: "Marcus J.", stage: "To Do" },
  { id: "TK-208", title: "SLA report generation", assignee: "Ana R.", stage: "Review" },
  { id: "TK-209", title: "Network diagram update", assignee: "Sarah K.", stage: "Done" },
];

const DEALS = [
  { id: "D-301", name: "EPIC Expansion Phase 2", company: "EPIC Corp", amount: 42000, probability: 75, stage: "Proposal" },
  { id: "D-302", name: "Caribbean Connect ISP", company: "Caribbean Connect", amount: 28000, probability: 60, stage: "Qualified" },
  { id: "D-303", name: "TechVista Managed Services", company: "TechVista", amount: 18500, probability: 30, stage: "New" },
  { id: "D-304", name: "SunBridge Fiber Upgrade", company: "SunBridge", amount: 35000, probability: 85, stage: "Proposal" },
  { id: "D-305", name: "MegaCorp Security Suite", company: "MegaCorp", amount: 52000, probability: 90, stage: "Won" },
  { id: "D-306", name: "Prime Tech Cloud Migration", company: "Prime Tech", amount: 15000, probability: 45, stage: "Qualified" },
  { id: "D-307", name: "Global Logistics Network", company: "Global Logistics", amount: 8000, probability: 10, stage: "Lost" },
  { id: "D-308", name: "Raffoul Premium Tier", company: "Raffoul", amount: 22000, probability: 50, stage: "New" },
];

const MEETINGS = [
  { id: 1, title: "Q1 Planning Review", date: "2026-02-10 09:00", actionItems: 5, completed: 2, items: [
    { task: "Finalize Q1 budget", owner: "Eric G.", deadline: "2026-02-12", status: "Pending", linked: "TK-210" },
    { task: "Review churn metrics", owner: "Carlos M.", deadline: "2026-02-11", status: "Done", linked: "TK-211" },
    { task: "Update sales targets", owner: "Carlos M.", deadline: "2026-02-13", status: "Pending", linked: null },
    { task: "Schedule team 1:1s", owner: "Sarah K.", deadline: "2026-02-12", status: "Done", linked: null },
    { task: "Prepare board deck", owner: "Eric G.", deadline: "2026-02-14", status: "Pending", linked: "TK-212" },
  ]},
  { id: 2, title: "Client Escalation — Global Logistics", date: "2026-02-08 14:00", actionItems: 3, completed: 1, items: [
    { task: "Draft SLA remediation plan", owner: "Ana R.", deadline: "2026-02-09", status: "Done", linked: "T-1040" },
    { task: "Schedule call with VP Ops", owner: "Eric G.", deadline: "2026-02-10", status: "Pending", linked: null },
    { task: "Prepare credit memo", owner: "Sarah K.", deadline: "2026-02-11", status: "Pending", linked: "TK-213" },
  ]},
  { id: 3, title: "Weekly Standup", date: "2026-02-07 10:00", actionItems: 4, completed: 4, items: [
    { task: "Review sprint progress", owner: "Marcus J.", deadline: "2026-02-07", status: "Done", linked: null },
    { task: "Triage new tickets", owner: "Ana R.", deadline: "2026-02-07", status: "Done", linked: null },
    { task: "Update project board", owner: "Sarah K.", deadline: "2026-02-07", status: "Done", linked: null },
    { task: "Check deployment status", owner: "Marcus J.", deadline: "2026-02-07", status: "Done", linked: null },
  ]},
];

const typeIcons: Record<string, any> = { ticket: Ticket, task: CheckSquare, deal: Briefcase, meeting: Calendar };

// --- Sub-views ---
const AllWorkView = () => {
  const [search, setSearch] = React.useState("");
  const [filterType, setFilterType] = React.useState("all");
  const filtered = WORK_ITEMS.filter(
    (w) => (filterType === "all" || w.type === filterType) && w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6e6e8a]" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search work items..." className="pl-10 bg-white/5 border-white/10 rounded-xl h-10 text-sm" />
        </div>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
          {["all", "ticket", "task", "deal", "meeting"].map((t) => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${filterType === t ? "bg-[#818cf8] text-white" : "text-[#6e6e8a] hover:text-white"}`}>{t}</button>
          ))}
        </div>
      </div>
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="divide-y divide-white/5">
          {filtered.map((item, i) => {
            const Icon = typeIcons[item.type] || CheckSquare;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer">
                <Icon className="h-4 w-4 text-[#818cf8] shrink-0" />
                <span className="text-sm font-bold text-white flex-1 truncate">{item.title}</span>
                <span className="text-xs text-[#6e6e8a] font-medium hidden sm:block w-24">{item.assignee}</span>
                <AgeBadge days={item.age} />
                <PriorityDot level={item.priority} />
                <StatusBadge status={item.status} />
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

const TicketsKanban = () => {
  const cols = ["New", "In Progress", "Waiting", "Resolved"];
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {cols.map((col) => {
        const items = TICKETS.filter((t) => t.stage === col);
        return (
          <KanbanColumn key={col} title={col} count={items.length}>
            {items.map((t) => (
              <KanbanCard key={t.id}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white leading-tight">{t.title}</span>
                  <PriorityDot level={t.priority} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#6e6e8a] font-medium">{t.client}</span>
                  <AgeBadge days={t.age} />
                </div>
              </KanbanCard>
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
};

const TasksKanban = () => {
  const cols = ["To Do", "In Progress", "Review", "Done"];
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {cols.map((col) => {
        const items = TASKS.filter((t) => t.stage === col);
        return (
          <KanbanColumn key={col} title={col} count={items.length}>
            {items.map((t) => (
              <KanbanCard key={t.id}>
                <span className="text-xs font-bold text-white block mb-1.5">{t.title}</span>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-[#6e6e8a]" />
                  <span className="text-[10px] text-[#6e6e8a] font-medium">{t.assignee}</span>
                </div>
              </KanbanCard>
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
};

const DealsKanban = () => {
  const cols = ["New", "Qualified", "Proposal", "Won", "Lost"];
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {cols.map((col) => {
        const items = DEALS.filter((d) => d.stage === col);
        const total = items.reduce((s, d) => s + d.amount, 0);
        return (
          <KanbanColumn key={col} title={col} count={items.length}>
            <div className="text-[10px] font-mono font-bold text-[#818cf8] -mt-1 mb-1">${(total / 1000).toFixed(0)}K</div>
            {items.map((d) => (
              <KanbanCard key={d.id}>
                <span className="text-xs font-bold text-white block mb-1">{d.name}</span>
                <span className="text-[10px] text-[#6e6e8a] block mb-2">{d.company}</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">${(d.amount / 1000).toFixed(0)}K</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: d.probability >= 70 ? "#34d399" : d.probability >= 40 ? "#fbbf24" : "#f87171" }}>{d.probability}%</span>
                </div>
              </KanbanCard>
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
};

const MeetingsView = () => {
  const [expanded, setExpanded] = React.useState<number | null>(null);
  return (
    <div className="space-y-3">
      {MEETINGS.map((m) => (
        <GlassCard key={m.id} className="p-0 overflow-hidden" hover={false}>
          <button onClick={() => setExpanded(expanded === m.id ? null : m.id)} className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors">
            {expanded === m.id ? <ChevronDown className="h-4 w-4 text-[#818cf8] shrink-0" /> : <ChevronRight className="h-4 w-4 text-[#6e6e8a] shrink-0" />}
            <Calendar className="h-4 w-4 text-[#818cf8] shrink-0" />
            <span className="text-sm font-bold text-white flex-1">{m.title}</span>
            <span className="text-xs font-mono text-[#6e6e8a] hidden sm:block">{m.date}</span>
            <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg" style={{ color: m.completed === m.actionItems ? "#34d399" : "#fbbf24", backgroundColor: m.completed === m.actionItems ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)" }}>
              {m.completed}/{m.actionItems}
            </span>
          </button>
          {expanded === m.id && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-white/5">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Action Item</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest hidden sm:table-cell">Owner</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest hidden md:table-cell">Deadline</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Status</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest hidden lg:table-cell">Linked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {m.items.map((item, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="px-6 py-3 text-white font-medium">{item.task}</td>
                      <td className="px-4 py-3 text-[#6e6e8a] hidden sm:table-cell">{item.owner}</td>
                      <td className="px-4 py-3 font-mono text-[#6e6e8a] hidden md:table-cell">{item.deadline}</td>
                      <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-4 py-3 font-mono text-[#818cf8] hidden lg:table-cell">{item.linked || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </GlassCard>
      ))}
    </div>
  );
};

// --- Main Component ---
export const DashboardWork = () => {
  const [tab, setTab] = React.useState("All Work");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Work" subtitle="Unified view of all tickets, tasks, deals, and meetings." />
      <PillTabs tabs={["All Work", "Tickets", "Tasks", "Deals", "Meetings"]} active={tab} onChange={setTab} />
      {tab === "All Work" && <AllWorkView />}
      {tab === "Tickets" && <TicketsKanban />}
      {tab === "Tasks" && <TasksKanban />}
      {tab === "Deals" && <DealsKanban />}
      {tab === "Meetings" && <MeetingsView />}
    </motion.div>
  );
};
