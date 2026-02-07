import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-23a42f8a/health", (c) => {
  return c.json({ status: "ok" });
});

// Dashboard Data endpoints
app.get("/make-server-23a42f8a/sync", async (c) => {
  try {
    const data = await kv.get("aiom_data");
    if (!data) {
      const initialData = {
        stats: {
          revenue: "$45,231",
          helpdesk: "12",
          network: "142/150",
          overdue: "$8,420",
          pipeline: "$124,500",
          tasks: "42"
        },
        insights: [
          "3 clients have both overdue invoices and open support tickets — cross-referencing now",
          "Field service backlog grew 12% this week. 5 tasks are past 30 days.",
          "Sales pipeline has no new leads in 8 days. Consider outreach campaign."
        ],
        approvals: [
          { id: '1', category: 'Finance', count: 3, label: 'collection emails pending send' },
          { id: '2', category: 'Support', count: 2, label: 'escalations needing decision' },
          { id: '3', category: 'Sales', count: 1, label: 'deal requires owner intervention' }
        ],
        stream: [
          { id: 's1', time: '2m ago', agent: 'Support', icon: 'ticket', action: 'triaged ticket #1042', target: 'Priority: High', color: 'emerald' },
          { id: 's2', time: '15m ago', agent: 'Finance', icon: 'dollar-sign', action: 'sent reminder to Acme Corp', target: '($2,400 overdue)', color: 'blue' },
          { id: 's3', time: '1h ago', agent: 'Sales', icon: 'trending-up', action: 'flagged deal "Widget Co"', target: 'as stale (45 days)', color: 'purple' }
        ],
        heatmap: [
          { name: 'Support', level: 'high', value: 80 },
          { name: 'Finance', level: 'medium', value: 45 },
          { name: 'Sales', level: 'low', value: 20 },
          { name: 'Ops', level: 'medium', value: 55 },
          { name: 'HR', level: 'low', value: 15 },
          { name: 'IT', level: 'high', value: 90 }
        ],
        agents: [
          { id: 'arc', name: 'ARC', role: 'CEO Agent', status: 'active', health: 'green', uptime: '14 days', tasks: 1240, response: '0.2s' },
          { id: 'help', name: 'Helpdesk', role: 'Support Agent', status: 'active', health: 'green', parent: 'arc', tasks: 842, response: '1.5m' },
          { id: 'fin', name: 'Finance', role: 'Money Agent', status: 'active', health: 'green', parent: 'arc', tasks: 156, response: '4.2m' },
          { id: 'sales', name: 'Sales', role: 'Growth Agent', status: 'needs_attention', health: 'yellow', parent: 'arc', tasks: 89, response: '12m' },
          { id: 'ops', name: 'Ops', role: 'Field Agent', status: 'active', health: 'green', parent: 'arc', tasks: 432, response: '5.8m' }
        ],
        work: {
          tickets: [
            { id: 't1', title: 'Login portal broken', client: 'Acme Corp', priority: 'high', status: 'In Progress', age: '2h' },
            { id: 't2', title: 'New user setup', client: 'Global Tech', priority: 'medium', status: 'New', age: '1d' },
            { id: 't3', title: 'Database optimization', client: 'Internal', priority: 'low', status: 'Waiting', age: '3d' }
          ],
          tasks: [
            { id: 'tk1', title: 'Update security protocols', team: 'IT', status: 'To Do', progress: 0 },
            { id: 'tk2', title: 'Client onboarding', team: 'Success', status: 'Review', progress: 90 }
          ],
          deals: [
            { id: 'd1', title: 'Cloud Migration', client: 'Nexus Inc', amount: '$45,000', stage: 'Proposal', prob: 65 },
            { id: 'd2', title: 'SLA Renewal', client: 'EcoSystems', amount: '$12,000', stage: 'Qualified', prob: 80 }
          ]
        },
        money: {
          cash: '$242,500',
          inflow: '$85,000',
          aging: [
            { label: 'Current', value: 156000, color: 'emerald' },
            { label: '31-60d', value: 45000, color: 'amber' },
            { label: '61-90d', value: 12000, color: 'orange' },
            { label: '90d+', value: 8420, color: 'rose' }
          ]
        },
        people: {
          customers: [
            { id: 'c1', name: 'Acme Corp', person: 'Alex Rivera', balance: '$2,400', tickets: 2, health: 'yellow' },
            { id: 'c2', name: 'Global Tech', person: 'Sarah Chen', balance: '$0', tickets: 1, health: 'green' }
          ],
          team: [
            { id: 'tm1', name: 'Jordan Smith', role: 'Admin', load: 85, tasks: 12, completed: 45 },
            { id: 'tm2', name: 'Casey V', role: 'Support', load: 45, tasks: 5, completed: 89 }
          ]
        }
      };
      return c.json(initialData);
    }
    return c.json(data);
  } catch (err) {
    console.log(`Error syncing data: ${err}`);
    return c.json({ error: "Failed to sync data" }, 500);
  }
});

app.post("/make-server-23a42f8a/sync", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("aiom_data", body);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error saving sync: ${err}`);
    return c.json({ error: "Failed to save sync" }, 500);
  }
});

Deno.serve(app.fetch);