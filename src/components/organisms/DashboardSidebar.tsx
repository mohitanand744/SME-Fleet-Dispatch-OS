"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronDown, ChevronRight, Dot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  CARRIER_ADMIN_NAV_ITEMS,
  DISPATCH_ADMIN_NAV_ITEMS,
  DISPATCHER_PORTAL_NAV_ITEMS,
  PORTAL_METADATA,
} from "@/lib/constants";
import { UserRole, NavItem } from "@/types/roles";

interface DashboardSidebarProps {
  isOpen?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  role?: UserRole;
}

export function DashboardSidebar({
  isOpen,
  isMobile,
  onClose,
  role = "carrier-admin",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Resolve active nav items according to role
  const navItems: NavItem[] =
    role === "dispatcher"
      ? DISPATCHER_PORTAL_NAV_ITEMS
      : role === "dispatch-admin"
        ? DISPATCH_ADMIN_NAV_ITEMS
        : CARRIER_ADMIN_NAV_ITEMS;

  const roleMeta = PORTAL_METADATA[role] || PORTAL_METADATA["carrier-admin"];

  // Manage open dropdowns in sidebar
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navItems.forEach((item) => {
      if (item.isDropdown && item.children) {
        const hasActiveChild = item.children.some((c) => pathname.startsWith(c.href));
        initial[item.label] = hasActiveChild || true;
      }
    });
    return initial;
  });

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="relative flex flex-col h-full m-2 md:mx-3 md:mb-3 rounded-3xl bg-[#0B1020] text-slate-100 border border-white/15 shadow-2xl pt-4 w-full md:w-64 shrink-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('https://img.magnific.com/free-vector/dark-polygonal-background_79603-282.jpg?semt=ais_hybrid&w=740&q=80')` }}
      />
      {/* Ensure content is above background */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Role Indicator Banner & Mobile Close */}
        <div className="px-5 pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Portal View</span>
            <p className="text-sm font-extrabold capitalize text-white flex items-center gap-1.5">
              <span
                className={cn(
                  "w-2 h-2 rounded-full shadow-xs",
                  role === "dispatcher"
                    ? "bg-emerald-400 ring-2 ring-emerald-400/20"
                    : role === "dispatch-admin"
                      ? "bg-purple-400 ring-2 ring-purple-400/20"
                      : "bg-blue-400 ring-2 ring-blue-400/20"
                )}
              />
              {roleMeta.badge}
            </p>
          </div>

          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            // If this is a collapsible dropdown item (e.g. Users Management)
            if (item.isDropdown && item.children) {
              const isDropdownOpen = !!openDropdowns[item.label];
              const hasActiveChild = item.children.some((c) => pathname === c.href || pathname.startsWith(c.href));

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-1"
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-sm font-semibold group cursor-pointer border",
                      hasActiveChild
                        ? "text-white bg-white/10 border-white/15 shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            hasActiveChild ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                          )}
                        />
                      )}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200 text-slate-400",
                        isDropdownOpen && "rotate-180 text-white"
                      )}
                    />
                  </button>

                  {/* Submenu with Smooth Collapse */}
                  <AnimatePresence initial={false}>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 pr-1 py-1 space-y-1 border-l border-white/10 ml-5"
                      >
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          const ChildIcon = child.icon;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleLinkClick}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all group border",
                                isChildActive
                                  ? "bg-white/15 text-white border-white/20 shadow-xs"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent"
                              )}
                            >
                              {ChildIcon && (
                                <ChildIcon
                                  className={cn(
                                    "w-3.5 h-3.5",
                                    isChildActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                                  )}
                                />
                              )}
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            // Single direct Nav Link
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all font-semibold text-sm group relative border",
                    isActive
                      ? "bg-white/10 border-white/15 text-white shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full shadow-sm"
                    />
                  )}
                  {Icon && (
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-200 group-hover:scale-105 transition-all"
                      )}
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Sign out footer */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/login"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-rose-400 transition-colors group text-sm font-semibold"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    sidebarContent
  ) : (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full z-30 shrink-0 relative"
        >
          {sidebarContent}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
