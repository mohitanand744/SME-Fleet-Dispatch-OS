export interface CompanyOrganization {
  id: string;
  companyName: string;
  legalName: string;
  businessType: string;
  dotNumber: string;
  mcNumber: string;
  taxId: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  logoUrl?: string;
  foundedYear: string;
  operatingStatus: "Active Authority" | "Pending Review" | "Suspended";
  safetyRating: "Satisfactory" | "Conditional" | "Unrated";
  insuranceCarrier: string;
  insurancePolicyNumber: string;
  insuranceCoverage: string;
  insuranceExpiry: string;
}

export const MOCK_ORGANIZATIONS: Record<string, CompanyOrganization> = {
  "carrier-admin": {
    id: "CMP-CARRIER-01",
    companyName: "Apex Global Carrier LLC",
    legalName: "Apex Global Carrier & Freight Services LLC",
    businessType: "Motor Carrier / Fleet Operator",
    dotNumber: "DOT #3891042",
    mcNumber: "MC-109284-B",
    taxId: "XX-XXXX8912",
    email: "compliance@apexcarrier.com",
    phone: "+1 (555) 781-4400",
    website: "https://www.apexcarrier.com",
    address: "742 Logistics Boulevard, Suite 500",
    city: "Long Beach",
    state: "CA",
    zipCode: "90802",
    country: "United States",
    logoUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    foundedYear: "2018",
    operatingStatus: "Active Authority",
    safetyRating: "Satisfactory",
    insuranceCarrier: "Great West Casualty Company",
    insurancePolicyNumber: "POL-984210-GW",
    insuranceCoverage: "$1,000,000 Auto Liability / $250,000 Cargo",
    insuranceExpiry: "2027-04-30",
  },
  "dispatch-admin": {
    id: "CMP-DISPATCH-01",
    companyName: "Vanguard Dispatch Network",
    legalName: "Vanguard Dispatch & Freight Logistics Inc.",
    businessType: "Dispatch Logistics Agency & Freight Management",
    dotNumber: "DOT #4102911",
    mcNumber: "MC-882194-D",
    taxId: "XX-XXXX4419",
    email: "operations@vanguarddispatch.com",
    phone: "+1 (555) 912-7733",
    website: "https://www.vanguarddispatch.com",
    address: "1250 Freight Gateway Parkway",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85034",
    country: "United States",
    logoUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    foundedYear: "2020",
    operatingStatus: "Active Authority",
    safetyRating: "Satisfactory",
    insuranceCarrier: "Progressive Commercial Insurance",
    insurancePolicyNumber: "POL-551932-PC",
    insuranceCoverage: "$1,000,000 General Liability / $100,000 Errors & Omissions",
    insuranceExpiry: "2027-08-15",
  },
};
