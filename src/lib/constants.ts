import { LayoutDashboard, Truck, Users, Settings, Activity, Route, FileSpreadsheet, Package, AlertCircle } from "lucide-react";
import { UserRole } from "@/types/roles";

export const ADMIN_NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/fleet", icon: Truck, label: "Fleet Assets" },
  { href: "/admin/drivers", icon: Users, label: "Driver Staff" },
  { href: "/admin/reports", icon: FileSpreadsheet, label: "Reports & Billing" },
  { href: "/admin/settings", icon: Settings, label: "Organization" },
];

export const DISPATCHER_NAV_ITEMS = [
  { href: "/dispatcher", icon: Activity, label: "Live Queue" },
  { href: "/dispatcher/loads", icon: Package, label: "Active Loads" },
  { href: "/dispatcher/planner", icon: Route, label: "Route Planner" },
  { href: "/dispatcher/logs", icon: FileSpreadsheet, label: "Dispatch Logs" },
];

export const PORTAL_METADATA: Record<UserRole, { title: string; subtitle: string; badge: string; color: string }> = {
  admin: {
    title: "Executive Fleet OS",
    subtitle: "Enterprise management & analytics",
    badge: "Admin Portal",
    color: "bg-blue-600",
  },
  dispatcher: {
    title: "Live Dispatch Control",
    subtitle: "Real-time routing & load fulfillment",
    badge: "Dispatcher Console",
    color: "bg-emerald-600",
  },
};
