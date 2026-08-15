"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Package,
  Clock,
  MapPin,
  ArrowRight,
  Plus,
  Filter,
  CheckCircle,
  Truck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { MetricCard } from "@/features/shared/components/MetricCard";
import { DispatchLoad } from "@/features/dispatcher/types";

const initialLoads: DispatchLoad[] = [
  {
    id: "1",
    loadNumber: "LD-8801",
    customer: "Apex Global Logistics",
    origin: "Port of Long Beach, CA",
    destination: "Phoenix Distribution Center, AZ",
    weight: "38,500 lbs",
    status: "in_transit",
    driverName: "Robert Miller",
    vehiclePlate: "CA-883-TR",
    pickupTime: "06:30 AM",
    deliveryTime: "04:00 PM Today",
    priority: "urgent",
  },
  {
    id: "2",
    loadNumber: "LD-8804",
    customer: "Metro Fresh Organics",
    origin: "Salinas Valley Hub, CA",
    destination: "Las Vegas Cold Storage, NV",
    weight: "22,100 lbs",
    status: "assigned",
    driverName: "Alex Rivera",
    vehiclePlate: "NV-502-BX",
    pickupTime: "11:00 AM",
    deliveryTime: "08:30 PM Today",
    priority: "high",
  },
  {
    id: "3",
    loadNumber: "LD-8809",
    customer: "Summit Fasteners Corp",
    origin: "Salt Lake Yard, UT",
    destination: "Denver Depot, CO",
    weight: "44,000 lbs",
    status: "pending",
    pickupTime: "02:00 PM",
    deliveryTime: "Tomorrow 09:00 AM",
    priority: "urgent",
  },
  {
    id: "4",
    loadNumber: "LD-8812",
    customer: "Horizon Paper Mills",
    origin: "Portland Regional, OR",
    destination: "Seattle Central, WA",
    weight: "18,400 lbs",
    status: "delayed",
    driverName: "Kevin Durant",
    vehiclePlate: "WA-219-TR",
    pickupTime: "08:00 AM",
    deliveryTime: "02:30 PM (Est +1h)",
    priority: "urgent",
  },
];

export function DispatchQueueBoard() {
  const [filter, setFilter] = useState<string>("all");

  const filteredLoads = initialLoads.filter((load) => {
    if (filter === "all") return true;
    return load.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Dispatcher Console
            </span>
            <span className="text-xs text-slate-400 font-medium">Live Stream Active</span>
          </div>
          <h1 className="text-3xl font-extrabold text-main-dark mt-2 tracking-tight">Live Dispatch Queue</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time load assignments, active route tracking, and instant driver dispatch.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-main-dark hover:bg-slate-50 shadow-sm font-medium">
            <Filter className="w-4 h-4 mr-2" /> Filter Routes
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Create Load Order
          </Button>
        </div>
      </div>

      {/* Real-time Dispatch Metrics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Live Loads"
          value="42"
          icon={Activity}
          accentColor="text-emerald-700"
          trend={{ value: "18 on highway", isPositive: true }}
        />
        <MetricCard
          title="Pending Assignment"
          value="7"
          icon={Package}
          accentColor="text-amber-700"
          trend={{ value: "Ready to assign", isPositive: true }}
        />
        <MetricCard
          title="On-Time Rate"
          value="97.8%"
          icon={CheckCircle}
          accentColor="text-blue-700"
          trend={{ value: "+0.4%", isPositive: true, label: "today" }}
        />
        <MetricCard
          title="Route Delays"
          value="2"
          icon={Clock}
          alert={true}
          trend={{ value: "Weather slowdown", isPositive: false }}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {["all", "pending", "assigned", "in_transit", "delayed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all capitalize ${
              filter === tab
                ? "bg-main-dark text-white shadow-sm"
                : "bg-white text-slate-500 hover:text-main-dark hover:bg-slate-100"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Live Load Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredLoads.map((load) => (
          <motion.div
            key={load.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-none shadow-md bg-white hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-main-dark">{load.loadNumber}</CardTitle>
                    <p className="text-xs text-slate-400 font-medium">{load.customer}</p>
                  </div>
                </div>
                <StatusBadge status={load.status} />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Origin -> Destination route */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-700">Origin:</span>
                    <span className="truncate">{load.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-700">Destination:</span>
                    <span className="truncate">{load.destination}</span>
                  </div>
                </div>

                {/* Driver / Vehicle info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    {load.driverName ? (
                      <>
                        <UserCheck className="w-4 h-4 text-main-dark" />
                        <span className="font-semibold text-main-dark">{load.driverName}</span>
                        <span>•</span>
                        <span className="text-slate-400 font-mono">{load.vehiclePlate}</span>
                      </>
                    ) : (
                      <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Driver Unassigned
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 text-xs font-bold">
                    Manage Load →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
