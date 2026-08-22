"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Truck,
  Check,
  Image as ImageIcon,
  Camera,
  UploadCloud,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Modal } from "@/components/atoms/modal";
import { TruckItem, TRUCK_IMAGE_PRESETS } from "@/data/mock-trucks";
import { DriverUser } from "@/data/mock-users";
import { SafeImage } from "@/components/atoms/SafeImage";
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

  const [customUrlInput, setCustomUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        imageUrl: truckToEdit.imageUrl || "",
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
        imageUrl: "",
      });
    }
    setCustomUrlInput("");
  }, [truckToEdit, isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, imageUrl: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (customUrlInput.trim()) {
      setFormData((prev) => ({ ...prev, imageUrl: customUrlInput.trim() }));
      setCustomUrlInput("");
    }
  };

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
      imageUrl: formData.imageUrl || "",
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
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar">
        {/* Photo Upload & Preview */}
        <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#0E1528] border border-white/5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              Vehicle Image (Custom Upload or URL)
            </Label>
            {formData.imageUrl && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-28 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#080D1A] shrink-0 flex items-center justify-center relative group">
              <SafeImage
                src={formData.imageUrl}
                alt="Vehicle preview"
                fallbackType="truck"
                enableZoom={false}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 w-full space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5 mr-1.5" /> Upload Photo from Computer
              </Button>
              <div className="flex gap-1.5">
                <Input
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="Or paste direct image URL..."
                  className="h-8 bg-[#080D1A] border-white/10 text-[11px] font-mono text-white placeholder:text-slate-500 rounded-lg flex-1"
                />
                <Button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={!customUrlInput.trim()}
                  className="h-8 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
                >
                  Set
                </Button>
              </div>
            </div>
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
              placeholder="e.g. 1FT8W3BT6MED11559"
              className="h-10 bg-[#0E1528] border-white/10 text-white font-mono placeholder:text-slate-500 rounded-xl"
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
              placeholder="e.g. Freightliner Cascadia 2024"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Vehicle Type</Label>
            <Input
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g. Heavy Semi-Truck"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
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
              className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden focus:border-white/30"
            >
              <option value="available">Available / Ready</option>
              <option value="in_transit">In Transit / Dispatched</option>
              <option value="maintenance">In Maintenance</option>
              <option value="inactive">Inactive / Reserved</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Assigned Driver</Label>
            <select
              value={formData.assignedDriverId}
              onChange={(e) => setFormData({ ...formData, assignedDriverId: e.target.value })}
              className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden focus:border-white/30"
            >
              <option value="">Unassigned</option>
              {driversList.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} ({driver.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Fuel Level (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.fuelLevel}
              onChange={(e) => setFormData({ ...formData, fuelLevel: Number(e.target.value) })}
              className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Odometer Mileage</Label>
            <Input
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              placeholder="e.g. 142,500 mi"
              className="h-10 bg-[#0E1528] border-white/10 text-white font-mono placeholder:text-slate-500 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Last Inspection Date</Label>
            <Input
              type="date"
              value={formData.lastInspectionDate}
              onChange={(e) => setFormData({ ...formData, lastInspectionDate: e.target.value })}
              className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 shadow-md text-xs h-10 rounded-xl"
          >
            <Check className="w-4 h-4 mr-2" />
            {truckToEdit ? "Update Vehicle" : "Register Truck"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
