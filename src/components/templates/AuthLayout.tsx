"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url("/AuthBG.png")' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mb-5"
          >
            <Image
              src="/LOGO.png"
              alt="SME Fleet & Dispatch Logo"
              width={75}
              height={75}
              className="object-contain drop-shadow-sm"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-extrabold text-main-dark text-center tracking-tight"
          >
            SME Fleet & Dispatch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm font-medium text-slate-500 mt-2 text-center"
          >
            Manage your operations efficiently
          </motion.p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
