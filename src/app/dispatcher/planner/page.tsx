"use client";

import { Route, MapPin, Clock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";

export default function DispatcherPlannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Route Planner & Optimization</h1>
          <p className="text-slate-400 text-sm mt-1">
            Compute optimal multi-stop corridors, toll avoidance, and live ETA calculations.
          </p>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
          <Zap className="w-4 h-4 mr-2" /> Optimize Multi-Stop Corridor
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            corridor: "West Coast Express Line",
            stops: ["Long Beach Port, CA", "Bakersfield Hub, CA", "Fresno Depot, CA", "Sacramento Central, CA"],
            distance: "385 mi",
            estTime: "6h 45m",
            efficiency: "96%",
          },
          {
            corridor: "Southwest Freight Corridor",
            stops: ["Los Angeles, CA", "Palm Springs, CA", "Phoenix East, AZ", "Tucson Logistics Park, AZ"],
            distance: "510 mi",
            estTime: "8h 10m",
            efficiency: "94%",
          },
        ].map((plan, idx) => (
          <Card key={idx} className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl">
            <CardHeader className="border-b border-white/10 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="text-base font-bold text-white">{plan.corridor}</CardTitle>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {plan.efficiency} Score
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2 text-xs">
                {plan.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-slate-300 font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#0E1528] text-blue-400 font-bold flex items-center justify-center text-[10px] shrink-0 border border-white/10">
                      {sIdx + 1}
                    </span>
                    <span>{stop}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Distance: <span className="text-slate-200">{plan.distance}</span></span>
                <span>Est Time: <span className="text-slate-200">{plan.estTime}</span></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
