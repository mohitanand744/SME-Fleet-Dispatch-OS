"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  accentColor?: string;
  bgGradient?: string;
  alert?: boolean;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  accentColor = "text-white",
  bgGradient = "bg-[#0B1020]",
  alert = false,
}: MetricCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        className={cn(
          "border border-white/10 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden h-full rounded-2xl",
          bgGradient,
          alert && "border-rose-500/40 bg-gradient-to-br from-rose-950/40 to-[#0B1020]"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className={cn("text-xs font-bold tracking-wider uppercase", alert ? "text-rose-400" : "text-slate-400")}>
            {title}
          </CardTitle>
          <div
            className={cn(
              "p-2.5 rounded-xl shadow-sm border",
              alert
                ? "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse"
                : "bg-white/5 text-blue-400 border-white/10"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn("text-3xl lg:text-4xl font-black tracking-tight", alert ? "text-rose-400" : accentColor)}>
            {value}
          </div>
          {trend && (
            <div className="flex items-center mt-3 text-xs sm:text-sm font-medium">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400 mr-1.5 shrink-0" />
              )}
              <span className={trend.isPositive ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {trend.value}
              </span>
              {trend.label && <span className="text-slate-400 ml-1.5">{trend.label}</span>}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
