"use client";

import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { Filter, MapPin, Check, X, RotateCcw } from "lucide-react";

interface FilterRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  selectedCorridor: string;
  onCorridorChange: (corridor: string) => void;
  onReset: () => void;
}

export function FilterRoutesModal({
  isOpen,
  onClose,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedCorridor,
  onCorridorChange,
  onReset,
}: FilterRoutesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Filter Route Corridors</h3>
              <p className="text-xs text-slate-400">Refine loads by status, priority, and lane region</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-6 space-y-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Dispatch Status</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "All Statuses" },
                { id: "pending", label: "Pending" },
                { id: "assigned", label: "Assigned" },
                { id: "in_transit", label: "In Transit" },
                { id: "delayed", label: "Delayed" },
                { id: "delivered", label: "Delivered" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStatusChange(s.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedStatus === s.id
                      ? "bg-white/15 border-white/30 text-white shadow-sm"
                      : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Regional Corridor */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Freight Corridor Region</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "all", label: "All Corridors" },
                { id: "west_coast", label: "West Coast (I-5 / CA)" },
                { id: "southwest", label: "Southwest (AZ / NV / UT)" },
                { id: "pacific_nw", label: "Pacific NW (OR / WA)" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCorridorChange(c.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                    selectedCorridor === c.id
                      ? "bg-white/15 border-white/30 text-white shadow-sm"
                      : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Tier */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Priority Tier</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "All Priorities" },
                { id: "standard", label: "Standard" },
                { id: "urgent", label: "Urgent Expedited" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPriorityChange(p.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPriority === p.id
                      ? "bg-white/15 border-white/30 text-white shadow-sm"
                      : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#080D1A]">
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold px-3 h-9 rounded-xl cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-white/15 hover:bg-white/20 text-white font-extrabold text-xs px-5 h-9 rounded-xl border border-white/10 shadow-sm cursor-pointer"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
}
