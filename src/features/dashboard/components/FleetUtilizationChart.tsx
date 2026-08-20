"use client";

import { useState } from "react";
import { TrendingUp, BarChart3, Calendar, DollarSign, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { cn } from "@/lib/utils";

type TimeRange = "7D" | "30D" | "90D";

interface ChartDataPoint {
  day: string;
  revenue: number; // in thousands ($k)
  miles: number; // in thousands (k miles)
  loads: number;
}

const DATA_7D: ChartDataPoint[] = [
  { day: "Mon", revenue: 38.4, miles: 14.2, loads: 18 },
  { day: "Tue", revenue: 42.1, miles: 16.8, loads: 22 },
  { day: "Wed", revenue: 39.5, miles: 15.1, loads: 19 },
  { day: "Thu", revenue: 48.2, miles: 19.4, loads: 26 },
  { day: "Fri", revenue: 54.0, miles: 22.0, loads: 31 },
  { day: "Sat", revenue: 34.8, miles: 12.5, loads: 14 },
  { day: "Sun", revenue: 27.5, miles: 10.2, loads: 11 },
];

const DATA_30D: ChartDataPoint[] = [
  { day: "W1", revenue: 210, miles: 84, loads: 110 },
  { day: "W2", revenue: 245, miles: 98, loads: 132 },
  { day: "W3", revenue: 268, miles: 104, loads: 145 },
  { day: "W4", revenue: 284, miles: 112, loads: 158 },
];

const DATA_90D: ChartDataPoint[] = [
  { day: "Jun", revenue: 810, miles: 320, loads: 420 },
  { day: "Jul", revenue: 890, miles: 360, loads: 480 },
  { day: "Aug", revenue: 940, miles: 390, loads: 512 },
];

export function FleetUtilizationChart() {
  const [range, setRange] = useState<TimeRange>("7D");
  const [activeMetric, setActiveMetric] = useState<"revenue" | "miles" | "loads">("revenue");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = range === "7D" ? DATA_7D : range === "30D" ? DATA_30D : DATA_90D;

  const maxValue = Math.max(...activeData.map((d) => d[activeMetric]));

  return (
    <Card className="border border-white/10 shadow-2xl bg-[#0B1020] text-white rounded-3xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#080D1A]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white">
                Revenue & Freight Utilization Analytics
              </CardTitle>
              <p className="text-xs text-slate-400">
                Gross freight billing settlement & dispatched mileage trends
              </p>
            </div>
          </div>
        </div>

        {/* Range Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#0E1528] border border-white/10 text-xs">
            {(["7D", "30D", "90D"] as TimeRange[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer",
                  range === r
                    ? "bg-white/15 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1 rounded-xl bg-[#0E1528] border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveMetric("revenue")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer",
                activeMetric === "revenue"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Revenue ($)
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric("miles")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer",
                activeMetric === "miles"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Miles (k)
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Metric Summary Banner */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {activeMetric === "revenue" ? "Period Total Gross" : "Total Miles Traveled"}
            </p>
            <h3 className="text-3xl font-extrabold text-white mt-0.5 font-mono">
              {activeMetric === "revenue"
                ? `$${activeData.reduce((acc, curr) => acc + curr.revenue, 0).toFixed(1)}k`
                : `${activeData.reduce((acc, curr) => acc + curr.miles, 0).toFixed(1)}k mi`}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" />
            <span>+14.8% vs previous cycle</span>
          </div>
        </div>

        {/* Custom High-Fidelity SVG / CSS Interactive Graph */}
        <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
          </div>

          {activeData.map((d, index) => {
            const heightPercent = Math.max(15, Math.round((d[activeMetric] / maxValue) * 100));
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={d.day}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative group cursor-pointer z-10"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 px-2.5 py-1 rounded-xl bg-[#080D1A] border border-white/20 text-white font-mono text-[11px] font-bold shadow-xl whitespace-nowrap z-20"
                  >
                    {activeMetric === "revenue" ? `$${d.revenue}k` : `${d.miles}k mi`} ({d.loads} loads)
                  </motion.div>
                )}

                {/* Animated Bar with Glowing Gradient */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ type: "spring", damping: 20, stiffness: 200, delay: index * 0.04 }}
                  className={cn(
                    "w-full max-w-[42px] rounded-2xl transition-all relative overflow-hidden",
                    activeMetric === "revenue"
                      ? "bg-gradient-to-t from-emerald-600/40 via-emerald-500/80 to-emerald-400 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-gradient-to-t from-blue-600/40 via-blue-500/80 to-blue-400 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                    isHovered && "brightness-125 scale-105"
                  )}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/60 rounded-full" />
                </motion.div>

                {/* Day Label */}
                <span className="text-[11px] font-bold text-slate-400 mt-1">{d.day}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
