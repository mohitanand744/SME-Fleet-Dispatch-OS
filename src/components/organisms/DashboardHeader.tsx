"use client";

import { User, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { NotificationDropdown } from "@/components/molecules/NotificationDropdown";
import { GlobalSearchDropdown } from "@/components/molecules/GlobalSearchDropdown";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/types/roles";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  role?: UserRole;
}

export function DashboardHeader({ onMenuClick, isSidebarOpen, role = "admin" }: DashboardHeaderProps) {
  const isDispatcher = role === "dispatcher";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white m-2 md:mx-3 md:mt-3 rounded-xl border-b border-main-light/30 shadow-sm z-30 relative shrink-0 flex flex-col transition-all"
    >
      {/* Top Row: Navigation and Profile */}
      <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Button
            variant="ghost"
            className="md:hidden text-main-dark hover:bg-main-light/20 -ml-2 p-2"
            onClick={onMenuClick}
          >
            {isSidebarOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </Button>

          <Link href={isDispatcher ? "/dispatcher" : "/admin"} className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={56}
                height={56}
                className="object-contain drop-shadow-sm"
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

          <div className="w-px h-8 bg-main-light/50 hidden sm:block mx-1"></div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 md:gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-main-light/10 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-main-dark leading-tight">
                {isDispatcher ? "Alex Vance" : "Admin Manager"}
              </p>
              <p className="text-xs font-semibold text-slate-400">
                {isDispatcher ? "Lead Dispatcher" : "Enterprise Admin"}
              </p>
            </div>
            <div
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-sm shrink-0 ${
                isDispatcher ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Smart Global Search */}
      <div className="md:hidden px-4 pb-4">
        <GlobalSearchDropdown role={role} isMobile={true} />
      </div>
    </motion.header>
  );
}

