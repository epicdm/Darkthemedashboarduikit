import * as React from "react";
import { motion } from "motion/react";

// --- Design Tokens (mirrored from App.tsx) ---
export const COLORS = {
  bgDark: "#05060f",
  bgMid: "#0a0b18",
  surface: "rgba(12, 13, 25, 0.55)",
  borderGlass: "rgba(255,255,255,0.06)",
  accent: "#818cf8",
  accentHover: "#6366f1",
  purple: "#a78bfa",
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
  textPrimary: "#eeeef4",
  textSecondary: "#c8c8d8",
  textMuted: "#6e6e8a",
};

// --- Shared Components ---

export const GlassCard = ({ children, className = "", hover = true, style = {} }: { children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
    whileHover={hover ? { translateY: -4, borderColor: "rgba(255, 255, 255, 0.2)" } : {}}
    className={`bg-[#0c0d19]/55 backdrop-blur-[20px] border rounded-[20px] p-8 ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
    {children}
  </motion.div>
);

// --- Sub-tab pill switcher ---
export const PillTabs = ({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) => (
  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
          active === t ? "bg-[#818cf8] text-white shadow-lg shadow-indigo-600/20" : "text-[#6e6e8a] hover:text-white hover:bg-white/5"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

// --- Page Header ---
export const PageHeader = ({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) => (
  <div className="flex justify-between items-end mb-8">
    <div>
      <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
      <p className="text-[#6e6e8a] font-medium">{subtitle}</p>
    </div>
    {action}
  </div>
);

// --- Stat Mini Card ---
export const StatCard = ({ label, value, icon: Icon, color = "#818cf8" }: { label: string; value: string; icon: any; color?: string }) => (
  <GlassCard className="p-5 flex items-center gap-4" hover={false}>
    <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
      <Icon className="h-5 w-5" style={{ color }} />
    </div>
    <div>
      <div className="font-mono text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">{label}</div>
    </div>
  </GlassCard>
);

// --- Priority Dot ---
export const PriorityDot = ({ level }: { level: "high" | "medium" | "low" }) => {
  const c = level === "high" ? "#f87171" : level === "medium" ? "#fbbf24" : "#34d399";
  return <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}60` }} />;
};

// --- Age Badge ---
export const AgeBadge = ({ days }: { days: number }) => {
  const color = days <= 3 ? "#34d399" : days <= 7 ? "#fbbf24" : "#f87171";
  const bg = days <= 3 ? "rgba(52,211,153,0.15)" : days <= 7 ? "rgba(251,191,36,0.15)" : "rgba(248,113,113,0.15)";
  return (
    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono" style={{ color, backgroundColor: bg }}>
      {days}d
    </span>
  );
};

// --- Kanban Column ---
export const KanbanColumn = ({ title, count, children }: { title: string; count: number; children: React.ReactNode }) => (
  <GlassCard className="p-4 flex-1 min-w-[220px] flex flex-col gap-3 !rounded-2xl" hover={false}>
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">{title}</span>
      <span className="text-[10px] font-bold font-mono text-[#818cf8] bg-[#818cf8]/10 px-2 py-0.5 rounded-full">{count}</span>
    </div>
    <div className="space-y-2 flex-1">{children}</div>
  </GlassCard>
);

// --- Kanban Card ---
export const KanbanCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/5 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

// --- Status Badge ---
export const StatusBadge = ({ status, className = "" }: { status: string; className?: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    draft: { bg: "rgba(110,110,138,0.2)", color: "#6e6e8a" },
    sent: { bg: "rgba(129,140,248,0.15)", color: "#818cf8" },
    overdue: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
    paid: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    open: { bg: "rgba(129,140,248,0.15)", color: "#818cf8" },
    closed: { bg: "rgba(110,110,138,0.2)", color: "#6e6e8a" },
    won: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    lost: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
    active: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    paused: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
    pending: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
    approved: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    rejected: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  };
  const s = map[status.toLowerCase()] || map.open;
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${className}`} style={{ color: s.color, backgroundColor: s.bg }}>
      {status}
    </span>
  );
};

// --- Health Dot ---
export const HealthDot = ({ health }: { health: "green" | "yellow" | "red" }) => {
  const c = health === "green" ? "#34d399" : health === "yellow" ? "#fbbf24" : "#f87171";
  return <div className="h-3 w-3 rounded-full" style={{ backgroundColor: c, boxShadow: `0 0 10px ${c}50` }} />;
};
