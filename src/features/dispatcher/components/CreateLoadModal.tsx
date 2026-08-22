"use client";

import { useState } from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Package, MapPin, DollarSign, User, Calendar, Clock, Sparkles, X } from "lucide-react";
import { DispatchLoad } from "@/features/dispatcher/types";

interface CreateLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLoad: (newLoad: DispatchLoad) => void;
}

export function CreateLoadModal({ isOpen, onClose, onCreateLoad }: CreateLoadModalProps) {
  const [customer, setCustomer] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState("");
  const [driverName, setDriverName] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [priority, setPriority] = useState<"normal" | "high" | "urgent">("high");
  const [pickupTime, setPickupTime] = useState("08:00 AM Today");
  const [deliveryTime, setDeliveryTime] = useState("05:00 PM Tomorrow");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loadId = `LD-${Math.floor(8800 + Math.random() * 1000)}`;

    const newLoad: DispatchLoad = {
      id: loadId,
      loadNumber: loadId,
      customer: customer.trim() || "Apex Freight Logistics",
      origin: origin.trim() || "Long Beach Port, CA",
      destination: destination.trim() || "Phoenix Distribution Center, AZ",
      weight: weight.trim() ? `${weight.trim()} lbs` : "36,000 lbs",
      status: driverName.trim() ? "assigned" : "pending",
      driverName: driverName.trim() || undefined,
      vehiclePlate: vehiclePlate.trim() || (driverName.trim() ? "CA-902-TR" : undefined),
      pickupTime: pickupTime || "08:00 AM Today",
      deliveryTime: deliveryTime || "05:00 PM Tomorrow",
      priority,
    };

    onCreateLoad(newLoad);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl" className="overflow-hidden">
      <form onSubmit={handleSubmit} className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create New Freight Load Order</h3>
              <p className="text-xs text-slate-400">Generate a live dispatch manifest and route assignment</p>
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

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Customer / Shipper Name</Label>
              <Input
                placeholder="e.g. Apex Global Logistics"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Order Priority</Label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-[#0E1528] border border-white/10 text-white rounded-xl h-10 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="standard" className="bg-[#0B1020]">Standard Freight</option>
                <option value="high" className="bg-[#0B1020]">High Priority</option>
                <option value="urgent" className="bg-[#0B1020]">Urgent Expedited</option>
              </select>
            </div>
          </div>

          {/* Route Section */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Route Corridors</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Origin Facility
                </Label>
                <Input
                  placeholder="e.g. Port of Long Beach, CA"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> Destination Depot
                </Label>
                <Input
                  placeholder="e.g. Phoenix Distribution Center, AZ"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
                  required
                />
              </div>
            </div>
          </div>

          {/* Cargo & Billing */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Total Cargo Weight (lbs)</Label>
              <Input
                placeholder="e.g. 38,500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Agreed Contract Rate ($)</Label>
              <Input
                placeholder="e.g. $2,850"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Driver Assignment */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Assigned Driver (Optional)</Label>
              <Input
                placeholder="e.g. Robert Miller (Leave empty for unassigned)"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Vehicle Unit / Plate</Label>
              <Input
                placeholder="e.g. CA-883-TR"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Pickup Window</Label>
              <Input
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Target Delivery</Label>
              <Input
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="bg-[#0E1528] border-white/10 text-white rounded-xl h-10 text-xs"
              />
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
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 h-9.5 rounded-xl shadow-lg shadow-emerald-950/40 cursor-pointer"
          >
            Create & Dispatch Load
          </Button>
        </div>
      </form>
    </Modal>
  );
}
