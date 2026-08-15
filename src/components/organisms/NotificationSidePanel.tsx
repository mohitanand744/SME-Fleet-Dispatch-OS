"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  CheckCheck,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Wrench,
  Package,
  Fuel,
  MapPin,
  FileText,
  ShieldAlert,
  Clock,
  Loader2,
  Trash2,
  Filter,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import { NotificationItem } from "@/components/molecules/NotificationDropdown";
import Link from "next/link";

interface NotificationSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
}

// Additional mock history pool for simulated infinite scroll
const extraHistoryItems: Omit<NotificationItem, "id">[] = [
  {
    title: "Over-speeding Alert",
    description: "Vehicle CA-441-TR exceeded 75 MPH in a 65 MPH zone near Barstow, CA.",
    time: "2 days ago",
    unread: false,
    type: "alert",
    link: "/admin/fleet",
  },
  {
    title: "Proof of Delivery Uploaded",
    description: "Driver Sarah Jenkins signed and uploaded bill of lading for manifest #BL-9912.",
    time: "2 days ago",
    unread: false,
    type: "success",
    link: "/dispatcher/logs",
  },
  {
    title: "Tire Pressure Warning",
    description: "Sensor TPMS-04 reported low pressure (82 PSI) on trailer axle #2.",
    time: "3 days ago",
    unread: false,
    type: "maintenance",
    link: "/admin/fleet",
  },
  {
    title: "Fuel Surcharge Update",
    description: "Q3 national diesel index adjusted fuel surcharge multiplier to 18.5%.",
    time: "3 days ago",
    unread: false,
    type: "fuel",
    link: "/admin/reports",
  },
  {
    title: "HazMat Route Compliance",
    description: "Permit validated for chemicals corridor through Salt Lake County bypass.",
    time: "4 days ago",
    unread: false,
    type: "geofence",
    link: "/dispatcher/planner",
  },
  {
    title: "Driver Medical Exam Renewal",
    description: "Driver David Ross DOT physical certificate expires in 30 days.",
    time: "5 days ago",
    unread: false,
    type: "driver",
    link: "/admin/drivers",
  },
  {
    title: "Carrier Payment Executed",
    description: "Automated ACH settlement of $14,280 processed for Western Logistics.",
    time: "5 days ago",
    unread: false,
    type: "billing",
    link: "/admin/reports",
  },
  {
    title: "System API Keys Regenerated",
    description: "Fleet telematics webhook secret keys successfully rotated.",
    time: "6 days ago",
    unread: false,
    type: "system",
    link: "/admin/settings",
  },
  {
    title: "Expedited Freight Request",
    description: "Customer Apex Global Logistics requested immediate team-driver assignment.",
    time: "1 week ago",
    unread: false,
    type: "load",
    link: "/dispatcher/loads",
  },
  {
    title: "Fleet Safety Score Increase",
    description: "Monthly fleet safety score improved to 96/100 across 148 active units.",
    time: "1 week ago",
    unread: false,
    type: "success",
    link: "/admin",
  },
];

const categoryIcons: Record<
  NotificationItem["type"],
  { icon: typeof AlertTriangle; bg: string; text: string; border: string; label: string }
> = {
  alert: { icon: AlertTriangle, bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", label: "Urgent Alert" },
  success: { icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", label: "Milestone" },
  driver: { icon: Truck, bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", label: "Driver Ops" },
  maintenance: { icon: Wrench, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", label: "Maintenance" },
  load: { icon: Package, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", label: "Freight Load" },
  geofence: { icon: MapPin, bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", label: "Geofence" },
  fuel: { icon: Fuel, bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", label: "Fuel Metric" },
  billing: { icon: FileText, bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200", label: "Settlement" },
  system: { icon: ShieldAlert, bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", label: "System Audit" },
};

export function NotificationSidePanel({
  isOpen,
  onClose,
  notifications: initialItems,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationSidePanelProps) {
  const [items, setItems] = useState<NotificationItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const [readFilter, setReadFilter] = useState<"all" | "unread">("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Sync incoming notifications
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Static infinite scroll simulation
  useEffect(() => {
    if (!isOpen || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate network delay
          setTimeout(() => {
            setItems((prev) => {
              const startIdx = prev.length - initialItems.length;
              if (startIdx >= extraHistoryItems.length) {
                setHasMore(false);
                setIsLoadingMore(false);
                return prev;
              }
              const nextBatch = extraHistoryItems.slice(startIdx, startIdx + 5).map((item, idx) => ({
                ...item,
                id: `extra-${Date.now()}-${idx}`,
              }));
              if (startIdx + 5 >= extraHistoryItems.length) {
                setHasMore(false);
              }
              setIsLoadingMore(false);
              return [...prev, ...nextBatch];
            });
          }, 800);
        }
      },
      { root: scrollContainerRef.current, threshold: 0.1 }
    );

    const sentinel = bottomSentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [isOpen, hasMore, isLoadingMore, initialItems.length]);

  // Filtering
  const filteredList = useMemo(() => {
    return items.filter((item) => {
      // Read/Unread filter
      if (readFilter === "unread" && !item.unread) return false;

      // Category filter
      if (activeType !== "all" && item.type !== activeType) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [items, readFilter, activeType, searchQuery]);

  const unreadCount = items.filter((i) => i.unread).length;

  const categories = [
    { id: "all", label: "All Activity" },
    { id: "alert", label: "Alerts 🚨" },
    { id: "load", label: "Loads 📦" },
    { id: "driver", label: "Drivers 👤" },
    { id: "maintenance", label: "Maintenance 🔧" },
    { id: "fuel", label: "Fuel ⛽" },
    { id: "billing", label: "Billing 📄" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed  inset-0 z-50 flex justify-end overflow-hidden">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Right Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative rounded-l-3xl w-full max-w-lg bg-white shadow-2xl flex flex-col h-full z-10 border-l border-slate-200 overflow-hidden"
          >
            {/* Header Section */}
            <div className="p-5 border-b border-main-light/40 bg-gradient-to-b from-main-white/60 to-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-main-dark text-main-white flex items-center justify-center shadow-md">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-main-dark tracking-tight">Notifications Center</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time updates, dispatch events, & system alerts
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full text-slate-400 hover:text-main-dark hover:bg-main-light/30"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Status Row & Mark All Read */}
              <div className="flex items-center justify-between pt-2.5 border-t border-main-light/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-main-dark">
                    {items.length} Total Events
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-700">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      onMarkAllAsRead();
                      setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
                    }}
                    className="text-xs font-bold text-main-dark hover:text-blue-600 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-main-light/30 transition-colors"
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Search and Filters Toolbar */}
            <div className="p-4 border-b border-main-light/40 space-y-3 bg-white">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, load ID, vehicle, or driver..."
                  className="pl-10 h-10 bg-main-white/40 border-main-light/60 focus-visible:bg-white focus-visible:ring-main-dark text-xs rounded-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-main-dark text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Read / Unread toggle */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setReadFilter("all")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-bold transition-all",
                      readFilter === "all"
                        ? "bg-main-dark text-white shadow-sm"
                        : "text-slate-500 hover:bg-main-light/20 hover:text-main-dark"
                    )}
                  >
                    All ({items.length})
                  </button>
                  <button
                    onClick={() => setReadFilter("unread")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-bold transition-all",
                      readFilter === "unread"
                        ? "bg-main-dark text-white shadow-sm"
                        : "text-slate-500 hover:bg-main-light/20 hover:text-main-dark"
                    )}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>

                <span className="text-[11px] font-semibold text-slate-400">
                  Showing {filteredList.length} results
                </span>
              </div>

              {/* Horizontal Scrollable Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveType(cat.id)}
                    className={cn(
                      "px-3 py-1 rounded-full whitespace-nowrap font-semibold text-xs transition-all",
                      activeType === cat.id
                        ? "bg-main-dark text-white font-bold shadow-sm"
                        : "bg-main-light/30 text-main-dark hover:bg-main-light/60 border border-main-light/40"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Notification List with Infinite Scroll */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc] custom-scrollbar"
            >
              <AnimatePresence mode="popLayout">
                {filteredList.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="py-16 text-center text-slate-400"
                  >
                    <Bell className="w-10 h-10 mx-auto mb-3 text-slate-300 stroke-1" />
                    <p className="font-bold text-slate-600 text-sm">No notifications found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchQuery ? "Try refining your search keyword." : "You're completely caught up."}
                    </p>
                  </motion.div>
                ) : (
                  filteredList.map((notif, index) => {
                    const itemConfig = categoryIcons[notif.type] || categoryIcons.system;
                    const Icon = itemConfig.icon;

                    return (
                      <motion.div
                        layout
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.96, y: 14 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            delay: Math.min(index * 0.075, 0.25),
                            type: "spring",
                            stiffness: 450,
                            damping: 28,
                            mass: 0.6,
                          }
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.94,
                          y: -8,
                          transition: { duration: 0.12 }
                        }}
                        whileHover={{ y: -2 }}
                        onClick={() => {
                          onMarkAsRead(notif.id);
                          setItems((prev) =>
                            prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                          );
                        }}
                        className={cn(
                          "p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative group",
                          notif.unread && "border-blue-200 bg-gradient-to-r from-blue-50/40 via-white to-white"
                        )}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Type Icon Badge */}
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs",
                              itemConfig.bg,
                              itemConfig.text,
                              itemConfig.border
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Text Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span
                                className={cn(
                                  "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                  itemConfig.bg,
                                  itemConfig.text,
                                  itemConfig.border
                                )}
                              >
                                {itemConfig.label}
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span>{notif.time}</span>
                              </div>
                            </div>

                            <h4
                              className={cn(
                                "text-sm font-bold mt-1",
                                notif.unread ? "text-main-dark font-extrabold" : "text-slate-800"
                              )}
                            >
                              {notif.title}
                            </h4>

                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {notif.description}
                            </p>

                            {/* Action Link if available */}
                            {notif.link && (
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                  href={notif.link}
                                  onClick={onClose}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <span>Go to resource</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>

                                {notif.unread && (
                                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                    Unread
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>

              {/* Bottom Sentinel for Infinite Scroll */}
              <div ref={bottomSentinelRef} className="py-4 text-center">
                {isLoadingMore ? (
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-main-dark" />
                    <span>Loading past activity stream...</span>
                  </div>
                ) : !hasMore ? (
                  <div className="text-center py-2">
                    <p className="text-xs font-semibold text-slate-400">
                      ✨ You're all caught up! End of notifications.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
