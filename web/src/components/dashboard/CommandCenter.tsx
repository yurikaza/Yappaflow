"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Instagram, ArrowUpRight, Clock, Rocket, CheckCircle2,
  Radio, Plus, TrendingUp, Pin, PinOff, Trash2, X, Loader2,
} from "lucide-react";
import type { DashboardView } from "./DashboardShell";
import {
  getSignals, getProjects, getDashboardStats,
  createSignal, createProject, toggleSignalDashboard, deleteSignal, deleteProject,
  type Signal, type Project, type DashboardStats,
} from "@/lib/dashboard-api";

const PHASE_STYLE: Record<string, { label: string; cls: string }> = {
  listening: { label: "Listening",  cls: "bg-blue-50 text-blue-600"     },
  building:  { label: "Building",   cls: "bg-amber-50 text-amber-600"   },
  deploying: { label: "Deploying",  cls: "bg-orange-50 text-[#F97316]"  },
  live:      { label: "Live",       cls: "bg-green-50 text-green-600"   },
};

const PHASE_BAR: Record<string, string> = {
  listening: "bg-blue-400",
  building:  "bg-amber-400",
  deploying: "bg-[#F97316]",
  live:      "bg-green-500",
};

const PLATFORM_COLOR: Record<string, string> = {
  shopify:   "#96BF48",
  wordpress: "#21759B",
  webflow:   "#4353FF",
  ikas:      "#F97316",
  custom:    "#737373",
};

// ── Add Signal modal ───────────────────────────────────────────────────────────
function AddSignalModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: Signal) => void }) {
  const [form, setForm] = useState({ platform: "whatsapp", senderName: "", sender: "", preview: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!form.senderName || !form.sender || !form.preview) { setErr("All fields required"); return; }
    setLoading(true);
    try {
      const sig = await createSignal(form);
      onAdd(sig);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl bg-white border border-[#EFEFEF] p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-bold">Add Signal</h2>
          <button onClick={onClose}><X size={16} className="text-[#737373]" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">Platform</label>
            <div className="mt-1.5 flex gap-2">
              {["whatsapp", "instagram"].map((p) => (
                <button key={p} onClick={() => setForm({ ...form, platform: p })}
                  className={`flex-1 rounded-lg border py-2 text-[12px] font-semibold capitalize transition-all ${form.platform === p ? "border-[#F97316] bg-[#FFF3EE] text-[#F97316]" : "border-[#EFEFEF] text-[#737373]"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {[
            { key: "senderName", label: "Client Name",    placeholder: "Ahmet Yılmaz" },
            { key: "sender",     label: "Handle / Phone", placeholder: form.platform === "whatsapp" ? "+905551234567" : "@butikmode" },
            { key: "preview",    label: "Message",        placeholder: "First message from the client..." },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">{label}</label>
              <input value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="mt-1.5 w-full rounded-lg border border-[#EFEFEF] bg-[#F8F8F8] px-3 py-2 text-[13px] text-[#0A0A0A] placeholder-[#C0C0C0] outline-none focus:border-[#F97316]" />
            </div>
          ))}
          {err && <p className="text-[11px] text-red-500">{err}</p>}
          <button onClick={submit} disabled={loading}
            className="w-full rounded-xl bg-[#0A0A0A] py-2.5 text-[13px] font-bold text-white hover:opacity-80 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {loading ? "Adding..." : "Add Signal"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Add Project modal ──────────────────────────────────────────────────────────
function AddProjectModal({ signals, onClose, onAdd }: { signals: Signal[]; onClose: () => void; onAdd: (p: Project) => void }) {
  const [form, setForm] = useState({ name: "", clientName: "", platform: "shopify", dueDate: "", notes: "", signalId: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!form.name || !form.clientName) { setErr("Name and client name are required"); return; }
    setLoading(true);
    try {
      const proj = await createProject({
        name:       form.name,
        clientName: form.clientName,
        platform:   form.platform,
        dueDate:    form.dueDate || undefined,
        notes:      form.notes   || undefined,
        signalId:   form.signalId || undefined,
      });
      onAdd(proj);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl bg-white border border-[#EFEFEF] p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-bold">New Project</h2>
          <button onClick={onClose}><X size={16} className="text-[#737373]" /></button>
        </div>
        <div className="space-y-3">
          {[
            { key: "name",       label: "Project Name",   placeholder: "Butik Mode Website" },
            { key: "clientName", label: "Client Name",    placeholder: "Ahmet Yılmaz"       },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">{label}</label>
              <input value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="mt-1.5 w-full rounded-lg border border-[#EFEFEF] bg-[#F8F8F8] px-3 py-2 text-[13px] outline-none focus:border-[#F97316]" />
            </div>
          ))}
          <div>
            <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">Platform</label>
            <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-[#EFEFEF] bg-[#F8F8F8] px-3 py-2 text-[13px] outline-none focus:border-[#F97316]">
              {["shopify", "wordpress", "webflow", "ikas", "custom"].map((p) => (
                <option key={p} value={p} className="capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
          </div>
          {signals.length > 0 && (
            <div>
              <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">Link Signal (optional)</label>
              <select value={form.signalId} onChange={(e) => setForm({ ...form, signalId: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-[#EFEFEF] bg-[#F8F8F8] px-3 py-2 text-[13px] outline-none focus:border-[#F97316]">
                <option value="">— None —</option>
                {signals.map((s) => (
                  <option key={s.id} value={s.id}>{s.senderName} ({s.platform})</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">Due Date</label>
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-[#EFEFEF] bg-[#F8F8F8] px-3 py-2 text-[13px] outline-none focus:border-[#F97316]" />
          </div>
          {err && <p className="text-[11px] text-red-500">{err}</p>}
          <button onClick={submit} disabled={loading}
            className="w-full rounded-xl bg-[#0A0A0A] py-2.5 text-[13px] font-bold text-white hover:opacity-80 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
interface Props { setView: (v: DashboardView) => void; }

export function CommandCenter({ setView }: Props) {
  const [signals,  setSignals]  = useState<Signal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats,    setStats]    = useState<DashboardStats | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [showAddSignal,  setShowAddSignal]  = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [sigs, projs, st] = await Promise.all([getSignals(), getProjects(), getDashboardStats()]);
      setSignals(sigs);
      setProjects(projs);
      setStats(st);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleTogglePin = async (sig: Signal) => {
    try {
      const updated = await toggleSignalDashboard(sig.id, !sig.isOnDashboard);
      setSignals((prev) => prev.map((s) => s.id === updated.id ? updated : s));
    } catch (e) { console.error(e); }
  };

  const handleDeleteSignal = async (id: string) => {
    try {
      await deleteSignal(id);
      setSignals((prev) => prev.filter((s) => s.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const dashboardSignals = signals.filter((s) => s.isOnDashboard);

  const STAT_CARDS = [
    { label: "Total Signals",    value: stats?.totalSignals      ?? "—", sub: "All incoming",       dark: true  },
    { label: "New",              value: stats?.newSignals         ?? "—", sub: "Needs attention",    dark: false },
    { label: "Active Projects",  value: stats?.activeProjects     ?? "—", sub: "In progress",        dark: false },
    { label: "Live Sites",       value: stats?.liveProjects       ?? "—", sub: "Successfully deployed", dark: false },
  ];

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#B5B5B5]" />
    </div>
  );

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-[#737373]">Real-time agency overview</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddProject(true)}
              className="flex items-center gap-2 rounded-xl bg-[#0A0A0A] px-4 py-2 text-[13px] font-bold text-white hover:opacity-80 transition-opacity">
              <Plus size={14} />New Project
            </button>
            <button onClick={() => setView("engine")}
              className="flex items-center gap-2 rounded-xl border border-[#EFEFEF] bg-white px-4 py-2 text-[13px] font-medium text-[#737373] hover:bg-[#F8F8F8] transition-colors">
              Import Data
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-4 gap-4">
          {STAT_CARDS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`relative rounded-2xl p-5 ${s.dark ? "bg-[#0A0A0A] text-white" : "bg-white border border-[#EFEFEF]"}`}>
              <button className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full ${s.dark ? "bg-white/10" : "bg-[#F5F5F5]"}`}>
                <ArrowUpRight size={12} className={s.dark ? "text-white" : "text-[#737373]"} />
              </button>
              <p className={`text-[12px] font-semibold mb-2 ${s.dark ? "text-white/60" : "text-[#737373]"}`}>{s.label}</p>
              <p className="text-4xl font-black tracking-tight">{s.value}</p>
              <div className={`mt-3 flex items-center gap-1.5 text-[11px] ${s.dark ? "text-white/50" : "text-[#B5B5B5]"}`}>
                <TrendingUp size={11} className="text-green-400" />
                <span>{s.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Active Signals — pinned only */}
          <div className="col-span-1 rounded-2xl bg-white border border-[#EFEFEF] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold">Active Signals</h2>
                {dashboardSignals.length > 0 && (
                  <span className="rounded-full bg-[#FFF3EE] px-2 py-0.5 text-[10px] font-bold text-[#F97316]">
                    {dashboardSignals.filter((s) => s.status === "new").length} new
                  </span>
                )}
              </div>
              <button onClick={() => setShowAddSignal(true)}
                className="flex items-center gap-1 rounded-lg border border-[#EFEFEF] px-2.5 py-1 text-[11px] font-semibold text-[#737373] hover:bg-[#F8F8F8]">
                <Plus size={11} />Add
              </button>
            </div>

            {dashboardSignals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]">
                  <MessageCircle size={18} className="text-[#C0C0C0]" />
                </div>
                <p className="text-[13px] font-semibold text-[#737373]">No pinned signals</p>
                <p className="mt-1 text-[11px] text-[#B5B5B5]">Add a signal and pin it to see it here</p>
                <button onClick={() => setShowAddSignal(true)}
                  className="mt-3 rounded-lg bg-[#F5F5F5] px-3 py-1.5 text-[11px] font-semibold text-[#737373] hover:bg-[#EFEFEF]">
                  + Add Signal
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {dashboardSignals.map((sig) => (
                    <motion.div key={sig.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -8 }}
                      className="group flex items-center gap-3">
                      <button onClick={() => setView("engine")}
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${sig.platform === "whatsapp" ? "bg-green-50" : "bg-pink-50"}`}>
                        {sig.platform === "whatsapp"
                          ? <MessageCircle size={13} className="text-green-500" />
                          : <Instagram     size={13} className="text-pink-500" />}
                      </button>
                      <button onClick={() => setView("engine")} className="flex-1 min-w-0 text-left">
                        <p className="text-[12px] font-semibold truncate">{sig.senderName}</p>
                        <p className="text-[11px] text-[#B5B5B5] truncate">{sig.preview}</p>
                      </button>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleTogglePin(sig)} title="Unpin"
                          className="flex h-6 w-6 items-center justify-center rounded hover:bg-[#F5F5F5]">
                          <PinOff size={11} className="text-[#B5B5B5]" />
                        </button>
                        <button onClick={() => handleDeleteSignal(sig.id)} title="Delete"
                          className="flex h-6 w-6 items-center justify-center rounded hover:bg-red-50">
                          <Trash2 size={11} className="text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* All unPinned signals below */}
            {signals.filter((s) => !s.isOnDashboard).length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#F5F5F5]">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#B5B5B5] mb-2">All Signals</p>
                <div className="space-y-2">
                  {signals.filter((s) => !s.isOnDashboard).map((sig) => (
                    <div key={sig.id} className="group flex items-center gap-2">
                      <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${sig.platform === "whatsapp" ? "bg-green-50" : "bg-pink-50"}`}>
                        {sig.platform === "whatsapp"
                          ? <MessageCircle size={10} className="text-green-400" />
                          : <Instagram     size={10} className="text-pink-400" />}
                      </div>
                      <p className="flex-1 text-[11px] text-[#737373] truncate">{sig.senderName}</p>
                      <button onClick={() => handleTogglePin(sig)} title="Pin to dashboard"
                        className="opacity-0 group-hover:opacity-100 flex h-5 w-5 items-center justify-center rounded hover:bg-[#F5F5F5] transition-opacity">
                        <Pin size={10} className="text-[#B5B5B5]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pipeline */}
          <div className="col-span-2 rounded-2xl bg-white border border-[#EFEFEF] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-bold">Project Pipeline</h2>
              <button onClick={() => setShowAddProject(true)}
                className="flex items-center gap-1 rounded-lg border border-[#EFEFEF] px-2.5 py-1 text-[11px] font-semibold text-[#737373] hover:bg-[#F8F8F8]">
                <Plus size={11} />New
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F5]">
                  <Rocket size={20} className="text-[#C0C0C0]" />
                </div>
                <p className="text-[13px] font-semibold text-[#737373]">No projects yet</p>
                <p className="mt-1 text-[11px] text-[#B5B5B5]">Create your first project to track it here</p>
                <button onClick={() => setShowAddProject(true)}
                  className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#0A0A0A] px-4 py-2 text-[12px] font-bold text-white hover:opacity-80">
                  <Plus size={13} /> New Project
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {projects.map((proj, i) => {
                    const meta = PHASE_STYLE[proj.phase] ?? { label: proj.phase, cls: "bg-gray-50 text-gray-500" };
                    const barCls = PHASE_BAR[proj.phase] ?? "bg-gray-400";
                    const color  = PLATFORM_COLOR[proj.platform] ?? "#737373";
                    return (
                      <motion.div key={proj.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group flex items-center gap-4 rounded-xl border border-[#F5F5F5] p-3 hover:border-[#EFEFEF] hover:bg-[#FAFAFA] transition-all">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white text-[10px] font-black"
                          style={{ backgroundColor: color }}>
                          {proj.platform[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <p className="text-[13px] font-semibold truncate">{proj.name}</p>
                            <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.cls}`}>{meta.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 rounded-full bg-[#F5F5F5] overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${proj.progress}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`h-1 rounded-full ${barCls}`} />
                            </div>
                            <span className="text-[10px] font-bold text-[#B5B5B5] flex-shrink-0">{proj.progress}%</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#B5B5B5]">
                            {proj.clientName}{proj.dueDate ? ` · Due ${new Date(proj.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : ""}
                          </p>
                        </div>
                        <button onClick={() => handleDeleteProject(proj.id)}
                          className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-red-50 transition-all">
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Quick stats bar */}
        {stats && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { icon: Clock,        label: "Completed this week", value: stats.completedThisWeek, color: "bg-green-50 text-green-600" },
              { icon: Radio,        label: "Active signals",      value: signals.filter((s) => s.status !== "ignored").length, color: "bg-blue-50 text-blue-600" },
              { icon: CheckCircle2, label: "Live sites",          value: stats.liveProjects,      color: "bg-[#FFF3EE] text-[#F97316]" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl bg-white border border-[#EFEFEF] px-5 py-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-[11px] text-[#B5B5B5]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddSignal && (
          <AddSignalModal
            onClose={() => setShowAddSignal(false)}
            onAdd={(sig) => { setSignals((prev) => [sig, ...prev]); setShowAddSignal(false); }}
          />
        )}
        {showAddProject && (
          <AddProjectModal
            signals={signals}
            onClose={() => setShowAddProject(false)}
            onAdd={(proj) => { setProjects((prev) => [proj, ...prev]); setShowAddProject(false); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
