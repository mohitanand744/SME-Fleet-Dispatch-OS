"use client";

import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Truck,
  Users,
  ExternalLink,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import {
  CompanyMembership,
  CARRIER_ADMIN_MEMBERSHIP,
  DISPATCH_ADMIN_MEMBERSHIP,
  DISPATCHER_MEMBERSHIP,
} from "@/data/mock-memberships";
import { UserRole } from "@/types/roles";
import { cn } from "@/lib/utils";

interface MembershipOverviewProps {
  role?: UserRole;
  title?: string;
  subtitle?: string;
}

export function MembershipOverview({
  role = "carrier-admin",
  title = "Company Membership & Network",
  subtitle = "Active enterprise license, network associations, truck quotas, and contract agreements.",
}: MembershipOverviewProps) {
  const membership: CompanyMembership =
    role === "dispatcher"
      ? DISPATCHER_MEMBERSHIP
      : role === "dispatch-admin"
      ? DISPATCH_ADMIN_MEMBERSHIP
      : CARRIER_ADMIN_MEMBERSHIP;

  const truckQuotaPercent = Math.round(
    (membership.trucksQuota.used / membership.trucksQuota.total) * 100
  );
  const dispatcherQuotaPercent = Math.round(
    (membership.dispatchersQuota.used / membership.dispatchersQuota.total) * 100
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Active Verified Membership
            </span>
            <span className="text-xs text-slate-400 font-medium">Valid through {membership.renewalDate}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs">
            <Sparkles className="w-4 h-4 mr-2 text-amber-400" /> Upgrade Capacity Tier
          </Button>
        </div>
      </div>

      {/* Hero Membership Banner Card */}
      <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden relative">
        <div className="p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/15 shadow-lg shrink-0">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                {membership.id} • {membership.planTier}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">{membership.companyName}</h2>
              <p className="text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                <span className="font-mono">{membership.dotNumber}</span>
                <span>•</span>
                <span className="font-mono">{membership.mcNumber}</span>
                <span>•</span>
                <span className="text-slate-300">{membership.billingCycle}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#0E1528] border border-white/10 text-center">
              <p className="text-[11px] uppercase font-bold text-slate-400">SLA Level</p>
              <p className="text-xs font-extrabold text-white mt-0.5">{membership.supportLevel}</p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-[#0E1528] border border-white/10 text-center">
              <p className="text-[11px] uppercase font-bold text-slate-400">Status</p>
              <p className="text-xs font-extrabold text-emerald-400 mt-0.5 uppercase tracking-wider">
                {membership.status}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quotas & Capacity Meters */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/15">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Truck Fleet Allocation Quota</h4>
                <p className="text-xs text-slate-400">Authorized live commercial vehicles</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-white font-mono">
              {membership.trucksQuota.used} / {membership.trucksQuota.total}
            </span>
          </div>

          <div className="w-full bg-[#0E1528] rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                truckQuotaPercent > 85 ? "bg-amber-400" : "bg-blue-400"
              )}
              style={{ width: `${truckQuotaPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 flex justify-between font-medium">
            <span>{truckQuotaPercent}% Allocated</span>
            <span>{membership.trucksQuota.total - membership.trucksQuota.used} Slots Available</span>
          </p>
        </Card>

        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/15">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dispatcher Desk Seat Allocation</h4>
                <p className="text-xs text-slate-400">Simultaneous active console seats</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-white font-mono">
              {membership.dispatchersQuota.used} / {membership.dispatchersQuota.total}
            </span>
          </div>

          <div className="w-full bg-[#0E1528] rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                dispatcherQuotaPercent > 85 ? "bg-amber-400" : "bg-purple-400"
              )}
              style={{ width: `${dispatcherQuotaPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 flex justify-between font-medium">
            <span>{dispatcherQuotaPercent}% Allocated</span>
            <span>{membership.dispatchersQuota.total - membership.dispatchersQuota.used} Seats Available</span>
          </p>
        </Card>
      </div>

      {/* Associated Companies & Carrier Networks */}
      <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/10 p-5 bg-[#080D1A]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Affiliated Company Network & Contract Links
              </CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">
                Verified carrier networks, dispatch desks, and broker integrations under this membership.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {membership.associatedCompanies.length} Linked Partners
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {membership.associatedCompanies.map((partner) => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl bg-[#0E1528] border border-white/5 space-y-2 hover:border-white/15 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">{partner.name}</h5>
                    <p className="text-[11px] text-blue-400 font-medium">{partner.relationship}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {partner.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>Linked Fleet: <strong className="text-white font-mono">{partner.activeTrucksLinked}</strong></span>
                  <span>Active Corridors: <strong className="text-white font-mono">{partner.activeLanes}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Included Plan Features */}
      <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl p-5 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Included Membership Telematics & System Modules
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {membership.featuresIncluded.map((feat, fIdx) => (
            <div
              key={fIdx}
              className="p-3 rounded-xl bg-[#0E1528] border border-white/5 flex items-center gap-2.5 text-xs text-slate-300 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
