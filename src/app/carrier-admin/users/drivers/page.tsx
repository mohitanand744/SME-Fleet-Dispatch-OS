import { DriverList } from "@/features/users/components/DriverList";

export default function CarrierDriversPage() {
  return (
    <DriverList
      title="Driver Personnel Roster"
      subtitle="Carrier driver certifications, duty statuses, active vehicle assignments, and performance."
      companyId="CMP-CARRIER-01"
      companyName="Apex Global Carrier LLC"
    />
  );
}
