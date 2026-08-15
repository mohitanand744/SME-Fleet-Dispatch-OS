import { Metadata } from "next";
import { PortalLayout } from "@/components/templates/PortalLayout";

export const metadata: Metadata = {
  title: "Admin Portal | SME Fleet & Dispatch OS",
  description: "Executive fleet management, billing, and driver administration",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <PortalLayout role="admin">{children}</PortalLayout>;
}
