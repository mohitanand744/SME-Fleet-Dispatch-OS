"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X, ZoomIn, Download, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

  const openLightbox = (src: string, alt?: string, title?: string) => {
    if (!src) return;
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
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Central Zoomed Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative max-w-5xl max-h-[85vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 bg-[#0B1020]/40 backdrop-blur-xs flex items-center justify-center p-1.5 select-none"
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt || "Fullscreen Asset"}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
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

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  captionTitle?: string;
  showZoomBadge?: boolean;
}

export function ZoomableImage({
  src,
  alt = "Fleet Image",
  captionTitle,
  className,
  containerClassName,
  showZoomBadge = true,
  ...props
}: ZoomableImageProps) {
  const { openLightbox } = useImageLightbox();

  if (!src) return null;

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
        "zoomable-image-wrapper relative cursor-zoom-in group overflow-hidden select-none",
        containerClassName
      )}
      title="Click to view full-screen"
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", className)}
        {...props}
      />
      {showZoomBadge && (
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
