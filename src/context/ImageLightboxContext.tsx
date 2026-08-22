"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  X,
  ZoomIn,
  Download,
  Maximize2,
  ExternalLink,
  Truck,
  User,
  Headphones,
  Shield,
  Building2,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ImageFallbackType =
  | "truck"
  | "driver"
  | "dispatcher"
  | "admin"
  | "user"
  | "organization"
  | "generic";

interface LightboxState {
  isOpen: boolean;
  src: string;
  alt?: string;
  title?: string;
}

interface ImageLightboxContextType {
  openLightbox: (src: string, alt?: string, title?: string) => void;
  closeLightbox: () => void;
}

const ImageLightboxContext = createContext<ImageLightboxContextType | undefined>(undefined);

export function ImageLightboxProvider({ children }: { children: React.ReactNode }) {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    alt: "",
    title: "",
  });
  const [lightboxImgError, setLightboxImgError] = useState(false);
  const [isLightboxLoading, setIsLightboxLoading] = useState(true);

  const openLightbox = (src: string, alt?: string, title?: string) => {
    if (!src) return;
    setLightboxImgError(false);
    setIsLightboxLoading(true);
    setLightbox({
      isOpen: true,
      src,
      alt: alt || "Fleet Asset Preview",
      title: title || alt || "Full View Asset",
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  // Keyboard shortcut listener (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    if (lightbox.isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox.isOpen]);

  // Robust document-level click listener that detects clicks on images and image containers
  useEffect(() => {
    const handleGlobalImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Don't intercept clicks inside the open lightbox modal itself
      if (target.closest("[data-lightbox-modal]")) return;
      if (target.closest("[data-no-lightbox]")) return;

      let imgSrc = "";
      let imgAlt = "";
      let imgTitle = "";

      // 1. Direct IMG click
      if (target.tagName === "IMG") {
        const img = target as HTMLImageElement;
        imgSrc = img.src;
        imgAlt = img.alt;
        imgTitle = img.title || img.alt;
      }
      // 2. Click on element with data-lightbox-src attribute
      else {
        const withSrc = target.closest("[data-lightbox-src]") as HTMLElement;
        if (withSrc) {
          imgSrc = withSrc.getAttribute("data-lightbox-src") || "";
          imgAlt = withSrc.getAttribute("data-lightbox-alt") || "Commercial Asset";
          imgTitle = withSrc.getAttribute("data-lightbox-title") || imgAlt;
        } else {
          // 3. Click on zoomable wrapper
          const wrapper = target.closest(".zoomable-image-wrapper") as HTMLElement;
          if (wrapper) {
            const img = wrapper.querySelector("img") as HTMLImageElement;
            if (img) {
              imgSrc = img.src;
              imgAlt = img.alt;
              imgTitle = img.title || img.alt;
            }
          }
        }
      }

      // If valid image source found and not a tiny icon/logo
      if (imgSrc && !imgSrc.includes("LOGO.png") && imgSrc.length > 5) {
        openLightbox(imgSrc, imgAlt, imgTitle || "Vehicle & System Preview");
      }
    };

    document.addEventListener("click", handleGlobalImageClick, true); // Use capture phase for immediate handling
    return () => document.removeEventListener("click", handleGlobalImageClick, true);
  }, []);

  return (
    <ImageLightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      {/* Global Full-Screen Modal Lightbox */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <div data-lightbox-modal className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop with 60% opacity and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-[#080D1A]/60 backdrop-blur-md cursor-zoom-out"
            />

            {/* Top Toolbar Controls */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between gap-2 z-20 pointer-events-none"
            >
              <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#0B1020]/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-white/15 text-white shadow-2xl min-w-0">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold font-mono truncate max-w-[170px] sm:max-w-md">
                  {lightbox.title}
                </span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 sm:p-2.5 rounded-full bg-[#0B1020]/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/15 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                  title="Close Full View (Esc)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-10 max-w-5xl w-full max-h-[85vh] flex items-center justify-center pointer-events-auto select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#0B1020]/80 backdrop-blur-xl p-2 sm:p-3 flex items-center justify-center min-h-[300px] min-w-[300px]">
                {isLightboxLoading && !lightboxImgError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0B1020]/60 z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin" />
                  </div>
                )}

                {lightboxImgError ? (
                  <div className="p-8 flex flex-col items-center justify-center text-slate-400 space-y-3 text-center">
                    <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                      <Truck className="w-12 h-12" />
                    </div>
                    <h4 className="text-white font-bold text-base">{lightbox.title}</h4>
                    <p className="text-xs text-slate-400">Asset image preview unavailable on this connection.</p>
                  </div>
                ) : (
                  <img
                    src={lightbox.src}
                    alt={lightbox.alt}
                    onLoad={() => setIsLightboxLoading(false)}
                    onError={() => {
                      setIsLightboxLoading(false);
                      setLightboxImgError(true);
                    }}
                    className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ImageLightboxContext.Provider>
  );
}

export function useImageLightbox() {
  const context = useContext(ImageLightboxContext);
  if (!context) {
    throw new Error("useImageLightbox must be used within an ImageLightboxProvider");
  }
  return context;
}

export interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  captionTitle?: string;
  showZoomBadge?: boolean;
  fallbackType?: ImageFallbackType;
}

export function ZoomableImage({
  src,
  alt = "Fleet Image",
  captionTitle,
  className,
  containerClassName,
  showZoomBadge = true,
  fallbackType,
  ...props
}: ZoomableImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { openLightbox } = useImageLightbox();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // Determine fallback type automatically
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

  const renderFallback = () => {
    switch (resolvedType) {
      case "truck":
        return (
          <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1020] via-[#0E1528] to-[#131B34] text-slate-400 p-4 select-none">
            <div className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-blue-400 shadow-inner mb-2">
              <Truck className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">
              Fleet Commercial Vehicle
            </span>
            <span className="text-[10px] text-slate-500 truncate max-w-[90%] mt-0.5">
              {alt || "Vehicle Unit"}
            </span>
          </div>
        );

      case "driver":
      case "user":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-slate-300 p-2 select-none">
            <div className="p-2 rounded-xl bg-white/10 text-slate-300 border border-white/15">
              <User className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        );

      case "dispatcher":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-emerald-400 p-2 select-none">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <Headphones className="w-5 h-5" />
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-purple-400 p-2 select-none">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        );

      case "organization":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-blue-400 p-2 select-none">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        );

      case "generic":
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1528] text-slate-500 p-3 select-none">
            <ImageIcon className="w-6 h-6 text-slate-500 mb-1" />
            <span className="text-[10px] font-semibold text-slate-500">Image Unavailable</span>
          </div>
        );
    }
  };

  if (!src || hasError) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        {renderFallback()}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openLightbox(String(src), alt, captionTitle || alt);
      }}
      data-lightbox-src={String(src)}
      data-lightbox-alt={alt}
      data-lightbox-title={captionTitle || alt}
      className={cn(
        "zoomable-image-wrapper relative cursor-zoom-in group overflow-hidden select-none bg-[#0E1528]",
        containerClassName
      )}
      title="Click to view full-screen"
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0E1528] animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
          isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100",
          className
        )}
        {...props}
      />

      {showZoomBadge && !isLoading && (
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
