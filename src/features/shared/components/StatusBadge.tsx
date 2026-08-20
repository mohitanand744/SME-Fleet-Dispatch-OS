import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400", border: "border-emerald-500/30" },
  in_transit: { bg: "bg-blue-500/20", text: "text-blue-300", dot: "bg-blue-400", border: "border-blue-500/30" },
  assigned: { bg: "bg-indigo-500/20", text: "text-indigo-300", dot: "bg-indigo-400", border: "border-indigo-500/30" },
  pending: { bg: "bg-amber-500/20", text: "text-amber-300", dot: "bg-amber-400", border: "border-amber-500/30" },
  idle: { bg: "bg-slate-500/20", text: "text-slate-300", dot: "bg-slate-400", border: "border-slate-500/30" },
  maintenance: { bg: "bg-rose-500/20", text: "text-rose-300", dot: "bg-rose-400", border: "border-rose-500/30" },
  delayed: { bg: "bg-red-500/20", text: "text-red-300", dot: "bg-red-400", border: "border-red-500/30" },
  delivered: { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400", border: "border-emerald-500/30" },
  available: { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "bg-emerald-400", border: "border-emerald-500/30" },
  on_duty: { bg: "bg-blue-500/20", text: "text-blue-300", dot: "bg-blue-400", border: "border-blue-500/30" },
  resting: { bg: "bg-amber-500/20", text: "text-amber-300", dot: "bg-amber-400", border: "border-amber-500/30" },
  offline: { bg: "bg-slate-500/20", text: "text-slate-400", dot: "bg-slate-500", border: "border-slate-500/30" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  const style = statusStyles[normalized] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm border",
        style.bg,
        style.text,
        style.border,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", style.dot)} />
      {status.replace(/_/g, " ")}
    </span>
  );
}
