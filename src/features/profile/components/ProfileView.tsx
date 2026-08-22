"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  KeyRound,
  ShieldCheck,
  Check,
  Mail,
  Phone,
  Clock,
  Sparkles,
  Camera,
  UploadCloud,
  Link as LinkIcon,
  Settings,
  Edit3,
  X,
  Shield,
  Copy,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { useUserProfile } from "@/data";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { UserRole } from "@/types/roles";
import { cn } from "@/lib/utils";

interface ProfileViewProps {
  role?: UserRole;
  title?: string;
  subtitle?: string;
}

export function ProfileView({
  role = "carrier-admin",
  title = "User Profile & Security",
  subtitle = "Manage personal account details, contact information, profile picture, and security credentials.",
}: ProfileViewProps) {
  const { profile, updateProfile } = useUserProfile(role);

  // Edit Mode state (default: false / view mode)
  const [isEditing, setIsEditing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [jobTitle, setJobTitle] = useState(profile.jobTitle);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setJobTitle(profile.jobTitle);
    setAvatarUrl(profile.avatarUrl || "");
  }, [profile]);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Handle local file upload
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

  const handleCancelEdit = () => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setJobTitle(profile.jobTitle);
    setAvatarUrl(profile.avatarUrl || "");
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
      jobTitle,
      avatarUrl,
    });
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs h-10 px-4 rounded-xl"
          >
            <KeyRound className="w-4 h-4 mr-2" /> Reset Password
          </Button>

          {isEditing ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="bg-white/5 border-white/15 text-slate-200 hover:bg-white/10 text-xs font-bold h-10 px-4 rounded-xl"
            >
              <X className="w-4 h-4 mr-1.5" /> Cancel
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile changes and profile picture updated successfully.</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 1. READ-ONLY PROFILE VIEW (DEFAULT) */}
      {/* ========================================================================= */}
      {!isEditing ? (
        <div className="space-y-6">
          {/* Hero Profile Badge Card */}
          <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden relative">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080D1A]">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#0E1528] shrink-0 flex items-center justify-center">
                    {profile.avatarUrl ? (
                      <ZoomableImage
                        src={profile.avatarUrl}
                        alt={profile.fullName}
                        captionTitle={`${profile.fullName} (${profile.jobTitle})`}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                        showZoomBadge={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 text-white font-extrabold flex items-center justify-center text-xl">
                        {profile.fullName.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold text-white">{profile.fullName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {role === "carrier-admin"
                        ? "Carrier Admin"
                        : role === "dispatch-admin"
                        ? "Dispatch Co. Admin"
                        : "Dispatcher"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{profile.jobTitle}</p>
                  <p className="text-xs text-slate-400 font-mono flex items-center gap-2 pt-0.5">
                    <span className="text-slate-300 font-semibold">{profile.companyName}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active & Verified
                    </span>
                  </p>
                </div>
              </div>

              {/* Modify Button */}
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/15 text-white text-xs font-bold h-9 px-4 rounded-xl shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Modify Profile
              </Button>
            </div>

            {/* Quick Contact Bar */}
            <div className="p-4 md:px-6 bg-[#0B1020] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pr-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Direct Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-semibold text-slate-200 hover:text-white truncate block"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Direct Phone</p>
                  <a
                    href={`tel:${profile.phone}`}
                    className="font-mono font-semibold text-slate-200 hover:text-white truncate block"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Grid: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal & Identification Details */}
            <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
              <CardHeader className="p-5 border-b border-white/10 bg-[#080D1A] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-blue-400" />
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">
                    Personal Information
                  </CardTitle>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {profile.id}
                </span>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block">Full Name</span>
                  <p className="font-semibold text-white text-sm">{profile.fullName}</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block">Job Assignment / Title</span>
                  <p className="font-semibold text-slate-200">{profile.jobTitle}</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block">Account Timezone</span>
                  <span className="text-slate-300 font-mono text-[11px] block">{profile.timezone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Account Security & Role Status */}
            <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
              <CardHeader className="p-5 border-b border-white/10 bg-[#080D1A] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">
                    Security & Credentials
                  </CardTitle>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Enforced
                </span>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">Account Password</span>
                    <span className="text-slate-300 font-mono">••••••••••••••••</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold h-7 px-3 rounded-lg"
                  >
                    Reset
                  </Button>
                </div>

                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">Two-Factor Authentication</span>
                    <span className="text-slate-300">Biometric & SMS OTP</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                    profile.twoFactorEnabled
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  )}>
                    {profile.twoFactorEnabled ? "Active" : "Disabled"}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">Portal Role Access</span>
                    <span className="font-semibold text-white capitalize">{role.replace("-", " ")}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Administrator
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. EDITABLE PROFILE FORM (ACTIVATED BY SETTINGS / EDIT BUTTON) */
        /* ========================================================================= */
        <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          {/* Header Profile Badge with Avatar */}
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080D1A]">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#0E1528] shrink-0">
                  {avatarUrl ? (
                    <ZoomableImage
                      src={avatarUrl}
                      alt={fullName}
                      captionTitle={`${fullName} (${jobTitle})`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      showZoomBadge={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 text-white font-extrabold flex items-center justify-center text-lg">
                      {fullName.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-white/20 transition-all cursor-pointer"
                  title="Change Profile Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-white">{fullName}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit Mode
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{jobTitle}</p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
              className="text-xs bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
            >
              <Camera className="w-3.5 h-3.5 mr-1.5" />
              {isPhotoPickerOpen ? "Hide Photo Uploader" : "Change Profile Photo"}
            </Button>
          </div>

          {/* Photo Upload Options Drawer */}
          <AnimatePresence>
            {isPhotoPickerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-5 border-b border-white/10 bg-[#0E1528] space-y-4 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Update Profile Photo
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Upload from your device or enter a web image URL.
                    </p>
                  </div>
                  {avatarUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setAvatarUrl("")}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-7"
                    >
                      Remove Photo
                    </Button>
                  )}
                </div>

                {/* Local Upload Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/15 hover:border-white/30 bg-[#080D1A] rounded-2xl p-4 text-center cursor-pointer transition-all flex items-center justify-center gap-3 group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center border border-white/10 text-slate-300">
                    <UploadCloud className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      Click to upload photo from your computer
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Supports PNG, JPG, JPEG, WEBP files
                    </p>
                  </div>
                </div>

                {/* Direct URL Input Alternative */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3 text-slate-400" />
                    Or Enter Image Web URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      placeholder="https://images.example.com/my-profile-pic.jpg"
                      className="h-10 bg-[#080D1A] border-white/10 text-xs font-mono text-white placeholder:text-slate-500 rounded-xl flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleApplyUrl}
                      disabled={!customUrlInput.trim()}
                      className="h-10 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-4 text-xs font-bold shrink-0"
                    >
                      Apply URL
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Body - Clean Personal Profile Only */}
          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <User className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Personal Information
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Job Title / Role Assignment</Label>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Direct Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Direct Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold px-4"
              >
                <X className="w-3.5 h-3.5 mr-1.5" /> Cancel
              </Button>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 shadow-md text-xs h-10 rounded-xl"
              >
                <Check className="w-4 h-4 mr-2" /> Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Password Reset Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
