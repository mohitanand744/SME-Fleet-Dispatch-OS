import { ProfileView } from "@/features/profile/components/ProfileView";

export default function DispatcherProfilePage() {
  return (
    <ProfileView
      role="dispatcher"
      title="Dispatcher Profile & Security"
      subtitle="Edit dispatcher credentials, station assignment, and reset desk security password."
    />
  );
}
