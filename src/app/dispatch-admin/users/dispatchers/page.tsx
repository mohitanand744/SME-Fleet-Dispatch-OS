import { DispatcherList } from "@/features/users/components/DispatcherList";

export default function DispatchAdminStaffPage() {
  return (
    <DispatcherList
      title="Agency Dispatchers Roster"
      subtitle="Staff desk assignments, corridor coverage, active load volume, and performance scores."
      companyId="CMP-DISPATCH-01"
      companyName="Vanguard Dispatch Network"
    />
  );
}
