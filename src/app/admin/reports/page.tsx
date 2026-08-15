"use client";

import { FileSpreadsheet, Download, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-main-dark tracking-tight">Reports & Financial Audits</h1>
          <p className="text-slate-500 text-sm mt-1">
            Generate operational compliance, fuel expenditure, and billing summaries.
          </p>
        </div>
        <Button className="bg-main-dark hover:bg-main-dark/90 text-white font-semibold">
          <Download className="w-4 h-4 mr-2" /> Download Monthly CSV
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          { title: "Fleet Fuel Consumption", date: "August 2026", size: "2.4 MB", runs: "148 Trucks" },
          { title: "Driver Duty & Hours of Service", date: "August 2026", size: "1.8 MB", runs: "112 Drivers" },
          { title: "Revenue & Billing Settlements", date: "Q3 2026", size: "4.1 MB", runs: "410 Invoices" },
        ].map((report, idx) => (
          <Card key={idx} className="border-none shadow-md bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-400">{report.size}</span>
            </CardHeader>
            <CardContent className="pt-2 space-y-2">
              <CardTitle className="text-base font-bold text-main-dark">{report.title}</CardTitle>
              <p className="text-xs text-slate-500">Period: {report.date} • {report.runs}</p>
              <Button variant="outline" size="sm" className="w-full mt-3 text-xs font-semibold border-slate-200">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
