"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Check, User, Bell, Shield, Link2, Loader2, Unlink, MessageCircle, Instagram } from "lucide-react";
import {
  getPlatformConnections, connectWhatsApp, connectInstagram, disconnectPlatform,
  type PlatformConnection,
} from "@/lib/dashboard-api";

// ── API Key field ──────────────────────────────────────────────────────────────

const API_FIELDS = [
  { id: "namecheap",  label: "Namecheap API Key",  service: "Domain registrar",  placeholder: "nc_api_xxxxxxxxxx",  color: "#E05C00" },
  { id: "hostinger",  label: "Hostinger API Key",  service: "Hosting provider",  placeholder: "hg_tok_xxxxxxxxxx",  color: "#7823DC" },
  { id: "iyzico",     label: "Iyzico API Key",     service: "Payment gateway",   placeholder: "sandbox-xxxxxxxxxx", color: "#00B4D8" },
];

const PREFERENCES = [
  { id: "push",  label: "Push Notifications", desc: "New signals & deployment alerts" },
  { id: "sound", label: "Sound Alerts",        desc: "Audio cue on new message"       },
  { id: "auto",  label: "Auto-Build",          desc: "Start building on intake end"   },
];

function ApiKeyField({ label, service, placeholder, color }: {
  label: string; service: string; placeholder: string; color: string;
}) {
  const [value, setValue]     = useState("");
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const connected = value.length > 6;

  return (
    <div className={[
      "rounded-xl border p-4 bg-white transition-all",
      focused ? "shadow-sm" : "border-[#EFEFEF]",
    ].join(" ")}
      style={focused ? { borderColor: color + "60" } : {}}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: color }} />
          <div>
            <p className="text-[13px] font-semibold text-[#0A0A0A]">{label}</p>
            <p className="text-[11px] text-[#B5B5B5]">{service}</p>
          </div>
        </div>
        {connected && (
          <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: color + "15", color }}>
            <Check size={9} strokeWidth={3} />
            Connected
          </span>
        )}
      </div>
      <div className={`flex items-center gap-2 rounded-lg border px-3 bg-[#F8F8F8] transition-colors ${focused ? "border-[#DEDEDE]" : "border-[#EFEFEF]"}`}>
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent py-2.5 text-[12px] font-mono text-[#0A0A0A] placeholder-[#C0C0C0] outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button onClick={() => setVisible((v) => !v)} className="text-[#C0C0C0] hover:text-[#737373] transition-colors">
          {visible ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-[#F97316]" : "bg-[#DEDEDE]"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

// ── WhatsApp connect form ──────────────────────────────────────────────────────

function WhatsAppForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ wabaId: "", phoneNumberId: "", accessToken: "", displayPhone: "" });
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");
  const [showToken, setShowToken] = useState(false);

  const submit = async () => {
    if (!form.wabaId || !form.phoneNumberId || !form.accessToken || !form.displayPhone) {
      setErr("All fields are required"); return;
    }
    setLoading(true); setErr("");
    try {
      await connectWhatsApp(form);
      onSuccess();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Connection failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8F8F8] p-4">
      {[
        { key: "wabaId",        label: "WABA ID",           placeholder: "1234567890",       type: "text"     },
        { key: "phoneNumberId", label: "Phone Number ID",   placeholder: "0987654321",       type: "text"     },
        { key: "displayPhone",  label: "Display Phone",     placeholder: "+90 555 000 00 00", type: "text"   },
      ].map(({ key, label, placeholder, type }) => (
        <div key={key}>
          <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">{label}</label>
          <input
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={placeholder}
            className="mt-1 w-full rounded-lg border border-[#EFEFEF] bg-white px-3 py-2 text-[12px] font-mono outline-none focus:border-[#F97316]"
          />
        </div>
      ))}
      <div>
        <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">Access Token</label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-[#EFEFEF] bg-white px-3">
          <input
            type={showToken ? "text" : "password"}
            value={form.accessToken}
            onChange={(e) => setForm({ ...form, accessToken: e.target.value })}
            placeholder="EAAxxxxxxxxxxxxxx"
            className="flex-1 bg-transparent py-2 text-[12px] font-mono outline-none focus:border-[#F97316]"
            autoComplete="off"
          />
          <button onClick={() => setShowToken((v) => !v)} className="text-[#C0C0C0] hover:text-[#737373]">
            {showToken ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>
      {err && <p className="text-[11px] text-red-500">{err}</p>}
      <button onClick={submit} disabled={loading}
        className="w-full rounded-lg bg-[#25D366] py-2 text-[12px] font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
        {loading && <Loader2 size={13} className="animate-spin" />}
        {loading ? "Connecting…" : "Connect WhatsApp Business"}
      </button>
    </div>
  );
}

// ── Instagram connect form ─────────────────────────────────────────────────────

function InstagramForm({ onSuccess }: { onSuccess: () => void }) {
  const [token, setToken]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");
  const [showToken, setShowToken] = useState(false);

  const submit = async () => {
    if (!token) { setErr("Access token is required"); return; }
    setLoading(true); setErr("");
    try {
      await connectInstagram(token);
      onSuccess();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Connection failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-[#EFEFEF] bg-[#F8F8F8] p-4">
      <p className="text-[11px] text-[#737373] leading-relaxed">
        Paste your Instagram Business <strong>User Access Token</strong> from the Meta Developer console.
        The token needs <code className="rounded bg-[#EFEFEF] px-1 text-[10px]">instagram_basic, instagram_manage_messages</code> permissions.
      </p>
      <div>
        <label className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide">User Access Token</label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-[#EFEFEF] bg-white px-3">
          <input
            type={showToken ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="EAAxxxxxxxxxxxxxx"
            className="flex-1 bg-transparent py-2 text-[12px] font-mono outline-none"
            autoComplete="off"
          />
          <button onClick={() => setShowToken((v) => !v)} className="text-[#C0C0C0] hover:text-[#737373]">
            {showToken ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>
      {err && <p className="text-[11px] text-red-500">{err}</p>}
      <button onClick={submit} disabled={loading}
        className="w-full rounded-lg py-2 text-[12px] font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
        {loading && <Loader2 size={13} className="animate-spin" />}
        {loading ? "Connecting…" : "Connect Instagram DMs"}
      </button>
    </div>
  );
}

// ── Connected platform card ────────────────────────────────────────────────────

function ConnectedCard({
  conn, onDisconnect,
}: { conn: PlatformConnection; onDisconnect: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleDisconnect = async () => {
    setLoading(true);
    try { await disconnectPlatform(conn.platform); onDisconnect(); }
    finally { setLoading(false); }
  };

  const isWA = conn.platform === "whatsapp";
  const color = isWA ? "#25D366" : "#E1306C";
  const label = isWA ? "WhatsApp Business" : "Instagram DMs";
  const sub   = isWA ? conn.displayPhone : `@${conn.igUsername}`;

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#EFEFEF] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: color + "15" }}>
          {isWA
            ? <MessageCircle size={18} style={{ color }} />
            : <Instagram   size={18} style={{ color }} />}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#0A0A0A]">{label}</p>
          <p className="text-[11px] text-[#B5B5B5]">{sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: color + "15", color }}>
          <Check size={9} strokeWidth={3} /> Live
        </span>
        <button onClick={handleDisconnect} disabled={loading}
          className="flex items-center gap-1 rounded-lg border border-[#EFEFEF] px-2.5 py-1.5 text-[11px] font-semibold text-[#737373] hover:border-red-200 hover:text-red-500 transition-colors disabled:opacity-50">
          {loading ? <Loader2 size={11} className="animate-spin" /> : <Unlink size={11} />}
          Disconnect
        </button>
      </div>
    </div>
  );
}

// ── Connect Platforms section ──────────────────────────────────────────────────

function ConnectPlatforms() {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [loading, setLoading]         = useState(true);
  const [expand, setExpand]           = useState<"whatsapp" | "instagram" | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setConnections(await getPlatformConnections()); }
    catch { /* not critical */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const isWAConnected = connections.some((c) => c.platform === "whatsapp");
  const isIGConnected = connections.some((c) => c.platform === "instagram");

  const PLATFORMS = [
    { id: "whatsapp" as const, label: "WhatsApp Business", color: "#25D366", Icon: MessageCircle, connected: isWAConnected },
    { id: "instagram" as const, label: "Instagram DMs",    color: "#E1306C", Icon: Instagram,     connected: isIGConnected },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-[#EFEFEF] p-5">
        <h2 className="text-[14px] font-bold mb-1">Connected Platforms</h2>
        <p className="text-[11px] text-[#B5B5B5] mb-4">
          Connect your messaging channels so incoming DMs appear as signals in real-time.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-[#B5B5B5]" />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Active connections */}
            {connections.map((conn) => (
              <ConnectedCard key={conn.id} conn={conn} onDisconnect={load} />
            ))}

            {/* Connect buttons for unconnected platforms */}
            {PLATFORMS.filter((p) => !p.connected).map(({ id, label, color, Icon }) => (
              <div key={id}>
                <button
                  onClick={() => setExpand((prev) => prev === id ? null : id)}
                  className="w-full flex items-center justify-between rounded-xl border border-dashed border-[#DEDEDE] px-4 py-3 hover:border-[#C0C0C0] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F8F8] group-hover:bg-white transition-colors">
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-[12px] font-semibold text-[#0A0A0A]">{label}</p>
                      <p className="text-[11px] text-[#B5B5B5]">Not connected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-[#EFEFEF] px-3 py-1.5 text-[11px] font-semibold text-[#737373] group-hover:border-[#DEDEDE]">
                    <Link2 size={11} />
                    Connect
                  </div>
                </button>

                {expand === id && id === "whatsapp" && (
                  <WhatsAppForm onSuccess={() => { load(); setExpand(null); }} />
                )}
                {expand === id && id === "instagram" && (
                  <InstagramForm onSuccess={() => { load(); setExpand(null); }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "profile",   label: "Profile",    icon: User    },
  { id: "platforms", label: "Platforms",  icon: Link2   },
  { id: "api",       label: "API Keys",   icon: Shield  },
  { id: "notif",     label: "Notifications", icon: Bell },
];

export function IntegrationsSettings() {
  const [lang, setLang]       = useState<"tr" | "en">("tr");
  const [prefs, setPrefs]     = useState({ push: true, sound: true, auto: false });
  const [section, setSection] = useState("profile");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight">Settings</h1>
        <p className="mt-0.5 text-[13px] text-[#737373]">Manage your agency preferences and integrations</p>
      </div>

      <div className="flex gap-5">
        {/* Section tabs */}
        <div className="w-44 flex-shrink-0">
          <div className="flex flex-col gap-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setSection(id)}
                className={[
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-left transition-all",
                  section === id ? "bg-white border border-[#EFEFEF] text-[#0A0A0A] shadow-sm" : "text-[#737373] hover:bg-white hover:text-[#0A0A0A]",
                ].join(" ")}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-xl">

          {section === "profile" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-[#EFEFEF] p-6">
                <h2 className="text-[14px] font-bold mb-4">Agency Profile</h2>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3EE] border border-[#FFD9C4]">
                    <span className="text-xl font-black text-[#F97316]">A</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold">Agency</p>
                    <p className="text-[12px] text-[#B5B5B5]">yappaflow.com</p>
                  </div>
                  <button className="ml-auto rounded-lg border border-[#EFEFEF] px-3 py-1.5 text-[12px] font-semibold text-[#737373] hover:bg-[#F8F8F8]">
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Agency Name", value: "Yappaflow Agency" },
                    { label: "Email",       value: "agency@yappaflow.com" },
                    { label: "Phone",       value: "+90 555 000 00 00" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                      <span className="text-[12px] text-[#737373]">{f.label}</span>
                      <span className="text-[12px] font-semibold text-[#0A0A0A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-[#EFEFEF] p-5">
                <h2 className="text-[14px] font-bold mb-3">Language</h2>
                <div className="flex gap-2 rounded-xl border border-[#EFEFEF] bg-[#F8F8F8] p-1 w-fit">
                  {(["tr", "en"] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)}
                      className={[
                        "rounded-lg px-5 py-2 text-[13px] font-semibold transition-all",
                        lang === l ? "bg-white text-[#0A0A0A] shadow-sm border border-[#EFEFEF]" : "text-[#737373]",
                      ].join(" ")}
                    >
                      {l === "tr" ? "🇹🇷 Türkçe" : "🇺🇸 English"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === "platforms" && <ConnectPlatforms />}

          {section === "api" && (
            <div className="rounded-2xl bg-[#F8F8F8] border border-[#EFEFEF] p-5">
              <h2 className="text-[14px] font-bold mb-4">API Integrations</h2>
              <div className="grid grid-cols-1 gap-3">
                {API_FIELDS.map((f) => (
                  <ApiKeyField key={f.id} label={f.label} service={f.service} placeholder={f.placeholder} color={f.color} />
                ))}
              </div>
            </div>
          )}

          {section === "notif" && (
            <div className="rounded-2xl bg-white border border-[#EFEFEF] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#F5F5F5]">
                <h2 className="text-[14px] font-bold">Notification Preferences</h2>
              </div>
              {PREFERENCES.map((pref, i) => (
                <div key={pref.id}
                  className={[
                    "flex items-center justify-between px-5 py-4",
                    i < PREFERENCES.length - 1 ? "border-b border-[#F5F5F5]" : "",
                  ].join(" ")}
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#0A0A0A]">{pref.label}</p>
                    <p className="text-[11px] text-[#B5B5B5] mt-0.5">{pref.desc}</p>
                  </div>
                  <Toggle
                    enabled={prefs[pref.id as keyof typeof prefs]}
                    onChange={(v) => setPrefs((p) => ({ ...p, [pref.id]: v }))}
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
