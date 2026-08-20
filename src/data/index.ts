import { useState, useEffect } from "react";
import { TruckItem, INITIAL_TRUCKS } from "./mock-trucks";
import { DriverUser, DispatcherUser, INITIAL_DRIVERS, INITIAL_DISPATCHERS } from "./mock-users";
import {
  CompanyMembership,
  CARRIER_ADMIN_MEMBERSHIP,
  DISPATCH_ADMIN_MEMBERSHIP,
  DISPATCHER_MEMBERSHIP,
} from "./mock-memberships";
import { UserProfile, MOCK_PROFILES } from "./mock-profiles";
import {
  CARRIER_ADMIN_METRICS,
  DISPATCH_ADMIN_METRICS,
  DISPATCHER_METRICS,
} from "./mock-metrics";

export * from "./mock-trucks";
export * from "./mock-users";
export * from "./mock-memberships";
export * from "./mock-profiles";
export * from "./mock-metrics";

// In-Memory Global State for demo interaction without external backend
let globalTrucks: TruckItem[] = [...INITIAL_TRUCKS];
let globalDrivers: DriverUser[] = [...INITIAL_DRIVERS];
let globalDispatchers: DispatcherUser[] = [...INITIAL_DISPATCHERS];
let globalProfiles: Record<string, UserProfile> = { ...MOCK_PROFILES };

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function useTrucksData(companyId?: string) {
  const [trucks, setTrucks] = useState<TruckItem[]>(() => {
    return companyId ? globalTrucks.filter((t) => t.companyId === companyId) : globalTrucks;
  });

  useEffect(() => {
    const handleUpdate = () => {
      setTrucks(companyId ? globalTrucks.filter((t) => t.companyId === companyId) : [...globalTrucks]);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, [companyId]);

  const addTruck = (truck: Omit<TruckItem, "id">) => {
    const newTruck: TruckItem = {
      ...truck,
      id: `TRK-${Math.floor(100 + Math.random() * 900)}`,
    };
    globalTrucks = [newTruck, ...globalTrucks];
    notify();
    return newTruck;
  };

  const updateTruck = (id: string, updates: Partial<TruckItem>) => {
    globalTrucks = globalTrucks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    notify();
  };

  const deleteTruck = (id: string) => {
    globalTrucks = globalTrucks.filter((t) => t.id !== id);
    notify();
  };

  return { trucks, addTruck, updateTruck, deleteTruck };
}

export function useDriversData(companyId?: string) {
  const [drivers, setDrivers] = useState<DriverUser[]>(() => {
    return companyId ? globalDrivers.filter((d) => d.companyId === companyId) : globalDrivers;
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDrivers(companyId ? globalDrivers.filter((d) => d.companyId === companyId) : [...globalDrivers]);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, [companyId]);

  const addDriver = (driver: Omit<DriverUser, "id" | "joinedDate">) => {
    const newDriver: DriverUser = {
      ...driver,
      id: `USR-D${Math.floor(10 + Math.random() * 90)}`,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    globalDrivers = [newDriver, ...globalDrivers];
    notify();
    return newDriver;
  };

  const updateDriver = (id: string, updates: Partial<DriverUser>) => {
    globalDrivers = globalDrivers.map((d) => (d.id === id ? { ...d, ...updates } : d));
    notify();
  };

  const deleteDriver = (id: string) => {
    globalDrivers = globalDrivers.filter((d) => d.id !== id);
    notify();
  };

  return { drivers, addDriver, updateDriver, deleteDriver };
}

export function useDispatchersData(companyId?: string) {
  const [dispatchers, setDispatchers] = useState<DispatcherUser[]>(() => {
    return companyId ? globalDispatchers.filter((d) => d.companyId === companyId) : globalDispatchers;
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDispatchers(companyId ? globalDispatchers.filter((d) => d.companyId === companyId) : [...globalDispatchers]);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, [companyId]);

  const addDispatcher = (dispatcher: Omit<DispatcherUser, "id" | "joinedDate">) => {
    const newDispatcher: DispatcherUser = {
      ...dispatcher,
      id: `USR-DSP${Math.floor(10 + Math.random() * 90)}`,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    globalDispatchers = [newDispatcher, ...globalDispatchers];
    notify();
    return newDispatcher;
  };

  const updateDispatcher = (id: string, updates: Partial<DispatcherUser>) => {
    globalDispatchers = globalDispatchers.map((d) => (d.id === id ? { ...d, ...updates } : d));
    notify();
  };

  const deleteDispatcher = (id: string) => {
    globalDispatchers = globalDispatchers.filter((d) => d.id !== id);
    notify();
  };

  return { dispatchers, addDispatcher, updateDispatcher, deleteDispatcher };
}

export function useUserProfile(roleKey: string) {
  const [profile, setProfile] = useState<UserProfile>(
    () => globalProfiles[roleKey] || MOCK_PROFILES["carrier-admin"]
  );

  useEffect(() => {
    const handleUpdate = () => {
      if (globalProfiles[roleKey]) {
        setProfile({ ...globalProfiles[roleKey] });
      }
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, [roleKey]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (globalProfiles[roleKey]) {
      globalProfiles[roleKey] = { ...globalProfiles[roleKey], ...updates };
      notify();
    }
  };

  return { profile, updateProfile };
}
