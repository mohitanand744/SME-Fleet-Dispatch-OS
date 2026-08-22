"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import {
  CompanyMembership,
  CARRIER_ADMIN_MEMBERSHIP,
  DISPATCH_ADMIN_MEMBERSHIP,
  DISPATCHER_MEMBERSHIP,
} from "@/data/mock-memberships";
import { UserRole } from "@/types/roles";
import { UpgradeTierModal } from "./UpgradeTierModal";

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
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const membership: CompanyMembership =
    role === "dispatcher"
      ? DISPATCHER_MEMBERSHIP
      : role === "dispatch-admin"
      ? DISPATCH_ADMIN_MEMBERSHIP
      : CARRIER_ADMIN_MEMBERSHIP;

  return (
    <div className="space-y-6 w-full">
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
          <Button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-2 text-amber-400" /> Upgrade Capacity Tier
          </Button>
        </div>
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

      {/* Upgrade Tier Modal */}
      <UpgradeTierModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentTierName={membership.planName}
      />
    </div>
  );
}
