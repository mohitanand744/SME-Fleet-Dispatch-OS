import { LucideIcon } from "lucide-react";

export type UserRole = "carrier-admin" | "dispatch-admin" | "dispatcher" | "admin";

export interface NavItem {
  href: string;
  icon?: LucideIcon;
  label: string;
  badge?: string | number;
  isDropdown?: boolean;
  children?: {
    href: string;
    icon?: LucideIcon;
    label: string;
    badge?: string | number;
  }[];
}

export interface PortalConfig {
  role: UserRole;
  displayName: string;
  subdomain: string;
  badgeText: string;
  homePath: string;
  navItems: NavItem[];
}
