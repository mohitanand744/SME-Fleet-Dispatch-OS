import { Metadata } from "next";
import { PortalLayout } from "@/components/templates/PortalLayout";

export const metadata: Metadata = {
  title: "Dispatcher Console | SME Fleet & Dispatch OS",
  description: "Real-time dispatch queue, live load tracking, and route assignment",
};

export default function DispatcherLayout({ children }: { children: React.ReactNode }) {
  return <PortalLayout role="dispatcher">{children}</PortalLayout>;
}
