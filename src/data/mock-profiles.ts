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
    avatarUrl: "https://www.saskhealthauthority.ca/sites/default/files/styles/width_800px/public/2026-08/photo-wpbp-portfolio.jpg?itok=6fKQzp0V",
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
    avatarUrl: "https://img.magnific.com/free-photo/colleagues-working-together-call-center-office-with-coffee_23-2149256070.jpg?semt=ais_test_b&w=740&q=80",
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
    avatarUrl: "https://media.istockphoto.com/id/2223442865/photo/sales-man-and-consulting-support-or-advice-with-headset-and-laptop.jpg?s=612x612&w=0&k=20&c=gF23PFsmsEBHVOQBRaznINj4wvC5ii4sm1S7hD4ALSs=",
  },
};
