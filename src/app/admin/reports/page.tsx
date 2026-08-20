"use client";

import { useState } from "react";
import { FileSpreadsheet, Download, Calendar, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";

const reportsData = [
  { id: "REP-01", title: "Fleet Fuel Consumption", date: "August 2026", size: "2.4 MB", runs: "148 Trucks", type: "Telemetry" },
  { id: "REP-02", title: "Driver Duty & Hours of Service", date: "August 2026", size: "1.8 MB", runs: "112 Drivers", type: "Compliance" },
  { id: "REP-03", title: "Revenue & Billing Settlements", date: "Q3 2026", size: "4.1 MB", runs: "410 Invoices", type: "Financial" },
  { id: "REP-04", title: "IFTA Tax & Corridor Filings", date: "Q2 2026", size: "3.2 MB", runs: "28 States", type: "Compliance" },
  { id: "REP-05", title: "Preventative Maintenance Audits", date: "August 2026", size: "1.5 MB", runs: "64 Inspections", type: "Maintenance" },
  { id: "REP-06", title: "Dispatcher Load Volume Ledger", date: "August 2026", size: "2.9 MB", runs: "840 Dispatches", type: "Operations" },
];

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredReports = reportsData.filter(
    (rep) =>
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Reports & Financial Audits</h1>
          <p className="text-slate-400 text-sm mt-1">
            Generate operational compliance, fuel expenditure, and billing summaries.
          </p>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold">
          <Download className="w-4 h-4 mr-2" /> Download Monthly CSV
        </Button>
      </div>

      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, type..."
              className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              {filteredReports.length} Reports
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid gap-5 md:grid-cols-3">
          {filteredReports.map((report) => (
            <Card key={report.id} className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-3xl hover:border-white/20 transition-all flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-[#080D1A] p-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400 font-mono">{report.size}</span>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-base font-bold text-white">{report.title}</CardTitle>
                <p className="text-xs text-slate-400">Period: {report.date} • {report.runs}</p>
                <div className="pt-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
                    {report.type}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs font-semibold bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Coverage Scope</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">File Size</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white">{report.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300">{report.runs}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{report.date}</td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-300">{report.size}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold bg-white/5 border-white/10 text-white/80 hover:bg-white/10">
                        <Download className="w-3 h-3 mr-1" /> Export
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
