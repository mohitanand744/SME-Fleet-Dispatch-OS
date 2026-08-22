"use client";

import { useRef, useEffect } from "react";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onClear: () => void;
  onApply?: () => void;
  activeCount: number;
  title?: string;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function FilterDropdown({
  isOpen,
  onToggle,
  onClose,
  onClear,
  onApply,
  activeCount,
  title = "Filter Options",
  children,
  align = "right",
  className,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onToggle}
        className={cn(
          "h-10 px-4 rounded-xl text-xs font-bold transition-all border shadow-sm flex items-center gap-2 cursor-pointer",
          isOpen || activeCount > 0
            ? "bg-blue-600/20 border-blue-500/40 text-white shadow-blue-500/10"
            : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
        )}
      >
        <SlidersHorizontal className={cn("w-3.5 h-3.5", activeCount > 0 ? "text-blue-400" : "text-slate-400")} />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-extrabold min-w-[18px] text-center shadow-sm">
            {activeCount}
          </span>
        )}
      </Button>

      {/* Animated Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#0B1020] border border-white/15 shadow-2xl z-40 overflow-hidden text-white backdrop-blur-xl",
              align === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {/* Popover Header */}
            <div className="p-4 border-b border-white/10 bg-[#080D1A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">{title}</h4>
              </div>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-[11px] text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Content Sections */}
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>

            {/* Popover Footer */}
            <div className="p-3 border-t border-white/10 bg-[#080D1A] flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 font-medium">
                {activeCount === 0 ? "No active filters" : `${activeCount} filter${activeCount > 1 ? "s" : ""} applied`}
              </span>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (onApply) onApply();
                  onClose();
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold h-8 px-4 rounded-xl shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 mr-1" /> Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
