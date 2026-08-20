import { PortalLayout } from "@/components/templates/PortalLayout";

export default function CarrierAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayout role="carrier-admin">{children}</PortalLayout>;
}
