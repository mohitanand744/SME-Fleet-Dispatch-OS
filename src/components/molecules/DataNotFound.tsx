import { motion } from "framer-motion";
import { LucideIcon, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataNotFoundProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: string;
}

export function DataNotFound({
  icon: Icon = SearchX,
  title = "No results found",
  description = "We couldn't find anything matching your criteria.",
  className,
}: DataNotFoundProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-16 h-16 rounded-2xl bg-[#0E1528] border border-white/5 flex items-center justify-center mb-4 shadow-inner"
      >
        <Icon className="w-8 h-8 text-slate-500 opacity-70" />
      </motion.div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">{description}</p>
      </motion.div>
    </div>
  );
}
