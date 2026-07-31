"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SaveStatus = "idle" | "saving" | "saved" | "failed";

interface UseAutosaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void> | void;
  delay?: number;
  enabled?: boolean;
}

interface UseAutosaveReturn {
  saveStatus: SaveStatus;
  error: string | null;
  retry: () => void;
}

function useAutosave<T>({ data, onSave, delay = 2000, enabled = true }: UseAutosaveOptions<T>): UseAutosaveReturn {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastDataRef = useRef<T>(data);

  const save = useCallback(async (dataToSave: T) => {
    if (!enabled) return;
    
    setSaveStatus("saving");
    setError(null);
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await onSave(dataToSave);
      setSaveStatus("saved");
      lastDataRef.current = dataToSave;
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Save failed");
      setSaveStatus("failed");
    }
  }, [onSave, enabled]);

  const retry = useCallback(() => {
    if (saveStatus === "failed") {
      save(lastDataRef.current);
    }
  }, [save, saveStatus]);

  useEffect(() => {
    if (!enabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      save(data);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, save, enabled]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { saveStatus, error, retry };
}

export { useAutosave };
export type { UseAutosaveOptions, UseAutosaveReturn, SaveStatus };
