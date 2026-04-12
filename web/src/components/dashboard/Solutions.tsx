"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Mail,
  BarChart3,
  Users,
  Calendar,
  Send,
  TrendingUp,
  Search,
  FileText,
  Target,
  ArrowUpRight,
  Check,
  Clock,
  Sparkles,
  Lock,
} from "lucide-react";

type SolutionTab = "social" | "email" | "seo" | "crm";

const TABS: { id: SolutionTab; label: string; icon: typeof Share2 }[] = [
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "email", label: "Email Marketing", icon: Mail },
  { id: "seo", label: "SEO & Analytics", icon: BarChart3 },
  { id: "crm", label: "CRM", icon: Users },
];

/* ── Social Media Management ── */
function SocialMediaTab() {
  const scheduled = [
    { platform: "Instagram", content: "New collection launch — 3 carousel images", time: "Today, 14:00", status: "scheduled" },
    { platform: "Twitter/X", content: "Behind the scenes of our latest project", time: "Today, 16:30", status: "scheduled" },
    { platform: "LinkedIn", content: "Case study: How we built butikmode.com", time: "Tomorrow, 09:00", status: "draft" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Scheduled Posts", value: "24", icon: Calendar, color: "text-blue-400" },
          { label: "Published This Week", value: "12", icon: Send, color: "text-green-400" },
          { label: "Engagement Rate", value: "4.8%", icon: TrendingUp, color: "text-[#FF6B35]" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className={stat.color} />
              <span className="text-[10px] uppercase tracking-wider text-white/20">{stat.label}</span>
            </div>
            <span className="text-xl font-semibold text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-medium text-white">Content Calendar</h3>
          <button className="flex items-center gap-1.5 text-[11px] text-[#FF6B35] hover:text-[#FF6B35]/80">
            <Sparkles size={12} /> AI Generate Post
          </button>
        </div>
        <div className="space-y-2">
          {scheduled.map((post, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] hover:border-white/[0.08] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <Share2 size={13} className="text-white/30" />
                </div>
                <div>
                  <p className="text-[12px] text-white/70">{post.content}</p>
                  <p className="text-[10px] text-white/20">{post.platform} · {post.time}</p>
                </div>
              </div>
              <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                post.status === "scheduled" ? "bg-blue-500/10 text-blue-400" : "bg-white/[0.04] text-white/30"
              }`}>{post.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Email Marketing ── */
function EmailMarketingTab() {
  const campaigns = [
    { name: "Welcome Series", status: "active", sent: "2,340", opens: "68%", clicks: "12%" },
    { name: "Product Launch", status: "draft", sent: "—", opens: "—", clicks: "—" },
    { name: "Monthly Newsletter", status: "completed", sent: "5,120", opens: "42%", clicks: "8%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-medium text-white">Campaigns</h3>
        <button className="flex items-center gap-1.5 text-[11px] bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg hover:bg-[#FF6B35]/80">
          <Sparkles size={12} /> AI Create Campaign
        </button>
      </div>

      <div className="rounded-lg border border-white/[0.05] overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 bg-white/[0.02] border-b border-white/[0.05] text-[9px] uppercase tracking-wider text-white/20">
          <span>Campaign</span><span>Status</span><span>Sent</span><span>Opens</span><span>Clicks</span>
        </div>
        {campaigns.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-white/[0.03] last:border-0">
            <span className="text-[12px] text-white/70">{c.name}</span>
            <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
              c.status === "active" ? "bg-green-500/10 text-green-400" :
              c.status === "draft" ? "bg-white/[0.04] text-white/30" :
              "bg-blue-500/10 text-blue-400"
            }`}>{c.status}</span>
            <span className="text-[11px] text-white/30">{c.sent}</span>
            <span className="text-[11px] text-white/30">{c.opens}</span>
            <span className="text-[11px] text-white/30">{c.clicks}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Mail size={13} className="text-[#FF6B35]" />
          <span className="text-[11px] text-white/40">AI can generate email sequences from your client conversations automatically.</span>
        </div>
      </div>
    </div>
  );
}

/* ── SEO & Analytics ── */
function SeoAnalyticsTab() {
  const keywords = [
    { keyword: "fashion e-commerce turkey", position: 3, change: "+2", volume: "2.4K" },
    { keyword: "online store builder", position: 12, change: "+5", volume: "18K" },
    { keyword: "shopify agency istanbul", position: 1, change: "0", volume: "890" },
    { keyword: "web development automation", position: 8, change: "+3", volume: "3.1K" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {[
          { label: "Organic Traffic", value: "12.4K", change: "+18%", icon: TrendingUp },
          { label: "Keywords Tracked", value: "156", change: "+12", icon: Search },
          { label: "Avg. Position", value: "8.2", change: "+3.1", icon: Target },
          { label: "Pages Indexed", value: "342", change: "+24", icon: FileText },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className="text-white/20" />
              <span className="text-[10px] uppercase tracking-wider text-white/20">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white">{stat.value}</span>
              <span className="text-[10px] text-green-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[13px] font-medium text-white mb-3">Top Keywords</h3>
        <div className="rounded-lg border border-white/[0.05] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 bg-white/[0.02] border-b border-white/[0.05] text-[9px] uppercase tracking-wider text-white/20">
            <span>Keyword</span><span>Position</span><span>Change</span><span>Volume</span>
          </div>
          {keywords.map((kw, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-white/[0.03] last:border-0">
              <span className="text-[12px] text-white/70">{kw.keyword}</span>
              <span className="text-[11px] text-white font-medium w-8 text-center">{kw.position}</span>
              <span className={`text-[10px] w-8 text-center ${kw.change.startsWith("+") ? "text-green-400" : "text-white/30"}`}>{kw.change}</span>
              <span className="text-[11px] text-white/30 w-10 text-right">{kw.volume}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CRM & Client Management ── */
function CrmTab() {
  const clients = [
    { name: "Butik Mode", email: "ahmet@butikmode.com", status: "active", projects: 3, value: "₺24,500" },
    { name: "Cafe Istanbul", email: "elif@cafeist.com", status: "prospect", projects: 0, value: "₺8,000" },
    { name: "TechStart TR", email: "can@techstart.io", status: "active", projects: 2, value: "₺45,000" },
    { name: "Green Living", email: "selin@greenliving.co", status: "completed", projects: 1, value: "₺12,000" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Clients", value: "48", icon: Users, color: "text-white" },
          { label: "Active Projects", value: "12", icon: Target, color: "text-[#FF6B35]" },
          { label: "Revenue (MTD)", value: "₺124K", icon: TrendingUp, color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={13} className="text-white/20" />
              <span className="text-[10px] uppercase tracking-wider text-white/20">{stat.label}</span>
            </div>
            <span className={`text-xl font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-medium text-white">Client Pipeline</h3>
          <button className="text-[11px] text-[#FF6B35] hover:text-[#FF6B35]/80">+ Add Client</button>
        </div>
        <div className="rounded-lg border border-white/[0.05] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 bg-white/[0.02] border-b border-white/[0.05] text-[9px] uppercase tracking-wider text-white/20">
            <span>Client</span><span>Status</span><span>Projects</span><span>Value</span>
          </div>
          {clients.map((c, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer">
              <div>
                <p className="text-[12px] text-white/70">{c.name}</p>
                <p className="text-[10px] text-white/20">{c.email}</p>
              </div>
              <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                c.status === "active" ? "bg-green-500/10 text-green-400" :
                c.status === "prospect" ? "bg-[#FF6B35]/10 text-[#FF6B35]" :
                "bg-blue-500/10 text-blue-400"
              }`}>{c.status}</span>
              <span className="text-[11px] text-white/30 w-6 text-center">{c.projects}</span>
              <span className="text-[11px] text-white/50 font-medium">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Solutions Component ── */
export function Solutions() {
  const [tab, setTab] = useState<SolutionTab>("social");

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[15px] font-bold text-white">Solutions</h2>
        <p className="text-[11px] text-white/25 mt-0.5">AI-powered tools to grow your agency beyond website building</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/[0.05]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium transition-colors relative ${
              tab === t.id
                ? "text-[#FF6B35]"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
            {tab === t.id && (
              <motion.div
                layoutId="solutions-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "social" && <SocialMediaTab />}
          {tab === "email" && <EmailMarketingTab />}
          {tab === "seo" && <SeoAnalyticsTab />}
          {tab === "crm" && <CrmTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
