"use client";

import { Package, Plus, Search, Filter, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

const loadsData = [
  { id: "LD-8801", origin: "Long Beach, CA", dest: "Phoenix, AZ", weight: "38,500 lbs", status: "in_transit", driver: "Robert Miller", rate: "$2,400" },
  { id: "LD-8804", origin: "Salinas, CA", dest: "Las Vegas, NV", weight: "22,100 lbs", status: "assigned", driver: "Alex Rivera", rate: "$1,850" },
  { id: "LD-8809", origin: "Salt Lake, UT", dest: "Denver, CO", weight: "44,000 lbs", status: "pending", driver: "Unassigned", rate: "$3,100" },
  { id: "LD-8812", origin: "Portland, OR", dest: "Seattle, WA", weight: "18,400 lbs", status: "delayed", driver: "Kevin Durant", rate: "$1,200" },
  { id: "LD-8815", origin: "Dallas, TX", dest: "Houston, TX", weight: "32,000 lbs", status: "in_transit", driver: "Sarah Jenkins", rate: "$1,600" },
];

export default function DispatcherLoadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Active Freight Loads</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create, track, and assign live freight shipments and manifests.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
          <Plus className="w-4 h-4 mr-2" /> New Load Order
        </Button>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search by Load ID, destination..." className="pl-9 h-10 bg-slate-50/70 border-slate-200 text-sm" />
          </div>
          <Button variant="outline" size="sm" className="text-slate-600 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter Status
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Load Order</th>
                <th className="px-6 py-4">Route Path</th>
                <th className="px-6 py-4">Weight / Payload</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned Driver</th>
                <th className="px-6 py-4">Freight Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loadsData.map((load) => (
                <tr key={load.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-main-dark">{load.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <span>{load.origin}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-main-dark">{load.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">{load.weight}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={load.status} />
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-700">{load.driver}</td>
                  <td className="px-6 py-4 text-xs font-bold text-emerald-700">{load.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
