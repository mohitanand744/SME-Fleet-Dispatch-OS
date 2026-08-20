import { ProfileView } from "@/features/profile/components/ProfileView";

export default function DispatchAdminProfilePage() {
  return (
    <ProfileView
      role="dispatch-admin"
      title="Agency Admin Profile"
      subtitle="Edit dispatching director credentials, office location, and change security password."
    />
  );
}
