"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Truck,
  Users,
  Package,
  FileSpreadsheet,
  Route,
  Settings,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Command,
  CornerDownLeft,
} from "lucide-react";
import { Input } from "@/components/atoms/input";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/roles";

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Pages" | "Vehicles" | "Drivers" | "Loads" | "Reports";
  url: string;
  badge?: string;
  badgeType?: "emerald" | "blue" | "indigo" | "rose" | "amber" | "slate";
  iconType: "dashboard" | "fleet" | "driver" | "load" | "report" | "planner" | "settings";
}

const searchableDatabase: SearchResultItem[] = [
  // Pages
  {
    id: "p-1",
    title: "Executive Dashboard",
    subtitle: "Global fleet overview, KPIs, and revenue analytics",
    category: "Pages",
    url: "/admin",
    iconType: "dashboard",
    badge: "Admin Portal",
    badgeType: "blue",
  },
  {
    id: "p-2",
    title: "Fleet Assets & Maintenance",
    subtitle: "Manage all trucks, vans, mileage, and servicing logs",
    category: "Pages",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "Fleet OS",
    badgeType: "indigo",
  },
  {
    id: "p-3",
    title: "Driver Staff & Personnel",
    subtitle: "Rosters, CDL certifications, driver hours and ratings",
    category: "Pages",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "Personnel",
    badgeType: "indigo",
  },
  {
    id: "p-4",
    title: "Reports & Financial Audits",
    subtitle: "Fuel consumption, billing settlements, and compliance exports",
    category: "Pages",
    url: "/admin/reports",
    iconType: "report",
    badge: "Billing",
    badgeType: "blue",
  },
  {
    id: "p-5",
    title: "Organization & Subdomain Settings",
    subtitle: "Enterprise configuration and multi-tenant routing",
    category: "Pages",
    url: "/admin/settings",
    iconType: "settings",
    badge: "Config",
    badgeType: "slate",
  },
  {
    id: "p-6",
    title: "Live Dispatch Queue",
    subtitle: "Real-time dispatch console, queue monitoring, and alerts",
    category: "Pages",
    url: "/dispatcher",
    iconType: "dashboard",
    badge: "Dispatcher",
    badgeType: "emerald",
  },
  {
    id: "p-7",
    title: "Active Freight Loads",
    subtitle: "Create, assign, and track live freight shipments",
    category: "Pages",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "Loads",
    badgeType: "emerald",
  },
  {
    id: "p-8",
    title: "Route Corridor Planner",
    subtitle: "Multi-stop route optimization and live ETA calculations",
    category: "Pages",
    url: "/dispatcher/planner",
    iconType: "planner",
    badge: "Routing",
    badgeType: "emerald",
  },
  {
    id: "p-9",
    title: "Dispatch Audit Logs",
    subtitle: "Immutable audit trail of driver arrivals and load milestones",
    category: "Pages",
    url: "/dispatcher/logs",
    iconType: "report",
    badge: "Audit",
    badgeType: "slate",
  },

  // Vehicles
  {
    id: "v-1",
    title: "CA-992-TR • Freightliner Cascadia",
    subtitle: "Semi-Truck • 142.5k mi • Driver: Marcus Vance",
    category: "Vehicles",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "Active",
    badgeType: "emerald",
  },
  {
    id: "v-2",
    title: "CA-441-TR • Peterbilt 579",
    subtitle: "Semi-Truck • 98.2k mi • Driver: Sarah Jenkins",
    category: "Vehicles",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "In Transit",
    badgeType: "blue",
  },
  {
    id: "v-3",
    title: "NV-883-BX • Ford F-650",
    subtitle: "Box Truck 26ft • 178k mi • Unassigned",
    category: "Vehicles",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "Maintenance",
    badgeType: "rose",
  },
  {
    id: "v-4",
    title: "AZ-219-VN • Mercedes Sprinter 3500",
    subtitle: "Cargo Van • 45.1k mi • Driver: David Ross",
    category: "Vehicles",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "Idle",
    badgeType: "slate",
  },
  {
    id: "v-5",
    title: "UT-705-TR • Kenworth T680",
    subtitle: "Semi-Truck • 88.9k mi • Driver: Elena Ramos",
    category: "Vehicles",
    url: "/admin/fleet",
    iconType: "fleet",
    badge: "Active",
    badgeType: "emerald",
  },

  // Drivers
  {
    id: "d-1",
    title: "Marcus Vance",
    subtitle: "Lead Driver • CDL-A 88390 • Assigned to CA-992-TR",
    category: "Drivers",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "On Duty",
    badgeType: "emerald",
  },
  {
    id: "d-2",
    title: "Sarah Jenkins",
    subtitle: "Interstate Driver • CDL-A 77123 • Assigned to CA-441-TR",
    category: "Drivers",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "On Duty",
    badgeType: "emerald",
  },
  {
    id: "d-3",
    title: "David Ross",
    subtitle: "Regional Driver • CDL-B 10492 • Assigned to AZ-219-VN",
    category: "Drivers",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "Available",
    badgeType: "blue",
  },
  {
    id: "d-4",
    title: "Elena Ramos",
    subtitle: "Heavy Freight Driver • CDL-A 99201 • Assigned to UT-705-TR",
    category: "Drivers",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "On Duty",
    badgeType: "emerald",
  },
  {
    id: "d-5",
    title: "Kevin Durant",
    subtitle: "Short Haul Driver • CDL-A 33810 • 10h Rest Completed",
    category: "Drivers",
    url: "/admin/drivers",
    iconType: "driver",
    badge: "Resting",
    badgeType: "amber",
  },

  // Loads
  {
    id: "l-1",
    title: "LD-8801 • Apex Global Logistics",
    subtitle: "Long Beach, CA ➔ Phoenix, AZ (38,500 lbs • $2,400)",
    category: "Loads",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "In Transit",
    badgeType: "blue",
  },
  {
    id: "l-2",
    title: "LD-8804 • Metro Fresh Organics",
    subtitle: "Salinas, CA ➔ Las Vegas, NV (22,100 lbs • $1,850)",
    category: "Loads",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "Assigned",
    badgeType: "indigo",
  },
  {
    id: "l-3",
    title: "LD-8809 • Summit Fasteners Corp",
    subtitle: "Salt Lake, UT ➔ Denver, CO (44,000 lbs • $3,100)",
    category: "Loads",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "Pending",
    badgeType: "amber",
  },
  {
    id: "l-4",
    title: "LD-8812 • Horizon Paper Mills",
    subtitle: "Portland, OR ➔ Seattle, WA (18,400 lbs • $1,200)",
    category: "Loads",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "Delayed",
    badgeType: "rose",
  },
  {
    id: "l-5",
    title: "LD-8820 • Port Express Urgent",
    subtitle: "Long Beach Hub ➔ Las Vegas Cold Storage ($2,900)",
    category: "Loads",
    url: "/dispatcher/loads",
    iconType: "load",
    badge: "Urgent",
    badgeType: "rose",
  },

  // Reports
  {
    id: "r-1",
    title: "Monthly Fleet Fuel Consumption (August 2026)",
    subtitle: "Complete fuel usage, efficiency and carbon audit (148 units)",
    category: "Reports",
    url: "/admin/reports",
    iconType: "report",
    badge: "CSV Ready",
    badgeType: "blue",
  },
  {
    id: "r-2",
    title: "Driver Hours of Service (HOS) Compliance Audit",
    subtitle: "DOT duty cycle, rest break and electronic log compliance",
    category: "Reports",
    url: "/admin/reports",
    iconType: "report",
    badge: "Audited",
    badgeType: "emerald",
  },
];

const iconMap = {
  dashboard: LayoutDashboard,
  fleet: Truck,
  driver: Users,
  load: Package,
  report: FileSpreadsheet,
  planner: Route,
  settings: Settings,
};

const badgeStyles: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
  rose: "bg-rose-100 text-rose-800 border-rose-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

interface GlobalSearchDropdownProps {
  role?: UserRole;
  isMobile?: boolean;
}

export function GlobalSearchDropdown({ role = "admin", isMobile = false }: GlobalSearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDispatcher = role === "dispatcher";

  // Filter matching results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return searchableDatabase.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      return matchTitle || matchSubtitle || matchCategory || matchBadge;
    });
  }, [query]);

  // Group filtered results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResultItem[]> = {};
    results.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [results]);

  // Flat array of currently active results for arrow-key navigation
  const flatResults = useMemo(() => {
    return results;
  }, [results]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        handleSelect(flatResults[selectedIndex].url);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  // Helper to highlight matching text
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={i} className="bg-main-light/70 text-main-dark font-extrabold px-0.5 rounded">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const popularSuggestions = isDispatcher
    ? [
        { label: "Active Loads", url: "/dispatcher/loads", category: "Loads" },
        { label: "LD-8801", url: "/dispatcher/loads", category: "Loads" },
        { label: "Route Planner", url: "/dispatcher/planner", category: "Pages" },
        { label: "Dispatch Logs", url: "/dispatcher/logs", category: "Pages" },
        { label: "Marcus Vance", url: "/dispatcher/loads", category: "Drivers" },
      ]
    : [
        { label: "Fleet Assets", url: "/admin/fleet", category: "Pages" },
        { label: "Driver Roster", url: "/admin/drivers", category: "Drivers" },
        { label: "CA-992-TR", url: "/admin/fleet", category: "Vehicles" },
        { label: "Billing Reports", url: "/admin/reports", category: "Reports" },
        { label: "Maintenance", url: "/admin/fleet", category: "Vehicles" },
      ];

  const quickShortcuts = isDispatcher
    ? [
        {
          title: "Active Load Manifests",
          desc: "42 live freight loads on route",
          url: "/dispatcher/loads",
          icon: Package,
          badge: "42 Active",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        },
        {
          title: "Route Corridor Planner",
          desc: "Multi-stop corridor & toll optimizer",
          url: "/dispatcher/planner",
          icon: Route,
          badge: "Optimizer",
          badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        },
      ]
    : [
        {
          title: "Fleet Asset Management",
          desc: "148 vehicles • 4 maintenance alerts",
          url: "/admin/fleet",
          icon: Truck,
          badge: "148 Units",
          badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        },
        {
          title: "Driver Staff & Hours",
          desc: "112 drivers • 98% on-duty rate",
          url: "/admin/drivers",
          icon: Users,
          badge: "112 Drivers",
          badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        },
      ];

  return (
    <div className={cn("relative", isMobile ? "w-full" : "w-56 lg:w-80")} ref={containerRef}>
      {/* Search Input Bar */}
      <div className="relative group">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main-dark transition-colors" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            isMobile
              ? isDispatcher ? "Search loads, routes..." : "Search fleet..."
              : isDispatcher ? "Search loads, routes, drivers..." : "Search fleet, assets, staff..."
          }
          className={cn(
            "pl-10 pr-8 h-10 bg-main-white/50 border-main-light/50 focus-visible:ring-main-dark focus-visible:bg-white rounded-full text-xs transition-all shadow-xs",
            isMobile && "h-11 pl-12 bg-main-light/10 text-sm"
          )}
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-main-dark transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 pointer-events-none text-[10px] font-mono font-bold text-slate-400 bg-slate-100/80 px-1.5 py-0.5 rounded border border-slate-200">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        )}
      </div>

      {/* Suggestion Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute left-0 mt-2.5 w-[340px] sm:w-[420px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-main-light/50 z-50 overflow-hidden backdrop-blur-xl",
              !isMobile && "lg:left-[-50px]"
            )}
            style={{ maxHeight: "460px" }}
          >
            {/* When Query is Empty -> Show Quick Suggestions & Quick Shortcuts */}
            {!query.trim() ? (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-main-dark">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Popular Searches
                  </span>
                  <span className="text-[10px]">Click to view</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {popularSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item.url)}
                      className="px-3 py-1.5 rounded-xl bg-main-white/60 hover:bg-main-dark hover:text-white text-main-dark text-xs font-semibold border border-main-light/40 transition-all flex items-center gap-1.5 group cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-slate-400 group-hover:text-white" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-main-light/30 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Operational Shortcuts
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickShortcuts.map((sc, idx) => {
                      const Icon = sc.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(sc.url)}
                          className="p-2.5 rounded-xl border border-main-light/40 hover:border-main-dark hover:bg-main-white/40 text-left transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-1.5">
                              <div className="p-1.5 rounded-lg bg-main-white text-main-dark group-hover:bg-main-dark group-hover:text-white transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-extrabold text-main-dark group-hover:text-blue-700">
                                {sc.title}
                              </span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-main-dark group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pl-6">
                            <span className="truncate">{sc.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              /* No Results State */
              <div className="p-8 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
                <p className="font-bold text-slate-700 text-sm">No matching results</p>
                <p className="text-xs text-slate-400 mt-1">
                  Couldn't find anything matching "<span className="font-semibold text-main-dark">{query}</span>"
                </p>
              </div>
            ) : (
              /* Populated Results Grouped by Category */
              <div className="overflow-y-auto max-h-[380px] p-2 space-y-3 custom-scrollbar">
                {Object.entries(groupedResults).map(([category, items], groupIdx) => (
                  <div key={category} className="space-y-1">
                    {/* Category Header */}
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{category}</span>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                        {items.length}
                      </span>
                    </div>

                    {/* Result Cards */}
                    <div className="space-y-1">
                      {items.map((item, itemIdx) => {
                        const Icon = iconMap[item.iconType] || LayoutDashboard;
                        const globalIndex = flatResults.findIndex((r) => r.id === item.id);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: Math.min((groupIdx * items.length + itemIdx) * 0.02, 0.15),
                                duration: 0.15,
                              }
                            }}
                            whileHover={{ scale: 1.008 }}
                            onClick={() => handleSelect(item.url)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={cn(
                              "p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 border",
                              isSelected
                                ? "bg-main-light/35 border-main-light shadow-xs text-main-dark"
                                : "bg-white border-transparent hover:bg-slate-50 text-slate-700"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs transition-colors",
                                  isSelected ? "bg-main-dark text-white" : "bg-slate-100 text-slate-600"
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs font-bold text-main-dark truncate leading-tight">
                                  {highlightMatch(item.title, query)}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                  {highlightMatch(item.subtitle, query)}
                                </p>
                              </div>
                            </div>

                            {item.badge && (
                              <span
                                className={cn(
                                  "text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0",
                                  badgeStyles[item.badgeType || "slate"]
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Prompt */}
            {results.length > 0 && (
              <div className="px-3 py-2 border-t border-main-light/30 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <span>Use</span>
                  <span className="font-bold font-mono text-main-dark">↑</span>
                  <span className="font-bold font-mono text-main-dark">↓</span>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-main-dark">
                  <span>Open</span>
                  <CornerDownLeft className="w-3 h-3" />
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
