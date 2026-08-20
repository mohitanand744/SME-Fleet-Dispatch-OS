import { DispatcherList } from "@/features/users/components/DispatcherList";

export default function CarrierDispatchersPage() {
  return (
    <DispatcherList
      title="Carrier Dispatcher Roster"
      subtitle="Dedicated fleet desk assignments, coverage corridors, and dispatch load volume."
      companyId="CMP-CARRIER-01"
      companyName="Apex Global Carrier LLC"
    />
  );
}
