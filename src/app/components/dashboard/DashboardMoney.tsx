import * as React from "react";
import { motion } from "motion/react";
import { DollarSign, TrendingUp, FileText, Send, Eye, AlertTriangle, CheckCircle, Clock, Filter, ArrowUpRight, Edit2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "../ui/button";
import { GlassCard, PillTabs, PageHeader, StatCard, StatusBadge } from "./shared";

// --- Mock Data ---
const AR_AGING = [
  { name: "Current", value: 42000, color: "#34d399" },
  { name: "31-60", value: 18500, color: "#fbbf24" },
  { name: "61-90", value: 8200, color: "#f97316" },
  { name: "90+", value: 4800, color: "#f87171" },
];

const INVOICES = [
  { id: "INV-1084", client: "Caribbean Connect", amount: 12500, due: "2026-02-15", status: "Sent", age: 0 },
  { id: "INV-1083", client: "Raffoul", amount: 8200, due: "2026-01-28", status: "Overdue", age: 10 },
  { id: "INV-1082", client: "Prime Tech", amount: 4200, due: "2026-01-15", status: "Overdue", age: 23 },
  { id: "INV-1081", client: "TechVista", amount: 15000, due: "2026-02-20", status: "Draft", age: 0 },
  { id: "INV-1080", client: "Global Logistics", amount: 6800, due: "2026-02-10", status: "Sent", age: 0 },
  { id: "INV-1079", client: "MegaCorp", amount: 22000, due: "2026-01-05", status: "Paid", age: 0 },
  { id: "INV-1078", client: "SunBridge", amount: 9500, due: "2026-01-20", status: "Paid", age: 0 },
  { id: "INV-1077", client: "EPIC Corp", amount: 35000, due: "2026-01-10", status: "Paid", age: 0 },
  { id: "INV-1076", client: "Raffoul", amount: 3800, due: "2026-01-01", status: "Overdue", age: 37 },
  { id: "INV-1075", client: "Caribbean Connect", amount: 7600, due: "2025-12-15", status: "Paid", age: 0 },
];

const COLLECTIONS = {
  "Gentle Reminder": [
    { client: "Raffoul", amount: 8200, daysOverdue: 10, lastContact: "2026-01-30", nextAction: "Send friendly reminder email referencing INV-1083. Mention their long-standing partnership and offer payment plan." },
    { client: "Global Logistics", amount: 3200, daysOverdue: 8, lastContact: "2026-02-01", nextAction: "Send courtesy email noting INV-1080 is approaching due date. Include quick-pay link." },
  ],
  "Firm Follow-up": [
    { client: "Prime Tech", amount: 4200, daysOverdue: 23, lastContact: "2026-01-25", nextAction: "Send formal notice referencing contract terms. Mention potential late fees. Request payment within 7 days." },
  ],
  "Escalation": [
    { client: "Raffoul", amount: 3800, daysOverdue: 37, lastContact: "2026-01-15", nextAction: "Escalate to management. Draft formal demand letter. Consider pausing non-critical services pending resolution." },
  ],
};

const STAGE_COLORS: Record<string, string> = {
  "Gentle Reminder": "#818cf8",
  "Firm Follow-up": "#fbbf24",
  "Escalation": "#f87171",
};

// --- Sub-views ---
const OverviewView = () => {
  const totalAR = AR_AGING.reduce((s, a) => s + a.value, 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-6 md:col-span-2 lg:col-span-1" hover={false}>
          <div className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-2">Cash Position</div>
          <div className="font-mono text-3xl font-black text-white mb-1">$148,200</div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[#34d399]" />
            <span className="text-xs font-bold text-[#34d399]">+12.4%</span>
            <span className="text-[10px] text-[#6e6e8a]">vs last month</span>
          </div>
        </GlassCard>
        <StatCard label="Invoices Sent" value="14" icon={Send} color="#818cf8" />
        <StatCard label="Payments Received" value="$66,500" icon={CheckCircle} color="#34d399" />
        <StatCard label="Overdue" value="$16,200" icon={AlertTriangle} color="#f87171" />
      </div>

      <GlassCard className="p-6" hover={false}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">AR Aging Distribution</h3>
          <span className="text-xs font-mono font-bold text-[#6e6e8a]">Total: <span className="text-white">${(totalAR / 1000).toFixed(1)}K</span></span>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AR_AGING} layout="vertical" barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} width={60} />
              <ChartTooltip
                contentStyle={{ backgroundColor: "#0c0d19", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
                itemStyle={{ fontSize: "10px", fontWeight: "bold" }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Amount"]}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {AR_AGING.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Days to Pay", value: "18d", color: "#34d399" },
          { label: "Collection Rate", value: "94.2%", color: "#818cf8" },
          { label: "Collections Active", value: "4", color: "#fbbf24" },
          { label: "Overdue Clients", value: "3", color: "#f87171" },
        ].map((s) => (
          <GlassCard key={s.label} className="p-5 text-center" hover={false}>
            <div className="font-mono text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">{s.label}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const InvoicesView = () => {
  const [filter, setFilter] = React.useState("All");
  const statuses = ["All", "Draft", "Sent", "Overdue", "Paid"];
  const filtered = filter === "All" ? INVOICES : INVOICES.filter((inv) => inv.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${filter === s ? "bg-[#818cf8] text-white" : "text-[#6e6e8a] hover:text-white"}`}>{s}</button>
        ))}
      </div>
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["Invoice", "Client", "Amount", "Due Date", "Status", "Age", "Actions"].map((h) => (
                <th key={h} className={`text-left px-6 py-4 text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest ${h === "Actions" ? "hidden lg:table-cell" : ""} ${h === "Age" ? "hidden md:table-cell" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((inv, i) => (
              <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5">
                <td className="px-6 py-4 font-mono font-bold text-[#818cf8]">{inv.id}</td>
                <td className="px-6 py-4 font-medium text-white">{inv.client}</td>
                <td className="px-6 py-4 font-mono font-bold text-white">${inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4 font-mono text-[#6e6e8a]">{inv.due}</td>
                <td className="px-6 py-4"><StatusBadge status={inv.status} /></td>
                <td className="px-6 py-4 font-mono text-[#6e6e8a] hidden md:table-cell">{inv.age > 0 ? `${inv.age}d` : "—"}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold text-[#818cf8] hover:bg-[#818cf8]/10 rounded-lg"><Eye className="h-3 w-3 mr-1" />View</Button>
                    {inv.status === "Overdue" && (
                      <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold text-[#fbbf24] hover:bg-[#fbbf24]/10 rounded-lg"><Send className="h-3 w-3 mr-1" />Remind</Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

const CollectionsView = () => (
  <div className="space-y-8">
    {Object.entries(COLLECTIONS).map(([stage, clients]) => (
      <div key={stage}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage], boxShadow: `0 0 10px ${STAGE_COLORS[stage]}50` }} />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">{stage}</h3>
          <span className="text-[10px] font-bold font-mono text-[#6e6e8a] bg-white/5 px-2 py-0.5 rounded-full">{clients.length}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {clients.map((c) => (
            <GlassCard key={`${stage}-${c.client}`} className="p-5 space-y-4" hover={false}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{c.client}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-lg font-black text-white">${c.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg" style={{ color: "#f87171", backgroundColor: "rgba(248,113,113,0.15)" }}>{c.daysOverdue}d overdue</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#6e6e8a] font-bold uppercase tracking-widest">Last Contact</div>
                  <div className="text-xs font-mono text-[#6e6e8a]">{c.lastContact}</div>
                </div>
              </div>
              <div className="bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-xl p-3">
                <div className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-widest mb-1">🤖 AI-Drafted Action</div>
                <p className="text-xs text-[#c8c8d8] leading-relaxed">{c.nextAction}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-8 px-4 text-[10px] font-bold bg-[#818cf8] hover:bg-[#6366f1] rounded-lg"><Send className="h-3 w-3 mr-1" />Send</Button>
                <Button variant="ghost" size="sm" className="h-8 px-4 text-[10px] font-bold text-[#6e6e8a] hover:text-white rounded-lg"><Edit2 className="h-3 w-3 mr-1" />Edit</Button>
                <Button variant="ghost" size="sm" className="h-8 px-4 text-[10px] font-bold text-[#6e6e8a] hover:text-white rounded-lg">Skip</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// --- Main Component ---
export const DashboardMoney = () => {
  const [tab, setTab] = React.useState("Overview");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Money"
        subtitle="Financial health, invoicing, and collections pipeline."
        action={<Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-11 px-6 rounded-xl gap-2"><FileText className="h-4 w-4" />Export Report</Button>}
      />
      <PillTabs tabs={["Overview", "Invoices", "Collections"]} active={tab} onChange={setTab} />
      {tab === "Overview" && <OverviewView />}
      {tab === "Invoices" && <InvoicesView />}
      {tab === "Collections" && <CollectionsView />}
    </motion.div>
  );
};
