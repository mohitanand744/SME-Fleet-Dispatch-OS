"use client";

import React from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { AlertTriangle, Trash2, CheckCircle2, Info, ArrowRight, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "success" | "info" | "primary";
  icon?: React.ReactNode;
  isLoading?: boolean;
  itemDetails?: { label: string; value: string }[];
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon,
  isLoading = false,
  itemDetails,
}: ConfirmationModalProps) {
  const variantConfig = {
    danger: {
      iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      defaultIcon: <Trash2 className="w-5 h-5" />,
      buttonClass: "bg-rose-600 hover:bg-rose-500 text-white font-extrabold shadow-rose-900/30 shadow-lg",
    },
    warning: {
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      defaultIcon: <AlertTriangle className="w-5 h-5" />,
      buttonClass: "bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold shadow-amber-900/30 shadow-lg",
    },
    success: {
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      defaultIcon: <CheckCircle2 className="w-5 h-5" />,
      buttonClass: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-emerald-900/30 shadow-lg",
    },
    info: {
      iconBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      defaultIcon: <Info className="w-5 h-5" />,
      buttonClass: "bg-blue-600 hover:bg-blue-500 text-white font-extrabold shadow-blue-900/30 shadow-lg",
    },
    primary: {
      iconBg: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      defaultIcon: <ArrowRight className="w-5 h-5" />,
      buttonClass: "bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-indigo-900/30 shadow-lg",
    },
  }[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0",
                variantConfig.iconBg
              )}
            >
              {icon || variantConfig.defaultIcon}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-white truncate">{title}</h3>
              <p className="text-xs text-slate-400 truncate">
                {subtitle || "Please confirm this action"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{description}</p>

          {itemDetails && itemDetails.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#0E1528] border border-white/10 space-y-2 text-xs">
              {itemDetails.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 font-medium shrink-0">{item.label}:</span>
                  <span className="text-slate-100 font-bold truncate max-w-[200px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold px-4 h-9.5 rounded-xl cursor-pointer"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "text-xs px-4 h-9.5 rounded-xl cursor-pointer flex items-center gap-1.5",
                variantConfig.buttonClass
              )}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
