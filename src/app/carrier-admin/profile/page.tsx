import { ProfileView } from "@/features/profile/components/ProfileView";

export default function CarrierAdminProfilePage() {
  return (
    <ProfileView
      role="carrier-admin"
      title="Carrier Admin Profile"
      subtitle="Edit executive account credentials, DOT identity, and reset security keys."
    />
  );
}
