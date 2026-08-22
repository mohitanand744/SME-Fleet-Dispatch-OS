import { OrganizationView } from "@/features/organization/components/OrganizationView";

export default function DispatchAdminOrganizationPage() {
  return (
    <OrganizationView
      role="dispatch-admin"
      title="Dispatch Agency Organization Profile"
      subtitle="Manage dispatch operations entity, brokerage credentials, operating status, and corporate dispatch facility."
    />
  );
}
