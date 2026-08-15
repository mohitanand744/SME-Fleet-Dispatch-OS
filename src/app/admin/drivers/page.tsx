"use client";

import { Users, Plus, Search, Star, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

const driverList = [
  { id: "D-201", name: "Marcus Vance", phone: "+1 (555) 234-9912", license: "CDL-A 88390", status: "on_duty", vehicle: "CA-992-TR", rating: 4.9, trips: 312 },
  { id: "D-202", name: "Sarah Jenkins", phone: "+1 (555) 441-2099", license: "CDL-A 77123", status: "on_duty", vehicle: "CA-441-TR", rating: 5.0, trips: 489 },
  { id: "D-203", name: "David Ross", phone: "+1 (555) 890-4411", license: "CDL-B 10492", status: "available", vehicle: "AZ-219-VN", rating: 4.8, trips: 198 },
  { id: "D-204", name: "Elena Ramos", phone: "+1 (555) 602-3321", license: "CDL-A 99201", status: "on_duty", vehicle: "UT-705-TR", rating: 4.95, trips: 260 },
  { id: "D-205", name: "Kevin Durant", phone: "+1 (555) 773-1029", license: "CDL-A 33810", status: "resting", vehicle: "WA-219-TR", rating: 4.7, trips: 145 },
];

export default function AdminDriversPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Driver Personnel</h1>
          <p className="text-slate-500 text-sm mt-1">
            Driver rosters, performance ratings, CDL certifications, and status monitoring.
          </p>
        </div>
        <Button className="bg-main-dark hover:bg-main-dark/90 text-white font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {driverList.map((driver) => (
          <Card key={driver.id} className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-main-dark font-extrabold flex items-center justify-center text-sm border border-slate-200">
                  {driver.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-main-dark">{driver.name}</CardTitle>
                  <p className="text-xs text-slate-400 font-medium">{driver.license}</p>
                </div>
              </div>
              <StatusBadge status={driver.status} />
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-semibold">Current Vehicle:</span>
                <span className="font-bold text-main-dark">{driver.vehicle}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-semibold">Contact:</span>
                <span className="font-mono text-slate-500">{driver.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{driver.rating}</span>
                </div>
                <span className="text-slate-500 font-semibold">{driver.trips} completed trips</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
