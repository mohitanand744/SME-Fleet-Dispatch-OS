import { OrganizationView } from "@/features/organization/components/OrganizationView";

export default function CarrierOrganizationPage() {
  return (
    <OrganizationView
      role="carrier-admin"
      title="Carrier Organization & Corporate Details"
      subtitle="Manage corporate entity information, USDOT authority, insurance filings, and physical dispatch headquarters."
    />
  );
}
