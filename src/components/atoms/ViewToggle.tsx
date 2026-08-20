"use client";

import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "table";

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ viewMode, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-2xl bg-[#080D1A] border border-white/10 shadow-inner relative select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={cn(
          "relative z-10 w-9 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer",
          viewMode === "grid" ? "text-white" : "text-slate-400 hover:text-slate-200"
        )}
        title="Grid View"
        aria-label="Grid View"
      >
        {viewMode === "grid" && (
          <motion.div
            layoutId="viewToggleActive"
            className="absolute inset-0 bg-white/15 rounded-xl border border-white/20 shadow-sm"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <LayoutGrid className="w-4 h-4 relative z-10" />
      </button>

      <button
        type="button"
        onClick={() => onChange("table")}
        className={cn(
          "relative z-10 w-9 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer",
          viewMode === "table" ? "text-white" : "text-slate-400 hover:text-slate-200"
        )}
        title="Table View"
        aria-label="Table View"
      >
        {viewMode === "table" && (
          <motion.div
            layoutId="viewToggleActive"
            className="absolute inset-0 bg-white/15 rounded-xl border border-white/20 shadow-sm"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <List className="w-4 h-4 relative z-10" />
      </button>
    </div>
  );
}
