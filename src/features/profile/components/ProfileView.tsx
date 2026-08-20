"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  Building,
  KeyRound,
  ShieldCheck,
  Check,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
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

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [jobTitle, setJobTitle] = useState(profile.jobTitle);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [state, setState] = useState(profile.state);
  const [zipCode, setZipCode] = useState(profile.zipCode);
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
    setAddress(profile.address);
    setCity(profile.city);
    setState(profile.state);
    setZipCode(profile.zipCode);
    setAvatarUrl(profile.avatarUrl || "");
  }, [profile]);

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setAvatarUrl(resultStr);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
      jobTitle,
      address,
      city,
      state,
      zipCode,
      avatarUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs"
          >
            <KeyRound className="w-4 h-4 mr-2" /> Reset Password
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Profile changes and profile picture updated successfully.</span>
        </motion.div>
      )}

      {/* Main Profile Form Card */}
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
                    captionTitle={`${fullName} - Profile Picture`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    showZoomBadge={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-lg text-white bg-white/10">
                    {fullName.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPhotoPickerOpen(true);
                  fileInputRef.current?.click();
                }}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md border border-white/20 transition-transform active:scale-95 cursor-pointer"
                title="Upload new profile picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">{fullName}</h3>
              <p className="text-xs text-slate-400">{jobTitle}</p>
              <p className="text-xs font-semibold text-blue-400 mt-0.5">{profile.companyName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
              className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-xs font-semibold"
            >
              <Camera className="w-3.5 h-3.5 mr-1.5" />
              {isPhotoPickerOpen ? "Close Photo Uploader" : "Add / Change Profile Photo"}
            </Button>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 2FA Active
            </span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/png, image/jpeg, image/webp, image/gif"
          className="hidden"
        />

        {/* Interactive Custom Photo Uploader Drawer */}
        <AnimatePresence>
          {isPhotoPickerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 border-b border-white/10 bg-[#0E1528] space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-400" />
                    Custom Profile Photo
                  </h4>
                  <p className="text-xs text-slate-400">
                    Upload your own picture from device or provide a direct web image link.
                  </p>
                </div>

                {avatarUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAvatarUrl("")}
                    className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-8"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove Photo
                  </Button>
                )}
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/15 hover:border-blue-400/50 bg-[#0B1020]/60 hover:bg-[#0B1020] rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-300 group-hover:text-blue-400 group-hover:scale-110 transition-all shadow-sm">
                  <UploadCloud className="w-6 h-6" />
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Personal Information
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Full Name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Job Title / Assignment</Label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Direct Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Organization & Address Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-3 space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Company Name</Label>
                <Input
                  disabled
                  value={profile.companyName}
                  className="h-10 bg-[#080D1A] border-white/5 text-slate-400 rounded-xl text-sm cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Street Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">State / Province</Label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-300">Postal / Zip Code</Label>
                <Input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <Button
              type="submit"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold px-6 shadow-md"
            >
              <Check className="w-4 h-4 mr-2" /> Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Reset Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
