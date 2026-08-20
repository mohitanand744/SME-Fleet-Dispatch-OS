"use client";

import { useState } from "react";
import { Package, Plus, Search, Filter, ArrowRight, UserCheck, DollarSign, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { cn } from "@/lib/utils";

const loadsData = [
  { id: "LD-8801", origin: "Long Beach, CA", dest: "Phoenix, AZ", weight: "38,500 lbs", status: "in_transit", driver: "Robert Miller", rate: "$2,400", commodity: "Automotive Parts" },
  { id: "LD-8804", origin: "Salinas, CA", dest: "Las Vegas, NV", weight: "22,100 lbs", status: "assigned", driver: "Alex Rivera", rate: "$1,850", commodity: "Fresh Produce" },
  { id: "LD-8809", origin: "Salt Lake, UT", dest: "Denver, CO", weight: "44,000 lbs", status: "pending", driver: "Unassigned", rate: "$3,100", commodity: "Dry Goods" },
  { id: "LD-8812", origin: "Portland, OR", dest: "Seattle, WA", weight: "18,400 lbs", status: "delayed", driver: "Kevin Durant", rate: "$1,200", commodity: "Beverages" },
  { id: "LD-8815", origin: "Dallas, TX", dest: "Houston, TX", weight: "32,000 lbs", status: "in_transit", driver: "Sarah Jenkins", rate: "$1,600", commodity: "Consumer Tech" },
];

export default function DispatcherLoadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredLoads = loadsData.filter(
    (load) =>
      load.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.dest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Active Freight Loads</h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, track, and assign live freight shipments and manifests.
          </p>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
          <Plus className="w-4 h-4 mr-2" /> New Load Order
        </Button>
      </div>

      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Load ID, destination, driver..."
              className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              {filteredLoads.length} Active Loads
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLoads.map((load) => (
            <Card key={load.id} className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/20 transition-all rounded-3xl overflow-hidden flex flex-col justify-between">
              <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-[#080D1A]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-white">{load.id}</CardTitle>
                    <p className="text-[11px] text-slate-400">{load.commodity}</p>
                  </div>
                </div>
                <StatusBadge status={load.status as any} />
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs bg-[#0B1020]">
                <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-400 font-semibold">Origin:</span>
                    <span className="truncate">{load.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-slate-400 font-semibold">Destination:</span>
                    <span className="truncate font-bold text-white">{load.dest}</span>
                  </div>
                </div>

                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver Assigned:</span>
                    <span className="font-semibold text-white">{load.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payload Weight:</span>
                    <span className="font-mono text-slate-200">{load.weight}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Freight Settlement:</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">{load.rate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Load Order</th>
                  <th className="px-6 py-4">Route Path</th>
                  <th className="px-6 py-4">Weight / Payload</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assigned Driver</th>
                  <th className="px-6 py-4 text-right">Freight Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                {filteredLoads.map((load) => (
                  <tr key={load.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{load.id}</p>
                          <p className="text-[11px] text-slate-400">{load.commodity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <span>{load.origin}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-white">{load.dest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-400">{load.weight}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={load.status as any} />
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-300">{load.driver}</td>
                    <td className="px-6 py-4 text-xs font-bold text-emerald-400 text-right">{load.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
