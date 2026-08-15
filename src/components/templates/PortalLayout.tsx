"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/organisms/DashboardHeader";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";
import { UserRole } from "@/types/roles";

interface PortalLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export function PortalLayout({ children, role }: PortalLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f4f7fa] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <DashboardSidebar isOpen={true} role={role} />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10">
            <DashboardSidebar
              isOpen={true}
              isMobile={true}
              onClose={() => setIsMobileSidebarOpen(false)}
              role={role}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          role={role}
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isSidebarOpen={isMobileSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
