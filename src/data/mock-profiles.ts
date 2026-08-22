export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  role: "carrier-admin" | "dispatch-admin" | "dispatcher";
  companyName: string;
  dotNumber?: string;
  mcNumber?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  avatarUrl?: string;
  timezone: string;
  twoFactorEnabled: boolean;
}

export const MOCK_PROFILES: Record<string, UserProfile> = {
  "carrier-admin": {
    id: "PROF-CA-01",
    fullName: "Arthur Pendelton",
    email: "arthur.pendelton@apexcarrier.com",
    phone: "+1 (555) 781-4400",
    jobTitle: "Chief Operating Officer & Carrier Admin",
    role: "carrier-admin",
    companyName: "Apex Global Carrier LLC",
    dotNumber: "DOT #3891042",
    mcNumber: "MC-109284-B",
    address: "742 Logistics Boulevard, Suite 500",
    city: "Long Beach",
    state: "CA",
    zipCode: "90802",
    timezone: "America/Los_Angeles (PST)",
    twoFactorEnabled: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  },
  "dispatch-admin": {
    id: "PROF-DA-01",
    fullName: "Victoria Vance",
    email: "victoria.vance@vanguarddispatch.com",
    phone: "+1 (555) 912-7733",
    jobTitle: "Managing Director of Dispatch Operations",
    role: "dispatch-admin",
    companyName: "Vanguard Dispatch Network",
    dotNumber: "DOT #4102911",
    mcNumber: "MC-882194-D",
    address: "1250 Freight Gateway Parkway",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85034",
    timezone: "America/Phoenix (MST)",
    twoFactorEnabled: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
  },
  dispatcher: {
    id: "PROF-DSP-01",
    fullName: "Alex Rivera",
    email: "alex.rivera@vanguarddispatch.com",
    phone: "+1 (555) 912-3044",
    jobTitle: "Lead Dispatcher & Route Coordinator",
    role: "dispatcher",
    companyName: "Vanguard Dispatch Network",
    address: "1250 Freight Gateway Parkway, Floor 3",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85034",
    timezone: "America/Phoenix (MST)",
    twoFactorEnabled: false,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
  },
};
