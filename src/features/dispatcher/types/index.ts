import { LoadStatus } from "@/features/shared/types";

export interface DispatchLoad {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  customer: string;
  weight: string;
  status: LoadStatus;
  driverId?: string;
  driverName?: string;
  vehiclePlate?: string;
  pickupTime: string;
  deliveryTime: string;
  priority: "high" | "normal" | "urgent";
}

export interface DispatcherMetrics {
  activeLoads: number;
  unassignedLoads: number;
  onTimeRate: string;
  delayedLoads: number;
}
