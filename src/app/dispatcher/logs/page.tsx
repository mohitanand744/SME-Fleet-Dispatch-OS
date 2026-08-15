"use client";

import { FileSpreadsheet, Download, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

const dispatchLogs = [
  { id: "LOG-9912", time: "14:25 PM", event: "Load LD-8801 Arrived at Phoenix DC", driver: "Robert Miller", type: "delivered" },
  { id: "LOG-9911", time: "13:10 PM", event: "Driver Assigned to LD-8804 (Alex Rivera)", driver: "Alex Rivera", type: "assigned" },
  { id: "LOG-9910", time: "11:45 AM", event: "Weather Alert: I-80 corridor slow traffic", driver: "System Alert", type: "delayed" },
  { id: "LOG-9909", time: "09:30 AM", event: "Pre-trip Inspection Passed for CA-992-TR", driver: "Marcus Vance", type: "active" },
  { id: "LOG-9908", time: "08:15 AM", event: "Load Manifest LD-8809 Generated", driver: "Dispatch Desk", type: "pending" },
];

export default function DispatcherLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Real-Time Dispatch Logs</h1>
          <p className="text-slate-500 text-sm mt-1">
            Immutable audit log of all route milestones, driver status changes, and freight events.
          </p>
        </div>
        <Button className="bg-main-dark hover:bg-main-dark/90 text-white font-semibold">
          <Download className="w-4 h-4 mr-2" /> Export Audit Log
        </Button>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-bold text-main-dark">Today's Event Stream</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {dispatchLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-main-dark">{log.event}</p>
                    <p className="text-xs text-slate-400">Actor: {log.driver} • Log ID: {log.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-500">{log.time}</span>
                  <StatusBadge status={log.type} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
