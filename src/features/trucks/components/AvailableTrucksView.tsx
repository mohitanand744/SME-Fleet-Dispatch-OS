"use client";

import { useState } from "react";
import {
  Truck,
  Search,
  Filter,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Send,
  Fuel,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { useTrucksData } from "@/data";
import { TruckItem } from "@/data/mock-trucks";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { cn } from "@/lib/utils";

import { FilterDropdown } from "@/components/molecules/FilterDropdown";

export function AvailableTrucksView() {
  const { trucks } = useTrucksData();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [carrierFilter, setCarrierFilter] = useState<string>("all");
  const [fuelFilter, setFuelFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedTruckForDispatch, setSelectedTruckForDispatch] = useState<TruckItem | null>(null);
  const [assignedLoadNumber, setAssignedLoadNumber] = useState("");
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  const activeFilterCount =
    (carrierFilter !== "all" ? 1 : 0) +
    (fuelFilter !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const handleResetFilters = () => {
    setCarrierFilter("all");
    setFuelFilter("all");
    setSortBy("default");
    setTypeFilter("all");
  };

  // Filter trucks that are available or active in the membership network
  const availableTrucks = trucks
    .filter((truck) => {
      const matchesSearch =
        truck.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.companyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" ? true : truck.type.toLowerCase().includes(typeFilter.toLowerCase());

      const matchesCarrier =
        carrierFilter === "all"
          ? true
          : truck.companyName.toLowerCase().includes(carrierFilter.toLowerCase());

      const matchesFuel =
        fuelFilter === "all"
          ? true
          : fuelFilter === "high"
          ? truck.fuelLevel >= 70
          : fuelFilter === "low"
          ? truck.fuelLevel < 30
          : true;

      return matchesSearch && matchesType && matchesCarrier && matchesFuel;
    })
    .sort((a, b) => {
      if (sortBy === "plate-asc") return a.plate.localeCompare(b.plate);
      if (sortBy === "fuel-desc") return b.fuelLevel - a.fuelLevel;
      return 0;
    });

  const handleAssignLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignedLoadNumber) return;
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setSelectedTruckForDispatch(null);
      setAssignedLoadNumber("");
    }, 1800);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Company Membership Authorized
            </span>
            <span className="text-xs text-slate-400 font-medium">Live Partner Fleet</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">Available Fleet Trucks</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time availability of verified trucks authorized under your company dispatch network membership.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by plate, model, carrier..."
                className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl w-full"
              />
            </div>

            {/* Modern Filter Popover */}
            <FilterDropdown
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              onClose={() => setIsFilterOpen(false)}
              onClear={handleResetFilters}
              activeCount={activeFilterCount}
              title="Filter Available Trucks"
            >
              {/* Carrier Network */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Affiliated Carrier Network
                </label>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "All Carrier Networks" },
                    { id: "apex", label: "Apex Global Carrier LLC" },
                    { id: "vanguard", label: "Vanguard Dispatch Network" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCarrierFilter(c.id)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl font-semibold text-left transition-all border",
                        carrierFilter === c.id
                          ? "bg-emerald-600/30 border-emerald-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel Level */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Fuel Level
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "Any Level" },
                    { id: "high", label: "70% or Above" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFuelFilter(f.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl font-semibold text-center transition-all border text-[11px]",
                        fuelFilter === f.id
                          ? "bg-emerald-600/30 border-emerald-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
                >
                  <option value="default">Default Order</option>
                  <option value="plate-asc">License Plate (A - Z)</option>
                  <option value="fuel-desc">Highest Fuel Level First</option>
                </select>
              </div>
            </FilterDropdown>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              {availableTrucks.length} Trucks Available
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Vehicle Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {[
            { id: "all", label: "All Equipment" },
            { id: "semi", label: "Semi-Trucks" },
            { id: "reefer", label: "Reefers" },
            { id: "box", label: "Box Trucks" },
            { id: "flatbed", label: "Flatbeds" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer",
                typeFilter === tab.id
                  ? "bg-white/15 text-white border-white/20 shadow-sm"
                  : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Rendering */}
      {viewMode === "grid" ? (
        /* Available Trucks Grid */
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {availableTrucks.map((truck, idx) => (
            <motion.div
              key={truck.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/25 transition-all rounded-3xl overflow-hidden group flex flex-col h-full">
                {/* Photo Header */}
                <div className="relative h-40 w-full bg-[#080D1A] overflow-hidden">
                  <ZoomableImage
                    src={truck.imageUrl || "https://images.surferseo.art/de392d7b-7978-40fd-b3d8-05cd9eb4b91e.jpeg"}
                    alt={truck.model}
                    captionTitle={`${truck.plate} • ${truck.model} (${truck.companyName})`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/40 pointer-events-none" />

                  {/* Floating Status Badge */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none">
                    <StatusBadge status={truck.status} />
                  </div>

                  {/* Floating License Plate Tag */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                    <div className="px-2.5 py-1 rounded-xl bg-[#080D1A]/90 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs shadow-lg">
                      {truck.plate}
                    </div>
                    <span className="text-[10px] text-slate-300 font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg truncate max-w-[130px]">
                      {truck.companyName}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3 text-xs bg-[#0B1020] flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-snug">{truck.model}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{truck.type} • Cap: {truck.capacity}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1.5 text-slate-300">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Driver Contact:</span>
                        <span className="font-semibold text-white">{truck.assignedDriverName || "Available / Dedicated"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Fuel Level:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-400">{truck.fuelLevel}%</span>
                          <div className="w-12 bg-[#080D1A] rounded-full h-1.5 overflow-hidden border border-white/10">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                truck.fuelLevel > 50 ? "bg-emerald-400" : truck.fuelLevel > 25 ? "bg-amber-400" : "bg-rose-400"
                              )}
                              style={{ width: `${truck.fuelLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Inspection:</span>
                        <span className="font-mono text-slate-300">{truck.lastInspectionDate} (Valid)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <Button
                      onClick={() => setSelectedTruckForDispatch(truck)}
                      className="w-full h-9 bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-bold text-xs"
                    >
                      <span>Assign Load Order</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Available Trucks Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Equipment & Plate</th>
                  <th className="px-6 py-4">Make / Specs</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Carrier Network</th>
                  <th className="px-6 py-4">Driver Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                {availableTrucks.map((truck, idx) => (
                  <tr key={truck.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 rounded-xl overflow-hidden bg-[#080D1A] border border-white/15 shrink-0 shadow-sm relative">
                          <ZoomableImage
                            src={truck.imageUrl || "https://images.surferseo.art/de392d7b-7978-40fd-b3d8-05cd9eb4b91e.jpeg"}
                            alt={truck.plate}
                            captionTitle={`${truck.plate} • ${truck.model}`}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover"
                            showZoomBadge={false}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white font-mono">{truck.plate}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{truck.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{truck.model}</p>
                      <p className="text-xs text-slate-400">{truck.type} • {truck.capacity}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={truck.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-300">{truck.companyName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{truck.assignedDriverName || "Dedicated"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => setSelectedTruckForDispatch(truck)}
                        className="h-8 px-3 text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15"
                      >
                        Assign Load
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Quick Assign Load Order Modal */}
      <AnimatePresence>
        {selectedTruckForDispatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTruckForDispatch(null)}
              className="absolute inset-0 bg-[#080D1A]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0B1020] text-slate-100 rounded-3xl border border-white/15 shadow-2xl p-6 z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/15">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Dispatch Load to Vehicle</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedTruckForDispatch.plate} • {selectedTruckForDispatch.model}</p>
                  </div>
                </div>
              </div>

              {dispatchSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-400">Load manifest transmitted to driver console.</p>
                </div>
              ) : (
                <form onSubmit={handleAssignLoad} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Select Active Freight Load Order</label>
                    <select
                      value={assignedLoadNumber}
                      onChange={(e) => setAssignedLoadNumber(e.target.value)}
                      required
                      className="w-full h-11 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <option value="">-- Choose Ready Load Order --</option>
                      <option value="LD-8809">LD-8809 (Salt Lake, UT → Denver, CO • 44,000 lbs)</option>
                      <option value="LD-8815">LD-8815 (Dallas, TX → Houston, TX • 32,000 lbs)</option>
                      <option value="LD-8820">LD-8820 (Seattle, WA → Portland, OR • 18,500 lbs)</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Carrier Network:</span>
                      <span className="text-slate-200">{selectedTruckForDispatch.companyName}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Assigned Driver:</span>
                      <span className="text-slate-200">{selectedTruckForDispatch.assignedDriverName || "Dedicated"}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedTruckForDispatch(null)}
                      className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Transmit Dispatch
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
