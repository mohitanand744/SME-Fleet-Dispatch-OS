"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  UserPlus,
  Check,
  Camera,
  UploadCloud,
  Link as LinkIcon,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Modal } from "@/components/atoms/modal";
import { DriverUser, DispatcherUser } from "@/data/mock-users";
import { cn } from "@/lib/utils";

type UserType = "driver" | "dispatcher";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onSaveDriver?: (driver: Omit<DriverUser, "id" | "joinedDate">) => void;
  onSaveDispatcher?: (dispatcher: Omit<DispatcherUser, "id" | "joinedDate">) => void;
  userToEdit?: DriverUser | DispatcherUser | null;
  companyName?: string;
  companyId?: string;
}

export function UserModal({
  isOpen,
  onClose,
  userType,
  onSaveDriver,
  onSaveDispatcher,
  userToEdit,
  companyName = "Apex Global Carrier LLC",
  companyId = "CMP-CARRIER-01",
}: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [customUrlInput, setCustomUrlInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Driver-specific fields
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseClass, setLicenseClass] = useState<DriverUser["licenseClass"]>("CDL-A");
  const [driverStatus, setDriverStatus] = useState<DriverUser["status"]>("available");
  const [assignedTruckPlate, setAssignedTruckPlate] = useState("");

  // Dispatcher-specific fields
  const [deskAssignment, setDeskAssignment] = useState("West Coast Intermodal Desk");
  const [activeLanes, setActiveLanes] = useState("I-5 Corridor (CA/OR/WA)");
  const [dispatcherStatus, setDispatcherStatus] = useState<DispatcherUser["status"]>("active");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setAvatarUrl(userToEdit.avatarUrl || "");

      if ("licenseNumber" in userToEdit) {
        setLicenseNumber(userToEdit.licenseNumber);
        setLicenseClass(userToEdit.licenseClass);
        setDriverStatus(userToEdit.status);
        setAssignedTruckPlate(userToEdit.assignedTruckPlate || "");
      } else if ("deskAssignment" in userToEdit) {
        setDeskAssignment(userToEdit.deskAssignment);
        setActiveLanes(userToEdit.activeLanes.join(", "));
        setDispatcherStatus(userToEdit.status);
      }
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAvatarUrl("");
      setCustomUrlInput("");
      setLicenseNumber("");
      setLicenseClass("CDL-A");
      setDriverStatus("available");
      setAssignedTruckPlate("");
      setDeskAssignment("West Coast Intermodal Desk");
      setActiveLanes("I-5 Corridor (CA/OR/WA)");
      setDispatcherStatus("active");
    }
  }, [userToEdit, isOpen, userType]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (customUrlInput.trim()) {
      setAvatarUrl(customUrlInput.trim());
      setCustomUrlInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (userType === "driver" && onSaveDriver) {
      onSaveDriver({
        name,
        email,
        phone: phone || "+1 (555) 000-0000",
        licenseNumber: licenseNumber || `CDL-A-${Math.floor(100000 + Math.random() * 900000)}`,
        licenseClass,
        licenseExpiry: "2028-12-31",
        status: driverStatus,
        assignedTruckPlate: assignedTruckPlate || undefined,
        rating: 5.0,
        totalTrips: 0,
        companyId,
        companyName,
        avatarUrl: avatarUrl || undefined,
      });
    } else if (userType === "dispatcher" && onSaveDispatcher) {
      onSaveDispatcher({
        name,
        email,
        phone: phone || "+1 (555) 000-0000",
        deskAssignment,
        activeLanes: activeLanes.split(",").map((s) => s.trim()),
        status: dispatcherStatus,
        managedTrucksCount: 0,
        rating: 5.0,
        totalLoadsDispatched: 0,
        companyId,
        companyName,
        avatarUrl: avatarUrl || undefined,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg" className="overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/15 shadow-sm">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {userToEdit
                      ? `Edit ${userType === "driver" ? "Driver" : "Dispatcher"}`
                      : `Add New ${userType === "driver" ? "Driver" : "Dispatcher"}`}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {userType === "driver"
                      ? "Commercial driver credentials & assignments"
                      : "Operational desk assignment & lane coverage"}
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

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar">
              {/* Photo Upload & Preview */}
              <div className="space-y-2 p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    Profile Picture (Custom Upload or URL)
                  </Label>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setAvatarUrl("")}
                      className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#080D1A] shrink-0 flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-500" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
                    >
                      <UploadCloud className="w-3.5 h-3.5 mr-1.5" /> Upload from Computer
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
                        className="h-8 px-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg shrink-0"
                      >
                        Set
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Full Name *</Label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Morgan"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Email Address *</Label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rachel.m@vanguard.com"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                  />
                </div>

                {userType === "driver" ? (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">License Class</Label>
                    <select
                      value={licenseClass}
                      onChange={(e) => setLicenseClass(e.target.value as any)}
                      className="w-full h-10 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <option value="CDL-A">CDL-A (Commercial Combination)</option>
                      <option value="CDL-B">CDL-B (Heavy Straight Vehicle)</option>
                      <option value="CDL-C">CDL-C (Small Commercial)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">Status</Label>
                    <select
                      value={dispatcherStatus}
                      onChange={(e) => setDispatcherStatus(e.target.value as any)}
                      className="w-full h-10 px-3 rounded-xl bg-[#0E1528] border border-white/10 text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                      <option value="active">Active (On Duty)</option>
                      <option value="away">Away / Break</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                )}
              </div>

              {userType === "driver" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">CDL License Number</Label>
                    <Input
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. CDL-A-992015"
                      className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">Assigned Vehicle Plate</Label>
                    <Input
                      value={assignedTruckPlate}
                      onChange={(e) => setAssignedTruckPlate(e.target.value.toUpperCase())}
                      placeholder="e.g. CA-992-TR"
                      className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">Desk Assignment</Label>
                    <Input
                      value={deskAssignment}
                      onChange={(e) => setDeskAssignment(e.target.value)}
                      placeholder="e.g. Midwest Freight Corridor"
                      className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-300">Active Corridors (comma separated)</Label>
                    <Input
                      value={activeLanes}
                      onChange={(e) => setActiveLanes(e.target.value)}
                      placeholder="e.g. I-80 Central Corridor, I-35 North-South"
                      className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

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
                  {userToEdit ? "Save Changes" : "Create User"}
                </Button>
              </div>
            </form>
    </Modal>
  );
}
