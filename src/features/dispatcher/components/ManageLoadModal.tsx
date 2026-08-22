"use client";

import { useState } from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import {
  Package,
  MapPin,
  Clock,
  UserCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  X,
  FileText,
} from "lucide-react";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { DispatchLoad } from "@/features/dispatcher/types";

interface ManageLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  load: DispatchLoad | null;
  onUpdateLoad?: (updatedLoad: DispatchLoad) => void;
}

export function ManageLoadModal({ isOpen, onClose, load, onUpdateLoad }: ManageLoadModalProps) {
  if (!load) return null;

  const [currentStatus, setCurrentStatus] = useState<string>(load.status);
  const [driverName, setDriverName] = useState(load.driverName || "");
  const [vehiclePlate, setVehiclePlate] = useState(load.vehiclePlate || "CA-902-TR");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (onUpdateLoad) {
      onUpdateLoad({
        ...load,
        status: currentStatus as any,
        driverName: driverName.trim() || undefined,
        vehiclePlate: vehiclePlate.trim() || undefined,
      });
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{load.loadNumber}</h3>
                <StatusBadge status={currentStatus as any} />
              </div>
              <p className="text-xs text-slate-400">Shipper: {load.customer}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Route Progression Card */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span>Transit Telemetry & Route Progress</span>
              <span className="text-emerald-400 text-[11px] font-bold">Live GPS Synced</span>
            </h4>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0E1528] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <MapPin className="w-4 h-4" /> Origin Dispatch Point
                </div>
                <p className="text-white font-semibold">{load.origin}</p>
                <p className="text-[11px] text-slate-400">Departed: {load.pickupTime || "06:30 AM"}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0E1528] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <MapPin className="w-4 h-4" /> Destination Facility
                </div>
                <p className="text-white font-semibold">{load.destination}</p>
                <p className="text-[11px] text-slate-400">Target ETA: {load.deliveryTime || "04:00 PM Today"}</p>
              </div>
            </div>
          </div>

          {/* Quick Status Switcher */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Update Dispatch Status</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "pending", label: "Pending", color: "border-amber-500/30 text-amber-300 hover:bg-amber-500/10" },
                { id: "assigned", label: "Assigned", color: "border-blue-500/30 text-blue-300 hover:bg-blue-500/10" },
                { id: "in_transit", label: "In Transit", color: "border-purple-500/30 text-purple-300 hover:bg-purple-500/10" },
                { id: "delivered", label: "Delivered", color: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentStatus(s.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${s.color} ${
                    currentStatus === s.id ? "bg-white/15 border-white/40 text-white shadow-md" : "bg-[#0E1528]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Driver & Equipment Management */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Driver & Power Unit</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-300">Assigned Commercial Driver</Label>
                <Input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Robert Miller"
                  className="bg-[#0E1528] border-white/10 text-white text-xs h-10 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-300">Vehicle Unit Plate</Label>
                <Input
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="e.g. CA-883-TR"
                  className="bg-[#0E1528] border-white/10 text-white text-xs h-10 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* Cargo Manifest Specifications */}
          <div className="p-4 rounded-2xl bg-[#0E1528] border border-white/10 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Manifest Specs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400 pt-1">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Gross Weight</span>
                <span className="text-white font-semibold">{load.weight}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Priority Tier</span>
                <span className="text-white font-semibold capitalize">{load.priority || "High"}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Security Seal</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-3 bg-[#080D1A]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 text-xs font-semibold px-4 h-9.5 rounded-xl cursor-pointer"
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 h-9.5 rounded-xl shadow-lg shadow-emerald-950/40 cursor-pointer"
          >
            {isSaved ? "Changes Saved!" : "Save & Update Manifest"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
