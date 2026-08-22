import { OrganizationView } from "@/features/organization/components/OrganizationView";

export default function AdminOrganizationPage() {
  return (
    <OrganizationView
      role="carrier-admin"
      title="Carrier Organization Profile"
      subtitle="Manage corporate entity information, USDOT authority, insurance filings, and physical dispatch headquarters."
    />
  );
}
