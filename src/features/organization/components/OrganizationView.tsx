"use client";

import { useState, useEffect, useRef } from "react";
import {
  Building2,
  ShieldCheck,
  Check,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Shield,
  Camera,
  UploadCloud,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  Award,
  AlertCircle,
  Settings,
  Edit3,
  ExternalLink,
  Copy,
  CheckCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { useOrganizationData } from "@/data";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { UserRole } from "@/types/roles";
import { cn } from "@/lib/utils";

interface OrganizationViewProps {
  role?: UserRole;
  title?: string;
  subtitle?: string;
}

export function OrganizationView({
  role = "carrier-admin",
  title = "Organization & Corporate Profile",
  subtitle = "View and manage company credentials, USDOT authority, regulatory filings, and corporate headquarters.",
}: OrganizationViewProps) {
  const { organization, updateOrganization } = useOrganizationData(role);

  // Edit Mode Toggle (default: false / view mode)
  const [isEditing, setIsEditing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form state
  const [companyName, setCompanyName] = useState(organization.companyName);
  const [legalName, setLegalName] = useState(organization.legalName);
  const [businessType, setBusinessType] = useState(organization.businessType);
  const [foundedYear, setFoundedYear] = useState(organization.foundedYear);
  const [dotNumber, setDotNumber] = useState(organization.dotNumber);
  const [mcNumber, setMcNumber] = useState(organization.mcNumber);
  const [taxId, setTaxId] = useState(organization.taxId);
  const [operatingStatus, setOperatingStatus] = useState(organization.operatingStatus);
  const [safetyRating, setSafetyRating] = useState(organization.safetyRating);

  const [email, setEmail] = useState(organization.email);
  const [phone, setPhone] = useState(organization.phone);
  const [website, setWebsite] = useState(organization.website);

  const [address, setAddress] = useState(organization.address);
  const [city, setCity] = useState(organization.city);
  const [state, setState] = useState(organization.state);
  const [zipCode, setZipCode] = useState(organization.zipCode);
  const [country, setCountry] = useState(organization.country);

  const [insuranceCarrier, setInsuranceCarrier] = useState(organization.insuranceCarrier);
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState(organization.insurancePolicyNumber);
  const [insuranceCoverage, setInsuranceCoverage] = useState(organization.insuranceCoverage);
  const [insuranceExpiry, setInsuranceExpiry] = useState(organization.insuranceExpiry);

  const [logoUrl, setLogoUrl] = useState(organization.logoUrl || "");
  const [customLogoUrl, setCustomLogoUrl] = useState("");
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCompanyName(organization.companyName);
    setLegalName(organization.legalName);
    setBusinessType(organization.businessType);
    setFoundedYear(organization.foundedYear);
    setDotNumber(organization.dotNumber);
    setMcNumber(organization.mcNumber);
    setTaxId(organization.taxId);
    setOperatingStatus(organization.operatingStatus);
    setSafetyRating(organization.safetyRating);

    setEmail(organization.email);
    setPhone(organization.phone);
    setWebsite(organization.website);

    setAddress(organization.address);
    setCity(organization.city);
    setState(organization.state);
    setZipCode(organization.zipCode);
    setCountry(organization.country);

    setInsuranceCarrier(organization.insuranceCarrier);
    setInsurancePolicyNumber(organization.insurancePolicyNumber);
    setInsuranceCoverage(organization.insuranceCoverage);
    setInsuranceExpiry(organization.insuranceExpiry);

    setLogoUrl(organization.logoUrl || "");
  }, [organization]);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyLogoUrl = () => {
    if (customLogoUrl.trim()) {
      setLogoUrl(customLogoUrl.trim());
      setCustomLogoUrl("");
    }
  };

  const handleCancelEdit = () => {
    setCompanyName(organization.companyName);
    setLegalName(organization.legalName);
    setBusinessType(organization.businessType);
    setFoundedYear(organization.foundedYear);
    setDotNumber(organization.dotNumber);
    setMcNumber(organization.mcNumber);
    setTaxId(organization.taxId);
    setOperatingStatus(organization.operatingStatus);
    setSafetyRating(organization.safetyRating);
    setEmail(organization.email);
    setPhone(organization.phone);
    setWebsite(organization.website);
    setAddress(organization.address);
    setCity(organization.city);
    setState(organization.state);
    setZipCode(organization.zipCode);
    setCountry(organization.country);
    setInsuranceCarrier(organization.insuranceCarrier);
    setInsurancePolicyNumber(organization.insurancePolicyNumber);
    setInsuranceCoverage(organization.insuranceCoverage);
    setInsuranceExpiry(organization.insuranceExpiry);
    setLogoUrl(organization.logoUrl || "");
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization({
      companyName,
      legalName,
      businessType,
      foundedYear,
      dotNumber,
      mcNumber,
      taxId,
      operatingStatus,
      safetyRating,
      email,
      phone,
      website,
      address,
      city,
      state,
      zipCode,
      country,
      insuranceCarrier,
      insurancePolicyNumber,
      insuranceCoverage,
      insuranceExpiry,
      logoUrl,
    });
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Organization Details
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {organization.id}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1.5 tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        {/* Header Action: Edit / Settings Toggle */}
        <div className="flex items-center gap-3">
          {isEditing ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="bg-white/5 border-white/15 text-slate-200 hover:bg-white/10 text-xs font-bold h-10 px-4 rounded-xl"
            >
              <X className="w-4 h-4 mr-1.5" /> Cancel Editing
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>Edit Organization Details</span>
            </Button>
          )}
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Organization profile, regulatory credentials, and contact details updated successfully.</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 1. READ-ONLY VIEW MODE (DEFAULT) */}
      {/* ========================================================================= */}
      {!isEditing ? (
        <div className="space-y-6">
          {/* Hero Branding Banner Card */}
          <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden relative">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#080D1A] border-b border-white/10">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#0E1528] shrink-0 flex items-center justify-center">
                  {organization.logoUrl ? (
                    <ZoomableImage
                      src={organization.logoUrl}
                      alt={organization.companyName}
                      captionTitle={`${organization.companyName} • Corporate Logo`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      showZoomBadge={false}
                    />
                  ) : (
                    <Building2 className="w-10 h-10 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      {organization.companyName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {organization.operatingStatus}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{organization.legalName}</p>
                  <p className="text-xs text-blue-300 font-mono flex items-center gap-2 pt-0.5">
                    <span>{organization.businessType}</span>
                    <span>•</span>
                    <span>Est. {organization.foundedYear}</span>
                  </p>
                </div>
              </div>

              {/* Quick Settings Icon Button in Hero */}
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/15 text-white text-xs font-bold h-9 px-4 rounded-xl shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Modify Details
              </Button>
            </div>

            {/* Quick Contact & Info Bar */}
            <div className="p-4 md:px-8 bg-[#0B1020] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pr-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Primary Office Email</p>
                  <a
                    href={`mailto:${organization.email}`}
                    className="font-semibold text-slate-200 hover:text-white truncate block"
                  >
                    {organization.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dispatch & Phone</p>
                  <a
                    href={`tel:${organization.phone}`}
                    className="font-mono font-semibold text-slate-200 hover:text-white truncate block"
                  >
                    {organization.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Corporate Web Portal</p>
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-semibold text-blue-400 hover:text-blue-300 truncate flex items-center gap-1"
                  >
                    <span>{organization.website}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Grid: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regulatory & Operating Filings */}
            <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
              <CardHeader className="p-5 border-b border-white/10 bg-[#080D1A] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">
                    DOT & Operating Filings
                  </CardTitle>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                  Verified FMCSA
                </span>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">USDOT Registration</span>
                    <span className="font-mono font-bold text-white text-sm">{organization.dotNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(organization.dotNumber, "dot")}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy USDOT Number"
                  >
                    {copiedField === "dot" ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">MC / FF Operating Authority</span>
                    <span className="font-mono font-bold text-white text-sm">{organization.mcNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(organization.mcNumber, "mc")}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy MC Number"
                  >
                    {copiedField === "mc" ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block">Federal Tax ID (EIN)</span>
                    <span className="font-mono font-semibold text-slate-200">{organization.taxId}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block">Safety Rating</span>
                    <span className="font-semibold text-emerald-400">{organization.safetyRating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Corporate Headquarters Address */}
            <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
              <CardHeader className="p-5 border-b border-white/10 bg-[#080D1A] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">
                    Corporate Headquarters
                  </CardTitle>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Physical Dispatch Hub
                </span>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block">Street Address</span>
                  <p className="font-semibold text-white text-sm">{organization.address}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block">City</span>
                    <span className="font-semibold text-slate-200">{organization.city}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block">State / Region</span>
                    <span className="font-semibold text-slate-200">{organization.state}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block">Postal / Zip</span>
                    <span className="font-mono font-semibold text-slate-200">{organization.zipCode}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Jurisdiction Country</span>
                  <span className="font-semibold text-white">{organization.country}</span>
                </div>
              </CardContent>
            </Card>

            {/* Insurance & Compliance Overview */}
            <Card className="md:col-span-2 border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
              <CardHeader className="p-5 border-b border-white/10 bg-[#080D1A] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">
                    Commercial Insurance & Cargo Protection Policy
                  </CardTitle>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/20">
                  Active Coverage
                </span>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">Underwriting Carrier</span>
                    <p className="font-bold text-white">{organization.insuranceCarrier}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">Policy Number</span>
                    <p className="font-mono font-semibold text-slate-200">{organization.insurancePolicyNumber}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">Liability & Cargo Limit</span>
                    <p className="font-semibold text-cyan-300">{organization.insuranceCoverage}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">Policy Expiration</span>
                    <p className="font-mono font-semibold text-slate-200">{organization.insuranceExpiry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. EDITABLE SETTINGS FORM MODE (ACTIVATED BY SETTINGS ICON) */
        /* ========================================================================= */
        <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden">
          {/* Header Branding Banner with Active Logo Picker */}
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#080D1A]">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#0E1528] shrink-0 flex items-center justify-center">
                  {logoUrl ? (
                    <ZoomableImage
                      src={logoUrl}
                      alt={companyName}
                      captionTitle={`${companyName} • Organization Logo`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      showZoomBadge={false}
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsLogoPickerOpen(!isLogoPickerOpen)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-white/20 transition-all cursor-pointer"
                  title="Change Company Logo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-white">{companyName}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit Mode
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Modify regulatory, corporate identity and address records.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsLogoPickerOpen(!isLogoPickerOpen)}
                className="text-xs bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
              >
                <Camera className="w-3.5 h-3.5 mr-1.5" />
                {isLogoPickerOpen ? "Hide Logo Uploader" : "Update Brand Logo"}
              </Button>
            </div>
          </div>

          {/* Logo Upload Drawer */}
          <AnimatePresence>
            {isLogoPickerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-5 border-b border-white/10 bg-[#0E1528] space-y-4 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Update Organization Brand Logo
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Upload a high-resolution logo from your device or provide a direct web image link.
                    </p>
                  </div>
                  {logoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setLogoUrl("")}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-7"
                    >
                      Remove Logo
                    </Button>
                  )}
                </div>

                {/* Local File Upload Dropzone */}
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
                      Click to select logo image from your device
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Supports PNG, JPG, JPEG, SVG or WEBP
                    </p>
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3 text-slate-400" />
                    Or Paste External Logo URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={customLogoUrl}
                      onChange={(e) => setCustomLogoUrl(e.target.value)}
                      placeholder="https://company.com/brand-logo.png"
                      className="h-10 bg-[#080D1A] border-white/10 text-xs font-mono text-white placeholder:text-slate-500 rounded-xl flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleApplyLogoUrl}
                      disabled={!customLogoUrl.trim()}
                      className="h-10 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-4 text-xs font-bold shrink-0"
                    >
                      Apply Logo
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Body */}
          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
            {/* Section 1: General Organization Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  1. General Company Identity
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">
                    Company Name <span className="text-blue-400 font-normal">(Display Brand)</span>
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Global Carrier LLC"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-semibold rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Legal Corporate Name</Label>
                  <Input
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="e.g. Apex Global Carrier & Freight Services LLC"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Business Classification</Label>
                  <Input
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="e.g. Motor Carrier / Fleet Operator"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Year Established</Label>
                  <Input
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    placeholder="e.g. 2018"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Regulatory & DOT Authority */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  2. DOT & Operating Authority Filings
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">USDOT Registration Number</Label>
                  <Input
                    value={dotNumber}
                    onChange={(e) => setDotNumber(e.target.value)}
                    placeholder="DOT #3891042"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">MC / FF Operating Authority</Label>
                  <Input
                    value={mcNumber}
                    onChange={(e) => setMcNumber(e.target.value)}
                    placeholder="MC-109284-B"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Federal EIN / Tax ID</Label>
                  <Input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="XX-XXXX8912"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Operating Status</Label>
                  <select
                    value={operatingStatus}
                    onChange={(e) => setOperatingStatus(e.target.value as any)}
                    className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-sm rounded-xl px-3 focus:outline-hidden focus:border-white/30"
                  >
                    <option value="Active Authority">Active Authority</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">FMCSA Safety Rating</Label>
                  <select
                    value={safetyRating}
                    onChange={(e) => setSafetyRating(e.target.value as any)}
                    className="w-full h-10 bg-[#0E1528] border border-white/10 text-white text-sm rounded-xl px-3 focus:outline-hidden focus:border-white/30"
                  >
                    <option value="Satisfactory">Satisfactory</option>
                    <option value="Conditional">Conditional</option>
                    <option value="Unrated">Unrated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Official Communications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <Phone className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  3. Official Communications & Web
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Primary Office Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="compliance@apexcarrier.com"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Main Office / Dispatch Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 781-4400"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Corporate Web Portal</Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.apexcarrier.com"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Corporate Headquarters & Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  4. Headquarters & Physical Address
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-3 space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Street Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 Logistics Boulevard, Suite 500"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Long Beach"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">State / Province</Label>
                  <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Postal / Zip Code</Label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="90802"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Insurance & Cargo Protection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  5. Commercial Insurance & Cargo Protection
                </h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Underwriting Carrier</Label>
                  <Input
                    value={insuranceCarrier}
                    onChange={(e) => setInsuranceCarrier(e.target.value)}
                    placeholder="Great West Casualty Company"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Policy Number</Label>
                  <Input
                    value={insurancePolicyNumber}
                    onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                    placeholder="POL-984210-GW"
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Coverage Amount</Label>
                  <Input
                    value={insuranceCoverage}
                    onChange={(e) => setInsuranceCoverage(e.target.value)}
                    placeholder="$1,000,000 Auto / $250k Cargo"
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Policy Expiration</Label>
                  <Input
                    type="date"
                    value={insuranceExpiry}
                    onChange={(e) => setInsuranceExpiry(e.target.value)}
                    className="h-10 bg-[#0E1528] border-white/10 text-white font-mono rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                className="w-full sm:w-auto text-xs font-semibold bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <X className="w-3.5 h-3.5 mr-2" /> Cancel
              </Button>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 shadow-lg shadow-blue-600/20 text-sm h-11 rounded-xl cursor-pointer"
              >
                <Check className="w-4 h-4 mr-2" /> Save Organization Changes
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
