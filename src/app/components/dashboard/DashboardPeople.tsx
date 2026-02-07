import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Phone, Mail, Ticket, FileText, CheckSquare, Clock, X, User, Users, Building, Briefcase, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Cell } from "recharts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { GlassCard, PillTabs, PageHeader, HealthDot, StatusBadge } from "./shared";

// --- Mock Data ---
const CUSTOMERS = [
  { id: 1, name: "Caribbean Connect", email: "ops@caribconnect.com", phone: "+1-868-555-0101", balance: 12500, tickets: 2, health: "green" as const },
  { id: 2, name: "Raffoul", email: "admin@raffoul.com", phone: "+1-868-555-0202", balance: -12000, tickets: 1, health: "red" as const },
  { id: 3, name: "Prime Tech", email: "support@primetech.com", phone: "+1-868-555-0303", balance: -4200, tickets: 0, health: "yellow" as const },
  { id: 4, name: "TechVista", email: "hello@techvista.io", phone: "+1-868-555-0404", balance: 15000, tickets: 1, health: "green" as const },
  { id: 5, name: "Global Logistics", email: "it@globallog.com", phone: "+1-868-555-0505", balance: -3200, tickets: 3, health: "red" as const },
  { id: 6, name: "SunBridge", email: "tech@sunbridge.tt", phone: "+1-868-555-0606", balance: 9500, tickets: 1, health: "yellow" as const },
  { id: 7, name: "MegaCorp", email: "admin@megacorp.com", phone: "+1-868-555-0707", balance: 22000, tickets: 0, health: "green" as const },
  { id: 8, name: "EPIC Corp", email: "it@epiccorp.com", phone: "+1-868-555-0808", balance: 35000, tickets: 0, health: "green" as const },
];

const TEAM = [
  { id: 1, name: "Marcus Johnson", initials: "MJ", role: "Network Engineer", active: 8, completed: 12, utilization: 94, color: "#f87171" },
  { id: 2, name: "Sarah Kim", initials: "SK", role: "Systems Admin", active: 5, completed: 9, utilization: 72, color: "#fbbf24" },
  { id: 3, name: "Ana Rodriguez", initials: "AR", role: "Support Lead", active: 6, completed: 14, utilization: 68, color: "#34d399" },
  { id: 4, name: "Carlos Martinez", initials: "CM", role: "Sales Manager", active: 4, completed: 7, utilization: 55, color: "#34d399" },
  { id: 5, name: "Eric Giraud", initials: "EG", role: "CEO / Founder", active: 3, completed: 5, utilization: 45, color: "#34d399" },
];

const ALL_CONTACTS = [
  { id: 1, name: "Caribbean Connect", type: "Customer", email: "ops@caribconnect.com", phone: "+1-868-555-0101" },
  { id: 2, name: "Raffoul", type: "Customer", email: "admin@raffoul.com", phone: "+1-868-555-0202" },
  { id: 3, name: "Marcus Johnson", type: "Employee", email: "marcus@epic.dm", phone: "+1-868-555-1001" },
  { id: 4, name: "Sarah Kim", type: "Employee", email: "sarah@epic.dm", phone: "+1-868-555-1002" },
  { id: 5, name: "NetPro Solutions", type: "Vendor", email: "sales@netpro.com", phone: "+1-305-555-2001" },
  { id: 6, name: "Island Fiber Co", type: "Vendor", email: "support@islandfiber.tt", phone: "+1-868-555-3001" },
  { id: 7, name: "TechVista", type: "Lead", email: "cto@techvista.io", phone: "+1-868-555-0404" },
  { id: 8, name: "CloudNet Partners", type: "Lead", email: "info@cloudnet.com", phone: "+1-212-555-4001" },
  { id: 9, name: "Global Logistics", type: "Customer", email: "it@globallog.com", phone: "+1-868-555-0505" },
  { id: 10, name: "Prime Tech", type: "Customer", email: "support@primetech.com", phone: "+1-868-555-0303" },
];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  Customer: { bg: "rgba(129,140,248,0.15)", color: "#818cf8" },
  Vendor: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  Employee: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  Lead: { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" },
};

// Customer 360 panel mock data
const CUSTOMER_360 = {
  tickets: [
    { id: "T-1042", title: "Network outage — Sector 7", status: "In Progress", date: "2026-02-06" },
    { id: "T-1038", title: "Firewall rule update", status: "In Progress", date: "2026-02-03" },
  ],
  invoices: [
    { id: "INV-1084", amount: 12500, status: "Sent", due: "2026-02-15" },
    { id: "INV-1075", amount: 7600, status: "Paid", due: "2025-12-15" },
  ],
  tasks: [
    { id: "TK-205", title: "Client documentation", status: "To Do" },
  ],
  timeline: [
    { date: "2026-02-06", event: "Ticket T-1042 opened — Network outage", type: "ticket" },
    { date: "2026-02-05", event: "Invoice INV-1084 sent — $12,500", type: "invoice" },
    { date: "2026-02-03", event: "Ticket T-1038 opened — Firewall update", type: "ticket" },
    { date: "2026-01-28", event: "Payment received — $7,600", type: "payment" },
    { date: "2026-01-20", event: "Contract renewed for 12 months", type: "contract" },
  ],
};

// --- Sub-views ---
const CustomersView = () => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<typeof CUSTOMERS[0] | null>(null);
  const [panelTab, setPanelTab] = React.useState("Overview");
  const filtered = CUSTOMERS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6e6e8a]" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="pl-10 bg-white/5 border-white/10 rounded-xl h-10 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-5 cursor-pointer" hover={true}>
              <div onClick={() => { setSelected(c); setPanelTab("Overview"); }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-[#818cf8]/20 border border-[#818cf8]/30">
                      <AvatarFallback className="bg-transparent text-[#818cf8] text-xs font-bold">{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <span className="text-[10px] text-[#6e6e8a]">{c.email}</span>
                    </div>
                  </div>
                  <HealthDot health={c.health} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center">
                    <div className="font-mono text-sm font-bold" style={{ color: c.balance < 0 ? "#f87171" : "#34d399" }}>${Math.abs(c.balance / 1000).toFixed(1)}K</div>
                    <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-sm font-bold text-white">{c.tickets}</div>
                    <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Tickets</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="h-3 w-3 text-[#6e6e8a]" />
                      <Mail className="h-3 w-3 text-[#6e6e8a]" />
                    </div>
                    <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold mt-0.5">Contact</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Customer 360 Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0c0d19] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-[#818cf8]/20 border border-[#818cf8]/30">
                    <AvatarFallback className="bg-transparent text-[#818cf8] font-bold">{selected.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-black text-white">{selected.name}</h2>
                    <span className="text-xs text-[#6e6e8a]">{selected.email} · {selected.phone}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-[#6e6e8a] hover:text-white transition-colors"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 space-y-6">
                <PillTabs tabs={["Overview", "Tickets", "Invoices", "Tasks", "Timeline"]} active={panelTab} onChange={setPanelTab} />
                {panelTab === "Overview" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center"><div className="font-mono text-lg font-bold text-[#818cf8]">{selected.tickets}</div><div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Open Tickets</div></div>
                    <div className="bg-white/5 rounded-xl p-4 text-center"><div className="font-mono text-lg font-bold" style={{ color: selected.balance < 0 ? "#f87171" : "#34d399" }}>${Math.abs(selected.balance).toLocaleString()}</div><div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Balance</div></div>
                    <div className="bg-white/5 rounded-xl p-4 text-center"><div className="font-mono text-lg font-bold text-white">2</div><div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Invoices</div></div>
                    <div className="bg-white/5 rounded-xl p-4 text-center"><div className="font-mono text-lg font-bold text-white">1</div><div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Tasks</div></div>
                  </div>
                )}
                {panelTab === "Tickets" && (
                  <div className="space-y-2">{CUSTOMER_360.tickets.map((t) => (<div key={t.id} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"><Ticket className="h-4 w-4 text-[#818cf8]" /><span className="font-mono text-xs text-[#818cf8]">{t.id}</span><span className="text-xs text-white flex-1">{t.title}</span><StatusBadge status={t.status} /><span className="text-[10px] font-mono text-[#6e6e8a]">{t.date}</span></div>))}</div>
                )}
                {panelTab === "Invoices" && (
                  <div className="space-y-2">{CUSTOMER_360.invoices.map((inv) => (<div key={inv.id} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"><FileText className="h-4 w-4 text-[#818cf8]" /><span className="font-mono text-xs text-[#818cf8]">{inv.id}</span><span className="font-mono text-xs text-white flex-1">${inv.amount.toLocaleString()}</span><StatusBadge status={inv.status} /><span className="text-[10px] font-mono text-[#6e6e8a]">Due: {inv.due}</span></div>))}</div>
                )}
                {panelTab === "Tasks" && (
                  <div className="space-y-2">{CUSTOMER_360.tasks.map((t) => (<div key={t.id} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"><CheckSquare className="h-4 w-4 text-[#818cf8]" /><span className="font-mono text-xs text-[#818cf8]">{t.id}</span><span className="text-xs text-white flex-1">{t.title}</span><StatusBadge status={t.status} /></div>))}</div>
                )}
                {panelTab === "Timeline" && (
                  <div className="space-y-3">{CUSTOMER_360.timeline.map((ev, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3"><div className="flex flex-col items-center"><div className="h-2.5 w-2.5 rounded-full bg-[#818cf8] mt-1.5" />{i < CUSTOMER_360.timeline.length - 1 && <div className="w-px h-8 bg-white/10" />}</div><div><div className="text-xs text-white font-medium">{ev.event}</div><div className="text-[10px] font-mono text-[#6e6e8a]">{ev.date}</div></div></motion.div>))}</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamView = () => {
  const workloadData = TEAM.map((t) => ({ name: t.name.split(" ")[0], load: t.active, color: t.color }));

  return (
    <div className="space-y-6">
      <GlassCard className="p-6" hover={false}>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Team Workload Radar</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} width={70} />
              <ChartTooltip contentStyle={{ backgroundColor: "#0c0d19", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }} itemStyle={{ fontSize: "10px", fontWeight: "bold" }} />
              <Bar dataKey="load" radius={[0, 8, 8, 0]}>
                {workloadData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {TEAM.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard className="p-5" hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-11 w-11 border border-white/10" style={{ backgroundColor: `${m.color}20` }}>
                  <AvatarFallback className="bg-transparent font-bold text-sm" style={{ color: m.color }}>{m.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <span className="text-[10px] text-[#6e6e8a] uppercase tracking-widest font-bold">{m.role}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="font-mono text-lg font-bold text-white">{m.active}</div>
                  <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-bold text-[#34d399]">{m.completed}</div>
                  <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Done</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-bold" style={{ color: m.color }}>{m.utilization}%</div>
                  <div className="text-[9px] text-[#6e6e8a] uppercase tracking-widest font-bold">Util</div>
                </div>
              </div>
              {/* Utilization Gauge */}
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${m.utilization}%` }} transition={{ duration: 1, ease: "easeOut" }} className="absolute h-full rounded-full" style={{ backgroundColor: m.color }} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AllContactsView = () => {
  const [search, setSearch] = React.useState("");
  const filtered = ALL_CONTACTS.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6e6e8a]" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search all contacts..." className="pl-10 bg-white/5 border-white/10 rounded-xl h-10 text-sm" />
      </div>
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="divide-y divide-white/5">
          {filtered.map((c, i) => {
            const tc = TYPE_COLORS[c.type] || TYPE_COLORS.Customer;
            return (
              <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer">
                <Avatar className="h-9 w-9 bg-white/5 border border-white/5">
                  <AvatarFallback className="bg-transparent text-[#6e6e8a] text-[10px] font-bold">{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{c.name}</div>
                  <div className="text-[10px] text-[#6e6e8a] truncate">{c.email}</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest hidden sm:inline" style={{ color: tc.color, backgroundColor: tc.bg }}>{c.type}</span>
                <span className="text-xs font-mono text-[#6e6e8a] hidden md:block">{c.phone}</span>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

// --- Main Component ---
export const DashboardPeople = () => {
  const [tab, setTab] = React.useState("Customers");
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="People" subtitle="Customers, team, and contact directory." />
      <PillTabs tabs={["Customers", "Team", "All Contacts"]} active={tab} onChange={setTab} />
      {tab === "Customers" && <CustomersView />}
      {tab === "Team" && <TeamView />}
      {tab === "All Contacts" && <AllContactsView />}
    </motion.div>
  );
};
