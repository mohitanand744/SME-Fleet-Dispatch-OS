"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_NAV_ITEMS, DISPATCHER_NAV_ITEMS } from "@/lib/constants";
import { UserRole } from "@/types/roles";

interface DashboardSidebarProps {
  isOpen?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  role?: UserRole;
}

export function DashboardSidebar({ isOpen, isMobile, onClose, role = "admin" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = role === "dispatcher" ? DISPATCHER_NAV_ITEMS : ADMIN_NAV_ITEMS;

  const sidebarContent = (
    <div className="flex flex-col h-full m-2 md:mx-3 md:mb-3 rounded-xl bg-main-dark text-main-white shadow-xl pt-4 w-64 shrink-0 overflow-hidden">
      {/* Role Indicator Banner */}
      <div className="px-5 pb-3 mb-2 border-b border-main-light/20 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Portal View</span>
          <p className="text-sm font-extrabold capitalize text-white flex items-center gap-1.5">
            <span className={cn("w-2 h-2 rounded-full", role === "dispatcher" ? "bg-emerald-400" : "bg-blue-400")} />
            {role === "dispatcher" ? "Dispatcher OS" : "Admin OS"}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative overflow-hidden group text-sm font-semibold",
                  isActive
                    ? "text-white bg-main-light/25 shadow-inner"
                    : "text-slate-300 hover:bg-main-light/10 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                  />
                )}
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-main-light/20">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-main-light/10 hover:text-white transition-colors group text-sm font-semibold"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "h-full border-r border-main-dark/20 z-30 shrink-0",
            isMobile ? "absolute inset-y-0 left-0 shadow-2xl" : "relative"
          )}
        >
          {sidebarContent}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

