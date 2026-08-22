"use client";

import { useState } from "react";
import { Truck, Plus, Filter, Search, MoreHorizontal, Wrench, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { TableScrollHint } from "@/components/atoms/TableScrollHint";
import { TRUCK_IMAGE_PRESETS } from "@/data/mock-trucks";
import { cn } from "@/lib/utils";

const fleetList = [
  { id: "V-101", plate: "CA-992-TR", model: "Freightliner Cascadia", type: "Semi-Truck", status: "active", driver: "Marcus Vance", fuel: "88%", mileage: "142,500 mi", img: TRUCK_IMAGE_PRESETS[0] },
  { id: "V-102", plate: "CA-441-TR", model: "Peterbilt 579", type: "Semi-Truck", status: "in_transit", driver: "Sarah Jenkins", fuel: "64%", mileage: "98,200 mi", img: TRUCK_IMAGE_PRESETS[1] },
  { id: "V-103", plate: "NV-883-BX", model: "Ford F-650", type: "Box Truck 26ft", status: "maintenance", driver: "Unassigned", fuel: "40%", mileage: "178,000 mi", img: TRUCK_IMAGE_PRESETS[6] },
  { id: "V-104", plate: "AZ-219-VN", model: "Mercedes Sprinter 3500", type: "Cargo Van", status: "idle", driver: "David Ross", fuel: "95%", mileage: "45,100 mi", img: TRUCK_IMAGE_PRESETS[3] },
  { id: "V-105", plate: "UT-705-TR", model: "Kenworth T680", type: "Semi-Truck", status: "active", driver: "Elena Ramos", fuel: "72%", mileage: "88,900 mi", img: TRUCK_IMAGE_PRESETS[4] },
];

export default function AdminFleetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredFleet = fleetList.filter(
    (item) =>
      item.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Fleet Asset Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitor vehicle health, assignments, fuel metrics, and maintenance schedules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white font-medium">
            <Wrench className="w-4 h-4 mr-2" /> Maintenance Log
          </Button>
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Register Asset
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by plate, model, driver..."
              className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              {filteredFleet.length} Registered Assets
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredFleet.map((item) => (
            <Card key={item.id} className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/25 transition-all rounded-3xl overflow-hidden group flex flex-col justify-between">
              <div className="relative h-40 w-full bg-[#080D1A] overflow-hidden">
                <ZoomableImage
                  src={item.img}
                  alt={item.model}
                  captionTitle={`${item.plate} • ${item.model}`}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/40 pointer-events-none" />

                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <StatusBadge status={item.status as any} />
                </div>

                <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-xl bg-[#080D1A]/90 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs shadow-lg">
                    {item.plate}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 space-y-3 text-xs bg-[#0B1020]">
                <div>
                  <h3 className="font-extrabold text-white text-base">{item.model}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{item.type} • ID: {item.id}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="font-semibold text-white">{item.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Odometer:</span>
                    <span className="font-mono text-slate-200">{item.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fuel Level:</span>
                    <span className="font-bold text-emerald-400">{item.fuel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <TableScrollHint />
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[780px]">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Vehicle / Plate</th>
                  <th className="px-6 py-4 whitespace-nowrap">Model & Type</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap">Assigned Driver</th>
                  <th className="px-6 py-4 whitespace-nowrap">Fuel & Mileage</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                {filteredFleet.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 rounded-xl overflow-hidden bg-[#080D1A] border border-white/15 shrink-0 shadow-sm">
                          <ZoomableImage
                            src={item.img}
                            alt={item.plate}
                            captionTitle={`${item.plate} • ${item.model}`}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover"
                            showZoomBadge={false}
                          />
                        </div>
                        <div className="min-w-0 max-w-[170px]">
                          <p className="font-bold text-white font-mono truncate">{item.plate}</p>
                          <p className="text-xs text-slate-400 font-mono truncate">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-[200px]">
                        <p className="font-semibold text-white truncate">{item.model}</p>
                        <p className="text-xs text-slate-400 truncate">{item.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status as any} />
                    </td>
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap truncate max-w-[160px]">{item.driver}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-semibold text-slate-200">
                        <span>{item.mileage}</span>
                        <span className="text-slate-400 ml-1.5 font-normal">({item.fuel} fuel)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </td>
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
