"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export interface FullScreenLoaderProps {
  isOpen: boolean;
  title?: string;
  subtitle?: React.ReactNode;
  progress?: number;
  steps?: string[];
  logoSrc?: string;
}

export function FullScreenLoader({
  isOpen,
  title = "Preparing your workspace...",
  subtitle = "Verifying credentials and loading assigned privileges.",
  progress = 75,
  steps = ["Organization Authenticated", "Active Queues Synced"],
  logoSrc = "/LOGO.png",
}: FullScreenLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] bg-[#080D1A]/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 select-none"
        >
          {/* Soft Ambient Background Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -z-10 animate-pulse" />

          {/* Stable Glass Card with Logo */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
            <div className="w-20 h-20 rounded-3xl bg-[#0E1528] border border-white/15 flex items-center justify-center shadow-2xl relative z-10">
              <Image
                src={logoSrc}
                alt="Logo"
                width={52}
                height={52}
                className="object-contain drop-shadow-md brightness-110"
                priority
              />
            </div>
          </div>

          {/* Loading Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {title}
          </h2>

          {/* Subtitle */}
          <div className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            {subtitle}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs bg-white/10 h-2 rounded-full overflow-hidden mb-6 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Micro Step Tags with Staggered One-by-One Animation */}
          {steps.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
              {steps.map((step, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2 + idx * 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5 text-slate-300 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {step}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
