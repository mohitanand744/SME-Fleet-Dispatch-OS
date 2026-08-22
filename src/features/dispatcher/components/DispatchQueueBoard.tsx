"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FilterDropdown } from "@/components/molecules/FilterDropdown";
import { Label } from "@/components/atoms/label";
import { DispatchLoad } from "@/features/dispatcher/types";
import { CreateLoadModal } from "./CreateLoadModal";
import { ManageLoadModal } from "./ManageLoadModal";

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
  const [loads, setLoads] = useState<DispatchLoad[]>(initialLoads);

  // Active Filter States (applied)
  const [filter, setFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [corridorFilter, setCorridorFilter] = useState<string>("all");

  // Staged Filter States (only committed on Apply)
  const [tempFilter, setTempFilter] = useState<string>("all");
  const [tempPriorityFilter, setTempPriorityFilter] = useState<string>("all");
  const [tempCorridorFilter, setTempCorridorFilter] = useState<string>("all");

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLoadForManage, setSelectedLoadForManage] = useState<DispatchLoad | null>(null);

  const activeCount =
    (filter !== "all" ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (corridorFilter !== "all" ? 1 : 0);

  const handleToggleFilter = () => {
    if (!isFilterDropdownOpen) {
      // Sync staged states with currently active filters on opening
      setTempFilter(filter);
      setTempPriorityFilter(priorityFilter);
      setTempCorridorFilter(corridorFilter);
    }
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleApplyFilters = () => {
    setFilter(tempFilter);
    setPriorityFilter(tempPriorityFilter);
    setCorridorFilter(tempCorridorFilter);
  };

  const handleClearFilters = () => {
    setTempFilter("all");
    setTempPriorityFilter("all");
    setTempCorridorFilter("all");
    setFilter("all");
    setPriorityFilter("all");
    setCorridorFilter("all");
  };

  const handleCreateLoad = (newLoad: DispatchLoad) => {
    setLoads((prev) => [newLoad, ...prev]);
  };

  const handleUpdateLoad = (updatedLoad: DispatchLoad) => {
    setLoads((prev) => prev.map((l) => (l.id === updatedLoad.id ? updatedLoad : l)));
  };

  const filteredLoads = loads.filter((load) => {
    if (filter !== "all" && load.status !== filter) return false;
    if (priorityFilter !== "all" && load.priority !== priorityFilter) return false;
    if (corridorFilter === "west_coast" && !load.origin.includes("CA") && !load.destination.includes("CA")) return false;
    if (corridorFilter === "southwest" && !load.origin.includes("AZ") && !load.destination.includes("AZ") && !load.destination.includes("NV")) return false;
    if (corridorFilter === "pacific_nw" && !load.origin.includes("OR") && !load.destination.includes("WA")) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Dispatcher Console
            </span>
            <span className="text-xs text-slate-400 font-medium">Live Stream Active</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">Live Dispatch Queue</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time load assignments, active route tracking, and instant driver dispatch.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Dropdown Popover */}
          <FilterDropdown
            isOpen={isFilterDropdownOpen}
            onToggle={handleToggleFilter}
            onClose={() => setIsFilterDropdownOpen(false)}
            onClear={handleClearFilters}
            onApply={handleApplyFilters}
            activeCount={activeCount}
            title="Filter Route Corridors"
            align="right"
          >
            {/* Dispatch Status */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-300">Dispatch Status</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "pending", label: "Pending" },
                  { id: "assigned", label: "Assigned" },
                  { id: "in_transit", label: "In Transit" },
                  { id: "delayed", label: "Delayed" },
                  { id: "delivered", label: "Delivered" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTempFilter(s.id)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      tempFilter === s.id
                        ? "bg-white/15 border-white/40 text-white shadow-sm"
                        : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Freight Corridor Region */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-300">Freight Corridor Region</Label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "all", label: "All Corridors" },
                  { id: "west_coast", label: "West Coast (I-5)" },
                  { id: "southwest", label: "Southwest (I-10)" },
                  { id: "pacific_nw", label: "Pacific NW (OR/WA)" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setTempCorridorFilter(c.id)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                      tempCorridorFilter === c.id
                        ? "bg-white/15 border-white/40 text-white shadow-sm"
                        : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Tier */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-300">Priority Tier</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "all", label: "All Priorities" },
                  { id: "standard", label: "Standard" },
                  { id: "urgent", label: "Urgent" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setTempPriorityFilter(p.id)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      tempPriorityFilter === p.id
                        ? "bg-white/15 border-white/40 text-white shadow-sm"
                        : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterDropdown>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Load Order
          </Button>
        </div>
      </div>

      {/* Real-time Dispatch Metrics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Live Loads"
          value={String(loads.length)}
          icon={Activity}
          accentColor="text-emerald-400"
          trend={{ value: `${loads.filter((l) => l.status === "in_transit").length} in transit`, isPositive: true }}
        />
        <MetricCard
          title="Pending Assignment"
          value={String(loads.filter((l) => l.status === "pending").length)}
          icon={Package}
          accentColor="text-amber-400"
          trend={{ value: "Ready to assign", isPositive: true }}
        />
        <MetricCard
          title="On-Time Rate"
          value="97.8%"
          icon={CheckCircle}
          accentColor="text-blue-400"
          trend={{ value: "+0.4%", isPositive: true, label: "today" }}
        />
        <MetricCard
          title="Route Delays"
          value={String(loads.filter((l) => l.status === "delayed").length)}
          icon={Clock}
          alert={true}
          trend={{ value: "Weather slowdown", isPositive: false }}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto custom-scrollbar">
        {["all", "pending", "assigned", "in_transit", "delayed"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setTempFilter(tab);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all capitalize border cursor-pointer ${
              filter === tab
                ? "bg-white/15 text-white border-white/20 shadow-sm"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Live Load Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence>
          {filteredLoads.map((load) => (
            <motion.div
              key={load.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/20 transition-all rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-white">{load.loadNumber}</CardTitle>
                      <p className="text-xs text-slate-400 font-medium">{load.customer}</p>
                    </div>
                  </div>
                  <StatusBadge status={load.status} />
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {/* Origin -> Destination route */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-400">Origin:</span>
                      <span className="truncate">{load.origin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-semibold text-slate-400">Destination:</span>
                      <span className="truncate">{load.destination}</span>
                    </div>
                  </div>

                  {/* Driver / Vehicle info */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      {load.driverName ? (
                        <>
                          <UserCheck className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold text-white">{load.driverName}</span>
                          <span>•</span>
                          <span className="text-slate-400 font-mono">{load.vehiclePlate}</span>
                        </>
                      ) : (
                        <span className="text-amber-300 font-semibold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                          Driver Unassigned
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedLoadForManage(load)}
                      className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs font-bold cursor-pointer"
                    >
                      Manage Load →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Modals */}
      <CreateLoadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateLoad={handleCreateLoad}
      />

      <ManageLoadModal
        isOpen={!!selectedLoadForManage}
        onClose={() => setSelectedLoadForManage(null)}
        load={selectedLoadForManage}
        onUpdateLoad={handleUpdateLoad}
      />
    </div>
  );
}
