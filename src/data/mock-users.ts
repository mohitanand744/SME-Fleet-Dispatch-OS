export interface DriverUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseClass: "CDL-A" | "CDL-B" | "CDL-C";
  licenseExpiry: string;
  status: "on_duty" | "available" | "resting" | "offline";
  assignedTruckId?: string;
  assignedTruckPlate?: string;
  rating: number;
  totalTrips: number;
  joinedDate: string;
  companyId: string;
  companyName: string;
  avatarUrl?: string;
}

export interface DispatcherUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  deskAssignment: string;
  activeLanes: string[];
  status: "active" | "away" | "offline";
  managedTrucksCount: number;
  rating: number;
  totalLoadsDispatched: number;
  joinedDate: string;
  companyId: string;
  companyName: string;
  avatarUrl?: string;
}

export const DISPATCHER_AVATAR_PRESETS = [
  "https://img.magnific.com/free-photo/colleagues-working-together-call-center-office-with-coffee_23-2149256070.jpg?semt=ais_test_b&w=740&q=80",
  "https://media.istockphoto.com/id/2223442865/photo/sales-man-and-consulting-support-or-advice-with-headset-and-laptop.jpg?s=612x612&w=0&k=20&c=gF23PFsmsEBHVOQBRaznINj4wvC5ii4sm1S7hD4ALSs=",
  "https://www.saskhealthauthority.ca/sites/default/files/styles/width_800px/public/2026-08/photo-wpbp-portfolio.jpg?itok=6fKQzp0V",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
];

export const DRIVER_AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60",
];

export const INITIAL_DRIVERS: DriverUser[] = [
  {
    id: "USR-D1",
    name: "Marcus Vance",
    email: "marcus.vance@apexcarrier.com",
    phone: "+1 (555) 234-9912",
    licenseNumber: "CDL-A-883902",
    licenseClass: "CDL-A",
    licenseExpiry: "2027-11-15",
    status: "on_duty",
    assignedTruckId: "TRK-101",
    assignedTruckPlate: "CA-992-TR",
    rating: 4.92,
    totalTrips: 312,
    joinedDate: "2024-03-10",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DRIVER_AVATAR_PRESETS[0],
  },
  {
    id: "USR-D2",
    name: "Sarah Jenkins",
    email: "sarah.j@apexcarrier.com",
    phone: "+1 (555) 441-2099",
    licenseNumber: "CDL-A-771239",
    licenseClass: "CDL-A",
    licenseExpiry: "2028-04-20",
    status: "on_duty",
    assignedTruckId: "TRK-102",
    assignedTruckPlate: "CA-441-TR",
    rating: 5.0,
    totalTrips: 489,
    joinedDate: "2023-08-15",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DRIVER_AVATAR_PRESETS[1],
  },
  {
    id: "USR-D3",
    name: "David Ross",
    email: "david.ross@apexcarrier.com",
    phone: "+1 (555) 890-4411",
    licenseNumber: "CDL-B-104921",
    licenseClass: "CDL-B",
    licenseExpiry: "2026-12-05",
    status: "available",
    assignedTruckId: "TRK-104",
    assignedTruckPlate: "AZ-219-VN",
    rating: 4.85,
    totalTrips: 198,
    joinedDate: "2025-01-20",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DRIVER_AVATAR_PRESETS[2],
  },
  {
    id: "USR-D4",
    name: "Elena Ramos",
    email: "elena.ramos@apexcarrier.com",
    phone: "+1 (555) 602-3321",
    licenseNumber: "CDL-A-992015",
    licenseClass: "CDL-A",
    licenseExpiry: "2027-09-30",
    status: "on_duty",
    assignedTruckId: "TRK-105",
    assignedTruckPlate: "UT-705-TR",
    rating: 4.96,
    totalTrips: 260,
    joinedDate: "2024-06-12",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DRIVER_AVATAR_PRESETS[3],
  },
  {
    id: "USR-D5",
    name: "Kevin Durant",
    email: "k.durant@vanguarddispatch.com",
    phone: "+1 (555) 773-1029",
    licenseNumber: "CDL-A-338104",
    licenseClass: "CDL-A",
    licenseExpiry: "2026-10-18",
    status: "resting",
    assignedTruckId: "TRK-106",
    assignedTruckPlate: "WA-219-TR",
    rating: 4.78,
    totalTrips: 145,
    joinedDate: "2025-04-01",
    companyId: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    avatarUrl: DRIVER_AVATAR_PRESETS[4],
  },
  {
    id: "USR-D6",
    name: "Carlos Mendez",
    email: "carlos.m@vanguarddispatch.com",
    phone: "+1 (555) 310-8842",
    licenseNumber: "CDL-A-559021",
    licenseClass: "CDL-A",
    licenseExpiry: "2028-02-14",
    status: "available",
    assignedTruckId: "TRK-107",
    assignedTruckPlate: "TX-904-RF",
    rating: 4.9,
    totalTrips: 210,
    joinedDate: "2024-11-18",
    companyId: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    avatarUrl: DRIVER_AVATAR_PRESETS[5],
  },
];

export const INITIAL_DISPATCHERS: DispatcherUser[] = [
  {
    id: "USR-DSP1",
    name: "Alex Rivera",
    email: "alex.rivera@vanguarddispatch.com",
    phone: "+1 (555) 912-3044",
    deskAssignment: "West Coast Intermodal Desk",
    activeLanes: ["I-5 Corridor (CA/OR/WA)", "I-10 Southwest Corridor (CA/AZ/TX)"],
    status: "active",
    managedTrucksCount: 18,
    rating: 4.95,
    totalLoadsDispatched: 840,
    joinedDate: "2023-05-15",
    companyId: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    avatarUrl: DISPATCHER_AVATAR_PRESETS[1],
  },
  {
    id: "USR-DSP2",
    name: "Rachel Morgan",
    email: "rachel.m@vanguarddispatch.com",
    phone: "+1 (555) 402-8819",
    deskAssignment: "Midwest Freight Corridor",
    activeLanes: ["I-80 Central Corridor (UT/WY/NE/IL)", "I-35 North-South (TX/OK/KS/MN)"],
    status: "active",
    managedTrucksCount: 14,
    rating: 4.88,
    totalLoadsDispatched: 620,
    joinedDate: "2024-01-10",
    companyId: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    avatarUrl: DISPATCHER_AVATAR_PRESETS[0],
  },
  {
    id: "USR-DSP3",
    name: "Brandon Lee",
    email: "brandon.lee@vanguarddispatch.com",
    phone: "+1 (555) 219-5501",
    deskAssignment: "Southeast Refrigerated Logistics",
    activeLanes: ["I-95 Eastern Seaboard", "I-75 Gulf Corridor (FL/GA/TN/OH)"],
    status: "away",
    managedTrucksCount: 12,
    rating: 4.91,
    totalLoadsDispatched: 510,
    joinedDate: "2024-04-20",
    companyId: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    avatarUrl: DISPATCHER_AVATAR_PRESETS[2],
  },
  {
    id: "USR-DSP4",
    name: "Chloe Bennett",
    email: "chloe.b@apexcarrier.com",
    phone: "+1 (555) 334-1188",
    deskAssignment: "Heavy Haul & Flatbed Desk",
    activeLanes: ["I-40 Transcontinental Corridor", "I-70 Mountain Corridor (CO/UT)"],
    status: "active",
    managedTrucksCount: 10,
    rating: 4.98,
    totalLoadsDispatched: 390,
    joinedDate: "2024-08-01",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DISPATCHER_AVATAR_PRESETS[3],
  },
  {
    id: "USR-DSP5",
    name: "Derrick Wilson",
    email: "d.wilson@apexcarrier.com",
    phone: "+1 (555) 778-9022",
    deskAssignment: "Dedicated Yard & Shuttle Fleet",
    activeLanes: ["SoCal Regional Drayage", "Inland Empire Distribution Loop"],
    status: "offline",
    managedTrucksCount: 8,
    rating: 4.75,
    totalLoadsDispatched: 280,
    joinedDate: "2025-02-14",
    companyId: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    avatarUrl: DISPATCHER_AVATAR_PRESETS[5],
  },
];
