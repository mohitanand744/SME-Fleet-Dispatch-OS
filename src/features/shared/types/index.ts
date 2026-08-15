export type VehicleStatus = "active" | "maintenance" | "idle" | "in_transit";
export type DriverStatus = "available" | "on_duty" | "resting" | "offline";
export type LoadStatus = "pending" | "assigned" | "in_transit" | "delivered" | "delayed";

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: string;
  status: VehicleStatus;
  driverName?: string;
  fuelLevel: number;
  mileage: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  status: DriverStatus;
  currentVehicleId?: string;
  rating: number;
  totalTrips: number;
}
