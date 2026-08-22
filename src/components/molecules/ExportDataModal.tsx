"use client";

import { useState } from "react";
import { Modal } from "@/components/atoms/modal";
import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { Download, FileSpreadsheet, FileText, CheckCircle2, Loader2, X } from "lucide-react";

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultFilename?: string;
}

export function ExportDataModal({
  isOpen,
  onClose,
  title = "Export Data Records",
  defaultFilename = "fleet_export_data",
}: ExportDataModalProps) {
  const [format, setFormat] = useState<"csv" | "pdf" | "json">("csv");
  const [dateRange, setDateRange] = useState("current_month");
  const [isExporting, setIsExporting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsCompleted(true);
      setTimeout(() => {
        setIsCompleted(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" className="overflow-hidden">
      <div className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-400">Select file format and timeframe</p>
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
        <div className="p-5 space-y-4">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-300">Export Format</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "csv", label: "CSV Table", icon: FileSpreadsheet },
                { id: "pdf", label: "PDF Summary", icon: FileText },
                { id: "json", label: "JSON Raw", icon: Download },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    format === f.id
                      ? "bg-white/15 border-white/40 text-white shadow-md"
                      : "bg-[#0E1528] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <f.icon className="w-4 h-4" />
                  <span className="text-[11px] font-bold">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Date Range</Label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-[#0E1528] border border-white/10 text-white rounded-xl h-10 px-3 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="current_month" className="bg-[#0B1020]">Current Month (August 2026)</option>
              <option value="last_month" className="bg-[#0B1020]">Last Month (July 2026)</option>
              <option value="q2" className="bg-[#0B1020]">Q2 Financial Period</option>
              <option value="all_time" className="bg-[#0B1020]">Full Lifetime Dataset</option>
            </select>
          </div>

          {/* Status feedback */}
          {isCompleted && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              File ready! Downloading {defaultFilename}.{format}...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-2.5 bg-[#080D1A]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
            className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 text-xs font-semibold px-4 h-9.5 rounded-xl cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={isExporting || isCompleted}
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-5 h-9.5 rounded-xl shadow-lg shadow-blue-950/40 cursor-pointer flex items-center gap-1.5"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Preparing File...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> Download Export
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
