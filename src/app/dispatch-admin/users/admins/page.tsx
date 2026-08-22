import { AdminList } from "@/features/users/components/AdminList";

export default function DispatchAdminAdminsPage() {
  return (
    <AdminList
      title="Agency Administrators"
      subtitle="Manage dispatch agency leadership, broker liaisons, and billing supervisor privileges."
      companyId="CMP-DISPATCH-01"
      companyName="Vanguard Dispatch Network"
    />
  );
}
