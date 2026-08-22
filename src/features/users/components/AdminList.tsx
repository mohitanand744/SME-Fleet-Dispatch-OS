"use client";

import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Plus,
  Search,
  KeyRound,
  MailPlus,
  Edit2,
  Trash2,
  Building2,
  Lock,
  User,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { DataNotFound } from "@/components/molecules/DataNotFound";
import { AdminUser } from "@/data/mock-users";
import { useAdminsData } from "@/data";
import { AdminModal } from "./AdminModal";
import { InviteUserModal } from "./InviteUserModal";
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal";
import { ViewToggle, ViewMode } from "@/components/atoms/ViewToggle";
import { ZoomableImage } from "@/context/ImageLightboxContext";
import { TableScrollHint } from "@/components/atoms/TableScrollHint";
import { FilterDropdown } from "@/components/molecules/FilterDropdown";
import { cn } from "@/lib/utils";

interface AdminListProps {
  title?: string;
  subtitle?: string;
  companyId?: string;
  companyName?: string;
}

export function AdminList({
  title = "Enterprise Administrators",
  subtitle = "Manage executive leadership, compliance officers, and role-based platform privileges.",
  companyId,
  companyName = "Apex Global Carrier LLC",
}: AdminListProps) {
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useAdminsData(companyId);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [permissionsFilter, setPermissionsFilter] = useState<string>("all");
  const [twoFactorFilter, setTwoFactorFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState<AdminUser | null>(null);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

  const activeFilterCount =
    (departmentFilter !== "all" ? 1 : 0) +
    (permissionsFilter !== "all" ? 1 : 0) +
    (twoFactorFilter !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const handleResetFilters = () => {
    setDepartmentFilter("all");
    setPermissionsFilter("all");
    setTwoFactorFilter("all");
    setSortBy("default");
    setStatusFilter("all");
  };

  const filteredAdmins = admins
    .filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" ? true : admin.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "all"
          ? true
          : admin.department.toLowerCase().includes(departmentFilter.toLowerCase());

      const matchesPermissions =
        permissionsFilter === "all"
          ? true
          : admin.permissionsLevel.toLowerCase().includes(permissionsFilter.toLowerCase());

      const matches2FA =
        twoFactorFilter === "all"
          ? true
          : twoFactorFilter === "enabled"
          ? admin.twoFactorEnabled
          : !admin.twoFactorEnabled;

      return matchesSearch && matchesStatus && matchesDepartment && matchesPermissions && matches2FA;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "department-asc") return a.department.localeCompare(b.department);
      if (sortBy === "joined-desc") return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
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

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            variant="outline"
            className="bg-white/5 hover:bg-white/15 text-white border-white/15 shadow-sm font-semibold text-xs cursor-pointer"
          >
            <MailPlus className="w-4 h-4 mr-2 text-blue-400" /> Invite Administrator
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-sm font-semibold text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Administrator
          </Button>
        </div>
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
                placeholder="Search admin name, email, department, role..."
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
              title="Filter Administrators"
            >
              {/* Department Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Assigned Department
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "All Departments" },
                    { id: "executive", label: "Executive" },
                    { id: "fleet", label: "Fleet Ops" },
                    { id: "safety", label: "Safety & Compliance" },
                    { id: "finance", label: "Finance & Settlement" },
                    { id: "dispatch", label: "Dispatch Ops" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDepartmentFilter(d.id)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl font-semibold text-left transition-all border",
                        departmentFilter === d.id
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions Level Filter */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  System Permissions Tier
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "All Access" },
                    { id: "full", label: "Full Super Access" },
                    { id: "operations", label: "Operations Level" },
                    { id: "compliance", label: "Compliance Tier" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPermissionsFilter(p.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl font-semibold text-center transition-all border text-[11px]",
                        permissionsFilter === p.id
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2FA Status */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Two-Factor Security (2FA)
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: "all", label: "All" },
                    { id: "enabled", label: "2FA On" },
                    { id: "disabled", label: "2FA Off" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTwoFactorFilter(f.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl font-semibold text-center transition-all border text-[11px]",
                        twoFactorFilter === f.id
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sort Administrators By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 bg-[#0E1528] border border-white/10 text-white text-xs rounded-xl px-3 focus:outline-hidden"
                >
                  <option value="default">Default Order</option>
                  <option value="name-asc">Admin Name (A - Z)</option>
                  <option value="department-asc">Department Grouping</option>
                  <option value="joined-desc">Recently Joined</option>
                </select>
              </div>
            </FilterDropdown>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Showing {filteredAdmins.length} of {admins.length} Administrators
            </span>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {[
            { id: "all", label: "All Admins" },
            { id: "active", label: "Active" },
            { id: "away", label: "Away" },
            { id: "offline", label: "Offline" },
            { id: "suspended", label: "Suspended" },
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
        /* Grid View with Admin Cards */
        <>
          {filteredAdmins.length === 0 ? (
            <div className="pt-8">
              <DataNotFound title="No administrators found" description="We couldn't find any administrators matching your search criteria." />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredAdmins.map((admin) => (
                  <motion.div
                    key={admin.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white hover:border-white/20 transition-all rounded-3xl overflow-hidden flex flex-col h-full">
                      <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-[#080D1A]">
                        <div className="flex items-center gap-3">
                          {admin.avatarUrl ? (
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#0E1528] shrink-0">
                              <ZoomableImage
                                src={admin.avatarUrl}
                                alt={admin.name}
                                captionTitle={`${admin.name} - ${admin.roleTitle}`}
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
                            <CardTitle className="text-base font-bold text-white">{admin.name}</CardTitle>
                            <p className="text-xs text-blue-400 font-semibold truncate max-w-[150px]">{admin.roleTitle}</p>
                          </div>
                        </div>
                        <StatusBadge status={admin.status as any} />
                      </CardHeader>

                      <CardContent className="p-4 space-y-2.5 text-xs bg-[#0B1020] flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 flex items-center justify-between text-slate-300">
                            <span className="font-semibold text-slate-400">Department:</span>
                            <span className="font-bold text-white">{admin.department}</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Access Scope:</span>
                              <span className="font-semibold text-slate-200">{admin.permissionsLevel}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Security (2FA):</span>
                              <span className={cn(
                                "flex items-center gap-1 font-bold text-[11px]",
                                admin.twoFactorEnabled ? "text-emerald-400" : "text-amber-400"
                              )}>
                                <KeyRound className="w-3 h-3" />
                                {admin.twoFactorEnabled ? "Enforced" : "Not Enforced"}
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/5 space-y-1 text-slate-300">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Email:</span>
                              <span className="text-slate-200 font-mono text-[11px] truncate max-w-[170px]">{admin.email}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Direct Phone:</span>
                              <span className="font-mono text-slate-200 text-[11px]">{admin.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdminToEdit(admin)}
                            className="w-[48%] h-8 text-xs font-semibold bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdminToDelete(admin)}
                            className="w-[48%] h-8 text-xs font-semibold bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
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
          )}
        </>
      ) : (
        /* Table View */
        <Card className="border border-white/10 shadow-xl bg-[#0B1020] text-white rounded-2xl overflow-hidden">
          <TableScrollHint />
          <CardContent className="p-0 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[850px]">
              <thead className="bg-[#080D1A] text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Administrator</th>
                  <th className="px-6 py-4 whitespace-nowrap">Department & Role</th>
                  <th className="px-6 py-4 whitespace-nowrap">Access Scope</th>
                  <th className="px-6 py-4 whitespace-nowrap">2FA Security</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                <AnimatePresence>
                  {filteredAdmins.length === 0 ? (
                    <motion.tr
                      key="empty-admins"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={6} className="px-6 py-8">
                        <DataNotFound title="No administrators found" description="We couldn't find any administrators matching your search criteria." />
                      </td>
                    </motion.tr>
                  ) : (
                    filteredAdmins.map((admin) => (
                      <motion.tr
                        key={admin.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.15 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {admin.avatarUrl ? (
                              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-sm bg-[#0E1528] shrink-0">
                                <ZoomableImage
                                  src={admin.avatarUrl}
                                  alt={admin.name}
                                  captionTitle={admin.name}
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
                            <div className="min-w-0 max-w-[180px]">
                              <p className="font-bold text-white truncate">{admin.name}</p>
                              <p className="text-[11px] text-slate-400 truncate">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="max-w-[200px]">
                            <p className="font-semibold text-white text-xs truncate">{admin.department}</p>
                            <p className="text-[11px] text-slate-400 truncate">{admin.roleTitle}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-extrabold uppercase">
                            {admin.permissionsLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {admin.twoFactorEnabled ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                              Enabled
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-400 border border-white/10 text-[10px] font-semibold">
                              Disabled
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={admin.status as any} />
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setAdminToEdit(admin)}
                              className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setAdminToDelete(admin)}
                              className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

      {/* Add / Edit Admin Modal */}
      <AdminModal
        isOpen={isAddModalOpen || !!adminToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setAdminToEdit(null);
        }}
        onSave={(adminData) => {
          if (adminToEdit) {
            updateAdmin(adminToEdit.id, adminData);
          } else {
            addAdmin(adminData);
          }
        }}
        adminToEdit={adminToEdit}
        companyName={companyName}
        companyId={companyId}
      />

      {/* Invite Admin Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        userType="admin"
        companyName={companyName}
        companyId={companyId}
      />

      {/* Reusable Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!adminToDelete}
        onClose={() => setAdminToDelete(null)}
        onConfirm={() => {
          if (adminToDelete) {
            deleteAdmin(adminToDelete.id);
            setAdminToDelete(null);
          }
        }}
        title="Remove Administrator"
        description={`Are you sure you want to remove administrator "${adminToDelete?.name}"? All platform privileges and portal management tokens will be revoked.`}
        confirmText="Remove Administrator"
        cancelText="Cancel"
        variant="danger"
        itemDetails={[
          { label: "Admin Name", value: adminToDelete?.name || "" },
          { label: "Email Address", value: adminToDelete?.email || "" },
          { label: "Department", value: adminToDelete?.department || "" },
          { label: "Access Tier", value: adminToDelete?.permissionsLevel || "" },
        ]}
      />
    </div>
  );
}
