import { DriverList } from "@/features/users/components/DriverList";

export default function DispatchAdminDriversPage() {
  return (
    <DriverList
      title="Contracted Carrier Drivers"
      subtitle="Drivers across affiliated carriers available for load dispatching, CDL verification, and statuses."
      companyId="CMP-DISPATCH-01"
      companyName="Vanguard Dispatch Network"
    />
  );
}
