"use client";

import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableScrollHintProps {
  className?: string;
  message?: string;
}

export function TableScrollHint({
  className,
  message = "Scroll left or right to see all columns",
}: TableScrollHintProps) {
  return (
    <div
      className={cn(
        "flex md:hidden items-center justify-between gap-2 px-4 py-2 bg-[#080D1A]/95 border-b border-white/10 text-[11px] font-medium text-slate-300 select-none",
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        <ArrowLeftRight className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
        <span>{message}</span>
      </div>
      <span className="text-[10px] font-semibold text-slate-400 bg-white/10 px-2 py-0.5 rounded-md">
        Swipe ↔
      </span>
    </div>
  );
}
