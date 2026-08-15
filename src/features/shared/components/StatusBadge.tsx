import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-emerald-500/10", text: "text-emerald-700", dot: "bg-emerald-500" },
  in_transit: { bg: "bg-blue-500/10", text: "text-blue-700", dot: "bg-blue-500" },
  assigned: { bg: "bg-indigo-500/10", text: "text-indigo-700", dot: "bg-indigo-500" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-700", dot: "bg-amber-500" },
  idle: { bg: "bg-slate-500/10", text: "text-slate-700", dot: "bg-slate-500" },
  maintenance: { bg: "bg-rose-500/10", text: "text-rose-700", dot: "bg-rose-500" },
  delayed: { bg: "bg-red-500/10", text: "text-red-700", dot: "bg-red-500" },
  available: { bg: "bg-emerald-500/10", text: "text-emerald-700", dot: "bg-emerald-500" },
  on_duty: { bg: "bg-blue-500/10", text: "text-blue-700", dot: "bg-blue-500" },
  resting: { bg: "bg-amber-500/10", text: "text-amber-700", dot: "bg-amber-500" },
  offline: { bg: "bg-slate-500/10", text: "text-slate-600", dot: "bg-slate-400" },
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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm",
        style.bg,
        style.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", style.dot)} />
      {status.replace(/_/g, " ")}
    </span>
  );
}
