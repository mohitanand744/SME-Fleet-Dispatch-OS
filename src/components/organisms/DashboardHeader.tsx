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
  Headphones,
  Truck,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { NotificationDropdown } from "@/components/molecules/NotificationDropdown";
import { GlobalSearchDropdown } from "@/components/molecules/GlobalSearchDropdown";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/roles";
import { PORTAL_METADATA } from "@/lib/constants";
import { useUserProfile } from "@/data";
import { cn } from "@/lib/utils";

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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#0B1020] m-2 md:mx-3 md:mt-3 rounded-2xl border border-white/10 shadow-xl z-30 relative shrink-0 flex flex-col transition-all overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('https://img.magnific.com/free-vector/dark-polygonal-background_79603-282.jpg?semt=ais_hybrid&w=740&q=80')` }}
      />

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
                  width={52}
                  height={52}
                  className="object-contain drop-shadow-sm brightness-110"
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

                {profile?.avatarUrl ? (
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-white/20 shadow-sm shrink-0 bg-[#0E1528] pointer-events-none">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold shadow-sm shrink-0 border pointer-events-none",
                      role === "dispatcher"
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : role === "dispatch-admin"
                          ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                          : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                    )}
                  >
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                )}
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
                    className="absolute right-0 mt-2 w-[calc(100vw-32px)] max-w-[300px] sm:w-72 bg-[#0B1020] rounded-3xl shadow-2xl border border-white/15 p-2.5 z-50 backdrop-blur-2xl text-slate-100 space-y-2"
                  >
                    {/* User Profile Header Card */}
                    <div className="p-3 rounded-2xl bg-[#080D1A] border border-white/10 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        {profile?.avatarUrl ? (
                          <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0 bg-[#0E1528]">
                            <img
                              src={profile.avatarUrl}
                              alt={profile.fullName || "User"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm border shadow-sm shrink-0",
                              role === "dispatcher"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : role === "dispatch-admin"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            )}
                          >
                            {(profile?.fullName || "Arthur Pendelton").split(" ").map((n: string) => n[0]).join("")}
                          </div>
                        )}
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
                      <Link
                        href="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-1" />
                        <span>Sign Out</span>
                      </Link>
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
    </motion.header>
  );
}
