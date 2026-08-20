"use client";

import { motion } from "framer-motion";
import { Truck, Users, DollarSign, AlertTriangle, TrendingUp, ShieldCheck, Download, Plus } from "lucide-react";
import { MetricCard } from "@/features/shared/components/MetricCard";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

export function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Admin Portal
            </span>
            <span className="text-xs text-slate-400 font-medium">Updated 2m ago</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Global fleet health, driver metrics, and revenue analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white shadow-sm font-medium">
            <Download className="w-4 h-4 mr-2" /> Export Audit
          </Button>
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Add Vehicle
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Fleet"
          value="148"
          icon={Truck}
          accentColor="text-blue-400"
          trend={{ value: "+6 new", isPositive: true, label: "this month" }}
        />
        <MetricCard
          title="Active Drivers"
          value="112"
          icon={Users}
          accentColor="text-indigo-400"
          trend={{ value: "98% on duty", isPositive: true }}
        />
        <MetricCard
          title="Monthly Gross"
          value="$284.5k"
          icon={DollarSign}
          accentColor="text-emerald-400"
          trend={{ value: "+14.2%", isPositive: true, label: "vs last mo" }}
        />
        <MetricCard
          title="Maintenance Alert"
          value="4"
          icon={AlertTriangle}
          alert={true}
          trend={{ value: "2 critical", isPositive: false, label: "needs action" }}
        />
      </div>

      {/* Operations & Revenue Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
            <div>
              <CardTitle className="text-lg font-bold text-white">Monthly Fleet Utilization</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Fleet runtime and delivery completion rates</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              92.4% Peak Efficiency
            </span>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-end justify-between h-56 gap-2 sm:gap-4 px-2">
              {[45, 62, 78, 85, 70, 92, 88, 76, 95, 82, 89, 94].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-[#0E1528] rounded-t-lg h-44 flex items-end overflow-hidden p-0.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t group-hover:from-blue-500 group-hover:to-cyan-300 transition-colors"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][idx]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Admin Operations Roster */}
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl lg:col-span-3 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
            <CardTitle className="text-lg font-bold text-white">Priority Vehicle Status</CardTitle>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </CardHeader>
          <CardContent className="pt-4 flex-1 space-y-3">
            {[
              { plate: "FL-902-TR", type: "Heavy Semi-Truck", status: "active", driver: "Marcus Vance", mileage: "84,200 mi" },
              { plate: "FL-405-VN", type: "Sprinter Van", status: "in_transit", driver: "Sarah Jenkins", mileage: "32,110 mi" },
              { plate: "FL-118-BX", type: "Box Truck 26ft", status: "maintenance", driver: "Unassigned", mileage: "114,800 mi" },
              { plate: "FL-772-TR", type: "Heavy Semi-Truck", status: "idle", driver: "David Ross", mileage: "45,300 mi" },
            ].map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0E1528] border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{v.plate}</span>
                    <span className="text-xs text-slate-400">({v.type})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Driver: <span className="text-slate-300 font-medium">{v.driver}</span> • {v.mileage}</p>
                </div>
                <StatusBadge status={v.status as any} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
