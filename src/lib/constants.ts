import {
  LayoutDashboard,
  Truck,
  Users,
  UserCheck,
  Headphones,
  Award,
  UserCircle,
  Activity,
  Route,
  FileSpreadsheet,
  Package,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { UserRole, NavItem } from "@/types/roles";

// Carrier Admin Nav Items (Clean sidebar without profile, profile is now in header dropdown)
export const CARRIER_ADMIN_NAV_ITEMS: NavItem[] = [
  {
    href: "/carrier-admin",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/carrier-admin/users",
    icon: Users,
    label: "Users Management",
    isDropdown: true,
    children: [
      {
        href: "/carrier-admin/users/drivers",
        icon: UserCheck,
        label: "Drivers Roster",
      },
      {
        href: "/carrier-admin/users/dispatchers",
        icon: Headphones,
        label: "Dispatchers",
      },
    ],
  },
  {
    href: "/carrier-admin/trucks",
    icon: Truck,
    label: "Truck Management",
  },
  {
    href: "/carrier-admin/membership",
    icon: Award,
    label: "Company Membership",
  },
];

// Dispatching Company Admin Nav Items
export const DISPATCH_ADMIN_NAV_ITEMS: NavItem[] = [
  {
    href: "/dispatch-admin",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dispatch-admin/users",
    icon: Users,
    label: "Users Management",
    isDropdown: true,
    children: [
      {
        href: "/dispatch-admin/users/drivers",
        icon: UserCheck,
        label: "Carrier Drivers",
      },
      {
        href: "/dispatch-admin/users/dispatchers",
        icon: Headphones,
        label: "Dispatch Staff",
      },
    ],
  },
  {
    href: "/dispatch-admin/trucks",
    icon: Truck,
    label: "Truck Management",
  },
  {
    href: "/dispatch-admin/membership",
    icon: Award,
    label: "Company Membership",
  },
];

// Individual Dispatcher Nav Items
export const DISPATCHER_PORTAL_NAV_ITEMS: NavItem[] = [
  {
    href: "/dispatcher",
    icon: Activity,
    label: "Live Dispatch Queue",
  },
  {
    href: "/dispatcher/trucks",
    icon: Truck,
    label: "Available Trucks",
  },
  {
    href: "/dispatcher/membership",
    icon: Award,
    label: "Company Membership",
  },
];

// Backwards compatibility legacy nav items
export const ADMIN_NAV_ITEMS = CARRIER_ADMIN_NAV_ITEMS;
export const DISPATCHER_NAV_ITEMS = DISPATCHER_PORTAL_NAV_ITEMS;

export const PORTAL_METADATA: Record<
  UserRole,
  { title: string; subtitle: string; badge: string; color: string; homePath: string; profilePath: string; membershipPath: string }
> = {
  "carrier-admin": {
    title: "Carrier Executive OS",
    subtitle: "Enterprise fleet & operations management",
    badge: "Carrier Admin",
    color: "bg-blue-600",
    homePath: "/carrier-admin",
    profilePath: "/carrier-admin/profile",
    membershipPath: "/carrier-admin/membership",
  },
  "dispatch-admin": {
    title: "Dispatch Agency OS",
    subtitle: "Multi-carrier dispatch operations & staff",
    badge: "Dispatch Co. Admin",
    color: "bg-purple-600",
    homePath: "/dispatch-admin",
    profilePath: "/dispatch-admin/profile",
    membershipPath: "/dispatch-admin/membership",
  },
  dispatcher: {
    title: "Dispatcher Live Control",
    subtitle: "Real-time routing, load fulfillment & truck dispatch",
    badge: "Dispatcher Console",
    color: "bg-emerald-600",
    homePath: "/dispatcher",
    profilePath: "/dispatcher/profile",
    membershipPath: "/dispatcher/membership",
  },
  admin: {
    title: "Carrier Executive OS",
    subtitle: "Enterprise fleet & operations management",
    badge: "Carrier Admin",
    color: "bg-blue-600",
    homePath: "/carrier-admin",
    profilePath: "/carrier-admin/profile",
    membershipPath: "/carrier-admin/membership",
  },
};
