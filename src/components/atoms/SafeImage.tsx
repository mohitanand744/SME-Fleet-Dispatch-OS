"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  User,
  Headphones,
  Shield,
  Building2,
  Image as ImageIcon,
  ZoomIn,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageLightbox } from "@/context/ImageLightboxContext";

export type ImageFallbackType =
  | "truck"
  | "driver"
  | "dispatcher"
  | "admin"
  | "user"
  | "organization"
  | "generic";

export interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt?: string;
  fallbackType?: ImageFallbackType;
  containerClassName?: string;
  showSkeleton?: boolean;
  enableZoom?: boolean;
  captionTitle?: string;
  showZoomBadge?: boolean;
  customFallbackIcon?: React.ReactNode;
}

export function SafeImage({
  src,
  alt = "Fleet Image",
  fallbackType,
  className,
  containerClassName,
  showSkeleton = true,
  enableZoom = true,
  captionTitle,
  showZoomBadge = false,
  customFallbackIcon,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { openLightbox } = useImageLightbox();

  // Reset state on src change
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // Determine fallback type automatically if not provided
  const resolvedType: ImageFallbackType = React.useMemo(() => {
    if (fallbackType) return fallbackType;
    const lower = (alt + " " + (captionTitle || "")).toLowerCase();
    if (
      lower.includes("truck") ||
      lower.includes("van") ||
      lower.includes("transit") ||
      lower.includes("peterbilt") ||
      lower.includes("freightliner") ||
      lower.includes("kenworth") ||
      lower.includes("volvo") ||
      lower.includes("cascadia") ||
      lower.includes("flatbed") ||
      lower.includes("reefer") ||
      lower.includes("semi") ||
      lower.includes("unit")
    ) {
      return "truck";
    }
    if (lower.includes("driver")) return "driver";
    if (lower.includes("dispatcher")) return "dispatcher";
    if (lower.includes("admin")) return "admin";
    if (lower.includes("user") || lower.includes("profile") || lower.includes("avatar")) return "user";
    if (lower.includes("company") || lower.includes("organization") || lower.includes("carrier"))
      return "organization";
    return "generic";
  }, [fallbackType, alt, captionTitle]);

  const handleImageClick = (e: React.MouseEvent) => {
    if (enableZoom && src && !hasError) {
      e.stopPropagation();
      openLightbox(String(src), alt, captionTitle || alt);
    }
  };

  const renderFallback = () => {
    if (customFallbackIcon) {
      return customFallbackIcon;
    }

    switch (resolvedType) {
      case "truck":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1020] via-[#0E1528] to-[#131B34] text-slate-400 p-4 border border-white/5 select-none">
            <div className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-blue-400 shadow-inner mb-2">
              <Truck className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
              Fleet Commercial Vehicle
            </span>
            <span className="text-[10px] text-slate-500 truncate max-w-[85%] mt-0.5">
              {alt || "Vehicle Asset"}
            </span>
          </div>
        );

      case "driver":
      case "user":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-slate-400 p-2 border border-white/5 select-none">
            <div className="p-2 rounded-xl bg-white/10 text-slate-300 border border-white/15">
              <User className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        );

      case "dispatcher":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-emerald-400 p-2 border border-white/5 select-none">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <Headphones className="w-5 h-5" />
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-purple-400 p-2 border border-white/5 select-none">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        );

      case "organization":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-blue-400 p-2 border border-white/5 select-none">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        );

      case "generic":
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-slate-500 p-3 border border-white/5 select-none">
            <ImageIcon className="w-6 h-6 text-slate-500 mb-1" />
            <span className="text-[10px] font-semibold text-slate-500">Image Unavailable</span>
          </div>
        );
    }
  };

  // If no source provided or failed to load
  if (!src || hasError) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", containerClassName)}>
        {renderFallback()}
      </div>
    );
  }

  return (
    <div
      onClick={handleImageClick}
      data-lightbox-src={enableZoom ? String(src) : undefined}
      data-lightbox-alt={alt}
      data-lightbox-title={captionTitle || alt}
      className={cn(
        "relative overflow-hidden group select-none",
        enableZoom ? "cursor-zoom-in" : "",
        containerClassName
      )}
      title={enableZoom ? "Click to view full-screen" : alt}
    >
      {/* Loading Skeleton Shimmer */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 bg-[#0E1528] animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100",
          enableZoom ? "group-hover:scale-105" : "",
          className
        )}
        {...props}
      />

      {/* Zoom Badge */}
      {enableZoom && showZoomBadge && !isLoading && (
        <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <div className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-md flex items-center gap-1 text-[10px] font-bold">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Full View</span>
          </div>
        </div>
      )}
    </div>
  );
}
