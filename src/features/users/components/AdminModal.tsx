"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Shield,
  ShieldCheck,
  Check,
  Camera,
  UploadCloud,
  User,
  KeyRound,
  Building2,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Modal } from "@/components/atoms/modal";
import { AdminUser, ADMIN_AVATAR_PRESETS } from "@/data/mock-users";
import { SafeImage } from "@/components/atoms/SafeImage";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (adminData: Omit<AdminUser, "id" | "joinedDate" | "lastActive">) => void;
  adminToEdit?: AdminUser | null;
  companyName?: string;
  companyId?: string;
}

export function AdminModal({
  isOpen,
  onClose,
  onSave,
  adminToEdit,
  companyName = "Apex Global Carrier LLC",
  companyId = "CMP-CARRIER-01",
}: AdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roleTitle: "",
    adminRole: "carrier_admin" as AdminUser["adminRole"],
    department: "Executive Leadership",
    status: "active" as AdminUser["status"],
    permissionsLevel: "Full System Access" as AdminUser["permissionsLevel"],
    twoFactorEnabled: true,
    avatarUrl: "",
  });

  const [customUrlInput, setCustomUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adminToEdit) {
      setFormData({
        name: adminToEdit.name,
        email: adminToEdit.email,
        phone: adminToEdit.phone,
        roleTitle: adminToEdit.roleTitle,
        adminRole: adminToEdit.adminRole,
        department: adminToEdit.department,
        status: adminToEdit.status,
        permissionsLevel: adminToEdit.permissionsLevel,
        twoFactorEnabled: adminToEdit.twoFactorEnabled,
        avatarUrl: adminToEdit.avatarUrl || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        roleTitle: "",
        adminRole: companyId.includes("DISPATCH") ? "dispatch_admin" : "carrier_admin",
        department: "Executive Leadership",
        status: "active",
        permissionsLevel: "Full System Access",
        twoFactorEnabled: true,
        avatarUrl: "",
      });
    }
    setCustomUrlInput("");
  }, [adminToEdit, isOpen, companyId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, avatarUrl: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (customUrlInput.trim()) {
      setFormData((prev) => ({ ...prev, avatarUrl: customUrlInput.trim() }));
      setCustomUrlInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onSave({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "+1 (555) 000-0000",
      roleTitle: formData.roleTitle || "System Administrator",
      adminRole: formData.adminRole,
      department: formData.department,
      status: formData.status,
      permissionsLevel: formData.permissionsLevel,
      twoFactorEnabled: formData.twoFactorEnabled,
      companyId: adminToEdit?.companyId || companyId,
      companyName: adminToEdit?.companyName || companyName,
      avatarUrl: formData.avatarUrl || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl" className="overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              {adminToEdit ? "Edit Administrator" : "Provision New Administrator"}
            </h3>
            <p className="text-xs text-slate-400">
              {adminToEdit ? `Updating privileges for ${adminToEdit.name}` : "Grant executive or departmental administrative privileges"}
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
        {/* Profile Picture Upload & Preview */}
        <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#0E1528] border border-white/5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              Admin Profile Photo (Custom Upload or URL)
            </Label>
            {formData.avatarUrl && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, avatarUrl: "" }))}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#080D1A] shrink-0 flex items-center justify-center">
              <SafeImage
                src={formData.avatarUrl}
                alt="Avatar preview"
                fallbackType="admin"
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

        {/* Basic Personal Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Full Name *</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Arthur Pendelton"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Work Email Address *</Label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. admin@company.com"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Direct Phone Number</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +1 (555) 781-4401"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Official Role Title *</Label>
            <Input
              required
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
              placeholder="e.g. Chief Safety & Compliance Officer"
              className="h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>
        </div>

        {/* Roles & Department Scope */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Department</Label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
            >
              <option value="Executive Leadership">Executive Leadership</option>
              <option value="Fleet Operations">Fleet Operations</option>
              <option value="Safety & Compliance">Safety & Compliance</option>
              <option value="Finance & Settlement">Finance & Settlement</option>
              <option value="Broker Partnerships">Broker Partnerships</option>
              <option value="Dispatch Management">Dispatch Management</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Permissions Level</Label>
            <select
              value={formData.permissionsLevel}
              onChange={(e) => setFormData({ ...formData, permissionsLevel: e.target.value as any })}
              className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
            >
              <option value="Full System Access">Full System Access (Super)</option>
              <option value="Operations & Fleet">Operations & Fleet Dispatch</option>
              <option value="Compliance & Audit">Compliance & Regulatory Audit</option>
              <option value="Billing & Invoices">Billing, Settlement & Invoices</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Account Status</Label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
            >
              <option value="active">Active & Authorized</option>
              <option value="away">Away / On Leave</option>
              <option value="offline">Offline</option>
              <option value="suspended">Suspended / Revoked</option>
            </select>
          </div>
        </div>

        {/* Security & 2FA Toggle */}
        <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              Two-Factor Authentication (2FA) Enforcement
            </p>
            <p className="text-[11px] text-slate-400">
              Mandate hardware key or authenticator app verification on login.
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.twoFactorEnabled}
            onChange={(e) => setFormData({ ...formData, twoFactorEnabled: e.target.checked })}
            className="w-4 h-4 rounded border-white/20 bg-[#080D1A] text-blue-600 focus:ring-0 cursor-pointer"
          />
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
            {adminToEdit ? "Save Privileges" : "Provision Admin"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
