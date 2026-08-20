"use client";

import { useState, useEffect } from "react";
import { X, Truck, Check, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Modal } from "@/components/atoms/modal";
import { TruckItem, TRUCK_IMAGE_PRESETS } from "@/data/mock-trucks";
import { DriverUser } from "@/data/mock-users";
import { cn } from "@/lib/utils";

interface TruckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (truckData: Omit<TruckItem, "id">) => void;
  truckToEdit?: TruckItem | null;
  driversList?: DriverUser[];
  companyName?: string;
  companyId?: string;
}

export function TruckModal({
  isOpen,
  onClose,
  onSave,
  truckToEdit,
  driversList = [],
  companyName = "Apex Global Carrier LLC",
  companyId = "CMP-CARRIER-01",
}: TruckModalProps) {
  const [formData, setFormData] = useState({
    plate: "",
    vin: "",
    model: "",
    type: "Heavy Semi-Truck",
    capacity: "45,000 lbs",
    status: "available" as TruckItem["status"],
    assignedDriverId: "",
    fuelLevel: 80,
    mileage: "0 mi",
    lastInspectionDate: new Date().toISOString().split("T")[0],
    imageUrl: TRUCK_IMAGE_PRESETS[0],
  });

  useEffect(() => {
    if (truckToEdit) {
      setFormData({
        plate: truckToEdit.plate,
        vin: truckToEdit.vin,
        model: truckToEdit.model,
        type: truckToEdit.type,
        capacity: truckToEdit.capacity,
        status: truckToEdit.status,
        assignedDriverId: truckToEdit.assignedDriverId || "",
        fuelLevel: truckToEdit.fuelLevel,
        mileage: truckToEdit.mileage,
        lastInspectionDate: truckToEdit.lastInspectionDate,
        imageUrl: truckToEdit.imageUrl || TRUCK_IMAGE_PRESETS[0],
      });
    } else {
      setFormData({
        plate: "",
        vin: "",
        model: "",
        type: "Heavy Semi-Truck",
        capacity: "45,000 lbs",
        status: "available",
        assignedDriverId: "",
        fuelLevel: 80,
        mileage: "0 mi",
        lastInspectionDate: new Date().toISOString().split("T")[0],
        imageUrl: TRUCK_IMAGE_PRESETS[Math.floor(Math.random() * TRUCK_IMAGE_PRESETS.length)],
      });
    }
  }, [truckToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plate || !formData.model) return;

    const assignedDriver = driversList.find((d) => d.id === formData.assignedDriverId);

    onSave({
      plate: formData.plate,
      vin: formData.vin || `1FT8W${Math.floor(100000000 + Math.random() * 900000000)}`,
      model: formData.model,
      type: formData.type,
      capacity: formData.capacity,
      status: formData.status,
      assignedDriverId: formData.assignedDriverId || undefined,
      assignedDriverName: assignedDriver ? assignedDriver.name : "Unassigned",
      fuelLevel: Number(formData.fuelLevel),
      mileage: formData.mileage.includes("mi") ? formData.mileage : `${formData.mileage} mi`,
      companyName: truckToEdit?.companyName || companyName,
      companyId: truckToEdit?.companyId || companyId,
      lastInspectionDate: formData.lastInspectionDate,
      imageUrl: formData.imageUrl || TRUCK_IMAGE_PRESETS[0],
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl" className="overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/15 shadow-sm">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {truckToEdit ? "Edit Fleet Vehicle" : "Register New Truck"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {truckToEdit ? `Updating ${truckToEdit.plate}` : "Add a commercial asset to your fleet"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar">
              {/* Photo Preview & Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  Select Vehicle Image
                </Label>
                <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#080D1A]">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white font-mono">
                      Selected Photo Preset
                    </span>
                  </div>
                </div>

                {/* Preset thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  {TRUCK_IMAGE_PRESETS.map((url, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: url })}
                      className={cn(
                        "w-14 h-10 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer",
                        formData.imageUrl === url
                          ? "ring-2 ring-blue-400 border-white"
                          : "opacity-60 hover:opacity-100 border-white/10"
                      )}
                    >
                      <img src={url} alt={`Preset ${pIdx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">License Plate *</Label>
                  <Input
                    required
                    value={formData.plate}
                    onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                    placeholder="e.g. CA-992-TR"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono placeholder:text-slate-500 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">VIN Number</Label>
                  <Input
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                    placeholder="e.g. 1FT8W3BT3MED19201"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono text-xs placeholder:text-slate-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Make & Model *</Label>
                  <Input
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Freightliner Cascadia 126"
                    className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Vehicle Type</Label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option value="Heavy Semi-Truck">Heavy Semi-Truck</option>
                    <option value="Box Truck 26ft">Box Truck 26ft</option>
                    <option value="Cargo Van">Cargo Van</option>
                    <option value="Reefer Truck 24ft">Reefer Truck 24ft</option>
                    <option value="Flatbed 48ft">Flatbed 48ft</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Payload Capacity</Label>
                  <Input
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g. 45,000 lbs"
                    className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Operational Status</Label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option value="available">Available (Ready to Assign)</option>
                    <option value="active">Active (On Road)</option>
                    <option value="in_transit">In Transit (Dispatched)</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="idle">Idle / Yard Staged</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Assigned Driver</Label>
                  <select
                    value={formData.assignedDriverId}
                    onChange={(e) => setFormData({ ...formData, assignedDriverId: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option value="">-- Unassigned --</option>
                    {driversList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.licenseClass})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Current Mileage</Label>
                  <Input
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g. 142,500 mi"
                    className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold shadow-md"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {truckToEdit ? "Save Changes" : "Create Asset"}
                </Button>
              </div>
            </form>
    </Modal>
  );
}
