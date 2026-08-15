import { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "dispatcher";

export interface NavItem {
  href: string;
  iconName: string;
  label: string;
  badge?: string | number;
}

export interface PortalConfig {
  role: UserRole;
  displayName: string;
  subdomain: string;
  badgeText: string;
  homePath: string;
  navItems: NavItem[];
}
