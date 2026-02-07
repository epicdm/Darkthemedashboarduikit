import * as React from "react";
import { 
  LayoutDashboard, 
  Bot, 
  CheckSquare, 
  DollarSign, 
  Users, 
  BrainCircuit, 
  Bell, 
  Settings, 
  Search,
  Plus,
  ArrowRight,
  ChevronRight,
  Zap,
  Ticket,
  TrendingUp,
  Cpu,
  Monitor,
  Clock,
  History,
  Activity,
  ShieldAlert,
  Menu,
  X,
  User,
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Play,
  ArrowUpRight,
  MessageSquare,
  Globe,
  Briefcase,
  Lightbulb,
  Lock,
  Eye,
  CreditCard,
  Twitter,
  Linkedin,
  Youtube,
  BarChart3,
  BookOpen,
  Network,
  Settings2,
  Share2,
  Trash2,
  ExternalLink,
  Edit2,
  Key,
  Github,
  Check,
  Mail,
  Phone
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// --- Design System Tokens ---
const COLORS = {
  bgDark: "#05060f",
  bgMid: "#0a0b18",
  bgLight: "#f8f9fc",
  surface: "rgba(12, 13, 25, 0.55)",
  borderGlass: "rgba(255,255,255,0.06)",
  accent: "#818cf8",
  accentHover: "#6366f1",
  purple: "#a78bfa",
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
  textDarkPrimary: "#eeeef4",
  textDarkSecondary: "#c8c8d8",
  textDarkMuted: "#6e6e8a",
};

// --- Types ---
type NavTab = 'Home' | 'Features' | 'How It Works' | 'Pricing' | 'Use Cases' | 'About' | 'Contact';

// --- Shared Components ---

const AmbientOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <motion.div 
      animate={{ 
        x: [0, 50, -50, 0], 
        y: [0, -30, 30, 0],
        scale: [1, 1.1, 0.9, 1] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/25 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ 
        x: [0, -40, 40, 0], 
        y: [0, 50, -50, 0],
        scale: [1, 0.9, 1.1, 1] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ 
        x: [0, 30, -30, 0], 
        y: [0, 40, -40, 0] 
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-sky-500/15 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ 
        x: [0, -20, 20, 0], 
        y: [0, -20, 20, 0] 
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-5%] right-[20%] w-[350px] h-[350px] bg-pink-500/10 blur-[120px] rounded-full" 
    />
  </div>
);

const GlassCard = ({ children, className = "", hover = true, style = {} }: { children: React.ReactNode, className?: string, hover?: boolean, style?: any }) => (
  <motion.div 
    initial={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
    whileHover={hover ? { translateY: -4, borderColor: "rgba(255, 255, 255, 0.2)" } : {}}
    className={`bg-[#0c0d19]/55 backdrop-blur-[20px] border rounded-[20px] p-8 ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ eyebrow, headline, subtitle, centered = true }: { eyebrow: string, headline: string, subtitle: string, centered?: boolean }) => (
  <div className={`space-y-4 mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px]">{eyebrow}</span>
    <h2 className="text-3xl md:text-5xl font-extrabold text-[#eeeef4] leading-tight max-w-4xl mx-auto">{headline}</h2>
    <p className="text-[#c8c8d8] text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

// --- Navigation ---

// --- Navigation ---

const MarketingTopNav = ({ activeTab, setActiveTab, onLogin }: { activeTab: NavTab, setActiveTab: (tab: NavTab) => void, onLogin: () => void }) => {
  const links: NavTab[] = ['Home', 'Features', 'How It Works', 'Pricing', 'Use Cases', 'About'];
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-8 md:px-16 bg-black/20 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Home')}>
        <div className="h-10 w-10 rounded-xl bg-[#818cf8] flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Cpu className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-black text-white tracking-tighter">AIOM</span>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => setActiveTab(link)}
            className={`text-sm font-bold tracking-tight transition-colors ${
              activeTab === link ? 'text-[#818cf8]' : 'text-[#c8c8d8] hover:text-white'
            }`}
          >
            {link}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onLogin} className="text-[#c8c8d8] hover:text-white font-bold">
          Login
        </Button>
        <Button onClick={() => setActiveTab('Contact')} className="bg-[#818cf8] hover:bg-[#6366f1] rounded-xl font-bold px-6">
          Start Free <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

const SideNav = ({ activeTab, setActiveTab, onStartFree, onLogout, isLoggedIn }: { activeTab: string, setActiveTab: (tab: any) => void, onStartFree: () => void, onLogout: () => void, isLoggedIn: boolean }) => {
  const tabs: { name: string, label: string, icon: any }[] = [
    { name: 'Home', label: isLoggedIn ? 'Overview' : 'Home', icon: isLoggedIn ? LayoutDashboard : Globe },
    { name: 'Features', label: isLoggedIn ? 'AI Agents' : 'Features', icon: isLoggedIn ? Bot : Layers },
    { name: 'ARCChat', label: 'ARC Chat', icon: MessageSquare },
    { name: 'Analytics', label: 'Analytics', icon: BarChart3 },
    { name: 'Playbooks', label: 'Playbooks', icon: BookOpen },
    { name: 'How It Works', label: isLoggedIn ? 'ERP Sync' : 'How It Works', icon: isLoggedIn ? RefreshCw : Zap },
    { name: 'Network', label: 'Network', icon: Network },
    { name: 'Onboard', label: 'Onboard', icon: Zap },
    { name: 'Pricing', label: isLoggedIn ? 'Billing' : 'Pricing', icon: CreditCard },
    { name: 'About', label: isLoggedIn ? 'Directory' : 'About', icon: Users },
    { name: 'Settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#05060f] h-screen sticky top-0 shrink-0 z-50">
      <div className="p-8 pb-12 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#818cf8] flex items-center justify-center shadow-[0_0_20px_rgba(129,140,248,0.4)]">
          <Cpu className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter text-white leading-none">AIOM</span>
          <span className="text-[10px] font-bold text-[#818cf8] tracking-[0.2em] uppercase mt-1">V2.0.4</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm transition-all relative group ${
              activeTab === tab.name 
                ? 'text-white bg-[#818cf8]/10' 
                : 'text-[#6e6e8a] hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className={`h-4.5 w-4.5 ${activeTab === tab.name ? 'text-[#818cf8]' : 'text-[#6e6e8a] group-hover:text-white transition-colors'}`} />
            <span className="font-bold tracking-tight">{tab.label}</span>
            {activeTab === tab.name && (
              <motion.div 
                layoutId="navIndicator" 
                className="absolute left-0 top-3 bottom-3 w-1 bg-[#818cf8] rounded-r-full shadow-[0_0_15px_rgba(129,140,248,0.6)]" 
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-3">
        {!isLoggedIn ? (
          <Button onClick={onStartFree} className="w-full bg-[#818cf8] hover:bg-[#6366f1] h-11 rounded-xl font-bold shadow-lg shadow-indigo-600/20">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onStartFree} className="w-full bg-white/5 hover:bg-white/10 text-white h-11 rounded-xl font-bold border border-white/10">
            Upgrade Plan <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" onClick={onLogout} className="w-full text-[#6e6e8a] hover:text-white gap-2 justify-start px-5 h-11">
          {isLoggedIn ? <History className="h-4 w-4" /> : <User className="h-4 w-4" />} {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>
    </aside>
  );
};

// --- Page 9: Login Page ---

const LoginPage = ({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) => (
  <ContentWrapper>
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-[420px] p-10 space-y-8" hover={false}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 rounded-xl bg-[#818cf8] flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Cpu className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome back.</h2>
          <p className="text-sm text-[#6e6e8a]">Enter your credentials to access the command center.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</label>
            <Input className="bg-white/5 border-white/10 rounded-xl h-12" placeholder="name@company.ai" type="email" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</label>
            <Input className="bg-white/5 border-white/10 rounded-xl h-12" type="password" required />
          </div>
          <Button type="submit" className="w-full h-14 bg-[#818cf8] hover:bg-[#6366f1] text-lg font-bold rounded-xl shadow-lg shadow-indigo-600/20">
            Log In <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <div className="flex flex-col items-center gap-4 pt-4 text-sm font-medium">
          <button className="text-[#818cf8] hover:underline">Forgot password?</button>
          <div className="text-[#6e6e8a]">
            Don't have an account? <button onClick={onBack} className="text-[#818cf8] hover:underline">Sign up →</button>
          </div>
        </div>
      </GlassCard>
    </div>
  </ContentWrapper>
);

// --- Dashboard Components ---

// --- Dashboard Components ---

const DashboardHome = () => {
  const [insightIndex, setInsightIndex] = React.useState(0);
  const insights = [
    "Here's what matters right now: Revenue is up 12% MoM, but Helpdesk urgent tickets are climbing.",
    "Pattern detected: Network outages in sector 4 are correlating with increased support tickets.",
    "Risk alert: AR overdue dollars have crossed the $25K threshold. Collection actions recommended.",
    "Trend warning: Field service backlog has increased for the 3rd consecutive week.",
    "Win celebration: Sales Manager successfully closed the 'EPIC Expansion' deal worth $42K.",
    "Cross-department connection: HR workload imbalance detected; technician capacity is at 94%."
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const [selectedTile, setSelectedTile] = React.useState<any>(null);

  const heatmapData = React.useMemo(() => Array.from({ length: 25 }).map((_, i) => {
    const departments = ['Sales', 'Support', 'Ops', 'HR', 'Finance'];
    const regions = ['North', 'South', 'East', 'West', 'Global'];
    const intensity = Math.random();
    return {
      id: i,
      department: departments[i % 5],
      region: regions[Math.floor(i / 5)],
      intensity,
      urgency: Math.round(intensity * 100),
      metrics: {
        tickets: Math.floor(Math.random() * 50),
        responseTime: (Math.random() * 5 + 1).toFixed(1) + 'h',
        activeAgents: Math.floor(Math.random() * 10 + 2),
        historicalUrgency: Array.from({ length: 12 }).map((_, j) => ({ time: j + ':00', value: Math.random() * 100 }))
      }
    };
  }), []);

  const [approvals, setApprovals] = React.useState([
    { id: 1, agent: "Finance", action: "Send collection notice", detail: "Client: Global Logistics ($4,200 overdue)", type: "Collection" },
    { id: 2, agent: "Finance", action: "Apply late fee", detail: "Client: Prime Tech ($150 fee)", type: "Billing" },
    { id: 3, agent: "Helpdesk", action: "Escalate ticket #8492", detail: "SLA breach imminent - Priority 1", type: "Support" },
    { id: 4, agent: "HR", action: "Approve overtime", detail: "Technician: Marcus J. (4 hours)", type: "Capacity" }
  ]);

  const [chatMessages, setChatMessages] = React.useState<{ role: 'user' | 'arc', text: string }[]>([
    { role: 'arc', text: "Systems normal. I am monitoring the runtime. How can I help?" }
  ]);
  const [chatInput, setChatInput] = React.useState("");

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'arc', text: `Analyzing "${msg}"... Recommendation: Check AR aging for Prime Tech; they have 3 invoices past 45 days.` }]);
    }, 1000);
  };

  const handleApprove = (id: number) => {
    setApprovals(approvals.filter(a => a.id !== id));
    toast.success("Action approved and deployed.");
  };

  const [whatIfInput, setWhatIfInput] = React.useState("");
  const [whatIfResult, setWhatIfResult] = React.useState<string | null>(null);

  const simulateWhatIf = () => {
    if (!whatIfInput) return;
    setWhatIfResult("Analyzing impact...");
    setTimeout(() => {
      if (whatIfInput.toLowerCase().includes("raffoul")) {
        setWhatIfResult("CRITICAL IMPACT: Loss of 'Raffoul' would result in an estimated $12K MRR churn and a 40% knowledge gap in Sector 7 operations.");
      } else if (whatIfInput.toLowerCase().includes("device")) {
        setWhatIfResult("SERVICE IMPACT: 20 devices failing would affect 14 core clients and trigger approximately 45 high-priority support tickets.");
      } else {
        setWhatIfResult("ANALYSIS COMPLETE: Projected capacity relief of 15% with a monthly cost increase of $3,500. ROI positive within 4 months.");
      }
    }, 1500);
  };

  const kpis = [
    { label: "Revenue", value: "$124,500", subtext: "MRR (Sub)", status: "green", icon: DollarSign, trend: "up" },
    { label: "Helpdesk", value: "74", subtext: "12 Urgent", status: "red", icon: Ticket }, // Red if total > 70 or urgent > 0
    { label: "Network", value: "82%", subtext: "142/173 Online", status: "red", icon: Activity }, // Red if < 85%
    { label: "Overdue", value: "$28,400", subtext: "Collection Needed", status: "red", icon: ShieldAlert },
    { label: "Pipeline", value: "$64,200", subtext: "Active CRM Deals", status: "green", icon: TrendingUp }, // Red if < $5k
    { label: "Field Service", value: "18", subtext: "High Backlog", status: "yellow", icon: Briefcase }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Vital Signs Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((stat, i) => (
          <GlassCard key={i} className="p-4 border-l-2" style={{ borderLeftColor: stat.status === 'green' ? '#10b981' : stat.status === 'red' ? '#ef4444' : '#f59e0b' }}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-[0.1em]">{stat.label}</p>
              <stat.icon className={`h-3 w-3 ${stat.status === 'green' ? 'text-emerald-500' : stat.status === 'red' ? 'text-rose-500' : 'text-amber-500'}`} />
            </div>
            <p className="text-xl font-mono font-black text-white">{stat.value}</p>
            <p className={`text-[10px] font-bold mt-1 ${stat.status === 'green' ? 'text-emerald-500' : stat.status === 'red' ? 'text-rose-500' : 'text-amber-500'}`}>{stat.subtext}</p>
          </GlassCard>
        ))}
      </div>

      {/* The Mind (AI Insight Bar) */}
      <div className="relative">
        <GlassCard className="py-4 px-6 bg-[#818cf8]/5 border-[#818cf8]/20" hover={false}>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1 bg-[#818cf8] rounded-full">
              <BrainCircuit className="h-3 w-3 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">The Mind</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={insightIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-medium text-[#eeeef4] flex-1 italic"
              >
                "{insights[insightIndex]}"
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-1">
              {insights.map((_, i) => (
                <div key={i} className={`h-1 w-4 rounded-full transition-colors ${i === insightIndex ? 'bg-[#818cf8]' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 units) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Decision Stream */}
          <GlassCard className="p-0 overflow-hidden" hover={false}>
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <History className="h-4 w-4 text-[#818cf8]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Decision Stream</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-emerald-500">LIVE</span>
                </div>
                <Badge variant="outline" className="text-[10px] border-white/10 text-[#6e6e8a]">AUDIT TRAIL</Badge>
              </div>
            </div>
            <div className="max-h-[350px] overflow-y-auto no-scrollbar font-mono">
              {[
                { agent: "Helpdesk", action: "TICKET TRIAGE", detail: "Ticket #9102 assigned to Hardware Tier 2", time: "14:22:01", severity: "info" },
                { agent: "Finance", action: "RISK DETECTION", detail: "Flagged high churn risk for client 'Domino Ltd'", time: "14:18:45", severity: "warning" },
                { agent: "Network", action: "AUTO-RECOVERY", detail: "Restarted Sector 4 backup gateway", time: "14:05:12", severity: "success" },
                { agent: "Sales", action: "LEAD ENRICHMENT", detail: "Cross-referenced CRM with helpdesk sentiment", time: "13:58:30", severity: "info" },
                { agent: "HR", action: "WORKLOAD REBALANCING", detail: "Shifted 4 tasks from Marcus to Sarah", time: "13:45:10", severity: "success" },
                { agent: "Finance", action: "COLLECTION", detail: "Generated 14 automated reminder notices", time: "13:30:05", severity: "info" },
                { agent: "ARC", action: "STRATEGY ADAPT", detail: "Reduced Sector 2 priority based on low pipeline", time: "13:22:42", severity: "warning" }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4 p-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <span className="text-[10px] text-[#6e6e8a] pt-1 w-16 shrink-0">{log.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[9px] font-black uppercase tracking-wider ${
                        log.severity === 'warning' ? 'text-amber-500' : log.severity === 'success' ? 'text-emerald-500' : 'text-[#818cf8]'
                      }`}>{log.agent}</span>
                      <span className="text-[8px] font-bold text-[#eeeef4] px-1 bg-white/5 rounded uppercase whitespace-nowrap">{log.action}</span>
                    </div>
                    <p className="text-[11px] text-[#c8c8d8] truncate">{log.detail}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 text-white/10 group-hover:text-white/40 self-center" />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Attention Heatmap & What-If Engine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-6 relative" hover={false}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Attention Heatmap</h3>
                <span className="text-[10px] text-emerald-500 font-bold">UPDATED 2M AGO</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {heatmapData.map((tile) => {
                  const color = tile.intensity > 0.8 ? 'bg-rose-500/80' : tile.intensity > 0.5 ? 'bg-amber-500/60' : tile.intensity > 0.3 ? 'bg-indigo-500/40' : 'bg-white/5';
                  return (
                    <motion.div 
                      key={tile.id} 
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onClick={() => setSelectedTile(tile)}
                      className={`aspect-square rounded ${color} cursor-pointer border border-white/5 transition-all hover:border-[#818cf8] hover:shadow-[0_0_15px_rgba(129,140,248,0.3)]`} 
                      title={`Department: ${tile.department} | Urgency: ${tile.urgency}%`}
                    />
                  );
                })}
              </div>
              <div className="mt-6 flex justify-between text-[10px] font-bold text-[#6e6e8a] uppercase tracking-wider">
                <span>Low Impact</span>
                <div className="flex gap-1 items-center">
                   <div className="w-2 h-2 rounded bg-white/5" />
                   <div className="w-2 h-2 rounded bg-indigo-500/40" />
                   <div className="w-2 h-2 rounded bg-amber-500/60" />
                   <div className="w-2 h-2 rounded bg-rose-500/80" />
                </div>
                <span>Critical</span>
              </div>

              {/* Heatmap Drill Down Modal */}
              <AnimatePresence>
                {selectedTile && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-4 z-50 bg-[#0a0b18] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col backdrop-blur-md overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          selectedTile.intensity > 0.8 ? 'bg-rose-500/20 text-rose-500' : 'bg-[#818cf8]/20 text-[#818cf8]'
                        }`}>
                          <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">{selectedTile.region} {selectedTile.department}</h4>
                          <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Cell Detail Audit</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedTile(null)}
                        className="p-1 hover:bg-white/5 rounded-full text-[#6e6e8a] hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-bold text-[#6e6e8a] uppercase mb-1">Impact Level</p>
                        <p className={`text-lg font-mono font-black ${
                          selectedTile.intensity > 0.8 ? 'text-rose-500' : selectedTile.intensity > 0.5 ? 'text-amber-500' : 'text-[#818cf8]'
                        }`}>{selectedTile.urgency}%</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-bold text-[#6e6e8a] uppercase mb-1">Active Tickets</p>
                        <p className="text-lg font-mono font-black text-white">{selectedTile.metrics.tickets}</p>
                      </div>
                    </div>

                    <div className="flex-1 min-h-0 mb-6">
                      <p className="text-[9px] font-bold text-[#6e6e8a] uppercase mb-3 tracking-widest">Urgency Trend (12h)</p>
                      <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedTile.metrics.historicalUrgency}>
                            <defs>
                              <linearGradient id="colorUrgency" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={selectedTile.intensity > 0.8 ? '#f43f5e' : '#818cf8'} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={selectedTile.intensity > 0.8 ? '#f43f5e' : '#818cf8'} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke={selectedTile.intensity > 0.8 ? '#f43f5e' : '#818cf8'} fillOpacity={1} fill="url(#colorUrgency)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Button 
                        size="sm" 
                        className="bg-[#818cf8] hover:bg-[#6366f1] text-[10px] font-bold h-9 rounded-xl"
                        onClick={() => {
                          toast.success(`Agent fleet dispatched to ${selectedTile.region} ${selectedTile.department}`);
                          setSelectedTile(null);
                        }}
                      >
                        Deploy Solution
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[10px] font-bold text-[#6e6e8a] hover:text-white h-9 rounded-xl border border-white/5"
                        onClick={() => {
                          toast.info("Full audit report generated.");
                        }}
                      >
                        View Full Logs
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>

            <GlassCard className="p-6 flex flex-col" hover={false}>
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">What-If Engine</h3>
              </div>
              <div className="flex-1 space-y-4">
                <div className="relative">
                  <Input 
                    value={whatIfInput}
                    onChange={(e) => setWhatIfInput(e.target.value)}
                    placeholder="What if we lose Raffoul?" 
                    className="bg-white/5 border-white/10 pr-10 rounded-xl h-11 text-xs"
                    onKeyDown={(e) => e.key === 'Enter' && simulateWhatIf()}
                  />
                  <button onClick={simulateWhatIf} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#818cf8] hover:text-white transition-colors">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 min-h-[100px] flex items-center justify-center">
                  {whatIfResult ? (
                    <p className="text-xs text-[#c8c8d8] leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                      {whatIfResult}
                    </p>
                  ) : (
                    <p className="text-[10px] text-[#6e6e8a] uppercase tracking-widest font-bold text-center">
                      Analysis Ready. Enter Scenario.
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Column (4 units) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Needs Your Call (Approval Queue) */}
          <GlassCard className="p-0 overflow-hidden" hover={false}>
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-4 w-4 text-[#818cf8]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Needs Your Call</h3>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => { setApprovals([]); toast.success("Batch approved."); }} className="text-[10px] font-black text-[#818cf8] hover:text-white uppercase tracking-widest h-7 px-3">Approve All</Button>
                <Badge className="bg-[#818cf8] text-white font-bold text-[10px]">{approvals.length}</Badge>
              </div>
            </div>
            <div className="p-2 space-y-4 max-h-[450px] overflow-y-auto no-scrollbar">
              <AnimatePresence>
                {/* Group by Agent */}
                {Object.entries(
                  approvals.reduce((acc, item) => {
                    if (!acc[item.agent]) acc[item.agent] = [];
                    acc[item.agent].push(item);
                    return acc;
                  }, {} as Record<string, typeof approvals>)
                ).map(([agent, items]) => (
                  <div key={agent} className="space-y-2">
                    <div className="flex justify-between items-center px-2 py-1">
                      <span className="text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">{agent} Queue</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setApprovals(approvals.filter(a => a.agent !== agent)); toast.success(`Approved all for ${agent}`); }} className="text-[8px] font-black text-[#818cf8] uppercase hover:text-white">Approve All</button>
                        <button onClick={() => { setApprovals(approvals.filter(a => a.agent !== agent)); toast.error(`Rejected all for ${agent}`); }} className="text-[8px] font-black text-rose-500 uppercase hover:text-white">Reject All</button>
                      </div>
                    </div>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-[#818cf8] uppercase tracking-widest">{item.type}</span>
                          <span className="text-[9px] font-mono text-[#6e6e8a]">PENDING</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{item.action}</h4>
                        <p className="text-xs text-[#6e6e8a] mb-4">{item.detail}</p>
                        <div className="flex gap-2">
                          <Button onClick={() => handleApprove(item.id)} className="flex-1 bg-[#818cf8] hover:bg-[#6366f1] h-8 text-[10px] font-bold rounded-lg">Approve</Button>
                          <Button variant="ghost" onClick={() => handleApprove(item.id)} className="flex-1 h-8 text-[10px] font-bold text-[#6e6e8a] hover:text-white rounded-lg">Reject</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </AnimatePresence>
              {approvals.length === 0 && (
                <div className="p-12 text-center text-[#6e6e8a]">
                  <ShieldCheck className="h-8 w-8 mx-auto mb-4 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest">Queue Clear</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* ARC Chat Bar */}
          <GlassCard className="p-0 overflow-hidden bg-indigo-600/10 border-indigo-600/20 flex flex-col h-[400px]" hover={false}>
            <div className="p-4 border-b border-indigo-600/10 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#818cf8] flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest leading-none">ARC Runtime</h4>
                <p className="text-[10px] text-[#818cf8] font-bold">CONVERSATIONAL INTERFACE</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
               {chatMessages.map((msg, i) => (
                 <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-[#818cf8] text-white' : 'bg-white/5 text-[#c8c8d8] border border-white/5'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               ))}
            </div>

            <form onSubmit={handleChat} className="p-4 bg-black/40 border-t border-indigo-600/10 relative">
              <Input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask ARC anything..." 
                className="bg-black/40 border-white/10 pl-10 h-12 rounded-xl text-sm focus:border-[#818cf8]/50"
              />
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6e6e8a]" />
              <button type="submit" className="absolute right-7 top-1/2 -translate-y-1/2 text-[#818cf8] hover:text-white transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const DashboardAgents = () => {
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>("arc");
  const [activeSubTab, setActiveSubTab] = React.useState<"performance" | "permissions" | "comms" | "directive">("performance");
  const [commandInput, setCommandInput] = React.useState("");
  const [consoleOutput, setConsoleOutput] = React.useState<string[]>(["[SYSTEM] Agent connection established.", "[SYSTEM] Runtime: v2.0.4"]);
  const [directiveInput, setDirectiveInput] = React.useState("");

  const [chatMessages, setChatMessages] = React.useState<{ role: 'user' | 'arc', text: string }[]>([
    { role: 'arc', text: "Hello. I am ARC. I am monitoring your business runtime. How can I assist with your operations today?" }
  ]);
  const [chatInput, setChatInput] = React.useState("");

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    
    // Simulate ARC response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'arc', text: `Analyzing "${userMsg}"... Recommendation: Scale Sector 4 support capacity by 15% based on current triage velocity.` }]);
    }, 1000);
  };

  const agents = [
    { id: "eric", name: "Eric", role: "Owner", level: "owner", status: "normal", auto: 0, manual: 0, icon: User },
    { id: "arc", name: "ARC", role: "CEO", level: "ceo", status: "busy", auto: 124, manual: 12, icon: BrainCircuit, parent: "eric" },
    { id: "helpdesk", name: "Helpdesk Manager", role: "Support Head", level: "dept", status: "critical", auto: 842, manual: 42, icon: Ticket, parent: "arc" },
    { id: "finance", name: "Finance Scout", role: "Finance Head", level: "dept", status: "normal", auto: 156, manual: 8, icon: DollarSign, parent: "arc" },
    { id: "pipeline", name: "Pipeline Guardian", role: "Sales Head", level: "dept", status: "busy", auto: 89, manual: 3, icon: TrendingUp, parent: "arc" },
    { id: "dispatch", name: "Field Dispatcher", role: "Ops Head", level: "dept", status: "normal", auto: 45, manual: 0, icon: Users, parent: "arc" },
    { id: "sentry", name: "Network Sentry", role: "IT Head", level: "dept", status: "critical", auto: 2405, manual: 1, icon: Cpu, parent: "arc" },
    { id: "hr", name: "HR Manager", role: "Admin Head", level: "dept", status: "normal", auto: 12, manual: 2, icon: Briefcase, parent: "arc" },
  ];

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[1];

  const getBreathingDuration = (status: string) => {
    if (status === "critical") return 0.65;
    if (status === "busy") return 1.5;
    return 3;
  };

  const runCommand = () => {
    if (!commandInput) return;
    setConsoleOutput(prev => [...prev, `> ${commandInput}`, `[${selectedAgent.name}] Executing...`, `[${selectedAgent.name}] Done. Output: Success.`]);
    setCommandInput("");
  };

  const saveDirective = () => {
    if (!directiveInput) return;
    toast.success(`Directive saved to agents/${selectedAgent.id}/directives.md`);
    setDirectiveInput("");
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Agent Fleet</h1>
          <p className="text-[#6e6e8a] font-medium">Configure and direct your autonomous workforce.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Org Chart (Left) */}
        <div className="lg:col-span-5 space-y-8">
          <GlassCard className="p-8 relative overflow-hidden h-full" hover={false}>
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Users className="h-32 w-32" />
             </div>
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-12">Organization Hierarchy</h3>
             
             <div className="flex flex-col items-center gap-12 relative">
                {/* Connecting Lines (Simulated with CSS) */}
                <div className="absolute top-16 bottom-16 w-px bg-white/5 left-1/2 -translate-x-1/2 -z-10" />
                
                {/* Owner */}
                <AgentNode 
                  agent={agents[0]} 
                  isSelected={selectedAgentId === agents[0].id} 
                  onClick={() => setSelectedAgentId(agents[0].id)} 
                  duration={getBreathingDuration(agents[0].status)}
                />
                
                {/* CEO */}
                <AgentNode 
                  agent={agents[1]} 
                  isSelected={selectedAgentId === agents[1].id} 
                  onClick={() => setSelectedAgentId(agents[1].id)} 
                  duration={getBreathingDuration(agents[1].status)}
                />

                {/* Dept Heads Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full pt-4">
                  {agents.slice(2).map(agent => (
                    <AgentNode 
                      key={agent.id}
                      agent={agent} 
                      isSelected={selectedAgentId === agent.id} 
                      onClick={() => setSelectedAgentId(agent.id)} 
                      duration={getBreathingDuration(agent.status)}
                      small
                    />
                  ))}
                </div>
             </div>
          </GlassCard>
        </div>

        {/* Management Controls (Right) */}
        <div className="lg:col-span-7 space-y-8">
          <GlassCard className="p-0 overflow-hidden min-h-[700px] flex flex-col" hover={false}>
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#818cf8]/10 flex items-center justify-center">
                  <selectedAgent.icon className="h-6 w-6 text-[#818cf8]" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{selectedAgent.name}</h2>
                  <p className="text-xs font-bold text-[#818cf8] uppercase tracking-widest">{selectedAgent.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">AUTO: {selectedAgent.auto}</Badge>
                <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[10px] font-bold">APPROVAL: {selectedAgent.manual}</Badge>
              </div>
            </div>

            {/* Sub-Tabs Navigation */}
            <div className="flex border-b border-white/5 px-4 bg-white/[0.01]">
              {[
                { id: 'performance', label: 'Performance' },
                { id: 'permissions', label: 'Permissions' },
                { id: 'comms', label: 'Comms' },
                { id: 'directive', label: 'Directive' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                    activeSubTab === tab.id ? 'text-[#818cf8]' : 'text-[#6e6e8a] hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeSubTab === tab.id && (
                    <motion.div layoutId="agentTab" className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#818cf8]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeSubTab === 'performance' && (
                  <motion.div key="perf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-[#030408] rounded-xl border border-white/5 p-4 font-mono text-xs h-[300px] overflow-y-auto no-scrollbar space-y-1">
                      {consoleOutput.map((line, i) => (
                        <p key={i} className={line.startsWith('>') ? 'text-[#818cf8]' : 'text-[#c8c8d8]'}>{line}</p>
                      ))}
                    </div>
                    <div className="relative">
                      <Input 
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runCommand()}
                        placeholder={`Run command for ${selectedAgent.name}...`} 
                        className="bg-white/5 border-white/10 rounded-xl h-12 font-mono text-xs pl-4"
                      />
                      <Button onClick={runCommand} variant="ghost" className="absolute right-2 top-1.5 h-9 text-[10px] font-bold text-[#818cf8]">RUN CMD</Button>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'permissions' && (
                  <motion.div key="perm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[
                      { action: "assign_ticket", current: 0 },
                      { action: "escalate_priority", current: 1 },
                      { action: "send_collection_email", current: 3 },
                      { action: "flag_churn_risk", current: 0 },
                      { action: "rebalance_workload", current: 2 },
                      { action: "audit_compliance", current: 0 }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 gap-4">
                        <span className="font-mono text-xs text-[#eeeef4] uppercase tracking-wider">{item.action}</span>
                        <div className="flex gap-1.5">
                          {[
                            { l: 0, label: 'Full Auto', color: 'bg-emerald-500' },
                            { l: 1, label: 'Auto + Report', color: 'bg-sky-500' },
                            { l: 2, label: 'CEO Appr', color: 'bg-amber-500' },
                            { l: 3, label: 'Owner Appr', color: 'bg-rose-500' },
                            { l: 4, label: 'Disabled', color: 'bg-zinc-600' }
                          ].map(level => {
                            const isSelected = item.current === level.l;
                            return (
                              <button 
                                key={level.l}
                                onClick={() => toast.success(`Updated ${item.action} to ${level.label}`)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                  isSelected ? `${level.color} text-white scale-110 shadow-lg` : 'bg-white/5 text-[#6e6e8a] hover:bg-white/10'
                                }`}
                                title={level.label}
                              >
                                <span className="text-[10px] font-black">{level.l}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-5 gap-2">
                       {[
                         { l: 0, label: 'Full Auto', color: 'text-emerald-500' },
                         { l: 1, label: 'Auto + Rpt', color: 'text-sky-500' },
                         { l: 2, label: 'CEO Appr', color: 'text-amber-500' },
                         { l: 3, label: 'Owner Appr', color: 'text-rose-500' },
                         { l: 4, label: 'Disabled', color: 'text-zinc-600' }
                       ].map((node, i) => (
                         <div key={i} className="text-center">
                           <p className={`text-[10px] font-black ${node.color}`}>{node.l}</p>
                           <p className="text-[8px] font-bold text-[#6e6e8a] uppercase tracking-widest">{node.label}</p>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'comms' && (
                  <motion.div key="comm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[
                      { to: "Finance Scout", msg: "Client Prime Tech SLA breach detected. Checking invoice status before escalation.", time: "4m ago" },
                      { to: "ARC", msg: "Sector 4 hardware triage complete. 4 devices recovered. 2 need field dispatch.", time: "12m ago" },
                      { to: "Field Dispatcher", msg: "Sending 2 tickets for Sector 4 hardware swap. Marcus is nearest.", time: "14m ago" },
                      { to: "Sales Manager", msg: "High sentiment drop on account Domino Ltd. Flagged in CRM.", time: "1h ago" }
                    ].map((msg, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 relative group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-[#818cf8] uppercase tracking-widest">TO: {msg.to}</span>
                          <span className="text-[9px] font-bold text-[#6e6e8a]">{msg.time}</span>
                        </div>
                        <p className="text-xs text-[#c8c8d8] leading-relaxed italic">"{msg.msg}"</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeSubTab === 'directive' && (
                  <motion.div key="dir" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Global Directive for {selectedAgent.name}</label>
                      <textarea 
                        value={directiveInput}
                        onChange={(e) => setDirectiveInput(e.target.value)}
                        placeholder="Focus on overdue tickets from Raffoul this week..."
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#818cf8]/50 outline-none transition-colors"
                      />
                    </div>
                    <Button onClick={saveDirective} className="w-full bg-[#818cf8] hover:bg-[#6366f1] h-12 rounded-xl font-bold">
                      Push Directive <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Active Directives</h4>
                       <div className="p-4 rounded-xl bg-[#818cf8]/5 border border-[#818cf8]/10 flex justify-between items-center">
                          <p className="text-xs text-[#818cf8] italic">"Prioritize SLA recoveries over general backlog for Sector 4."</p>
                          <span className="text-[9px] font-bold text-[#6e6e8a]">2d ago</span>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const AgentNode = ({ agent, isSelected, onClick, duration, small = false }: { agent: any, isSelected: boolean, onClick: () => void, duration: number, small?: boolean }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`cursor-pointer transition-all ${small ? 'flex flex-col items-center' : 'w-full max-w-[200px]'}`}
  >
    <div className={`relative ${small ? 'w-16 h-16' : 'w-20 h-20'} mx-auto mb-3`}>
      <div className={`absolute inset-0 rounded-2xl ${isSelected ? 'bg-[#818cf8]' : 'bg-white/5'} border border-white/10 flex items-center justify-center transition-colors shadow-xl ${isSelected ? 'shadow-indigo-600/20' : ''}`}>
        <agent.icon className={`${small ? 'h-7 w-7' : 'h-10 w-10'} ${isSelected ? 'text-white' : 'text-[#6e6e8a]'}`} />
      </div>
      {/* Breathing Status Dot */}
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#05060f] ${
          agent.status === 'critical' ? 'bg-rose-500' : agent.status === 'busy' ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />
    </div>
    {!small && (
      <div className="text-center">
        <h4 className={`text-sm font-black ${isSelected ? 'text-white' : 'text-[#c8c8d8]'}`}>{agent.name}</h4>
        <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">{agent.role}</p>
      </div>
    )}
    {small && (
      <div className="text-center">
        <p className={`text-[10px] font-black leading-tight ${isSelected ? 'text-white' : 'text-[#6e6e8a]'}`}>{agent.name.split(' ')[0]}</p>
      </div>
    )}
  </motion.div>
);

const DashboardOnboard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = React.useState(1);
  const [isValidating, setIsValidating] = React.useState(false);
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [selectedAgents, setSelectedAgents] = React.useState(["helpdesk", "finance", "sentry"]);
  const [preset, setPreset] = React.useState("balanced");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      toast.success("Connection established. Business intelligence discovered.");
      nextStep();
    }, 2000);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      nextStep();
      toast.success("AI Fleet deployed successfully.");
    }, 3000);
  };

  const recommendations = [
    { id: "helpdesk", name: "Helpdesk Manager", priority: "HIGH", count: "67 open tickets", icon: Ticket },
    { id: "finance", name: "Finance Scout", priority: "HIGH", count: "$28,400 overdue", icon: DollarSign },
    { id: "sentry", name: "Network Sentry", priority: "MEDIUM", count: "14 stale nodes", icon: Cpu },
    { id: "pipeline", name: "Pipeline Guardian", priority: "LOW", count: "8 new leads", icon: TrendingUp },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[1000px] mx-auto min-h-[80vh] flex flex-col">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 px-4">
        {[
          { num: 1, label: "Connect" },
          { num: 2, label: "Discover" },
          { num: 3, label: "Deploy" }
        ].map((s, i) => (
          <div key={s.num} className="contents">
            <div className="flex flex-col items-center gap-3 relative">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black transition-all ${
                step >= s.num ? 'bg-[#818cf8] text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 text-[#6e6e8a]'
              }`}>
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${step >= s.num ? 'text-white' : 'text-[#6e6e8a]'}`}>{s.label}</span>
            </div>
            {i < 2 && (
              <div className="flex-1 h-px bg-white/5 mx-6 mb-8" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Connect your ERP</h2>
              <p className="text-[#c8c8d8] max-w-lg mx-auto leading-relaxed">AIOM connects directly to your existing business infrastructure to extract intelligence and deploy agents.</p>
            </div>
            
            <GlassCard className="p-8 max-w-[600px] mx-auto" hover={false}>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleValidate(); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Odoo Instance URL</label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="https://company.odoo.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Database Name</label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="production_db" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Master API Key</label>
                  <Input type="password" className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="••••••••••••••••" required />
                </div>
                <Button 
                  type="submit" 
                  disabled={isValidating}
                  className="w-full bg-[#818cf8] hover:bg-[#6366f1] h-14 rounded-xl font-bold text-lg"
                >
                  {isValidating ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 animate-spin" /> Discovering Business...
                    </div>
                  ) : "Discover My Business ▸"}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Discovery Results</h2>
              <p className="text-[#c8c8d8]">We've scanned your data. Here is the operational health assessment.</p>
            </div>

            {/* Health Assessment Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: "AR Aging", val: "$42.4K", status: "red" },
                 { label: "Overdue Count", val: "18", status: "red" },
                 { label: "Helpdesk Load", val: "74 tickets", status: "yellow" },
                 { label: "Pipeline Value", val: "$124K", status: "green" }
               ].map((metric, i) => (
                 <div key={i} className={`p-4 rounded-2xl bg-white/5 border-l-4 ${
                   metric.status === 'red' ? 'border-rose-500' : metric.status === 'yellow' ? 'border-amber-500' : 'border-emerald-500'
                 }`}>
                   <p className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-1">{metric.label}</p>
                   <p className="text-xl font-black text-white font-mono">{metric.val}</p>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agent Recommendations */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recommended Agents</h3>
                <div className="space-y-3">
                  {recommendations.map((agent) => (
                    <div 
                      key={agent.id} 
                      onClick={() => setSelectedAgents(prev => prev.includes(agent.id) ? prev.filter(a => a !== agent.id) : [...prev, agent.id])}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                        selectedAgents.includes(agent.id) ? 'bg-[#818cf8]/10 border-[#818cf8]/40' : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded border flex items-center justify-center ${selectedAgents.includes(agent.id) ? 'bg-[#818cf8] border-[#818cf8]' : 'border-white/20'}`}>
                        {selectedAgents.includes(agent.id) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{agent.name}</span>
                          <Badge className={`text-[8px] border-0 h-4 ${
                            agent.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-500' : 
                            agent.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-500' : 'bg-[#6e6e8a]/10 text-[#6e6e8a]'
                          }`}>{agent.priority}</Badge>
                        </div>
                        <p className="text-[10px] text-[#6e6e8a] font-medium">{agent.count} → recommended</p>
                      </div>
                      <agent.icon className={`h-5 w-5 ${selectedAgents.includes(agent.id) ? 'text-[#818cf8]' : 'text-[#6e6e8a]'}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Autonomy Presets */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Autonomy Preset</h3>
                <div className="space-y-3">
                  {[
                    { id: "conservative", label: "Conservative", desc: "Read + Report only. No autonomous actions." },
                    { id: "balanced", label: "Balanced", desc: "Auto-triage enabled. Actions need approval." },
                    { id: "autonomous", label: "Autonomous", desc: "Full auto routine. Big decisions need approval." }
                  ].map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setPreset(p.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        preset === p.id ? 'bg-[#818cf8]/10 border-[#818cf8]/40 shadow-lg shadow-indigo-600/5' : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <h4 className={`text-sm font-bold mb-1 ${preset === p.id ? 'text-[#818cf8]' : 'text-white'}`}>{p.label}</h4>
                      <p className="text-[10px] text-[#6e6e8a] font-medium leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               <Button onClick={prevStep} variant="ghost" className="h-14 px-8 text-[#6e6e8a] hover:text-white font-bold uppercase tracking-widest text-[10px]">Back</Button>
               <Button onClick={nextStep} className="flex-1 bg-[#818cf8] hover:bg-[#6366f1] h-14 rounded-xl font-bold">Configure Deployment ▸</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 flex-1 flex flex-col justify-center">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <Bot className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">Ready for Deployment</h2>
                <p className="text-[#c8c8d8] max-w-lg mx-auto">Deploying {selectedAgents.length} agents with {preset} autonomy preset.</p>
              </div>
            </div>

            <GlassCard className="p-6 max-w-[500px] mx-auto bg-white/[0.02]" hover={false}>
               <h4 className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-4">Manifest Generation</h4>
               <div className="space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-emerald-500">
                    <span>CREATE soul.md</span>
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex justify-between items-center text-emerald-500">
                    <span>GENERATE system_prompt.md</span>
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex justify-between items-center text-sky-400">
                    <span>CONFIGURING {selectedAgents.length} AGENT FILES</span>
                    <span className="animate-pulse">PENDING</span>
                  </div>
               </div>
            </GlassCard>

            <Button 
              onClick={handleDeploy}
              disabled={isDeploying}
              className="w-full max-w-[500px] mx-auto bg-[#818cf8] hover:bg-[#6366f1] h-16 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-600/30"
            >
              {isDeploying ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-6 w-6 animate-spin" /> Deploying AI Team...
                </div>
              ) : "Deploy AI Team ▸"}
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
              <div className="h-32 w-32 rounded-[40px] bg-emerald-500 flex items-center justify-center relative z-10 shadow-2xl shadow-emerald-500/40">
                <ShieldCheck className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-white uppercase tracking-tight italic">Your AI Team is Live</h2>
              <p className="text-xl text-[#c8c8d8] max-w-md mx-auto">Fleet synchronization complete. Operational intelligence is now active.</p>
            </div>
            <Button onClick={onComplete} className="bg-white text-black hover:bg-[#eeeef4] px-12 h-16 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-white/10">
              Open Command Center ▸
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const DashboardDirectory = () => {
  const [filterAgent, setFilterAgent] = React.useState<string>("all");
  
  const agents = [
    { id: "arc", name: "ARC", role: "Chief Executive", email: "arc@aiom.ai", ext: "001", sip: "ceo-arc@sip.aiom.ai", avatar: "🧠", status: "online", capabilities: ["strategy", "oversight", "delegation"] },
    { id: "helpdesk", name: "Helpdesk Manager", role: "Support Head", email: "helpdesk@aiom.ai", ext: "801", sip: "agent-helpdesk@sip.aiom.ai", avatar: "🛠️", status: "online", capabilities: ["triage", "escalation", "remote_fix"] },
    { id: "finance", name: "Finance Scout", role: "Finance Head", email: "finance@aiom.ai", ext: "802", sip: "agent-finance@sip.aiom.ai", avatar: "💰", status: "busy", capabilities: ["billing", "collections", "auditing"] },
    { id: "pipeline", name: "Pipeline Guardian", role: "Sales Head", email: "sales@aiom.ai", ext: "803", sip: "agent-sales@sip.aiom.ai", avatar: "🎯", status: "online", capabilities: ["lead_gen", "enrichment", "crm_sync"] },
    { id: "dispatch", name: "Field Dispatcher", role: "Ops Head", email: "ops@aiom.ai", ext: "804", sip: "agent-ops@sip.aiom.ai", avatar: "🚛", status: "away", capabilities: ["scheduling", "geofencing", "parts_mgr"] },
    { id: "sentry", name: "Network Sentry", role: "IT Head", email: "it@aiom.ai", ext: "805", sip: "agent-it@sip.aiom.ai", avatar: "📡", status: "busy", capabilities: ["monitoring", "recovery", "security"] },
    { id: "hr", name: "HR Manager", role: "Admin Head", email: "hr@aiom.ai", ext: "806", sip: "agent-hr@sip.aiom.ai", avatar: "🤝", status: "online", capabilities: ["hiring", "compliance", "training"] }
  ];

  const actions = [
    { id: 1, time: "14:45:12", status: "executed", agent: "Helpdesk Manager", detail: "Triaged Ticket #9482 to Tier 2 Support" },
    { id: 2, time: "14:42:05", status: "executed", agent: "Finance Scout", detail: "Sent collection reminder to Acme Corp" },
    { id: 3, time: "14:38:50", status: "queued", agent: "Pipeline Guardian", detail: "Scraping social data for 42 new leads" },
    { id: 4, time: "14:35:11", status: "rejected", agent: "ARC", detail: "Request for payroll increase rejected: Budget breach" },
    { id: 5, time: "14:30:00", status: "executed", agent: "Network Sentry", detail: "Auto-healed gateway S4-12 after dropout" },
    { id: 6, time: "14:28:15", status: "executed", agent: "Field Dispatcher", detail: "Dispatched Marcus to Sector 7 site visit" },
    { id: 7, time: "14:25:55", status: "queued", agent: "Finance Scout", detail: "Monthly invoice generation cycle started" },
    { id: 8, time: "14:22:10", status: "executed", agent: "HR Manager", detail: "Updated employee handbook compliance flags" }
  ];

  const filteredActions = filterAgent === "all" 
    ? actions 
    : actions.filter(a => a.agent === filterAgent);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Directory</h1>
        <p className="text-[#6e6e8a] font-medium">Full organizational roster and immutable action audit.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-[#818cf8]" />
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Company Roster</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <GlassCard key={agent.id} className="p-6 relative group" hover={true}>
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${
                  agent.status === 'online' ? 'bg-emerald-500' : 
                  agent.status === 'busy' ? 'bg-amber-500' : 'bg-[#6e6e8a]'
                }`} />
                <span className="text-[9px] font-bold text-[#6e6e8a] uppercase tracking-widest">{agent.status}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner">
                  {agent.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-tight">{agent.name}</h3>
                  <p className="text-[10px] font-bold text-[#818cf8] uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs text-[#c8c8d8]">
                  <Mail className="h-3.5 w-3.5 text-[#6e6e8a]" />
                  <span className="font-medium truncate">{agent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#c8c8d8]">
                  <Phone className="h-3.5 w-3.5 text-[#6e6e8a]" />
                  <span className="font-mono text-[10px]">Ext {agent.ext} · {agent.sip}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {agent.capabilities.map((cap) => (
                  <Badge key={cap} variant="outline" className="text-[8px] font-bold border-white/10 text-[#6e6e8a] bg-white/[0.02] uppercase tracking-wider py-0 px-2 h-5">
                    {cap}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-[#818cf8]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Action Log</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Filter:</span>
            <select 
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="bg-white/5 border border-white/10 text-[#c8c8d8] text-xs font-bold px-3 py-1.5 rounded-lg outline-none focus:border-[#818cf8]/50"
            >
              <option value="all">All Agents</option>
              {agents.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <GlassCard className="p-0 overflow-hidden" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-[0.2em]">Agent</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-[0.2em]">Action Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredActions.map((action) => (
                    <motion.tr 
                      key={action.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-[#6e6e8a]">{action.time}</td>
                      <td className="px-6 py-4">
                        <Badge className={`text-[9px] font-bold border-0 px-2 h-5 flex w-fit items-center gap-1.5 ${
                          action.status === 'executed' ? 'bg-emerald-500/10 text-emerald-500' :
                          action.status === 'queued' ? 'bg-[#818cf8]/10 text-[#818cf8]' :
                          'bg-rose-500/10 text-rose-500'
                        }`}>
                          {action.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs font-black text-[#eeeef4]">{action.agent}</td>
                      <td className="px-6 py-4 text-xs text-[#c8c8d8]">{action.detail}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const DashboardAnalytics = () => {
  const trendData = [
    { name: "Mon", revenue: 4200, costs: 2100, tickets: 45 },
    { name: "Tue", revenue: 4800, costs: 2200, tickets: 32 },
    { name: "Wed", revenue: 4100, costs: 2150, tickets: 58 },
    { name: "Thu", revenue: 5600, costs: 2400, tickets: 41 },
    { name: "Fri", revenue: 6200, costs: 2600, tickets: 29 },
    { name: "Sat", revenue: 3800, costs: 1800, tickets: 12 },
    { name: "Sun", revenue: 4000, costs: 1900, tickets: 18 },
  ];

  const agentPerf = [
    { name: "ARC", accuracy: 98, coverage: 100, cost: 420 },
    { id: "helpdesk", name: "Helpdesk", accuracy: 92, coverage: 94, cost: 280 },
    { id: "finance", name: "Finance", accuracy: 99, coverage: 98, cost: 310 },
    { id: "pipeline", name: "Sales", accuracy: 88, coverage: 85, cost: 240 },
    { id: "sentry", name: "Network", accuracy: 96, coverage: 99, cost: 290 },
  ];

  const COLORS_PIE = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3'];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Analytics</h1>
          <p className="text-[#6e6e8a] font-medium">Performance intelligence and cost distribution.</p>
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-11 px-6 rounded-xl gap-2">
          <FileText className="h-4 w-4" /> Export Weekly Strategy Memo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 p-6 h-[400px] flex flex-col" hover={false}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Revenue vs Operational Costs</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#818cf8]" />
                <span className="text-[10px] font-bold text-[#6e6e8a] uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold text-[#6e6e8a] uppercase">Costs</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6e6e8a" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0c0d19', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#818cf8" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                <Line type="monotone" dataKey="costs" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 h-[400px] flex flex-col" hover={false}>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Agent Cost Distribution</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agentPerf}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="cost"
                >
                  {agentPerf.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0c0d19', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {agentPerf.map((agent, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS_PIE[i % COLORS_PIE.length] }} />
                <span className="text-[10px] font-bold text-[#6e6e8a] uppercase truncate">{agent.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Avg Accuracy", val: "94.2%", change: "+1.2%", status: "green" },
          { label: "Escalation Rate", val: "8.4%", change: "-2.1%", status: "green" },
          { label: "Fleet Coverage", val: "92.8%", change: "+5.4%", status: "green" },
          { label: "ROI Multiple", val: "14.2x", change: "+0.8x", status: "green" }
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6">
            <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-black text-white">{stat.val}</p>
              <span className="text-[10px] font-bold text-emerald-500">{stat.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Agent Performance Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">Agent</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">Accuracy</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">Coverage</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">Efficiency</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#6e6e8a] uppercase tracking-widest">Daily Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {agentPerf.map((agent, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white text-sm">{agent.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${agent.accuracy}%` }} />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-500">{agent.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#c8c8d8]">{agent.coverage}%</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-white/10 text-white font-bold text-[10px]">OPTIMAL</Badge>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-white">${agent.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

const DashboardPlaybooks = () => {
  const [nodes, setNodes] = React.useState([
    { id: '1', type: 'trigger', label: 'Inbound Ticket Created', x: 50, y: 50 },
    { id: '2', type: 'action', label: 'Sentiment Analysis', x: 250, y: 50 },
    { id: '3', type: 'condition', label: 'If Negative', x: 450, y: 50 },
    { id: '4', type: 'action', label: 'Escalate to ARC', x: 650, y: 20 },
    { id: '5', type: 'action', label: 'Reply with FAQ', x: 650, y: 100 },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Playbooks</h1>
          <p className="text-[#6e6e8a] font-medium">Visual IF-THIS-THEN-THAT automation builder.</p>
        </div>
        <Button className="bg-[#818cf8] hover:bg-[#6366f1] rounded-xl font-bold px-6 gap-2">
          <Plus className="h-4 w-4" /> New Playbook
        </Button>
      </div>

      <GlassCard className="flex-1 p-0 overflow-hidden relative bg-[#030408]/80 border-dashed border-2 border-white/5" hover={false}>
        {/* Canvas Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="absolute top-6 left-6 flex gap-2">
           <Badge className="bg-[#818cf8] text-white">TRIGGER</Badge>
           <Badge className="bg-emerald-500 text-white">ACTION</Badge>
           <Badge className="bg-amber-500 text-white">CONDITION</Badge>
        </div>

        <div className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing">
           {nodes.map((node) => (
             <motion.div 
               key={node.id}
               drag
               dragMomentum={false}
               className={`absolute p-4 rounded-xl border-2 shadow-2xl backdrop-blur-xl w-[180px] ${
                 node.type === 'trigger' ? 'border-[#818cf8] bg-[#818cf8]/10' :
                 node.type === 'condition' ? 'border-amber-500 bg-amber-500/10' :
                 'border-emerald-500 bg-emerald-500/10'
               }`}
               style={{ left: node.x, top: node.y }}
             >
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[8px] font-black uppercase tracking-widest text-[#6e6e8a]">{node.type}</span>
                 <Settings2 className="h-3 w-3 text-[#6e6e8a]" />
               </div>
               <p className="text-xs font-bold text-white leading-tight">{node.label}</p>
               <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
               </div>
             </motion.div>
           ))}

           {/* Simple SVG paths for connections */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             <path d="M 230 70 L 250 70" stroke="white" strokeWidth="2" fill="none" />
             <path d="M 430 70 L 450 70" stroke="white" strokeWidth="2" fill="none" />
             <path d="M 630 70 L 650 40" stroke="white" strokeWidth="2" fill="none" />
             <path d="M 630 70 L 650 120" stroke="white" strokeWidth="2" fill="none" />
           </svg>
        </div>

        <div className="absolute bottom-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Engine Active</span>
           </div>
           <Separator orientation="vertical" className="h-4 bg-white/10" />
           <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest hover:text-white">Save Changes</Button>
        </div>
      </GlassCard>
    </div>
  );
};

const DashboardNetwork = () => {
  const trendData = [
    { name: '00:00', tickets: 400 },
    { name: '04:00', tickets: 300 },
    { name: '08:00', tickets: 200 },
    { name: '12:00', tickets: 278 },
    { name: '16:00', tickets: 189 },
    { name: '20:00', tickets: 239 },
    { name: '23:59', tickets: 349 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Network Topology</h1>
          <p className="text-[#6e6e8a] font-medium">Real-time device map and infrastructure health.</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-500 border-0">142 ONLINE</Badge>
          <Badge className="bg-rose-500/10 text-rose-500 border-0">3 OFFLINE</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        <GlassCard className="lg:col-span-3 p-0 relative overflow-hidden bg-[#030408]/80" hover={false}>
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           {/* Simulated Topology Map */}
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-[600px] h-[400px]">
               {/* Core Node */}
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-3xl bg-[#818cf8] flex items-center justify-center shadow-[0_0_40px_rgba(129,140,248,0.4)] z-10"
               >
                 <Network className="h-10 w-10 text-white" />
               </motion.div>

               {/* Edge Nodes */}
               {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                 const x = Math.cos(angle * Math.PI / 180) * 200;
                 const y = Math.sin(angle * Math.PI / 180) * 150;
                 const status = i === 2 ? 'offline' : i === 4 ? 'warning' : 'online';
                 return (
                   <div key={angle} className="contents">
                     <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <line 
                          x1="300" y1="200" 
                          x2={300 + x} y2={200 + y} 
                          stroke={status === 'offline' ? '#f43f5e' : 'rgba(129,140,248,0.2)'} 
                          strokeWidth="1" 
                          strokeDasharray={status === 'offline' ? '4 4' : '0'}
                        />
                     </svg>
                     <motion.div 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                       style={{ left: 300 + x - 24, top: 200 + y - 24 }}
                       className={`absolute h-12 w-12 rounded-xl border flex items-center justify-center backdrop-blur-xl ${
                         status === 'offline' ? 'border-rose-500 bg-rose-500/10' :
                         status === 'warning' ? 'border-amber-500 bg-amber-500/10' :
                         'border-white/10 bg-white/5'
                       }`}
                     >
                       <Monitor className={`h-6 w-6 ${status === 'offline' ? 'text-rose-500' : 'text-[#6e6e8a]'}`} />
                       <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-[#030408] ${
                         status === 'offline' ? 'bg-rose-500' : status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                       }`} />
                     </motion.div>
                   </div>
                 );
               })}
             </div>
           </div>

           <div className="absolute top-6 right-6 space-y-2">
             <div className="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-2">Selected Node</p>
                <h4 className="text-sm font-bold text-white">Edge Gateway S4-12</h4>
                <p className="text-[10px] text-emerald-500 font-mono mt-1">Uptime: 142d 12h</p>
             </div>
           </div>
        </GlassCard>

        <div className="space-y-6">
           <GlassCard className="p-6">
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Traffic Analyzer</h3>
             <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={trendData}>
                     <Area type="monotone" dataKey="tickets" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <p className="text-[10px] text-[#6e6e8a] text-center mt-4">L7 Traffic: 12.4 GB/s average</p>
           </GlassCard>

           <GlassCard className="p-0 overflow-hidden">
              <div className="p-4 bg-white/5 border-b border-white/5">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Incidents</h3>
              </div>
              <div className="p-2 space-y-1">
                 {[
                   { msg: "Node dropout sector 4", time: "2m ago", type: "error" },
                   { msg: "Congestion peak S2", time: "14m ago", type: "warn" },
                   { msg: "Auto-healed sector 1", time: "1h ago", type: "info" }
                 ].map((inc, i) => (
                   <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5">
                      <span className={`text-[10px] font-bold ${inc.type === 'error' ? 'text-rose-500' : inc.type === 'warn' ? 'text-amber-500' : 'text-blue-400'}`}>{inc.msg}</span>
                      <span className="text-[9px] font-mono text-[#6e6e8a]">{inc.time}</span>
                   </div>
                 ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

const DashboardSettings = () => {
  const [activeSetTab, setActiveSetTab] = React.useState("general");

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-[#6e6e8a] font-medium">Tenant configuration and user management.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: 'general', label: 'General', icon: Settings2 },
            { id: 'integrations', label: 'Integrations', icon: Share2 },
            { id: 'users', label: 'Team', icon: Users },
            { id: 'security', label: 'Security', icon: ShieldCheck },
            { id: 'billing', label: 'Billing', icon: CreditCard }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSetTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSetTab === tab.id ? 'bg-[#818cf8]/10 text-white font-bold' : 'text-[#6e6e8a] hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeSetTab === tab.id ? 'text-[#818cf8]' : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
             {activeSetTab === 'general' && (
               <motion.div key="gen" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <GlassCard className="p-8 space-y-6" hover={false}>
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">Organization Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Display Name</label>
                         <Input className="bg-white/5 border-white/10 rounded-xl" defaultValue="EPIC Communications" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Main Domain</label>
                         <Input className="bg-white/5 border-white/10 rounded-xl" defaultValue="epic.dm" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Tenant ID</label>
                      <div className="flex gap-2">
                        <Input className="bg-white/5 border-white/10 rounded-xl font-mono text-xs" readOnly value="23a42f8a-9e12-4c2d-9b0d-1234567890ab" />
                        <Button variant="outline" className="border-white/10 text-white"><RefreshCw className="h-4 w-4" /></Button>
                      </div>
                   </div>
                 </GlassCard>

                 <GlassCard className="p-8" hover={false}>
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Regional Settings</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Timezone</label>
                         <select className="w-full bg-white/5 border border-white/10 rounded-xl h-10 px-4 text-sm text-white outline-none">
                            <option>America/Dominica (AST)</option>
                            <option>UTC</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest">Currency</label>
                         <select className="w-full bg-white/5 border border-white/10 rounded-xl h-10 px-4 text-sm text-white outline-none">
                            <option>USD ($)</option>
                            <option>XCD ($)</option>
                         </select>
                      </div>
                   </div>
                 </GlassCard>
               </motion.div>
             )}

             {activeSetTab === 'users' && (
               <motion.div key="users" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">Team Members</h3>
                   <Button className="bg-[#818cf8] hover:bg-[#6366f1] rounded-xl h-9 px-4 text-xs font-bold">Invite Member</Button>
                 </div>
                 <div className="space-y-3">
                    {[
                      { name: "Eric Giraud", email: "eric@epic.dm", role: "Owner", avatar: "EG" },
                      { name: "Sarah Connor", email: "sarah@epic.dm", role: "Manager", avatar: "SC" },
                      { name: "John Doe", email: "john@epic.dm", role: "Viewer", avatar: "JD" }
                    ].map((user, i) => (
                      <GlassCard key={i} className="p-4 flex items-center justify-between" hover={false}>
                        <div className="flex items-center gap-4">
                           <Avatar className="h-10 w-10 border border-white/10">
                             <AvatarFallback className="bg-[#818cf8]/20 text-[#818cf8] font-black">{user.avatar}</AvatarFallback>
                           </Avatar>
                           <div>
                             <h4 className="text-sm font-bold text-white">{user.name}</h4>
                             <p className="text-[10px] text-[#6e6e8a] font-medium">{user.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <Badge variant="outline" className="border-white/10 text-[#6e6e8a] text-[10px] font-black">{user.role}</Badge>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6e6e8a] hover:text-white"><Edit2 className="h-3 w-3" /></Button>
                        </div>
                      </GlassCard>
                    ))}
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DashboardARCChat = () => {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'arc', text: string, time: string }[]>([
    { role: 'arc', text: "Welcome to the ARC conversational interface. I am connected to your business runtime. Ask me anything about your operations, risk, or performance.", time: "09:00:00" }
  ]);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    const now = new Date().toLocaleTimeString([], { hour12: false });
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg, time: now }]);
    
    setTimeout(() => {
      const arcMsg = userMsg.toLowerCase().includes("risk") 
        ? "Risk analysis complete: Prime Tech has a declining sentiment score (0.42) and $12k in overdue invoices. I suggest flagging them for immediate review."
        : userMsg.toLowerCase().includes("revenue")
        ? "Revenue summary: MRR is holding at $124.5k. Growth is projected at 4% for next month if conversion rates maintain current velocity."
        : "I've analyzed your query against the live ERP data. Everything appears to be within normal operational parameters, but I'm monitoring the field service backlog which is up 12%.";
      
      setMessages(prev => [...prev, { role: 'arc', text: arcMsg, time: new Date().toLocaleTimeString([], { hour12: false }) }]);
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 h-[calc(100vh-40px)] flex flex-col max-w-[1200px] mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-[#818cf8] flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Bot className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">ARC Chat</h1>
          <p className="text-xs font-bold text-[#818cf8] uppercase tracking-widest">Conversational Business Intelligence</p>
        </div>
      </div>

      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden" hover={false}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] space-y-1`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#818cf8] text-white' 
                    : 'bg-white/5 text-[#c8c8d8] border border-white/5 backdrop-blur-md'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[9px] font-mono text-[#6e6e8a] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.role === 'arc' ? 'ARC' : 'YOU'} · {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ARC anything about your business..." 
            className="flex-1 bg-white/5 border-white/10 h-14 rounded-xl px-6 text-sm focus:border-[#818cf8]/50"
          />
          <Button type="submit" className="h-14 w-14 rounded-xl bg-[#818cf8] hover:bg-[#6366f1] flex items-center justify-center">
            <ArrowRight className="h-6 w-6" />
          </Button>
        </form>
      </GlassCard>
    </div>
  );
};

const DashboardERP = () => (
  <ContentWrapper>
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">ERP Integration</h1>
        <p className="text-[#6e6e8a] font-medium">Manage data synchronization and API health.</p>
      </div>

      <GlassCard className="p-8" hover={false}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-[#818cf8]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Odoo ERP</h3>
              <p className="text-sm text-[#6e6e8a]">Connected to: <span className="text-white font-mono">https://epic-communications.odoo.com</span></p>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-0 h-8 px-4 font-bold">ACTIVE & SYNCED</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-2">Last Sync</p>
            <p className="text-lg font-mono font-bold text-white">2m 42s ago</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-2">Sync Frequency</p>
            <p className="text-lg font-mono font-bold text-white">Every 60s</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold text-[#6e6e8a] uppercase tracking-widest mb-2">Data Objects</p>
            <p className="text-lg font-mono font-bold text-white">12,482</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-11 px-6 rounded-xl">Edit Connection</Button>
          <Button className="bg-[#818cf8] hover:bg-[#6366f1] font-bold h-11 px-6 rounded-xl">Force Re-sync</Button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8" hover={false}>
          <h3 className="text-lg font-bold text-white mb-6">Synchronization Stats</h3>
          <div className="space-y-6">
            {[
              { label: "CRM Records", status: "Synced", count: "4,120" },
              { label: "Helpdesk Tickets", status: "Synced", count: "1,284" },
              { label: "Invoices / Payments", status: "Synced", count: "6,842" },
              { label: "Project Tasks", status: "In Progress", count: "236" }
            ].map((obj, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm font-bold text-white">{obj.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#6e6e8a]">{obj.count}</span>
                  <div className={`h-2 w-2 rounded-full ${obj.status === 'Synced' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8" hover={false}>
          <h3 className="text-lg font-bold text-white mb-6">Security & Logs</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-xs text-emerald-500 font-bold">API Key: Valid until 2027-01-01</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#6e6e8a] uppercase tracking-widest">SSL Encryption</span>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <Button variant="ghost" className="w-full text-[#818cf8] font-bold text-sm">Download Integration Logs</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  </ContentWrapper>
);

// --- Page 1: Home Sections ---

const HomeHero = ({ onStartFree, onLogin }: { onStartFree: () => void, onLogin: () => void }) => (
  <section className="relative pt-20 pb-32 text-center overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6">AI-POWERED OPERATIONS</span>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 max-w-4xl mx-auto">
        Your business runs itself.
      </h1>
      <p className="text-[#c8c8d8] text-xl max-w-2xl mx-auto leading-relaxed mb-12">
        Connect your ERP. AI agents deploy in 60 seconds. They triage tickets, chase invoices, flag risks, and never let anything fall through the cracks.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <Button onClick={onStartFree} className="bg-[#818cf8] hover:bg-[#6366f1] px-10 h-14 rounded-[12px] text-lg font-bold shadow-xl shadow-indigo-600/30">
          Start Free <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button onClick={onLogin} variant="outline" className="px-10 h-14 rounded-[12px] text-lg font-bold border-white/10 text-white hover:bg-white/5">
          Login <User className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        <motion.div
          initial={{ rotateX: 10, opacity: 0 }}
          animate={{ rotateX: 2, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden bg-black/40 backdrop-blur-3xl"
        >
          <div className="h-8 border-b border-white/5 flex items-center gap-1.5 px-4 bg-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
            <div className="ml-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">aiom-command-center.sh</div>
          </div>
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1720754879438-b8ac93eaaa8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBncmlkJTIwZnV0dXJpc3RpYyUyMGxhbmRzY2FwZSUyMGRhcmt8ZW58MXx8fHwxNzcwNDU0NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="AIOM Dashboard Preview"
            className="w-full h-auto opacity-80"
          />
        </motion.div>
        {/* Glow effect under the image */}
        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 rounded-full scale-110" />
      </div>
    </motion.div>
  </section>
);

const HomePainPoints = () => (
  <section className="py-32 px-4">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-16">
        <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-4 block">SOUND FAMILIAR?</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Every growing business hits the same walls.</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { icon: "🕳️", title: "Things fall through cracks", desc: "Tasks assigned, nobody follows up. Deadlines pass in silence." },
          { icon: "🔒", title: "You're the bottleneck", desc: "Everything routes through you. Can't take a day off." },
          { icon: "💸", title: "Money leaks nobody notices", desc: "Invoices go out late. Follow-ups don't happen. Cash gets tight." },
          { icon: "👻", title: "No visibility", desc: "Reports take 30 minutes to pull. By then, the data is stale." },
          { icon: "🔄", title: "Same mtgs, same probs", desc: "Decisions made Monday. Forgotten by Wednesday. Repeated next Monday." }
        ].map((item, i) => (
          <GlassCard key={i} className="text-center flex flex-col items-center">
            <span className="text-4xl mb-6">{item.icon}</span>
            <h3 className="text-[#eeeef4] font-bold text-lg mb-3 leading-tight">{item.title}</h3>
            <p className="text-[#6e6e8a] text-sm leading-relaxed">{item.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const SolutionStatement = () => (
  <section className="py-32 px-4 relative">
    <div className="max-w-[900px] mx-auto">
      <GlassCard className="relative p-12 overflow-hidden" hover={false}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed]" />
        <p className="text-2xl md:text-3xl font-medium text-white text-center leading-relaxed">
          AIOM deploys <span className="text-[#818cf8]">AI agents</span> that monitor your entire business — <span className="text-[#818cf8]">24/7</span> — and handle the work nobody wants to do.
        </p>
        <p className="text-xl md:text-2xl font-medium text-white text-center mt-8 opacity-90">
          You stay in control. AI does the grind.
        </p>
      </GlassCard>
    </div>
  </section>
);

const HowItWorksBrief = () => (
  <section className="py-32 px-4">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader 
        eyebrow="GET STARTED IN 60 SECONDS" 
        headline="From zero to AI-powered in three clicks."
        subtitle=""
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connecting lines for desktop */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-white/10 -z-10" />
        
        {[
          { step: "1", icon: "🔌", title: "Connect", desc: "Plug in your ERP — Odoo, QBooks, Xero" },
          { step: "2", icon: "🔍", title: "Scan", desc: "AI finds what needs attention instantly" },
          { step: "3", icon: "🚀", title: "Deploy", desc: "Your AI team starts working now" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="h-14 w-14 rounded-full bg-[#818cf8] flex items-center justify-center text-xl font-black text-white mb-8 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
              {item.step}
            </div>
            <span className="text-4xl mb-6">{item.icon}</span>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-[#6e6e8a] max-w-[200px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AgentGrid = () => (
  <section className="py-32 px-4">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader 
        eyebrow="YOUR AI TEAM" 
        headline="6 specialists. Working 24/7. For less than your coffee budget."
        subtitle=""
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: "🎫", name: "Helpdesk Manager", desc: "Triages tickets, assigns, escalates based on priority and history." },
          { icon: "💰", name: "Finance Manager", desc: "Chases invoices, flags overdue accounts, tracks multi-system cash flow." },
          { icon: "📈", name: "Sales Manager", desc: "Nurtures leads, flags stale deals, and cross-references client support health." },
          { icon: "🔧", name: "Task / Field Manager", desc: "Tracks deadlines, dispatches technicians, and flags scheduling risks." },
          { icon: "📡", name: "Network Ops Manager", desc: "Monitors devices, alerts on outages, and tracks system-wide uptime." },
          { icon: "👥", name: "HR / Admin Manager", desc: "Tracks team workload, flags imbalances, and audits operational compliance." }
        ].map((agent, i) => (
          <GlassCard key={i} className="relative group">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{agent.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4">{agent.name}</h3>
            <p className="text-[#6e6e8a] text-sm leading-relaxed">{agent.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const ImpactNumbers = () => (
  <section className="py-32 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-indigo-600/5 -z-10" />
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { value: "67", label: "tickets triaged in first run" },
          { value: "$32K", label: "overdue flagged instantly" },
          { value: "39", label: "stale deals found in 30 secs" },
          { value: "60", label: "seconds to deploy" }
        ].map((stat, i) => (
          <GlassCard key={i} className="text-center" hover={false}>
            <div className="text-5xl font-mono font-bold text-white mb-3">{stat.value}</div>
            <div className="text-[#6e6e8a] text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

// --- Page Content Wrapper ---

const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative z-10"
  >
    {children}
  </motion.div>
);

// --- Footer ---

const Footer = () => (
  <footer className="bg-[#030408] border-t border-white/5 pt-24 pb-12 px-8 mt-auto">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Product</h4>
          <ul className="space-y-4 text-sm text-[#6e6e8a]">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm text-[#6e6e8a]">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm text-[#6e6e8a]">
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#818cf8]/20 hover:text-[#818cf8] transition-all"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#818cf8]/20 hover:text-[#818cf8] transition-all"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#818cf8]/20 hover:text-[#818cf8] transition-all"><Youtube className="h-5 w-5" /></a>
            <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#818cf8]/20 hover:text-[#818cf8] transition-all"><Github className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-[#818cf8]" />
          <span className="text-xl font-black text-white tracking-tighter">AIOM</span>
          <span className="text-[10px] text-[#6e6e8a] ml-4 font-bold uppercase tracking-widest">© 2026 AIOM. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-8 text-[11px] font-bold text-[#6e6e8a] uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span>Built in Dominica 🇩🇲</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onStartFree, onLogin }: { onStartFree: () => void, onLogin: () => void }) => (
  <ContentWrapper>
    <HomeHero onStartFree={onStartFree} onLogin={onLogin} />
    <HomePainPoints />
    <SolutionStatement />
    <HowItWorksBrief />
    <AgentGrid />
    <ImpactNumbers />
    <section className="py-32 px-4 text-center">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to stop being the bottleneck?</h2>
        <p className="text-[#c8c8d8] text-xl mb-12">Your AI team is waiting. Deploy in 60 seconds. No credit card required. Free for 14 days.</p>
        <Button className="bg-[#818cf8] hover:bg-[#6366f1] px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-600/30">
          Start Free Trial <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </section>
  </ContentWrapper>
);

const FeaturesPage = () => (
  <ContentWrapper>
    <section className="pt-24 pb-32 text-center px-4">
      <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6 block">FEATURES</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Everything your business needs.</h1>
      <p className="text-[#c8c8d8] text-xl max-w-2xl mx-auto leading-relaxed">AIOM replaces 5 dashboards, 3 spreadsheets, and that one person who remembers everything.</p>
    </section>

    {[
      { 
        eyebrow: "REAL-TIME INTELLIGENCE", 
        title: "See everything. Act on what matters.", 
        items: ["Live KPIs — revenue, tickets, pipeline", "AI Insight Bar — risk alerts", "Attention Heatmap — where to focus", "Approval Queue — one-click decisions"],
        image: "https://images.unsplash.com/photo-1720754879438-b8ac93eaaa8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBncmlkJTIwZnV0dXJpc3RpYyUyMGxhbmRzY2FwZSUyMGRhcmt8ZW58MXx8fHwxNzcwNDU0NDQyfDA"
      },
      { 
        eyebrow: "MANAGE AI LIKE EMPLOYEES", 
        title: "Your team works 24/7. Manage from one screen.", 
        items: ["Visual Org Chart", "Autonomy Controls — 5 levels", "Directives — natural language", "Performance Tracking"],
        image: "https://images.unsplash.com/photo-1720754879438-b8ac93eaaa8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBncmlkJTIwZnV0dXJpc3RpYyUyMGxhbmRzY2FwZSUyMGRhcmt8ZW58MXx8fHwxNzcwNDU0NDQyfDA",
        reverse: true 
      },
      { 
        eyebrow: "STOP CHASING INVOICES", 
        title: "AI chases the money. You approve the emails.", 
        items: ["Cash Position — real-time", "AR Aging Chart", "Auto-Collections pipeline", "One-Click Approve"],
        image: "https://images.unsplash.com/photo-1720754879438-b8ac93eaaa8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBncmlkJTIwZnV0dXJpc3RpYyUyMGxhbmRzY2FwZSUyMGRhcmt8ZW58MXx8fHwxNzcwNDU0NDQyfDA"
      }
    ].map((feature, i) => (
      <section key={i} className="py-24 px-4 overflow-hidden">
        <div className={`max-w-[1200px] mx-auto flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}>
          <div className="flex-1 space-y-8">
            <span className="text-[11px] font-black text-[#818cf8] uppercase tracking-[0.3em]">{feature.eyebrow}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{feature.title}</h2>
            <div className="space-y-4">
              {feature.items.map((item, j) => (
                <div key={j} className="flex items-center gap-3">
                   <div className="h-5 w-5 rounded-full bg-[#818cf8]/20 flex items-center justify-center">
                     <Check className="h-3 w-3 text-[#818cf8]" />
                   </div>
                   <span className="text-[#c8c8d8] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
             <div className="relative">
                <div className="absolute inset-0 bg-[#818cf8]/20 blur-[100px] -z-10 rounded-full" />
                <ImageWithFallback 
                  src={feature.image} 
                  className="rounded-2xl border border-white/10 shadow-2xl rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500" 
                  alt={feature.title} 
                />
             </div>
          </div>
        </div>
      </section>
    ))}
  </ContentWrapper>
);

const PricingPage = ({ onStartFree }: { onStartFree: () => void }) => (
  <ContentWrapper>
    <section className="py-24 px-4 bg-[#f8f9fc] text-center text-[#111827]">
      <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6 block">PRICING</span>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8">Simple pricing. Start free.</h1>
      
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        {[
          { name: "Starter", price: "$49", features: ["3 AI Agents", "1 User", "Basic auto", "Email support"] },
          { name: "Growth", price: "$149", features: ["6 AI Agents", "5 Users", "Full automation", "Priority support", "What-If Engine"], popular: true },
          { name: "Enterprise", price: "Custom", features: ["Unlimited Agents", "Unlimited Users", "SLA Guarantee", "Dedicated Support"] }
        ].map((plan, i) => (
          <div key={i} className={`relative p-10 rounded-2xl border ${plan.popular ? 'bg-white border-[#818cf8] shadow-2xl scale-105 z-10' : 'bg-white border-[#e5e7eb]'} flex flex-col text-left`}>
            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#818cf8] text-white font-bold h-7 px-4">MOST POPULAR</Badge>}
            <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-mono font-black">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-gray-500 font-bold">/mo</span>}
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Check className="h-4 w-4 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
            <Button onClick={onStartFree} className={`w-full h-12 rounded-xl font-bold ${plan.popular ? 'bg-[#818cf8] hover:bg-[#6366f1]' : 'bg-gray-900 hover:bg-black'}`}>
              {plan.price === "Custom" ? "Contact Us" : "Start Free Trial"}
            </Button>
          </div>
        ))}
      </div>
    </section>

    <section className="py-32 px-4 max-w-[800px] mx-auto">
      <SectionHeader eyebrow="FAQ" headline="Frequently asked questions" subtitle="" />
      <div className="space-y-4">
        {[
          { q: "What ERP systems does AIOM support?", a: "Odoo, QuickBooks, Xero, Zoho. More coming. Custom API for others." },
          { q: "How long does setup take?", a: "60 seconds. Connect, scan, deploy. No migration required." },
          { q: "Is my data safe?", a: "Your data stays in your ERP. AIOM reads via API. SOC 2 compliance roadmap." },
          { q: "Can AI make mistakes?", a: "AI suggests, you approve. Autonomy levels give you full control." }
        ].map((faq, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="font-bold text-white mb-2">{faq.q}</h4>
            <p className="text-[#6e6e8a] text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  </ContentWrapper>
);

const AboutPage = () => (
  <ContentWrapper>
    <section className="py-24 px-4 text-center">
      <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6 block">ABOUT AIOM</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">AI should do the boring stuff.</h1>
    </section>

    <section className="py-24 px-4 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-20">
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold text-white">The AIOM Origin Story</h2>
        <p className="text-[#c8c8d8] leading-relaxed">AIOM started as an internal tool at EPIC Communications, a telecom company in Dominica, Caribbean. We were drowning — 250 open tasks, $32K overdue, tickets falling through cracks. Sound familiar?</p>
        <p className="text-[#c8c8d8] leading-relaxed">So we built an AI operations layer. It worked. Now we're making it available to every business.</p>
      </div>
      <div className="flex-1">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1720754879438-b8ac93eaaa8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBncmlkJTIwZnV0dXJpc3RpYyUyMGxhbmRzY2FwZSUyMGRhcmt8ZW58MXx8fHwxNzcwNDU0NDQyfDA" 
          className="rounded-3xl shadow-2xl border border-white/10" 
          alt="Dominica"
        />
      </div>
    </section>

    <section className="py-32 px-4 text-center">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <GlassCard className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-6 border-2 border-[#818cf8]">
            <AvatarImage src="https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwY2VvJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcwNDU0NDQyfDA" />
            <AvatarFallback>EG</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-white">Eric Giraud</h3>
          <span className="text-[#818cf8] font-bold text-xs uppercase tracking-widest mb-4">CEO & Founder</span>
          <p className="text-[#6e6e8a] text-sm">Built EPIC from the ground up. 15+ years in Caribbean telecom.</p>
        </GlassCard>
        
        <GlassCard className="flex flex-col items-center border-[#818cf8]/20">
          <div className="h-24 w-24 rounded-full bg-[#818cf8]/10 border-2 border-dashed border-[#818cf8] flex items-center justify-center mb-6">
            <Cpu className="h-10 w-10 text-[#818cf8]" />
          </div>
          <h3 className="text-xl font-bold text-white">ARC</h3>
          <span className="text-[#818cf8] font-bold text-xs uppercase tracking-widest mb-4">AI COO</span>
          <p className="text-[#6e6e8a] text-sm">Runs operations 24/7. Never sleeps. Never forgets. First AI team member.</p>
        </GlassCard>
      </div>
    </section>
  </ContentWrapper>
);

// --- Additional Pages ---

const HowItWorksPage = () => (
  <ContentWrapper>
    <section className="pt-24 pb-32 text-center px-4">
      <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6 block">HOW IT WORKS</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">From zero to AI-powered in 60 seconds.</h1>
      <p className="text-[#c8c8d8] text-xl max-w-2xl mx-auto">No consultants. No training. No migration. Plug in your existing ERP and go.</p>
    </section>

    <section className="py-24 px-4 max-w-[1200px] mx-auto">
      <div className="space-y-32">
        {[
          { 
            step: "1", 
            title: "Connect", 
            time: "30 seconds", 
            desc: "Plug in your Odoo, QuickBooks, Xero, or any supported ERP. One URL. One API key. That's it.",
            icon: "🔌"
          },
          { 
            step: "2", 
            title: "Scan", 
            time: "15 seconds", 
            desc: "AI instantly scans your entire business — contacts, tickets, invoices, tasks, pipeline. It finds what needs attention instantly.",
            icon: "🔍"
          },
          { 
            step: "3", 
            title: "Choose Your Comfort Level", 
            time: "Setup Preference", 
            desc: "Start cautious. AI reads and reports. As trust builds, increase autonomy. You're always in control.",
            icon: "🎚️"
          },
          { 
            step: "4", 
            title: "Deploy", 
            time: "15 seconds", 
            desc: "Your AI team goes live. They start triaging tickets, flagging overdue invoices, and monitoring your pipeline — immediately.",
            icon: "���"
          }
        ].map((item, i) => (
          <div key={i} className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
             <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#818cf8] flex items-center justify-center font-black text-white shadow-xl shadow-indigo-600/20">
                    {item.step}
                  </div>
                  <Badge variant="outline" className="border-[#818cf8]/30 text-[#818cf8] uppercase tracking-widest font-black text-[10px]">{item.time}</Badge>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white">{item.title}</h2>
                <p className="text-[#c8c8d8] text-lg leading-relaxed">{item.desc}</p>
             </div>
             <div className="flex-1 w-full">
                <GlassCard className="p-0 overflow-hidden border-[#818cf8]/10" hover={false}>
                   <div className="h-64 md:h-80 bg-gradient-to-br from-[#1a1b3a] to-[#0a0b18] flex items-center justify-center relative">
                      <span className="text-8xl filter blur-[1px] opacity-20 absolute">{item.icon}</span>
                      <span className="text-8xl relative z-10">{item.icon}</span>
                      <div className="absolute inset-0 bg-indigo-500/5 backdrop-blur-[2px]" />
                   </div>
                </GlassCard>
             </div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-32 px-4">
      <div className="max-w-[1000px] mx-auto text-center">
        <SectionHeader eyebrow="THE TRUST TIMELINE" headline="The evolution of autonomy" subtitle="Start cautious, build trust, then let AI take the wheel." />
        <div className="relative mt-20 pt-12 pb-24">
           {/* Horizontal line for desktop */}
           <div className="hidden lg:block absolute top-[50%] left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-[#818cf8] to-emerald-500 rounded-full opacity-20" />
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { time: "Week 1", title: "AI reads & reports", quote: "I see 67 tickets. Here's the breakdown.", color: "text-amber-500" },
               { time: "Week 2-3", title: "AI suggests actions", quote: "I recommend escalating these 5 tickets.", color: "text-[#818cf8]" },
               { time: "Week 4+", title: "AI acts, you audit", quote: "I closed 3 stale tickets and sent 2 reminders.", color: "text-indigo-400" },
               { time: "Month 2+", title: "Full autonomous", quote: "Business running smoothly. Here's your report.", color: "text-emerald-500" }
             ].map((node, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`h-4 w-4 rounded-full bg-black border-4 border-current ${node.color} mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                  <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-2">{node.time}</div>
                  <h4 className="text-white font-bold mb-4">{node.title}</h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-[11px] text-[#c8c8d8]">"{node.quote}"</div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  </ContentWrapper>
);

const UseCasesPage = () => (
  <ContentWrapper>
    <section className="pt-24 pb-32 text-center px-4">
      <span className="text-[13px] font-bold text-[#818cf8] uppercase tracking-[2px] mb-6 block">USE CASES</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">AIOM works for any business that uses an ERP.</h1>
      <p className="text-[#c8c8d8] text-xl max-w-2xl mx-auto">From telecom to retail to professional services.</p>
    </section>

    <section className="py-24 px-4 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: "📡", name: "IT / Telecom", items: ["Network monitoring", "Ticket triage", "Field svc dispatch"] },
          { icon: "🏗️", name: "Construction & Field Svc", items: ["Job tracking", "Equipment tracking", "Crew scheduling", "Invoice follow-up"] },
          { icon: "🛒", name: "Retail / eCommerce", items: ["Order mgmt", "Customer support", "Inventory alerts", "Returns processing"] },
          { icon: "⚖️", name: "Professional Services", items: ["Client mgmt", "Billing follow-up", "Project tracking", "Compliance reminders"] },
          { icon: "🏥", name: "Healthcare / Clinics", items: ["Appointment scheduling", "Billing follow-up", "Patient follow-up"] },
          { icon: "🎨", name: "Agencies / Consulting", items: ["Project delivery", "Time tracking", "Invoicing", "Client comm"] }
        ].map((useCase, i) => (
          <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#818cf8]/30 hover:-translate-y-2 transition-all">
            <span className="text-4xl mb-6 block">{useCase.icon}</span>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{useCase.name}</h3>
            <ul className="space-y-2">
              {useCase.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-[#c8c8d8]">
                  <div className="h-1 w-1 rounded-full bg-[#818cf8]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className="py-32 px-4 text-center relative overflow-hidden">
       <div className="absolute inset-0 bg-[#818cf8]/5 -z-10" />
       <div className="max-w-[800px] mx-auto space-y-8">
          <p className="text-2xl md:text-3xl font-light text-white leading-relaxed italic">
            "We didn't build AIOM in a lab. We built it in a Caribbean telecom company with 13 employees, 500+ clients, and not enough hours in the day. Now we're sharing it."
          </p>
          <Button className="bg-[#818cf8] hover:bg-[#6366f1] px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-600/30">
            Start Free Trial <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
       </div>
    </section>
  </ContentWrapper>
);

const ContactPage = () => (
  <ContentWrapper>
    <section className="pt-24 pb-32 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">See AIOM run your business.</h1>
      <p className="text-[#c8c8d8] text-xl max-w-2xl mx-auto">Book a 15-minute demo or start your free trial.</p>
    </section>

    <section className="py-24 px-4 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <GlassCard className="p-10">
        <h3 className="text-2xl font-bold text-white mb-8">Request a Demo</h3>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Request sent!"); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">First Name</label>
              <Input className="bg-white/5 border-white/10 rounded-xl h-12" placeholder="Eric" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Name</label>
              <Input className="bg-white/5 border-white/10 rounded-xl h-12" placeholder="Giraud" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Address</label>
            <Input type="email" className="bg-white/5 border-white/10 rounded-xl h-12" placeholder="eric@epic.ai" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Company Name</label>
            <Input className="bg-white/5 border-white/10 rounded-xl h-12" placeholder="EPIC Communications" required />
          </div>
          <Button type="submit" className="w-full h-14 bg-[#818cf8] hover:bg-[#6366f1] text-lg font-bold rounded-xl shadow-lg shadow-indigo-600/20">
            Request Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </GlassCard>

      <div className="space-y-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Direct Contact</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[#c8c8d8] hover:text-[#818cf8] transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#818cf8]/10"><Globe className="h-5 w-5" /></div>
              <span className="font-bold">hello@aiom.ai</span>
            </div>
            <div className="flex items-center gap-4 text-[#c8c8d8] hover:text-[#818cf8] transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#818cf8]/10"><Monitor className="h-5 w-5" /></div>
              <span className="font-bold">+1 767-818-3742</span>
            </div>
            <div className="flex items-center gap-4 text-[#c8c8d8] hover:text-[#818cf8] transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#818cf8]/10"><Briefcase className="h-5 w-5" /></div>
              <span className="font-bold">Roseau, Dominica, Caribbean</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
           <h4 className="text-sm font-bold text-white uppercase tracking-widest">Join the Community</h4>
           <div className="flex gap-4">
              <Button variant="outline" className="h-12 border-white/10 text-xs font-bold gap-2 px-6 rounded-xl hover:bg-white/5"><Github className="h-4 w-4" /> Community</Button>
              <Button variant="outline" className="h-12 border-white/10 text-xs font-bold gap-2 px-6 rounded-xl hover:bg-white/5"><MessageSquare className="h-4 w-4" /> Discord</Button>
           </div>
        </div>
      </div>
    </section>
  </ContentWrapper>
);

// --- Main App Component ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<NavTab>('Home');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll to top on tab change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleStartFree = () => {
    if (isLoggedIn) {
      setActiveTab('Pricing'); // Post-login upgrade path
    } else {
      setActiveTab('Contact');
    }
    toast.info("Navigating to setup...");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setActiveTab('Home');
    toast.success("Welcome back, Commander.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('Home');
    toast.info("Signed out.");
  };

  return (
    <div className="min-h-screen bg-[#05060f] text-white selection:bg-[#818cf8]/30 flex overflow-hidden font-inter">
      <AmbientOrbs />
      
      {isLoggedIn && (
        <SideNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onStartFree={handleStartFree} 
          onLogout={handleLogout} 
          isLoggedIn={isLoggedIn}
        />
      )}

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 md:hidden">
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-[#818cf8]" />
            <span className="text-xl font-black text-white tracking-tighter">AIOM</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowLogin(!showLogin)}><Menu className="h-6 w-6" /></Button>
        </header>

        {/* Marketing Top Nav (Only visible when logged out and NOT showing login screen) */}
        {!isLoggedIn && !showLogin && (
          <MarketingTopNav 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogin={() => setShowLogin(true)} 
          />
        )}

        <main ref={scrollRef} className={`flex-1 overflow-y-auto custom-scrollbar scroll-smooth ${!isLoggedIn && !showLogin ? 'pt-20' : ''}`}>
          <AnimatePresence mode="wait">
            {showLogin ? (
              <LoginPage key="login" onLogin={handleLogin} onBack={() => setShowLogin(false)} />
            ) : (
              <>
                {activeTab === 'Home' && (
                  isLoggedIn ? <DashboardHome key="dash-home" /> : <HomePage key="home" onStartFree={handleStartFree} onLogin={() => setShowLogin(true)} />
                )}
                {activeTab === 'Features' && (
                  isLoggedIn ? <DashboardAgents key="dash-agents" /> : <FeaturesPage key="features" onStartFree={handleStartFree} />
                )}
                {activeTab === 'ARCChat' && <DashboardARCChat key="dash-arcchat" />}
                {activeTab === 'Analytics' && <DashboardAnalytics key="dash-analytics" />}
                {activeTab === 'Playbooks' && <DashboardPlaybooks key="dash-playbooks" />}
                {activeTab === 'Network' && <DashboardNetwork key="dash-network" />}
                {activeTab === 'Settings' && <DashboardSettings key="dash-settings" />}
                {activeTab === 'How It Works' && (
                  isLoggedIn ? <DashboardERP key="dash-erp" /> : <HowItWorksPage key="howitworks" onStartFree={handleStartFree} />
                )}
                {activeTab === 'Pricing' && <PricingPage key="pricing" onStartFree={handleStartFree} />}
                {activeTab === 'Use Cases' && <UseCasesPage key="usecases" onStartFree={handleStartFree} />}
                {activeTab === 'About' && (
                  isLoggedIn ? <DashboardDirectory key="dash-directory" /> : <AboutPage key="about" onStartFree={handleStartFree} />
                )}
                {activeTab === 'Onboard' && (
                  <DashboardOnboard key="dash-onboard" onComplete={() => setActiveTab('Home')} />
                )}
                {activeTab === 'Contact' && <ContactPage key="contact" />}
                
                {/* Fallback for other tabs */}
                {!['Home', 'Features', 'How It Works', 'Pricing', 'Use Cases', 'About', 'Contact', 'Analytics', 'Playbooks', 'Network', 'Settings', 'Onboard'].includes(activeTab) && (
                  <ContentWrapper key="other">
                    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">{activeTab}</h1>
                      <p className="text-[#c8c8d8] text-xl max-w-xl mx-auto mb-12">This section is being deployed to the AIOM marketing matrix. The intelligence agents are finalizing the content for {activeTab}.</p>
                      <Button onClick={() => setActiveTab('Home')} className="bg-[#818cf8] hover:bg-[#6366f1] h-12 px-8 rounded-xl font-bold">Back to Base Intelligence</Button>
                    </section>
                  </ContentWrapper>
                )}
              </>
            )}
          </AnimatePresence>
          {!showLogin && !isLoggedIn && <Footer />}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
