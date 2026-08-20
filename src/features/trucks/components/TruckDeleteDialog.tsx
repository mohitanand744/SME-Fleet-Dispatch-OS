"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { TruckItem } from "@/data/mock-trucks";

interface TruckDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  truck?: TruckItem | null;
}

export function TruckDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  truck,
}: TruckDeleteDialogProps) {
  if (!truck) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#080D1A]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0B1020] text-slate-100 rounded-3xl border border-rose-500/30 shadow-2xl p-6 z-10 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">Delete Truck Registry</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to remove <strong className="text-white">{truck.plate}</strong> ({truck.model}) from the active fleet management register? This action cannot be undone.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VIN:</span>
                <span className="font-mono text-slate-200">{truck.vin}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Assigned Driver:</span>
                <span className="text-slate-200">{truck.assignedDriverName || "Unassigned"}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Confirm Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
