import { Vehicle, Driver } from "@/features/shared/types";

export interface AdminMetrics {
  totalFleet: number;
  activeVehicles: number;
  totalDrivers: number;
  monthlyRevenue: string;
  fuelEfficiency: string;
  maintenanceAlerts: number;
}

export interface MaintenanceRecord {
  id: string;
  vehiclePlate: string;
  serviceType: string;
  scheduledDate: string;
  cost: number;
  status: "scheduled" | "in_progress" | "completed";
}
