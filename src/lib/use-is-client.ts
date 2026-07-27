import { useCallback } from "react";
import { useSyncExternalStore } from "react";

export function useIsClient() {
  return useSyncExternalStore(
    useCallback((onChange) => {
      const handler = () => onChange();
      window.addEventListener("load", handler);
      if (document.readyState === "complete") {
        onChange();
      }
      return () => window.removeEventListener("load", handler);
    }, []),
    () => true,
    () => false
  );
}
