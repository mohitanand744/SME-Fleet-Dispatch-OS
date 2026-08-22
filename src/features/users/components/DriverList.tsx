"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Star,
  Phone,
  Mail,
  Truck,
  Edit2,
  Trash2,
  Calendar,
  ShieldCheck,
  UserCheck,
  Send,
  MailPlus,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { DataNotFound } from "@/components/molecules/DataNotFound";
import { useDriversData } from "@/data";
import { DriverUser } from "@/data/mock-users";
import { UserModal } from "./UserModal";
import { InviteUserModal } from "./InviteUserModal";
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { cn } from "@/lib/utils";

import { FilterDropdown } from "@/components/molecules/FilterDropdown";

interface DriverListProps {
  title?: string;
  subtitle?: string;
  companyId?: string;
  companyName?: string;
  readOnly?: boolean;
}

export function DriverList({
  title = "Drivers Management",
  subtitle = "CDL certifications, duty statuses, assigned trucks, and safety ratings.",
  companyId,
  companyName,
  readOnly = false,
}: DriverListProps) {
  const { drivers, addDriver, updateDriver, deleteDriver } = useDriversData(companyId);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assignmentFilter, setAssignmentFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState<DriverUser | null>(null);
  const [driverToDelete, setDriverToDelete] = useState<DriverUser | null>(null);

  const activeFilterCount =
    (assignmentFilter !== "all" ? 1 : 0) +
    (ratingFilter !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const handleResetFilters = () => {
    setAssignmentFilter("all");
    setRatingFilter("all");
    setSortBy("default");
    setStatusFilter("all");
  };

  const filteredDrivers = drivers
    .filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (driver.assignedTruckPlate && driver.assignedTruckPlate.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "all" ? true : driver.status === statusFilter;

      const matchesAssignment =
        assignmentFilter === "all"
          ? true
          : assignmentFilter === "assigned"
          ? Boolean(driver.assignedTruckPlate)
          : !driver.assignedTruckPlate;

      const matchesRating =
        ratingFilter === "all"
          ? true
          : ratingFilter === "4.8"
          ? driver.rating >= 4.8
          : ratingFilter === "4.5"
          ? driver.rating >= 4.5
          : driver.rating >= 4.0;

      return matchesSearch && matchesStatus && matchesAssignment && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "loads-desc") return b.totalTrips - a.totalTrips;
      return 0;
    });

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              variant="outline"
              className="bg-white/5 hover:bg-white/15 text-white border-white/15 shadow-sm font-semibold text-xs"
            >
              <MailPlus className="w-4 h-4 mr-2 text-blue-400" /> Invite Driver Link
            </Button>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Driver
            </Button>
          </div>
        )}
      </div>

      {/* Filter and View Toggle Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0B1020] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search driver name, license, vehicle..."
                className="pl-9 h-10 bg-[#0E1528] border-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl w-full"
              />
            </div>

            {/* Modern Filter Popover */}
            <FilterDropdown
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              onClose={() => setIsFilterOpen(false)}
              onClear={handleResetFilters}
              activeCount={activeFilterCount}
              title="Filter Driver Roster"
            >
              {/* Assignment Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Vehicle Assignment Status
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "All Drivers" },
                    { id: "assigned", label: "With Truck" },
                    { id: "unassigned", label: "Standby" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAssignmentFilter(a.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl font-semibold text-center transition-all border text-[11px]",
                        assignmentFilter === a.id
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Safety & Performance Rating */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Driver Safety & Star Rating
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "Any Rating" },
                    { id: "4.8", label: "★ 4.8+ Top" },
                    { id: "4.5", label: "★ 4.5+ High" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRatingFilter(r.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl font-semibold text-center transition-all border text-[11px]",
                        ratingFilter === r.id
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sort Drivers By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
                >
                  <option value="default">Default Order</option>
                  <option value="name-asc">Driver Name (A - Z)</option>
                  <option value="rating-desc">Highest Rating First</option>
                  <option value="loads-desc">Most Completed Loads</option>
                </select>
              </div>
            </FilterDropdown>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Showing {filteredDrivers.length} of {drivers.length} Drivers
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {[
            { id: "all", label: "All Drivers" },
            { id: "on_duty", label: "On Duty" },
            { id: "available", label: "Available" },
            { id: "resting", label: "Resting" },
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
        /* Driver Cards Grid with Profile Photos */
        <>
          {filteredDrivers.length === 0 ? (
            <div className="pt-8">
              <DataNotFound title="No drivers found" description="We couldn't find any drivers matching your current search or filters." />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredDrivers.map((driver, idx) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/20 transition-all rounded-3xl overflow-hidden flex flex-col h-full">
                  <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-[#080D1A]">
                    <div className="flex items-center gap-3">
                      {driver.avatarUrl ? (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#0E1528] shrink-0">
                          <ZoomableImage
                            src={driver.avatarUrl}
                            alt={driver.name}
                            captionTitle={`${driver.name} (CDL: ${driver.licenseNumber})`}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover"
                            showZoomBadge={false}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-white/10 text-slate-300 flex items-center justify-center border border-white/15 shadow-sm shrink-0">
                          <User className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base font-bold text-white">{driver.name}</CardTitle>
                        <p className="text-xs text-slate-400 font-mono">{driver.licenseNumber} ({driver.licenseClass})</p>
                      </div>
                    </div>
                    <StatusBadge status={driver.status as any} />
                  </CardHeader>
                  <CardContent className="p-4 space-y-2.5 text-xs bg-[#0B1020] flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 flex items-center justify-between text-slate-300">
                        <span className="font-semibold text-slate-400">Assigned Vehicle:</span>
                        <span className="font-bold text-white font-mono">{driver.assignedTruckPlate || "Unassigned"}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Contact:</span>
                          <span className="font-mono text-slate-200">{driver.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Email:</span>
                          <span className="text-slate-300 truncate max-w-[170px]">{driver.email}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{driver.rating} Rating</span>
                        </div>
                        <span className="text-slate-400 font-semibold">{driver.totalTrips} completed trips</span>
                      </div>
                    </div>

                    {!readOnly && (
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDriverToEdit(driver)}
                          className="w-[48%] h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDriverToDelete(driver)}
                          className="w-[48%] h-8 text-xs font-semibold bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        /* Driver Table View with Profile Photos */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Driver Profile</th>
                  <th className="px-6 py-4">CDL License & Expiry</th>
                  <th className="px-6 py-4">Duty Status</th>
                  <th className="px-6 py-4">Assigned Vehicle</th>
                  <th className="px-6 py-4">Performance Rating</th>
                  {!readOnly && <th className="px-6 py-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                <AnimatePresence>
                  {filteredDrivers.length === 0 ? (
                    <motion.tr
                      key="empty-drivers"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={6} className="px-6 py-8">
                        <DataNotFound title="No drivers found" description="We couldn't find any drivers matching your current search or filters." />
                      </td>
                    </motion.tr>
                  ) : (
                    filteredDrivers.map((driver, idx) => (
                      <motion.tr
                        key={driver.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.15 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {driver.avatarUrl ? (
                              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-sm bg-[#0E1528] shrink-0">
                                <ZoomableImage
                                  src={driver.avatarUrl}
                                  alt={driver.name}
                                  captionTitle={driver.name}
                                  containerClassName="w-full h-full"
                                  className="w-full h-full object-cover"
                                  showZoomBadge={false}
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-white/10 text-slate-300 flex items-center justify-center border border-white/15 shrink-0">
                                <User className="w-5 h-5 text-slate-300" />
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-white">{driver.name}</p>
                              <p className="text-[11px] text-slate-400">{driver.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-mono text-white font-semibold text-xs">{driver.licenseNumber}</p>
                          <p className="text-[11px] text-slate-400">{driver.licenseClass} • Exp: {driver.licenseExpiry}</p>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={driver.status as any} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-slate-200 font-mono text-xs">
                            <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{driver.assignedTruckPlate || "Unassigned"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{driver.rating}</span>
                            </div>
                            <span className="text-slate-400 text-xs">({driver.totalTrips} trips)</span>
                          </div>
                        </td>
                        {!readOnly && (
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDriverToEdit(driver)}
                                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDriverToDelete(driver)}
                                className="h-8 w-8 p-0 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        )}
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
        userType="driver"
        companyName={companyName}
        companyId={companyId}
      />

      {/* User Modal for Drivers */}
      <UserModal
        isOpen={isAddModalOpen || !!driverToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setDriverToEdit(null);
        }}
        userType="driver"
        onSaveDriver={(driverData) => {
          if (driverToEdit) {
            updateDriver(driverToEdit.id, driverData);
          } else {
            addDriver(driverData);
          }
        }}
        userToEdit={driverToEdit}
        companyId={companyId}
        companyName={companyName}
      />

      {/* Reusable Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!driverToDelete}
        onClose={() => setDriverToDelete(null)}
        onConfirm={() => {
          if (driverToDelete) {
            deleteDriver(driverToDelete.id);
            setDriverToDelete(null);
          }
        }}
        title="Remove Commercial Driver"
        description={`Are you sure you want to remove driver "${driverToDelete?.name}"? Any assigned truck will be unassigned and duty records will be archived.`}
        confirmText="Remove Driver"
        cancelText="Cancel"
        variant="danger"
        itemDetails={[
          { label: "Driver Name", value: driverToDelete?.name || "" },
          { label: "CDL License", value: driverToDelete?.licenseNumber || "" },
          { label: "Duty Status", value: driverToDelete?.status?.toUpperCase() || "" },
          { label: "Assigned Truck", value: driverToDelete?.assignedTruckPlate || "Unassigned" },
        ]}
      />
    </div>
  );
}
