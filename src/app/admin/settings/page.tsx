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
        <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Organization & Subdomain Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your fleet enterprise identity, subdomains, and operational access rules.
        </p>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-main-dark">Subdomain Routing Configuration</CardTitle>
              <p className="text-xs text-slate-400">Dedicated domain mapping for Admin and Dispatcher portals</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Admin Subdomain</Label>
              <div className="flex items-center">
                <Input defaultValue="admin" className="rounded-r-none font-mono text-sm bg-slate-50" />
                <span className="inline-flex items-center px-3 h-10 border border-l-0 border-slate-200 bg-slate-100 text-slate-500 text-xs font-semibold rounded-r-md">
                  .fleetdispatch.io
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Dispatcher Subdomain</Label>
              <div className="flex items-center">
                <Input defaultValue="dispatcher" className="rounded-r-none font-mono text-sm bg-slate-50" />
                <span className="inline-flex items-center px-3 h-10 border border-l-0 border-slate-200 bg-slate-100 text-slate-500 text-xs font-semibold rounded-r-md">
                  .fleetdispatch.io
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button className="bg-main-dark hover:bg-main-dark/90 text-white font-semibold">
              Save Domain Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
