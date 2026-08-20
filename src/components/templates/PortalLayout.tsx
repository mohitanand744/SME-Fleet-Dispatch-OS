"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/organisms/DashboardHeader";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";
import { UserRole } from "@/types/roles";
import { ImageLightboxProvider } from "@/context/ImageLightboxContext";
import { motion, AnimatePresence } from "framer-motion";

interface PortalLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export function PortalLayout({ children, role }: PortalLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <ImageLightboxProvider>
      <div className="flex h-screen w-full bg-[#0E1528] text-slate-100 overflow-hidden relative">
        {/* Global App Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: `url('https://img.magnific.com/free-vector/dark-polygonal-background_79603-282.jpg?semt=ais_hybrid&w=740&q=80')` }}
        />

        {/* Desktop Sidebar */}
        <div className="hidden md:block mr-2 h-full relative z-10">
          <DashboardSidebar isOpen={true} role={role} />
        </div>

        {/* Mobile Drawer Sidebar with Spring Animation */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-[#080D1A]/80 backdrop-blur-md"
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {/* Sliding Drawer Container with Spring Physics */}
              <motion.div
                initial={{ x: "-100%", opacity: 0.6, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: "-100%", opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.9 }}
                className="relative z-10 h-full max-w-[290px] w-full"
              >
                <DashboardSidebar
                  isOpen={true}
                  isMobile={true}
                  onClose={() => setIsMobileSidebarOpen(false)}
                  role={role}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
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
    </ImageLightboxProvider>
  );
}
