"use client";

import { useState } from "react";
import { FileSpreadsheet, Download, Clock, CheckCircle2, Filter } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { ExportDataModal } from "@/components/molecules/ExportDataModal";

const initialDispatchLogs = [
  { id: "LOG-9912", time: "14:25 PM", event: "Load LD-8801 Arrived at Phoenix DC", driver: "Robert Miller", type: "delivered" },
  { id: "LOG-9911", time: "13:10 PM", event: "Driver Assigned to LD-8804 (Alex Rivera)", driver: "Alex Rivera", type: "assigned" },
  { id: "LOG-9910", time: "11:45 AM", event: "Weather Alert: I-80 corridor slow traffic", driver: "System Alert", type: "delayed" },
  { id: "LOG-9909", time: "09:30 AM", event: "Pre-trip Inspection Passed for CA-992-TR", driver: "Marcus Vance", type: "active" },
  { id: "LOG-9908", time: "08:15 AM", event: "Load Manifest LD-8809 Generated", driver: "Dispatch Desk", type: "pending" },
];

export default function DispatcherLogsPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  const filteredLogs = initialDispatchLogs.filter((log) => {
    if (filterType === "all") return true;
    return log.type === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Real-Time Dispatch Logs</h1>
          <p className="text-slate-400 text-sm mt-1">
            Immutable audit log of all route milestones, driver status changes, and freight events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" /> Export Audit Log
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto custom-scrollbar">
        {["all", "delivered", "assigned", "delayed", "active", "pending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all capitalize border cursor-pointer ${
              filterType === tab
                ? "bg-white/15 text-white border-white/20 shadow-sm"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold text-white">Today's Event Stream</CardTitle>
          <span className="text-xs font-semibold text-slate-400">{filteredLogs.length} Events</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{log.event}</p>
                    <p className="text-xs text-slate-400">Actor: {log.driver} • Log ID: {log.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-400">{log.time}</span>
                  <StatusBadge status={log.type as any} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ExportDataModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export Dispatch Audit Logs"
        defaultFilename="dispatch_audit_logs_august_2026"
      />
    </div>
  );
}
