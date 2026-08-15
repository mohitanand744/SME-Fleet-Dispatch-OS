"use client";

import { Route, MapPin, Clock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";

export default function DispatcherPlannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Route Planner & Optimization</h1>
          <p className="text-slate-500 text-sm mt-1">
            Compute optimal multi-stop corridors, toll avoidance, and live ETA calculations.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
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
          <Card key={idx} className="border-none shadow-md bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-base font-bold text-main-dark">{plan.corridor}</CardTitle>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {plan.efficiency} Score
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2 text-xs">
                {plan.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {sIdx + 1}
                    </span>
                    <span>{stop}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Distance: {plan.distance}</span>
                <span>Est Time: {plan.estTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
