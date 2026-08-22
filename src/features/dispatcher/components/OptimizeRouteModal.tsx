"use client";

import { useState } from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Zap, Route, Check, TrendingDown, DollarSign, Clock, ShieldCheck, X } from "lucide-react";

interface OptimizeRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OptimizeRouteModal({ isOpen, onClose }: OptimizeRouteModalProps) {
  const [corridor, setCorridor] = useState("I-5 West Coast Express");
  const [tollAvoidance, setTollAvoidance] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setIsApplied(true);
      setTimeout(() => {
        setIsApplied(false);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Route Corridor AI Optimizer</h3>
              <p className="text-xs text-slate-400">Compute toll avoidance & fuel efficiency</p>
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

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Corridor Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Target Freight Line</label>
            <select
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
              className="w-full bg-[#0E1528] border border-white/10 text-white rounded-xl h-10 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="I-5 West Coast Express" className="bg-[#0B1020]">I-5 West Coast Express (Long Beach → Sacramento)</option>
              <option value="I-10 Southwest Corridor" className="bg-[#0B1020]">I-10 Southwest Corridor (LA → Phoenix → Tucson)</option>
              <option value="I-80 Intermodal Trunk" className="bg-[#0B1020]">I-80 Intermodal Trunk (Salt Lake → Denver)</option>
            </select>
          </div>

          {/* AI Metrics Card */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Projected Savings</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/10">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Mileage</span>
                <span className="text-xs font-extrabold text-emerald-400">-42 miles</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/10">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Transit Time</span>
                <span className="text-xs font-extrabold text-blue-400">-1h 15m</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/10">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Est. Fuel</span>
                <span className="text-xs font-extrabold text-amber-400">-$94/trip</span>
              </div>
            </div>
          </div>

          {/* Toll Avoidance Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0E1528] border border-white/10">
            <div>
              <p className="text-xs font-bold text-white">Smart Toll Avoidance</p>
              <p className="text-[11px] text-slate-400">Bypass expensive express tollways</p>
            </div>
            <input
              type="checkbox"
              checked={tollAvoidance}
              onChange={(e) => setTollAvoidance(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-[#131B34] text-amber-500 focus:ring-0 cursor-pointer"
            />
          </div>

          {isApplied && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Optimized corridor applied to active dispatch queue!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-2.5 bg-[#080D1A]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 text-xs font-semibold px-4 h-9.5 rounded-xl cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            disabled={isOptimizing || isApplied}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 h-9.5 rounded-xl shadow-lg shadow-amber-950/40 cursor-pointer"
          >
            {isOptimizing ? "Computing Optimal Route..." : "Apply AI Route"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
