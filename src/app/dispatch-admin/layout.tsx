import { PortalLayout } from "@/components/templates/PortalLayout";

export default function DispatchAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayout role="dispatch-admin">{children}</PortalLayout>;
}
