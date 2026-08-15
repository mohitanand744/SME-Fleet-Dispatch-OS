"use client";

import { ReactNode, useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";
import { DashboardHeader } from "@/components/organisms/DashboardHeader";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-main-white z-50 flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <Image
          src="/LOGO.png"
          alt="Loading SME Fleet"
          width={100}
          height={100}
          className="object-contain drop-shadow-xl"
        />
      </motion.div>

      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          className="w-3 h-3 rounded-full bg-main-dark shadow-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          className="w-3 h-3 rounded-full bg-main-dark shadow-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          className="w-3 h-3 rounded-full bg-main-dark shadow-sm"
        />
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);

    // Add a small delay so the loading animation is visible and smooths out hydration
    const timer = setTimeout(() => setIsMounted(true), 600);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (!isMounted) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-screen bg-main-white overflow-hidden">
      <DashboardHeader
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onClose={() => isMobile && setIsSidebarOpen(false)}
        />

        {/* Overlay for mobile when sidebar is open */}
        {/* <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute -top-5 left-0 right-0 bottom-0 bg-main-dark/30 z-20 backdrop-blur-sm cursor-pointer"
            />
          )}
        </AnimatePresence> */}

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 overflow-auto p-4 md:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
