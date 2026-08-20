import { TruckList } from "@/features/trucks/components/TruckList";

export default function DispatchAdminTrucksPage() {
  return (
    <TruckList
      title="Contracted Carrier Fleet"
      subtitle="Multi-carrier vehicle register, operational status, driver linkages, and equipment types."
      companyId="CMP-DISPATCH-01"
      companyName="Vanguard Dispatch Network"
    />
  );
}
