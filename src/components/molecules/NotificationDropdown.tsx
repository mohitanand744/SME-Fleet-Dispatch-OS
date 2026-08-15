"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Wrench,
  Package,
  Fuel,
  MapPin,
  FileText,
  Clock,
  ShieldAlert,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NotificationSidePanel } from "@/components/organisms/NotificationSidePanel";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "alert" | "success" | "driver" | "maintenance" | "load" | "fuel" | "geofence" | "billing" | "system";
  link?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Route Delay Alert",
    description: "Load LD-8812 delayed by 45m due to severe rainstorm on I-80 corridor.",
    time: "2m ago",
    unread: true,
    type: "alert",
    link: "/dispatcher/loads",
  },
  {
    id: "notif-2",
    title: "Delivery Milestone Completed",
    description: "Load LD-8801 has successfully arrived at Phoenix Distribution Center.",
    time: "14m ago",
    unread: true,
    type: "success",
    link: "/dispatcher/logs",
  },
  {
    id: "notif-3",
    title: "Driver Shift Started",
    description: "Marcus Vance checked in and initiated route CA-992-TR.",
    time: "35m ago",
    unread: true,
    type: "driver",
    link: "/admin/drivers",
  },
  {
    id: "notif-4",
    title: "Scheduled Maintenance Due",
    description: "Box truck FL-118-BX reached 115k miles. Scheduled oil & brake inspection.",
    time: "1h ago",
    unread: true,
    type: "maintenance",
    link: "/admin/fleet",
  },
  {
    id: "notif-5",
    title: "New High-Priority Load Order",
    description: "Load LD-8820 (38,500 lbs) added for Port of Long Beach to Las Vegas.",
    time: "2h ago",
    unread: false,
    type: "load",
    link: "/dispatcher/loads",
  },
  {
    id: "notif-6",
    title: "Corridor Geofence Notice",
    description: "Vehicle NV-502-BX deviated 3.2 miles from approved route corridor.",
    time: "3h ago",
    unread: false,
    type: "geofence",
    link: "/dispatcher/planner",
  },
  {
    id: "notif-7",
    title: "Weekly Fleet Fuel Efficiency",
    description: "Fleet fuel average improved by +4.2% MPG compared to previous week.",
    time: "5h ago",
    unread: false,
    type: "fuel",
    link: "/admin/reports",
  },
  {
    id: "notif-8",
    title: "Billing Settlement Ready",
    description: "Weekly freight settlement statement #INV-2026-084 ready for admin review.",
    time: "8h ago",
    unread: false,
    type: "billing",
    link: "/admin/reports",
  },
  {
    id: "notif-9",
    title: "Mandatory Rest Period Passed",
    description: "Driver Alex Rivera completed required 10h rest break and is now available.",
    time: "12h ago",
    unread: false,
    type: "driver",
    link: "/admin/drivers",
  },
  {
    id: "notif-10",
    title: "Security & Subdomain Audit",
    description: "Security credentials updated for Dispatcher access terminal.",
    time: "Yesterday",
    unread: false,
    type: "system",
    link: "/admin/settings",
  },
];

const typeIcons: Record<NotificationItem["type"], { icon: typeof AlertTriangle; bg: string; color: string }> = {
  alert: { icon: AlertTriangle, bg: "bg-rose-100 text-rose-600", color: "text-rose-600" },
  success: { icon: CheckCircle2, bg: "bg-emerald-100 text-emerald-600", color: "text-emerald-600" },
  driver: { icon: Truck, bg: "bg-indigo-100 text-indigo-600", color: "text-indigo-600" },
  maintenance: { icon: Wrench, bg: "bg-amber-100 text-amber-600", color: "text-amber-600" },
  load: { icon: Package, bg: "bg-blue-100 text-blue-600", color: "text-blue-600" },
  geofence: { icon: MapPin, bg: "bg-purple-100 text-purple-600", color: "text-purple-600" },
  fuel: { icon: Fuel, bg: "bg-teal-100 text-teal-600", color: "text-teal-600" },
  billing: { icon: FileText, bg: "bg-sky-100 text-sky-600", color: "text-sky-600" },
  system: { icon: ShieldAlert, bg: "bg-slate-100 text-slate-600", color: "text-slate-600" },
};

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    return true;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "text-slate-500 hover:text-main-dark hover:bg-main-light/20 relative rounded-full w-10 h-10 transition-colors",
            isOpen && "bg-main-light/20 text-main-dark ring-2 ring-main-dark/10"
          )}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </motion.div>

      {/* Modern Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-3 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2.5 w-auto sm:w-96 max-w-[calc(100vw-24px)] rounded-2xl bg-white shadow-2xl border border-main-light/50 z-50 overflow-hidden flex flex-col backdrop-blur-xl"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-main-light/40 bg-gradient-to-b from-main-white/60 to-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-main-dark text-base tracking-tight">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-main-dark hover:text-blue-600 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-main-light/30 transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Mark read</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-main-dark hover:bg-main-light/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Pill Tabs */}
            <div className="flex items-center gap-1.5 px-4 pt-2.5 pb-2 border-b border-main-light/30 text-xs bg-white">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-lg font-bold transition-all",
                  filter === "all"
                    ? "bg-main-dark text-white shadow-sm"
                    : "text-slate-500 hover:bg-main-light/20 hover:text-main-dark"
                )}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={cn(
                  "px-3 py-1 rounded-lg font-bold transition-all",
                  filter === "unread"
                    ? "bg-main-dark text-white shadow-sm"
                    : "text-slate-500 hover:bg-main-light/20 hover:text-main-dark"
                )}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* Scrollable List of Notifications */}
            <div className="overflow-y-auto max-h-[380px] divide-y divide-main-light/20 custom-scrollbar bg-slate-50/20">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.length === 0 ? (
                  <motion.div
                    key="empty"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center text-slate-400 text-sm"
                  >
                    <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
                    No {filter === "unread" ? "unread" : ""} notifications
                  </motion.div>
                ) : (
                  filteredNotifications.map((notif, index) => {
                    const itemConfig = typeIcons[notif.type] || typeIcons.system;
                    const Icon = itemConfig.icon;

                    return (
                      <motion.div
                        layout
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: {
                            delay: Math.min(index * 0.03, 0.2),
                            type: "spring",
                            stiffness: 450,
                            damping: 28,
                            mass: 0.6,
                          }
                        }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
                        whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.6)" }}
                        onClick={() => markAsRead(notif.id)}
                        className={cn(
                          "p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative group",
                          notif.unread && "bg-blue-50/40"
                        )}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5",
                            itemConfig.bg
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <p
                              className={cn(
                                "text-xs font-bold truncate",
                                notif.unread ? "text-main-dark font-extrabold" : "text-slate-700"
                              )}
                            >
                              {notif.title}
                            </p>
                            <span className="text-[10px] font-medium text-slate-400 shrink-0">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                            {notif.description}
                          </p>
                        </div>

                        {/* Unread blue indicator dot */}
                        {notif.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 self-center shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                        )}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Footer with "View all" Button */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/70">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsSidePanelOpen(true);
                }}
                className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-main-dark hover:bg-main-dark/90 text-white font-bold text-xs shadow-sm hover:shadow transition-all group cursor-pointer"
              >
                <span>View all notifications</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-Side Slide-Over Notification Drawer Panel */}
      <NotificationSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={markAllAsRead}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
}
