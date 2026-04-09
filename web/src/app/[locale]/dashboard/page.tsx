"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CommandCenter }   from "@/components/dashboard/CommandCenter";
import { EngineRoom }      from "@/components/dashboard/EngineRoom";
import { DeploymentHub }   from "@/components/dashboard/DeploymentHub";
import { IntegrationsSettings } from "@/components/dashboard/IntegrationsSettings";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("yappaflow_token");
    if (!token) router.replace("/auth");
    else setReady(true);
  }, [router]);

  if (!ready) return (
    <div className="flex h-screen items-center justify-center bg-[#0A0A0B]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
    </div>
  );

  return (
    <DashboardShell>
      {(view, setView) => {
        if (view === "command")      return <CommandCenter        setView={setView} />;
        if (view === "engine")       return <EngineRoom           setView={setView} />;
        if (view === "deploy")       return <DeploymentHub        setView={setView} />;
        if (view === "integrations") return <IntegrationsSettings />;
        return null;
      }}
    </DashboardShell>
  );
}
