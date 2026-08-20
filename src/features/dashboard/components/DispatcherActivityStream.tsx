"use client";

import { Activity, Clock, CheckCircle, ArrowUpRight, Radio, Package, Send, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { motion } from "framer-motion";

interface DispatchActivityItem {
  id: string;
  dispatcherName: string;
  action: string;
  target: string;
  timestamp: string;
  type: "dispatch" | "route" | "settlement" | "alert";
}

const RECENT_ACTIVITIES: DispatchActivityItem[] = [
  {
    id: "ACT-01",
    dispatcherName: "Alex Rivera",
    action: "Assigned live load manifest",
    target: "LD-8809 → Kenworth T680 (CA-992-TR)",
    timestamp: "2 min ago",
    type: "dispatch",
  },
  {
    id: "ACT-02",
    dispatcherName: "Rachel Morgan",
    action: "Approved rate settlement confirmation",
    target: "$3,450 rate con with C.H. Robinson",
    timestamp: "14 min ago",
    type: "settlement",
  },
  {
    id: "ACT-03",
    dispatcherName: "Brandon Lee",
    action: "Re-routed active freight corridor",
    target: "Bypassed I-80 weather storm via I-70 corridor",
    timestamp: "28 min ago",
    type: "route",
  },
  {
    id: "ACT-04",
    dispatcherName: "Chloe Bennett",
    action: "Verified temperature telemetry",
    target: "Reefer TX-904-RF maintaining 34°F cold chain",
    timestamp: "45 min ago",
    type: "alert",
  },
  {
    id: "ACT-05",
    dispatcherName: "Alex Rivera",
    action: "Completed Bill of Lading arrival sign-off",
    target: "LD-8801 delivered at Phoenix Intermodal Depot",
    timestamp: "1 hr ago",
    type: "dispatch",
  },
];

export function DispatcherActivityStream() {
  return (
    <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 border-b border-white/10 flex flex-row items-center justify-between gap-2.5 bg-[#080D1A]">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-sm sm:text-base font-bold text-white truncate">
              Live Dispatcher Activity Stream
            </CardTitle>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate">
              Real-time audit log of console actions & orders
            </p>
          </div>
        </div>

        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Live
        </span>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {RECENT_ACTIVITIES.map((act, index) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-2xl bg-[#0E1528] border border-white/5 flex items-start justify-between gap-3 hover:border-white/15 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white font-extrabold flex items-center justify-center text-xs border border-white/15 shrink-0 mt-0.5">
                {act.dispatcherName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">{act.dispatcherName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({act.id})</span>
                </div>
                <p className="text-xs text-slate-300">
                  <span>{act.action} </span>
                  <strong className="text-white font-medium">"{act.target}"</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 shrink-0 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{act.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
