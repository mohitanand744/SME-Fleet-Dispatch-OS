"use client";

import { MetricCard } from "@/features/shared/components/MetricCard";
import { DISPATCH_ADMIN_METRICS } from "@/data/mock-metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { FleetUtilizationChart } from "./FleetUtilizationChart";
import { DispatcherActivityStream } from "./DispatcherActivityStream";
import {
  Headphones,
  Truck,
  Building2,
  ArrowRight,
  ShieldCheck,
  Plus,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useTrucksData, useDispatchersData } from "@/data";
import { ZoomableImage } from "@/context/ImageLightboxContext";

export function DispatchAdminDashboard() {
  const { trucks } = useTrucksData();
  const { dispatchers } = useDispatchersData();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Dispatch Agency Executive View
            </span>
            <span className="text-xs text-slate-400 font-medium">Vanguard Dispatch Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">Agency Operations Hub</h1>
          <p className="text-slate-400 text-sm mt-1">
            Partner carrier fleet management, dispatcher desk assignments, lane coverage, and fee settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dispatch-admin/users/dispatchers">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs">
              <Headphones className="w-4 h-4 mr-2" /> Dispatch Desks
            </Button>
          </Link>
          <Link href="/dispatch-admin/trucks">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs">
              <Truck className="w-4 h-4 mr-2" /> Carrier Trucks
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DISPATCH_ADMIN_METRICS.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Analytics Graph Chart & Dispatcher Activity Stream */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FleetUtilizationChart />
        <DispatcherActivityStream />
      </div>

      {/* Main Grid: Active Dispatch Desks & Managed Partner Fleets */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Dispatch Desks */}
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 p-4 sm:p-5 flex flex-row items-center justify-between gap-2 bg-[#080D1A]">
            <div className="flex items-center gap-2 min-w-0">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
              <CardTitle className="text-sm sm:text-base font-bold text-white truncate">Active Dispatcher Desks</CardTitle>
            </div>
            <Link
              href="/dispatch-admin/users/dispatchers"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>View All {dispatchers.length} Staff</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            {dispatchers.map((disp) => (
              <div
                key={disp.id}
                className="p-2.5 sm:p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  {disp.avatarUrl ? (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-[#080D1A]">
                      <ZoomableImage
                        src={disp.avatarUrl}
                        alt={disp.name}
                        captionTitle={disp.name}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                        showZoomBadge={false}
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 text-purple-300 font-extrabold flex items-center justify-center text-xs border border-purple-500/30 shrink-0">
                      {disp.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">{disp.name}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[130px] sm:max-w-[170px]">{disp.deskAssignment}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={disp.status as any} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Partner Carrier Trucks */}
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 p-4 sm:p-5 flex flex-row items-center justify-between gap-2 bg-[#080D1A]">
            <div className="flex items-center gap-2 min-w-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
              <CardTitle className="text-sm sm:text-base font-bold text-white truncate">Contracted Carrier Fleet</CardTitle>
            </div>
            <Link
              href="/dispatch-admin/trucks"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>View All Trucks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            {trucks.slice(0, 4).map((truck) => (
              <div
                key={truck.id}
                className="p-2.5 sm:p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-11 h-9 sm:w-12 sm:h-10 rounded-xl overflow-hidden bg-[#080D1A] border border-white/10 shrink-0">
                    <ZoomableImage
                      src={truck.imageUrl || "https://images.surferseo.art/de392d7b-7978-40fd-b3d8-05cd9eb4b91e.jpeg"}
                      alt={truck.plate}
                      captionTitle={`${truck.plate} • ${truck.companyName}`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      showZoomBadge={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-white truncate">{truck.plate}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-300 truncate max-w-[120px] sm:max-w-[170px]">{truck.companyName}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={truck.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
