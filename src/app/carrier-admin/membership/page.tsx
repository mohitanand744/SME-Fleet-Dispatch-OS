import { MembershipOverview } from "@/features/membership/components/MembershipOverview";

export default function CarrierMembershipPage() {
  return (
    <MembershipOverview
      role="carrier-admin"
      title="Carrier Company Membership"
      subtitle="Enterprise fleet license, truck quotas, verified broker integrations, and contract SLAs."
    />
  );
}
