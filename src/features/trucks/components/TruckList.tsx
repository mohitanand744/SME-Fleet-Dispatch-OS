"use client";

import { useState } from "react";
import {
  Truck,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash2,
  LayoutGrid,
  List as ListIcon,
  Fuel,
  Gauge,
  Calendar,
  UserCheck,
  ShieldAlert,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { DataNotFound } from "@/components/molecules/DataNotFound";
import { TruckItem } from "@/data/mock-trucks";
import { useTrucksData, useDriversData } from "@/data";
import { TruckModal } from "./TruckModal";
import { TruckDeleteDialog } from "./TruckDeleteDialog";
import { ViewToggle } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { cn } from "@/lib/utils";

interface TruckListProps {
  title?: string;
  subtitle?: string;
  companyId?: string;
  companyName?: string;
}

export function TruckList({
  title = "Truck Fleet Management",
  subtitle = "Register, assign, inspect, and manage commercial vehicle assets.",
  companyId,
  companyName,
}: TruckListProps) {
  const { trucks, addTruck, updateTruck, deleteTruck } = useTrucksData(companyId);
  const { drivers } = useDriversData(companyId);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [truckToEdit, setTruckToEdit] = useState<TruckItem | null>(null);
  const [truckToDelete, setTruckToDelete] = useState<TruckItem | null>(null);

  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch =
      truck.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (truck.assignedDriverName && truck.assignedDriverName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" ? true : truck.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" /> Register New Truck
          </Button>
        </div>
      </div>

      {/* Filter and View Toggle Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plate, model, driver, VIN..."
              className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl"
            />
          </div>

          {/* Right controls: View Toggle and Count */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Showing {filteredTrucks.length} of {trucks.length} Trucks
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {[
            { id: "all", label: "All Vehicles" },
            { id: "available", label: "Available" },
            { id: "active", label: "Active" },
            { id: "in_transit", label: "In Transit" },
            { id: "maintenance", label: "Maintenance" },
            { id: "idle", label: "Idle" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer",
                statusFilter === tab.id
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
        /* Grid Card View with High-Res Truck Images */
        <>
          {filteredTrucks.length === 0 ? (
            <div className="pt-8">
              <DataNotFound title="No trucks found" description="We couldn't find any fleet assets matching your search query." />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredTrucks.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/25 transition-all rounded-3xl overflow-hidden group flex flex-col h-full">
                  {/* Photo Header */}
                  <div className="relative h-44 w-full bg-[#080D1A] overflow-hidden">
                    <ZoomableImage
                      src={item.imageUrl || "https://images.surferseo.art/de392d7b-7978-40fd-b3d8-05cd9eb4b91e.jpeg"}
                      alt={item.model}
                      captionTitle={`${item.plate} • ${item.model} (${item.type})`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/30 pointer-events-none" />

                    {/* Floating Status Badge */}
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <StatusBadge status={item.status} />
                    </div>

                    {/* Floating License Plate Tag */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                      <div className="px-2.5 py-1 rounded-xl bg-[#080D1A]/90 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs shadow-lg">
                        {item.plate}
                      </div>
                      <span className="text-[10px] text-slate-300 font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <CardContent className="p-4 space-y-3 text-xs bg-[#0B1020] flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-extrabold text-white text-base leading-snug">{item.model}</h3>
                        <p className="text-slate-400 text-xs mt-0.5">{item.type} • Cap: {item.capacity}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1.5 text-slate-300">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Assigned Driver:</span>
                          <span className="font-semibold text-white">{item.assignedDriverName || "Unassigned"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Mileage Odometer:</span>
                          <span className="font-mono text-slate-200">{item.mileage}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Fuel Level:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-400">{item.fuelLevel}%</span>
                            <div className="w-12 bg-[#080D1A] rounded-full h-1.5 overflow-hidden border border-white/10">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  item.fuelLevel > 50 ? "bg-emerald-400" : item.fuelLevel > 25 ? "bg-amber-400" : "bg-rose-400"
                                )}
                                style={{ width: `${item.fuelLevel}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTruckToEdit(item)}
                        className="w-[48%] h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTruckToDelete(item)}
                        className="w-[48%] h-8 text-xs font-semibold bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        /* Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Vehicle & VIN</th>
                  <th className="px-6 py-4">Model & Capacity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assigned Driver</th>
                  <th className="px-6 py-4">Fuel & Mileage</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                <AnimatePresence>
                  {filteredTrucks.length === 0 ? (
                    <motion.tr
                      key="empty-trucks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={6} className="px-6 py-8">
                        <DataNotFound title="No trucks found" description="We couldn't find any fleet assets matching your search query." />
                      </td>
                    </motion.tr>
                  ) : (
                    filteredTrucks.map((item, idx) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.15 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 rounded-xl overflow-hidden bg-[#080D1A] border border-white/15 shrink-0 shadow-sm relative">
                              <ZoomableImage
                                src={item.imageUrl || "https://images.surferseo.art/de392d7b-7978-40fd-b3d8-05cd9eb4b91e.jpeg"}
                                alt={item.plate}
                                captionTitle={`${item.plate} • ${item.model}`}
                                containerClassName="w-full h-full"
                                className="w-full h-full object-cover"
                                showZoomBadge={false}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white font-mono">{item.plate}</p>
                              <p className="text-[11px] text-slate-400 font-mono truncate max-w-[140px]">{item.vin}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{item.model}</p>
                          <p className="text-xs text-slate-400">{item.type} • {item.capacity}</p>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
                            <span>{item.assignedDriverName || "Unassigned"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center gap-2 font-semibold text-slate-200">
                              <span>{item.mileage}</span>
                            </div>
                            <div className="w-24 bg-[#0E1528] rounded-full h-1.5 overflow-hidden border border-white/10">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  item.fuelLevel > 50 ? "bg-emerald-400" : item.fuelLevel > 25 ? "bg-amber-400" : "bg-rose-400"
                                )}
                                style={{ width: `${item.fuelLevel}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setTruckToEdit(item)}
                              className="h-8 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold"
                            >
                              <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setTruckToDelete(item)}
                              className="h-8 px-2.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Create / Edit Truck Modal */}
      <TruckModal
        isOpen={isCreateModalOpen || !!truckToEdit}
        onClose={() => {
          setIsCreateModalOpen(false);
          setTruckToEdit(null);
        }}
        onSave={(truckData) => {
          if (truckToEdit) {
            updateTruck(truckToEdit.id, truckData);
          } else {
            addTruck(truckData);
          }
        }}
        truckToEdit={truckToEdit}
        driversList={drivers}
        companyId={companyId}
        companyName={companyName}
      />

      {/* Delete Confirmation Modal */}
      <TruckDeleteDialog
        isOpen={!!truckToDelete}
        onClose={() => setTruckToDelete(null)}
        onConfirm={() => {
          if (truckToDelete) {
            deleteTruck(truckToDelete.id);
          }
        }}
        truck={truckToDelete}
      />
    </div>
  );
}
