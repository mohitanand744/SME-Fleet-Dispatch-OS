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
  accentColor = "text-main-dark",
  bgGradient = "bg-white",
  alert = false,
}: MetricCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        className={cn(
          "border-none shadow-md hover:shadow-xl transition-all relative overflow-hidden h-full",
          bgGradient,
          alert && "border border-red-200 bg-gradient-to-br from-red-50/70 to-white"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className={cn("text-xs font-bold tracking-wider uppercase", alert ? "text-red-600" : "text-slate-500")}>
            {title}
          </CardTitle>
          <div
            className={cn(
              "p-2.5 rounded-xl shadow-sm",
              alert ? "bg-red-100 text-red-600 animate-pulse" : "bg-slate-100/80 text-main-dark"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn("text-3xl lg:text-4xl font-black tracking-tight", alert ? "text-red-600" : accentColor)}>
            {value}
          </div>
          {trend && (
            <div className="flex items-center mt-3 text-xs sm:text-sm font-medium">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5 shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-500 mr-1.5 shrink-0" />
              )}
              <span className={trend.isPositive ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
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
