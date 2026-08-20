import { LucideIcon, Truck, Users, DollarSign, AlertTriangle, Headphones, Package, Activity, Radio } from "lucide-react";

export interface DashboardMetric {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  accentColor?: string;
  alert?: boolean;
}

export const CARRIER_ADMIN_METRICS: DashboardMetric[] = [
  {
    title: "Total Fleet Trucks",
    value: "148",
    icon: Truck,
    trend: { value: "+8 new", isPositive: true, label: "this quarter" },
    accentColor: "text-blue-400",
  },
  {
    title: "Active Drivers On-Duty",
    value: "112",
    icon: Users,
    trend: { value: "98.2% on duty", isPositive: true },
    accentColor: "text-indigo-400",
  },
  {
    title: "Monthly Carrier Gross",
    value: "$284.5k",
    icon: DollarSign,
    trend: { value: "+14.2%", isPositive: true, label: "vs last mo" },
    accentColor: "text-emerald-400",
  },
  {
    title: "Maintenance Alerts",
    value: "4",
    icon: AlertTriangle,
    trend: { value: "2 critical", isPositive: false, label: "service required" },
    alert: true,
  },
];

export const DISPATCH_ADMIN_METRICS: DashboardMetric[] = [
  {
    title: "Contracted Fleet Trucks",
    value: "82",
    icon: Truck,
    trend: { value: "3 Partner Carriers", isPositive: true },
    accentColor: "text-purple-400",
  },
  {
    title: "Active Dispatchers",
    value: "12",
    icon: Headphones,
    trend: { value: "100% capacity", isPositive: true },
    accentColor: "text-blue-400",
  },
  {
    title: "Monthly Dispatch Fees",
    value: "$48.9k",
    icon: DollarSign,
    trend: { value: "+18.6%", isPositive: true, label: "vs last mo" },
    accentColor: "text-emerald-400",
  },
  {
    title: "Live Assigned Loads",
    value: "64",
    icon: Package,
    trend: { value: "54 in transit", isPositive: true },
    accentColor: "text-amber-400",
  },
];

export const DISPATCHER_METRICS: DashboardMetric[] = [
  {
    title: "Available Network Trucks",
    value: "18",
    icon: Truck,
    trend: { value: "Membership Authorized", isPositive: true },
    accentColor: "text-emerald-400",
  },
  {
    title: "Active Desk Loads",
    value: "9",
    icon: Package,
    trend: { value: "4 ready to dispatch", isPositive: true },
    accentColor: "text-blue-400",
  },
  {
    title: "On-Time Dispatch Rate",
    value: "98.4%",
    icon: Activity,
    trend: { value: "+0.6%", isPositive: true, label: "this week" },
    accentColor: "text-cyan-400",
  },
  {
    title: "Active Route Alerts",
    value: "2",
    icon: Radio,
    trend: { value: "I-80 weather delay", isPositive: false },
    alert: true,
  },
];
