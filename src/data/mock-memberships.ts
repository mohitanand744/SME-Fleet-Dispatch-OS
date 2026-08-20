export interface CompanyMembership {
  id: string;
  companyId: string;
  companyName: string;
  companyType: "carrier" | "dispatch_agency" | "broker";
  dotNumber: string;
  mcNumber: string;
  planName: string;
  planTier: "Enterprise Carrier Network" | "Premier Dispatch Fleet" | "Pro Freight Operations";
  billingCycle: "Annual (Billed Yearly)" | "Monthly";
  status: "active" | "trial" | "pending_renewal" | "suspended";
  trucksQuota: {
    used: number;
    total: number;
  };
  dispatchersQuota: {
    used: number;
    total: number;
  };
  renewalDate: string;
  contractStartDate: string;
  supportLevel: "Dedicated 24/7 Fleet Manager" | "Priority Dispatch Desk" | "Standard Business SLA";
  featuresIncluded: string[];
  associatedCompanies: {
    id: string;
    name: string;
    relationship: "Contracted Dispatch Desk" | "Affiliated Carrier Network" | "Verified Broker Integration";
    activeTrucksLinked: number;
    activeLanes: number;
    status: "active" | "verified";
  }[];
}

export const CARRIER_ADMIN_MEMBERSHIP: CompanyMembership = {
  id: "MEMB-CARRIER-8921",
  companyId: "CMP-CARRIER-01",
  companyName: "Apex Global Carrier LLC",
  companyType: "carrier",
  dotNumber: "DOT #3891042",
  mcNumber: "MC-109284-B",
  planName: "Enterprise Fleet Operating System",
  planTier: "Enterprise Carrier Network",
  billingCycle: "Annual (Billed Yearly)",
  status: "active",
  trucksQuota: {
    used: 148,
    total: 200,
  },
  dispatchersQuota: {
    used: 8,
    total: 15,
  },
  renewalDate: "December 31, 2027",
  contractStartDate: "January 01, 2024",
  supportLevel: "Dedicated 24/7 Fleet Manager",
  featuresIncluded: [
    "Full Fleet Asset Telematics & IFTA Reporting",
    "Unlimited Driver & Dispatch Roster Accounts",
    "Instant Load Board & Subdomain API Gateway",
    "Automated Fuel Surcharge & Billing Settlement",
    "Real-time GPS Tracking & Geofenced Alerts",
  ],
  associatedCompanies: [
    {
      id: "CMP-DISPATCH-01",
      name: "Vanguard Dispatch Network",
      relationship: "Contracted Dispatch Desk",
      activeTrucksLinked: 36,
      activeLanes: 12,
      status: "active",
    },
    {
      id: "CMP-BROKER-01",
      name: "C.H. Robinson Freight Partner",
      relationship: "Verified Broker Integration",
      activeTrucksLinked: 54,
      activeLanes: 18,
      status: "verified",
    },
    {
      id: "CMP-BROKER-02",
      name: "Echo Global Logistics Exchange",
      relationship: "Verified Broker Integration",
      activeTrucksLinked: 28,
      activeLanes: 8,
      status: "verified",
    },
  ],
};

export const DISPATCH_ADMIN_MEMBERSHIP: CompanyMembership = {
  id: "MEMB-DISPATCH-4402",
  companyId: "CMP-DISPATCH-01",
  companyName: "Vanguard Dispatch Network",
  companyType: "dispatch_agency",
  dotNumber: "DOT #4102911",
  mcNumber: "MC-882194-D",
  planName: "Multi-Carrier Dispatching Suite",
  planTier: "Premier Dispatch Fleet",
  billingCycle: "Annual (Billed Yearly)",
  status: "active",
  trucksQuota: {
    used: 82,
    total: 120,
  },
  dispatchersQuota: {
    used: 12,
    total: 25,
  },
  renewalDate: "November 15, 2027",
  contractStartDate: "November 15, 2024",
  supportLevel: "Priority Dispatch Desk",
  featuresIncluded: [
    "Multi-Carrier Load Assignment Matrix",
    "Real-time Driver Dispatch Live Queue",
    "Automated Dispatch Fee & Commission Calculator",
    "Turnkey Route Optimizer & Toll Avoidance",
    "Dedicated Subdomain Portal for Partner Carriers",
  ],
  associatedCompanies: [
    {
      id: "CMP-CARRIER-01",
      name: "Apex Global Carrier LLC",
      relationship: "Affiliated Carrier Network",
      activeTrucksLinked: 45,
      activeLanes: 14,
      status: "active",
    },
    {
      id: "CMP-CARRIER-02",
      name: "Summit Trans-West Haulers",
      relationship: "Affiliated Carrier Network",
      activeTrucksLinked: 22,
      activeLanes: 6,
      status: "active",
    },
    {
      id: "CMP-CARRIER-03",
      name: "Pacific Express Freightlines",
      relationship: "Affiliated Carrier Network",
      activeTrucksLinked: 15,
      activeLanes: 5,
      status: "active",
    },
  ],
};

export const DISPATCHER_MEMBERSHIP: CompanyMembership = {
  id: "MEMB-DISP-IND-1029",
  companyId: "CMP-DISPATCH-01",
  companyName: "Vanguard Dispatch Network (Desk Seat)",
  companyType: "dispatch_agency",
  dotNumber: "DOT #4102911",
  mcNumber: "MC-882194-D",
  planName: "Dispatcher Operational Desk Seat",
  planTier: "Pro Freight Operations",
  billingCycle: "Annual (Billed Yearly)",
  status: "active",
  trucksQuota: {
    used: 18,
    total: 25,
  },
  dispatchersQuota: {
    used: 1,
    total: 1,
  },
  renewalDate: "November 15, 2027",
  contractStartDate: "January 10, 2025",
  supportLevel: "Priority Dispatch Desk",
  featuresIncluded: [
    "Direct Carrier Network Truck Allocation",
    "Live Interactive Dispatch Map & Route Optimization",
    "Instant Load Manifest & Bill of Lading Dispatch",
    "Driver Messaging & Electronic Milestone Updates",
  ],
  associatedCompanies: [
    {
      id: "CMP-CARRIER-01",
      name: "Apex Global Carrier LLC",
      relationship: "Affiliated Carrier Network",
      activeTrucksLinked: 12,
      activeLanes: 4,
      status: "active",
    },
    {
      id: "CMP-CARRIER-02",
      name: "Summit Trans-West Haulers",
      relationship: "Affiliated Carrier Network",
      activeTrucksLinked: 6,
      activeLanes: 2,
      status: "active",
    },
  ],
};
