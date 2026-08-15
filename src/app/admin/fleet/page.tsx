"use client";

import { Truck, Plus, Filter, Search, MoreHorizontal, Wrench } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

const fleetList = [
  { id: "V-101", plate: "CA-992-TR", model: "Freightliner Cascadia", type: "Semi-Truck", status: "active", driver: "Marcus Vance", fuel: "88%", mileage: "142,500 mi" },
  { id: "V-102", plate: "CA-441-TR", model: "Peterbilt 579", type: "Semi-Truck", status: "in_transit", driver: "Sarah Jenkins", fuel: "64%", mileage: "98,200 mi" },
  { id: "V-103", plate: "NV-883-BX", model: "Ford F-650", type: "Box Truck 26ft", status: "maintenance", driver: "Unassigned", fuel: "40%", mileage: "178,000 mi" },
  { id: "V-104", plate: "AZ-219-VN", model: "Mercedes Sprinter 3500", type: "Cargo Van", status: "idle", driver: "David Ross", fuel: "95%", mileage: "45,100 mi" },
  { id: "V-105", plate: "UT-705-TR", model: "Kenworth T680", type: "Semi-Truck", status: "active", driver: "Elena Ramos", fuel: "72%", mileage: "88,900 mi" },
];

export default function AdminFleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Fleet Asset Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor vehicle health, assignments, fuel metrics, and maintenance schedules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-main-dark font-medium">
            <Wrench className="w-4 h-4 mr-2" /> Maintenance Log
          </Button>
          <Button className="bg-main-dark hover:bg-main-dark/90 text-white font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Register Asset
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Filter by plate, model, driver..." className="pl-9 h-10 bg-slate-50/70 border-slate-200 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-slate-600 text-xs font-semibold">
              <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter Status
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Vehicle / Plate</th>
                <th className="px-6 py-4">Model & Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned Driver</th>
                <th className="px-6 py-4">Fuel & Mileage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {fleetList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-main-dark">{item.plate}</p>
                        <p className="text-xs text-slate-400">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{item.model}</p>
                    <p className="text-xs text-slate-400">{item.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.driver}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-slate-700">
                      <span>{item.mileage}</span>
                      <span className="text-slate-400 ml-1.5 font-normal">({item.fuel} fuel)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-main-dark">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
