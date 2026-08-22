"use client";

import { useState } from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Sparkles, Check, Zap, Shield, ArrowRight, X, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradeTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTierName?: string;
}

const pricingPlans = [
  {
    id: "growth",
    name: "Enterprise Growth",
    badge: "Popular Choice",
    priceMonthly: "$699",
    priceAnnual: "$559",
    description: "For expanding mid-size carrier fleets requiring multi-desk dispatching.",
    features: [
      "Up to 100 Active Trucks",
      "25 Dispatcher Desks",
      "Automated Route AI Optimizer",
      "IFTA Fuel Tax Filing Automation",
      "Live GPS Telematics Stream",
    ],
  },
  {
    id: "enterprise",
    name: "Apex Fleet Carrier",
    badge: "Unlimited",
    priceMonthly: "$1,299",
    priceAnnual: "$1,039",
    description: "Unlimited fleet quotas, custom API connectors, and 24/7 dedicated support.",
    features: [
      "Unlimited Truck Assets",
      "Unlimited Dispatcher Desks",
      "Multi-Company Workspace Switching",
      "Custom EDI/TMS Integrations",
      "Dedicated 24/7 SLA Concierge",
    ],
  },
];

export function UpgradeTierModal({ isOpen, onClose, currentTierName = "Carrier Starter Tier" }: UpgradeTierModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState("growth");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upgrade Fleet Capacity & Membership</h3>
              <p className="text-xs text-slate-400">Current Plan: <strong className="text-white">{currentTierName}</strong></p>
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

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Billing Interval Toggle */}
          <div className="flex items-center justify-center">
            <div className="flex items-center p-1 rounded-2xl bg-[#080D1A] border border-white/10">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  billingCycle === "monthly" ? "bg-white/15 text-white shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  billingCycle === "annual" ? "bg-emerald-500 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-extrabold">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {pricingPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative",
                    isSelected
                      ? "bg-[#0E1528] border-amber-400/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400/30"
                      : "bg-[#080D1A] border-white/10 hover:border-white/20 text-slate-300"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-extrabold text-white">{plan.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {plan.badge}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-extrabold text-white">{price}</span>
                      <span className="text-xs text-slate-400 font-semibold">/ month</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{plan.description}</p>

                    <div className="space-y-2 border-t border-white/10 pt-4">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-slate-200">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5">
                    <div className={cn(
                      "w-full py-2 rounded-xl text-xs font-bold text-center border transition-all",
                      isSelected
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold"
                        : "bg-white/5 text-slate-300 border-white/10"
                    )}>
                      {isSelected ? "Selected Tier" : "Choose This Tier"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Capacity tier upgraded successfully! Quotas and limits updated in real-time.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-3 bg-[#080D1A]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 text-xs font-semibold px-4 h-9.5 rounded-xl cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpgrade}
            disabled={isProcessing || isSuccess}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 h-9.5 rounded-xl shadow-lg shadow-amber-950/40 cursor-pointer flex items-center gap-1.5"
          >
            {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isProcessing ? "Processing Upgrade..." : "Confirm Tier Upgrade"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
