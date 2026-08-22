"use client";

import { useEffect, useState } from "react";
import { FullScreenLoader } from "./FullScreenLoader";

export function InitialAppLoader({ children }: { children?: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    // Progress simulation for smooth sequential badge reveal
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval);
          return 96;
        }
        return prev + 18;
      });
    }, 180);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setIsReady(true);
      }, 350);
    }, 1350);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <FullScreenLoader
        isOpen={isLoading}
        title="Initializing Fleet Operating System..."
        subtitle="Mounting dispatch engines, establishing encrypted telemetry & loading workspace modules."
        progress={progress}
        steps={["System Handshake Verified", "Telemetry Synced", "Ready to Launch"]}
      />

      {isReady && children}
    </>
  );
}
