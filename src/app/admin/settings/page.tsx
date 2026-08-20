"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Building, Globe, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-300">Admin Subdomain</Label>
              <div className="flex items-center">
                <Input defaultValue="admin" className="rounded-r-none font-mono text-sm bg-[#0E1528] border-white/10 text-white" />
                <span className="inline-flex items-center px-3 h-10 border border-l-0 border-white/10 bg-[#131B34] text-slate-300 text-xs font-semibold rounded-r-md">
                  .fleetdispatch.io
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-300">Dispatcher Subdomain</Label>
              <div className="flex items-center">
                <Input defaultValue="dispatcher" className="rounded-r-none font-mono text-sm bg-[#0E1528] border-white/10 text-white" />
                <span className="inline-flex items-center px-3 h-10 border border-l-0 border-white/10 bg-[#131B34] text-slate-300 text-xs font-semibold rounded-r-md">
                  .fleetdispatch.io
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
              Save Domain Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
