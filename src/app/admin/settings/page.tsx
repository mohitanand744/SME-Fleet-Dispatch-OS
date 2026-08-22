"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Building, Globe, Shield, Bell, CheckCircle2, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [adminSubdomain, setAdminSubdomain] = useState("admin");
  const [dispatcherSubdomain, setDispatcherSubdomain] = useState("dispatcher");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Organization & Subdomain Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your fleet enterprise identity, subdomains, and operational access rules.
        </p>
      </div>

      <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl">
        <CardHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white">Subdomain Routing Configuration</CardTitle>
              <p className="text-xs text-slate-400">Dedicated domain mapping for Admin and Dispatcher portals</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <form onSubmit={handleSave}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Admin Subdomain</Label>
                <div className="flex items-center">
                  <Input
                    value={adminSubdomain}
                    onChange={(e) => setAdminSubdomain(e.target.value)}
                    className="rounded-r-none font-mono text-sm bg-[#0E1528] border-white/10 text-white"
                  />
                  <span className="inline-flex items-center px-3 h-10 border border-l-0 border-white/10 bg-[#131B34] text-slate-300 text-xs font-semibold rounded-r-md">
                    .fleetdispatch.io
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Dispatcher Subdomain</Label>
                <div className="flex items-center">
                  <Input
                    value={dispatcherSubdomain}
                    onChange={(e) => setDispatcherSubdomain(e.target.value)}
                    className="rounded-r-none font-mono text-sm bg-[#0E1528] border-white/10 text-white"
                  />
                  <span className="inline-flex items-center px-3 h-10 border border-l-0 border-white/10 bg-[#131B34] text-slate-300 text-xs font-semibold rounded-r-md">
                    .fleetdispatch.io
                  </span>
                </div>
              </div>
            </div>

            {savedSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Subdomain routing configuration saved and propagated across edge gateways!
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold cursor-pointer flex items-center gap-1.5"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isSaving ? "Saving Config..." : "Save Domain Configuration"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
