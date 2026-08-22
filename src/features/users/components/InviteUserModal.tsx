"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Send,
  Check,
  Copy,
  UserCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Modal } from "@/components/atoms/modal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: "driver" | "dispatcher" | "admin";
  companyName?: string;
  companyId?: string;
  onInviteSent?: (data: { email: string; name: string; type: "driver" | "dispatcher" | "admin" }) => void;
}

export function InviteUserModal({
  isOpen,
  onClose,
  userType = "driver",
  companyName = "Apex Global Carrier LLC",
  companyId = "CMP-CARRIER-01",
  onInviteSent,
}: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  const isDriver = userType === "driver";
  const isAdmin = userType === "admin";

  // Generate a mock unique invitation token link
  const inviteToken = `inv_${Math.random().toString(36).substring(2, 9)}`;
  const inviteLink = `https://os.fleetdispatch.app/onboard?token=${inviteToken}&role=${userType}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);

    // Simulate API email dispatch
    setTimeout(() => {
      setIsSending(false);
      setIsSentSuccess(true);
      if (onInviteSent) {
        onInviteSent({ email, name, type: userType });
      }

      setTimeout(() => {
        setIsSentSuccess(false);
        setName("");
        setEmail("");
        onClose();
      }, 2200);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" className="overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080D1A]">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0",
                    isAdmin
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : isDriver
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                  )}
                >
                  {isAdmin ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : isDriver ? <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-white truncate">
                    {isAdmin ? "Invite Administrator" : isDriver ? "Invite Commercial Driver" : "Invite Fleet Dispatcher"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                    Send single-use onboarding link to email
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSentSuccess ? (
              /* Success Confirmation Screen */
              <div className="p-6 sm:p-8 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </motion.div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-white">Invitation Dispatched!</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    An email with the secure sign-up link was successfully sent to{" "}
                    <strong className="text-white font-mono">{email}</strong>.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/10 text-[11px] font-mono text-slate-300">
                  Role: <span className="text-white font-bold">{isDriver ? "Commercial Driver" : "Fleet Dispatcher"}</span> • Pending Activation
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSendInvite} className="p-4 sm:p-6 space-y-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Recipient Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isDriver ? "e.g. Marcus Vance" : "e.g. Rachel Morgan"}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-300">Recipient Email Address *</Label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isDriver ? "e.g. driver@domain.com" : "e.g. dispatcher@domain.com"}
                    className="h-10 bg-[#0E1528] border-white/10 text-white rounded-xl text-xs"
                  />
                </div>

                {/* Direct Sharable Link Box */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-300">Direct Onboarding Link</Label>
                    <span className="text-[10px] text-slate-400">Single-use secure token</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E1528] border border-white/10">
                    <span className="text-[11px] text-slate-400 font-mono truncate flex-1 pl-1">
                      {inviteLink}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="h-7 px-2.5 text-xs font-semibold bg-white/10 border-white/15 text-white hover:bg-white/20 shrink-0 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSending || !email}
                    className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold shadow-md cursor-pointer text-xs"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 mr-1.5" />
                        Send Invitation Link
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
    </Modal>
  );
}
