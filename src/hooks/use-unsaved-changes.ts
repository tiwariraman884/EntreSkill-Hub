"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface UseUnsavedChangesOptions {
  enabled?: boolean;
  message?: string;
}

interface UseUnsavedChangesReturn {
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  markAsSaved: () => void;
}

function useUnsavedChanges({ enabled = true, message = "You have unsaved changes. Are you sure you want to leave?" }: UseUnsavedChangesOptions = {}): UseUnsavedChangesReturn {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const pathname = usePathname();
  const shouldWarnRef = useRef(false);

  const markAsSaved = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    shouldWarnRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [enabled, hasUnsavedChanges, message]);

  useEffect(() => {
    if (!enabled || !hasUnsavedChanges) return;

    const handleRouteChangeStart = () => {
      if (hasUnsavedChanges && !window.confirm(message)) {
        window.history.forward();
      }
    };

    window.addEventListener("popstate", handleRouteChangeStart);
    return () => window.removeEventListener("popstate", handleRouteChangeStart);
  }, [enabled, hasUnsavedChanges, message]);

  return {
    hasUnsavedChanges,
    setHasUnsavedChanges,
    markAsSaved,
  };
}

export { useUnsavedChanges };
export type { UseUnsavedChangesOptions, UseUnsavedChangesReturn };
