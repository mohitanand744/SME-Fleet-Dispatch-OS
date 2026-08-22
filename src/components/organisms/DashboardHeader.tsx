"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  Award,
  LogOut,
  Shield,
  ShieldCheck,
  Headphones,
  Truck,
  KeyRound,
  ExternalLink,
  Building2,
  Check,
  ArrowRight,
  ArrowLeftRight,
  Loader2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Modal } from "@/components/atoms/modal";
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal";
import { FullScreenLoader } from "@/components/molecules/FullScreenLoader";
import { NotificationDropdown } from "@/components/molecules/NotificationDropdown";
import { GlobalSearchDropdown } from "@/components/molecules/GlobalSearchDropdown";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/roles";
import { PORTAL_METADATA } from "@/lib/constants";
import { useUserProfile } from "@/data";
import { SafeImage } from "@/components/atoms/SafeImage";
import { cn } from "@/lib/utils";

const DISPATCHER_AFFILIATED_COMPANIES = [
  {
    id: "CMP-CARRIER-01",
    name: "Apex Global Carrier LLC",
    legalName: "Apex Global Carrier & Freight Services LLC",
    dot: "DOT #3891042",
    mc: "MC-109284-B",
    type: "Motor Carrier • 45 Trucks",
    roleInCompany: "Admin",
    roleTitle: "Carrier Administrator",
    scopeDescription: "Full administrative authority over fleet assets, commercial drivers, compliance filings & platform settings.",
  },
  {
    id: "CMP-DISPATCH-01",
    name: "Vanguard Dispatch Network",
    legalName: "Vanguard Dispatch & Freight Logistics Inc.",
    dot: "DOT #4102911",
    mc: "MC-882194-D",
    type: "Dispatching Agency Desk",
    roleInCompany: "Dispatcher",
    roleTitle: "Corridor Dispatch Lead",
    scopeDescription: "Active load dispatching, driver route coordination, freight board matching & real-time load tracking.",
  },
  {
    id: "CMP-CARRIER-02",
    name: "Summit Heavy Haulage Inc",
    legalName: "Summit Heavy Haulage & Specialized Freight LLC",
    dot: "DOT #2981774",
    mc: "MC-451299-S",
    type: "Partner Carrier Fleet",
    roleInCompany: "Dispatcher",
    roleTitle: "Heavy Haul Dispatcher",
    scopeDescription: "Specialized oversize load management, flatbed route optimization & permit corridor coordination.",
  },
  {
    id: "CMP-CARRIER-03",
    name: "Frontier Intermodal Logistics",
    legalName: "Frontier Intermodal Logistics Group Inc.",
    dot: "DOT #3114902",
    mc: "MC-774012-F",
    type: "Intermodal Carrier",
    roleInCompany: "Admin",
    roleTitle: "Operations Admin",
    scopeDescription: "Regional intermodal hub operations, drayage coordination, and fleet compliance management.",
  },
];

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  role?: UserRole;
}

export function DashboardHeader({
  onMenuClick,
  isSidebarOpen,
  role = "carrier-admin",
}: DashboardHeaderProps) {
  const router = useRouter();
  const { profile } = useUserProfile(role);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeCompanyId, setActiveCompanyId] = useState("CMP-CARRIER-01");
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  // Switcher Confirmation Popup & Full-Screen Loading States
  const [selectedTargetCompany, setSelectedTargetCompany] = useState<typeof DISPATCHER_AFFILIATED_COMPANIES[0] | null>(null);
  const [isSwitchConfirmationOpen, setIsSwitchConfirmationOpen] = useState(false);
  const [isPreparingWorkspace, setIsPreparingWorkspace] = useState(false);
  const [prepProgress, setPrepProgress] = useState(0);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeMeta = PORTAL_METADATA[role] || PORTAL_METADATA["carrier-admin"];

  // Close profile dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExecuteSwitch = () => {
    if (!selectedTargetCompany) return;
    setIsSwitchConfirmationOpen(false);
    setIsPreparingWorkspace(true);
    setPrepProgress(20);

    const interval = setInterval(() => {
      setPrepProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setPrepProgress(100);
      setActiveCompanyId(selectedTargetCompany.id);

      setTimeout(() => {
        setIsPreparingWorkspace(false);
        setPrepProgress(0);
      }, 400);
    }, 1350);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#0B1020] m-2 md:mx-3 md:mt-3 rounded-2xl border border-white/10 shadow-xl z-30 relative shrink-0 flex flex-col transition-all"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15] bg-cover bg-center"
          style={{ backgroundImage: `url('https://img.magnific.com/free-vector/dark-polygonal-background_79603-282.jpg?semt=ais_hybrid&w=740&q=80')` }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Top Row: Navigation and Profile */}
        <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-8">
            <Button
              variant="ghost"
              className="md:hidden text-slate-200 hover:bg-white/10 -ml-2 p-2 rounded-xl"
              onClick={onMenuClick}
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            <Link href={activeMeta.homePath} className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/LOGO.png"
                  alt="Logo"
                  width={72}
                  height={72}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md brightness-110"
                />
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {/* Desktop Smart Global Search */}
            <div className="hidden md:block">
              <GlobalSearchDropdown role={role} />
            </div>

            {/* Interactive Notification Dropdown */}
            <NotificationDropdown />

            <div className="w-px h-8 bg-white/10 hidden sm:block mx-1"></div>

            {/* User Account & Profile Dropdown Pill */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-2 md:gap-3 cursor-pointer p-1.5 rounded-2xl transition-all border outline-none",
                  profileDropdownOpen
                    ? "bg-white/15 border-white/20 shadow-md ring-2 ring-white/10"
                    : "hover:bg-white/5 border-transparent hover:border-white/10"
                )}
                aria-label="Open profile settings"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight flex items-center justify-end gap-1">
                    <span>{activeMeta.badge}</span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 text-slate-400 transition-transform duration-200",
                        profileDropdownOpen && "rotate-180 text-white"
                      )}
                    />
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 truncate max-w-[140px]">
                    {profile?.fullName || (role === "dispatcher" ? "Alex Rivera" : "Arthur Pendelton")}
                  </p>
                </div>

                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-white/20 shadow-sm shrink-0 bg-[#0E1528] pointer-events-none flex items-center justify-center">
                  <SafeImage
                    src={profile?.avatarUrl}
                    alt={profile?.fullName || "User"}
                    fallbackType={role === "dispatcher" ? "dispatcher" : "admin"}
                    enableZoom={false}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.button>

              {/* Mobile Touch Backdrop */}
              {profileDropdownOpen && (
                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-xs md:hidden z-40"
                  onClick={() => setProfileDropdownOpen(false)}
                />
              )}

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-[calc(100vw-32px)] max-w-[340px] sm:w-[350px] bg-[#0B1020] rounded-3xl shadow-2xl border border-white/15 p-2.5 z-50 backdrop-blur-2xl text-slate-100 space-y-2.5"
                  >
                    {/* User Profile Header Card */}
                    <div className="p-3 rounded-2xl bg-[#080D1A] border border-white/10 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0 bg-[#0E1528] flex items-center justify-center">
                          <SafeImage
                            src={profile?.avatarUrl}
                            alt={profile?.fullName || "User"}
                            fallbackType={role === "dispatcher" ? "dispatcher" : "admin"}
                            enableZoom={false}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold text-white truncate">
                            {profile?.fullName || "Arthur Pendelton"}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate font-mono">
                            {profile?.email || "admin@apexcarrier.com"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/15">
                          {activeMeta.badge}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online & Verified
                        </span>
                      </div>
                    </div>

                    {/* Dispatcher Multi-Company & Role Switcher */}
                    {role === "dispatcher" && (() => {
                      const allCompanies = DISPATCHER_AFFILIATED_COMPANIES;
                      const activeComp = allCompanies.find((c) => c.id === activeCompanyId) || allCompanies[0];
                      const otherCompanies = allCompanies.filter((c) => c.id !== activeComp.id);
                      const isActiveAdmin = activeComp.roleInCompany === "Admin";

                      return (
                        <div className="p-2.5 rounded-2xl bg-[#080D1A] border border-white/10 space-y-2">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Active Workspace & Role
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/10 text-slate-400 font-mono">
                              {allCompanies.length} Linked
                            </span>
                          </div>

                          {/* Primary Active Workspace Card (Shown by Default) */}
                          <div
                            className={cn(
                              "w-full text-left p-2.5 rounded-xl border transition-all relative bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/40 ring-1 ring-emerald-500/20 shadow-md"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-extrabold text-white truncate">
                                {activeComp.name}
                              </p>

                              {/* Active Role Pill */}
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide shrink-0 flex items-center gap-1 border",
                                  isActiveAdmin
                                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                )}
                              >
                                {isActiveAdmin ? (
                                  <>
                                    <Shield className="w-2.5 h-2.5 text-purple-400" /> Admin
                                  </>
                                ) : (
                                  <>
                                    <Headphones className="w-2.5 h-2.5 text-emerald-400" /> Dispatcher
                                  </>
                                )}
                              </span>
                            </div>

                            {/* Type & DOT */}
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                              <span className="truncate">{activeComp.type}</span>
                              <span className="font-mono text-slate-400 shrink-0">{activeComp.dot}</span>
                            </div>

                            {/* Status & Switch Trigger */}
                            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active Workspace
                              </span>

                              {/* Dropdown Toggle Button */}
                              <button
                                type="button"
                                onClick={() => setIsCompanyDropdownOpen((prev) => !prev)}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-all border border-white/15 cursor-pointer"
                              >
                                <span>Switch</span>
                                <ChevronDown
                                  className={cn(
                                    "w-3 h-3 text-slate-300 transition-transform duration-200",
                                    isCompanyDropdownOpen && "rotate-180 text-white"
                                  )}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Modern Expandable Dropdown with other workspaces */}
                          <AnimatePresence>
                            {isCompanyDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden space-y-1.5 pt-1"
                              >
                                <div className="px-1 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                  <span>Available Workspaces</span>
                                  <span>{otherCompanies.length} Others</span>
                                </div>

                                <div className="space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar pr-0.5">
                                  {otherCompanies.map((comp) => {
                                    const isAdmin = comp.roleInCompany === "Admin";
                                    return (
                                      <button
                                        key={comp.id}
                                        type="button"
                                        onClick={() => {
                                          setSelectedTargetCompany(comp);
                                          setProfileDropdownOpen(false);
                                          setIsCompanyDropdownOpen(false);
                                          setIsSwitchConfirmationOpen(true);
                                        }}
                                        className="w-full text-left p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-slate-300 hover:text-white group cursor-pointer"
                                      >
                                        <div className="flex items-center justify-between gap-2">
                                          <p className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                                            {comp.name}
                                          </p>
                                          <span
                                            className={cn(
                                              "px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase shrink-0 flex items-center gap-1 border",
                                              isAdmin
                                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                            )}
                                          >
                                            {isAdmin ? (
                                              <>
                                                <Shield className="w-2.5 h-2.5 text-purple-400" /> Admin
                                              </>
                                            ) : (
                                              <>
                                                <Headphones className="w-2.5 h-2.5 text-emerald-400" /> Dispatcher
                                              </>
                                            )}
                                          </span>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                                          <span className="truncate">{comp.type}</span>
                                          <span className="font-mono text-slate-500">{comp.dot}</span>
                                        </div>

                                        <div className="mt-1 pt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
                                          <span className="text-slate-400 truncate">{comp.roleTitle}</span>
                                          <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold flex items-center gap-0.5 shrink-0 text-[10px]">
                                            Switch to this <ArrowRight className="w-2.5 h-2.5" />
                                          </span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })()}

                    {/* Menu Options */}
                    <div className="py-1 space-y-1">
                      <Link
                        href={activeMeta.profilePath}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-white/10 text-slate-200 hover:text-white group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/15 border border-white/10 text-white transition-colors">
                          <UserCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Profile & Security</p>
                          <p className="text-[10px] text-slate-400">Manage info, password & photo</p>
                        </div>
                      </Link>

                      {activeMeta.organizationPath && (
                        <Link
                          href={activeMeta.organizationPath}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-white/10 text-slate-200 hover:text-white group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/15 border border-white/10 text-white transition-colors">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Organization Profile</p>
                            <p className="text-[10px] text-slate-400">Company info, DOT & filings</p>
                          </div>
                        </Link>
                      )}

                      <Link
                        href={activeMeta.membershipPath}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-white/10 text-slate-200 hover:text-white group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/15 border border-white/10 text-white transition-colors">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Company Membership</p>
                          <p className="text-[10px] text-slate-400">Tier quotas, seats & SLAs</p>
                        </div>
                      </Link>
                    </div>

                    {/* Sign Out Option */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setIsSignOutModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 rounded-xl transition-all border border-transparent hover:border-rose-500/20 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-1 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Smart Global Search */}
        <div className="md:hidden px-4 pb-4">
          <GlobalSearchDropdown role={role} isMobile={true} />
        </div>
      </div>

      {/* Switch Workspace Confirmation Modal */}
      <Modal
        isOpen={isSwitchConfirmationOpen}
        onClose={() => setIsSwitchConfirmationOpen(false)}
        maxWidth="md"
        className="overflow-hidden"
      >
        {selectedTargetCompany && (
          <div className="p-0">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-sm">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    Switch Operating Workspace
                  </h3>
                  <p className="text-xs text-slate-400">
                    Confirm change to new organization session context
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSwitchConfirmationOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Details */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Target Company Banner Card */}
              <div className="p-4 rounded-2xl bg-[#0E1528] border border-white/10 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 text-white font-bold shrink-0">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-extrabold text-white truncate">
                        {selectedTargetCompany.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        {selectedTargetCompany.dot} • {selectedTargetCompany.mc}
                      </p>
                    </div>
                  </div>

                  {/* Target Role Badge */}
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide shrink-0 flex items-center gap-1.5 border shadow-sm",
                      selectedTargetCompany.roleInCompany === "Admin"
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    )}
                  >
                    {selectedTargetCompany.roleInCompany === "Admin" ? (
                      <>
                        <Shield className="w-3.5 h-3.5 text-purple-400" /> Admin Role
                      </>
                    ) : (
                      <>
                        <Headphones className="w-3.5 h-3.5 text-emerald-400" /> Dispatcher Role
                      </>
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Assigned Role Title:</span>
                    <span className="font-bold text-white">{selectedTargetCompany.roleTitle}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Organization Type:</span>
                    <span className="font-semibold text-slate-200">{selectedTargetCompany.type}</span>
                  </div>
                </div>
              </div>

              {/* Scope & Notice Box */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Workspace Permissions & Scope</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {selectedTargetCompany.scopeDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSwitchConfirmationOpen(false)}
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold px-4 h-10 rounded-xl cursor-pointer"
                >
                  Back
                </Button>

                <Button
                  type="button"
                  onClick={handleExecuteSwitch}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 h-10 rounded-xl shadow-lg cursor-pointer"
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Switch Workspace
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Reusable Full Screen Workspace Preparation Loader */}
      <FullScreenLoader
        isOpen={isPreparingWorkspace}
        title="Preparing your workspace..."
        subtitle={
          <p>
            Switching context to{" "}
            <strong className="text-white font-bold">{selectedTargetCompany?.name}</strong>{" "}
            and applying assigned{" "}
            <span className="text-emerald-400 font-bold">{selectedTargetCompany?.roleInCompany}</span>{" "}
            permissions.
          </p>
        }
        progress={prepProgress}
        steps={["Organization Authenticated", "Active Queues Synced"]}
      />

      {/* Header Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={() => {
          setIsSignOutModalOpen(false);
          router.push("/login");
        }}
        title="Sign Out"
        subtitle="End your active session"
        description="Are you sure you want to sign out? You will return to the sign in screen."
        confirmText="Sign Out"
        cancelText="Stay Signed In"
        variant="danger"
        icon={<LogOut className="w-5 h-5 text-rose-400" />}
        itemDetails={[
          { label: "Account", value: profile?.fullName || "Active User" },
          { label: "Active Workspace", value: activeMeta.title },
        ]}
      />
    </motion.header>
  );
}
