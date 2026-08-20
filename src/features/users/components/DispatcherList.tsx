"use client";

import { useState } from "react";
import {
  Headphones,
  Plus,
  Search,
  Star,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Route,
  Activity,
  Layers,
  User,
  Send,
  MailPlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { useDispatchersData } from "@/data";
import { DispatcherUser } from "@/data/mock-users";
import { UserModal } from "./UserModal";
import { InviteUserModal } from "./InviteUserModal";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { cn } from "@/lib/utils";

interface DispatcherListProps {
  title?: string;
  subtitle?: string;
  companyId?: string;
  companyName?: string;
}

export function DispatcherList({
  title = "Dispatchers Management",
  subtitle = "Desk assignments, operational lanes, managed fleet volumes, and dispatch capacity.",
  companyId,
  companyName,
}: DispatcherListProps) {
  const { dispatchers, addDispatcher, updateDispatcher, deleteDispatcher } = useDispatchersData(companyId);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [dispatcherToEdit, setDispatcherToEdit] = useState<DispatcherUser | null>(null);

  const filteredDispatchers = dispatchers.filter((disp) => {
    const matchesSearch =
      disp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disp.deskAssignment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" ? true : disp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            variant="outline"
            className="bg-white/5 hover:bg-white/15 text-white border-white/15 shadow-sm font-semibold text-xs"
          >
            <MailPlus className="w-4 h-4 mr-2 text-purple-400" /> Invite Dispatcher Link
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Dispatcher
          </Button>
        </div>
      </div>

      {/* Filter and View Toggle Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispatcher name, desk, email..."
              className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Showing {filteredDispatchers.length} of {dispatchers.length} Desks
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {[
            { id: "all", label: "All Desks" },
            { id: "active", label: "Active" },
            { id: "away", label: "Away" },
            { id: "offline", label: "Offline" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer",
                statusFilter === tab.id
                  ? "bg-white/15 text-white border-white/20 shadow-sm"
                  : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Rendering */}
      {viewMode === "grid" ? (
        /* Dispatcher Cards Grid with Profile Photos */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredDispatchers.map((disp, idx) => (
              <motion.div
                key={disp.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/20 transition-all rounded-3xl overflow-hidden flex flex-col h-full">
                  <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-[#080D1A]">
                    <div className="flex items-center gap-3">
                      {disp.avatarUrl ? (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#0E1528] shrink-0">
                          <ZoomableImage
                            src={disp.avatarUrl}
                            alt={disp.name}
                            captionTitle={`${disp.name} - ${disp.deskAssignment}`}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover"
                            showZoomBadge={false}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-white/10 text-white font-extrabold flex items-center justify-center text-sm border border-white/15 shadow-sm shrink-0">
                          {disp.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base font-bold text-white">{disp.name}</CardTitle>
                        <p className="text-xs text-slate-400 truncate max-w-[140px]">{disp.deskAssignment}</p>
                      </div>
                    </div>
                    <StatusBadge status={disp.status as any} />
                  </CardHeader>
                  <CardContent className="p-4 space-y-2.5 text-xs bg-[#0B1020] flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                        <span className="font-semibold text-slate-400">Active Corridors & Lanes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {disp.activeLanes.map((lane, lIdx) => (
                            <span
                              key={lIdx}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                            >
                              {lane}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Contact:</span>
                          <span className="font-mono text-slate-200">{disp.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Email:</span>
                          <span className="text-slate-300 truncate max-w-[170px]">{disp.email}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{disp.rating} Rating</span>
                        </div>
                        <span className="text-slate-400 font-semibold">{disp.totalLoadsDispatched} loads fulfilled</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDispatcherToEdit(disp)}
                        className="w-[48%] h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDispatcher(disp.id)}
                        className="w-[48%] h-8 text-xs font-semibold bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Dispatcher Table View with Profile Photos */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Dispatcher Profile</th>
                  <th className="px-6 py-4">Desk Assignment</th>
                  <th className="px-6 py-4">Coverage Lanes</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Fulfillment Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                <AnimatePresence mode="popLayout">
                  {filteredDispatchers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        <Headphones className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p className="font-semibold text-sm">No dispatchers found matching query.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredDispatchers.map((disp, idx) => (
                      <motion.tr
                        key={disp.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {disp.avatarUrl ? (
                              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-sm bg-[#0E1528] shrink-0">
                                <ZoomableImage
                                  src={disp.avatarUrl}
                                  alt={disp.name}
                                  captionTitle={disp.name}
                                  containerClassName="w-full h-full"
                                  className="w-full h-full object-cover"
                                  showZoomBadge={false}
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-white/10 text-white font-extrabold flex items-center justify-center text-xs border border-white/15 shrink-0">
                                {disp.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-white">{disp.name}</p>
                              <p className="text-[11px] text-slate-400">{disp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white text-xs">{disp.deskAssignment}</p>
                          <p className="text-[11px] text-slate-400">{disp.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {disp.activeLanes.map((lane, lIdx) => (
                              <span
                                key={lIdx}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                              >
                                {lane}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={disp.status as any} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{disp.rating}</span>
                            </div>
                            <span className="text-slate-400 text-xs">({disp.totalLoadsDispatched} loads)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDispatcherToEdit(disp)}
                              className="h-8 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold"
                            >
                              <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDispatcher(disp.id)}
                              className="h-8 px-2.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Direct Email Invitation Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        userType="dispatcher"
        companyName={companyName}
        companyId={companyId}
      />

      {/* User Modal for Dispatchers */}
      <UserModal
        isOpen={isAddModalOpen || !!dispatcherToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setDispatcherToEdit(null);
        }}
        userType="dispatcher"
        onSaveDispatcher={(dispatcherData) => {
          if (dispatcherToEdit) {
            updateDispatcher(dispatcherToEdit.id, dispatcherData);
          } else {
            addDispatcher(dispatcherData);
          }
        }}
        userToEdit={dispatcherToEdit}
        companyId={companyId}
        companyName={companyName}
      />
    </div>
  );
}
