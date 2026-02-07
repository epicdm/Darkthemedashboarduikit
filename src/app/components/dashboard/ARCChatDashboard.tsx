import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Send, Sparkles } from "lucide-react";

const quickActions = [
  "Business summary",
  "Who needs attention?",
  "Revenue report",
  "Check Raffoul",
  "Open tickets",
  "Pipeline status",
];

const initialMessages = [
  {
    role: "arc" as const,
    text: "Good morning, Eric. Systems are nominal. Here's what matters:\n\n• **Revenue**: $124,500 MRR — stable, up 2.3% MoM\n• **Urgent**: Raffoul is 37 days overdue ($3,800). I've drafted a collection notice — needs your approval.\n• **Helpdesk**: 12 urgent tickets, 3 are SLA-critical\n• **Win**: MegaCorp payment received — $22,000 cleared\n\nWhat would you like to dig into?",
  },
];

const arcResponses: Record<string, string> = {
  "Business summary":
    "Here's today's snapshot:\n\n📈 **Revenue**: $124,500 MRR from subscriptions. $66,500 in payments received this month.\n📮 **Helpdesk**: 74 open tickets. 12 urgent. Hakeem is at 420% capacity — structural issue.\n🌐 **Network**: 142/173 devices online (82%). Sector 4 has intermittent issues — I auto-recovered the backup gateway.\n💰 **AR**: $28,400 overdue. Raffoul ($12K) and Prime Tech ($4.2K) are the biggest risks.\n📊 **Pipeline**: $64,200 in active deals. Caribbean Connect renewal is the priority — 45 days out.\n🔧 **Field Service**: 18-task backlog. 6 are critical.\n\nThe biggest risk right now is Raffoul. Three overdue invoices, declining engagement. Want me to draft an executive outreach?",
  "Who needs attention?":
    "Three things need your attention right now:\n\n1️⃣ **Raffoul** — 72% churn risk. $12K overdue across 3 invoices. No meeting in 30 days. Last ticket was a billing dispute. I recommend a personal call from you.\n\n2️⃣ **Hakeem's workload** — He has 63 of 67 helpdesk tickets (94%). That's 420% over capacity. If he gets sick or quits, helpdesk collapses. We need to hire or redistribute.\n\n3️⃣ **Sector 4 network** — 6 support tickets this week all trace back to intermittent Sector 4 failures. I recovered the gateway but the root cause is aging hardware. Field service has a parts request pending your approval.\n\nWhich one do you want to tackle first?",
  "Revenue report":
    "**Monthly Revenue Report — February 2026**\n\n| Metric | Value | Trend |\n|--------|-------|-------|\n| MRR (Subscriptions) | $124,500 | +2.3% |\n| UISP Services | $25,515 | Stable |\n| Payments Received | $66,500 | +18% |\n| New Invoices Sent | 14 | — |\n| Overdue AR | $28,400 | ⚠️ Up 12% |\n\n**Top Payers This Month**: MegaCorp ($22K), EPIC Corp ($35K), SunBridge ($9.5K)\n**Overdue Risk**: Raffoul ($12K), Prime Tech ($4.2K), Global Logistics ($3.2K)\n\nCollections pipeline is active — automated reminders recovered $8,200 so far. 4 clients still in escalation.\n\nWant me to generate the full PDF report or focus on a specific client?",
  "Check Raffoul":
    "**Client 360: Raffoul & Co (1985) LTD**\n\n🔴 Health: CRITICAL (Risk Score: 95/100)\n\n**Financial**:\n• 3 overdue invoices totaling $12,000\n• INV-1083: $8,200 (10 days overdue)\n• INV-1076: $3,800 (37 days overdue — in escalation)\n• Subscription: $3,911/mo (active but at risk)\n\n**Support**:\n• 1 open ticket — billing dispute from Jan 15\n• Last resolved ticket: Dec 28 (network issue)\n\n**Engagement**:\n• Last meeting: January 5 (32 days ago)\n• No email response since January 30\n• Account manager: Richard Mendes\n\n**AI Assessment**: Classic pre-churn pattern. Financial friction + declining communication + unresolved billing dispute. If Raffoul churns, that's $3,911/mo MRR loss + $12K AR write-off.\n\n**Recommended actions**:\n1. You call them personally this week (relationship reset)\n2. I send a collection notice for the $3,800 (37-day overdue)\n3. Richard schedules an in-person visit\n\nShall I draft the collection notice and schedule a reminder for you to call?",
};

export const ARCChatDashboard = () => {
  const [messages, setMessages] = React.useState(initialMessages);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setInput("");
    setMessages((m) => [...m, { role: "user" as const, text }]);
    setTyping(true);

    setTimeout(() => {
      const response =
        arcResponses[text] ||
        `Analyzing "${text}"...\n\nI've checked across all departments. Here's what I found:\n\n• **Helpdesk**: No direct matches\n• **Finance**: Checking AR and invoice records...\n• **CRM**: Searching pipeline and contacts...\n\nI'll have a full analysis ready in a moment. In the meantime, is there a specific department or client you'd like me to focus on?`;

      setMessages((m) => [...m, { role: "arc" as const, text: response }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="p-5 border-b border-white/5 flex items-center gap-3 shrink-0">
        <div className="relative">
          <div className="h-10 w-10 rounded-xl bg-[#818cf8] flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.5, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#34d399] border-2 border-[#05060f]"
          />
        </div>
        <div>
          <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">ARC</h2>
          <p className="text-[10px] text-[#818cf8] font-bold mt-0.5">Your business, one conversation away</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#818cf8] text-white rounded-br-sm"
                  : "bg-white/5 text-[#c8c8d8] border border-white/5 rounded-bl-sm"
              }`}
            >
              {msg.text.split(/(\*\*.*?\*\*)/).map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="font-bold text-white">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm p-4 flex items-center gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-2 flex gap-2 flex-wrap shrink-0">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => sendMessage(action)}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-[#c8c8d8] hover:text-white hover:border-[#818cf8]/30 hover:bg-[#818cf8]/10 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="h-3 w-3 text-[#818cf8]" />
            {action}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 shrink-0">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ARC anything about your business..."
            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 text-sm text-white placeholder:text-[#6e6e8a] focus:border-[#818cf8]/50 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-[#818cf8] hover:bg-[#6366f1] flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-[#818cf8]"
          >
            <Send className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
