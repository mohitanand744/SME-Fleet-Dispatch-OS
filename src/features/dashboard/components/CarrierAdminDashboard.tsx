"use client";

import { MetricCard } from "@/features/shared/components/MetricCard";
import { CARRIER_ADMIN_METRICS } from "@/data/mock-metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { FleetUtilizationChart } from "./FleetUtilizationChart";
import { DispatcherActivityStream } from "./DispatcherActivityStream";
import {
  Truck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Plus,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useTrucksData, useDriversData } from "@/data";
import { ZoomableImage } from "@/context/ImageLightboxContext";

export function CarrierAdminDashboard() {
  const { trucks } = useTrucksData();
  const { drivers } = useDriversData();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Carrier Executive Dashboard
            </span>
            <span className="text-xs text-slate-400 font-medium">Apex Global Carrier LLC</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">Fleet Operations Overview</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time fleet performance, driver roster status, vehicle telemetry, and freight settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/carrier-admin/trucks">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs">
              <Truck className="w-4 h-4 mr-2" /> Manage Trucks
            </Button>
          </Link>
          <Link href="/carrier-admin/users/drivers">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs">
              <Users className="w-4 h-4 mr-2" /> Drivers Roster
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARRIER_ADMIN_METRICS.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Analytics Graph Chart & Dispatcher Activity Stream */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FleetUtilizationChart />
        <DispatcherActivityStream />
      </div>

      {/* Priority Trucks & Driver Readiness Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Priority Fleet Status */}
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 p-4 sm:p-5 flex flex-row items-center justify-between gap-2 bg-[#080D1A]">
            <div className="flex items-center gap-2 min-w-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
              <CardTitle className="text-sm sm:text-base font-bold text-white truncate">Live Fleet Assets</CardTitle>
            </div>
            <Link
              href="/carrier-admin/trucks"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>View All {trucks.length} Trucks</span>
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
                      captionTitle={`${truck.plate} • ${truck.model}`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      showZoomBadge={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-white truncate">{truck.plate}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-300 truncate max-w-[120px] sm:max-w-[190px]">{truck.model}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={truck.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Driver Roster Readiness */}
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 p-4 sm:p-5 flex flex-row items-center justify-between gap-2 bg-[#080D1A]">
            <div className="flex items-center gap-2 min-w-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
              <CardTitle className="text-sm sm:text-base font-bold text-white truncate">Driver Duty Roster</CardTitle>
            </div>
            <Link
              href="/carrier-admin/users/drivers"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>View All {drivers.length} Drivers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            {drivers.slice(0, 4).map((driver) => (
              <div
                key={driver.id}
                className="p-2.5 sm:p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 text-white font-extrabold flex items-center justify-center text-xs border border-white/15 shrink-0">
                    {driver.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">{driver.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{driver.licenseClass} • {driver.assignedTruckPlate || "Ready"}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={driver.status as any} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
