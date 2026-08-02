"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isSuccess?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", label, error, isSuccess, id, value, onChange, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [hasVal, setHasVal] = React.useState(false);
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    // Combine forwarded ref and internal ref
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      if (internalRef.current) {
        setHasVal(!!internalRef.current.value || !!value);
      }
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasVal(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasVal(!!e.target.value);
      if (onChange) onChange(e);
    };

    const isFloating = focused || hasVal || type === "date" || type === "time" || type === "select";

    return (
      <div className="relative w-full flex flex-col gap-1 text-left">
        <div
          className={cn(
            "relative w-full h-14 rounded-2xl border-2 bg-white dark:bg-[#0f172a] transition-all duration-300 flex items-center px-4 overflow-hidden",
            focused
              ? "border-primary shadow-[0_0_0_4px_rgba(99,102,241,0.15)] dark:shadow-[0_0_0_4px_rgba(99,102,241,0.3)]"
              : error
              ? "border-destructive"
              : "border-border/80 hover:border-primary/40",
            className
          )}
        >
          {/* Input field */}
          <input
            id={id}
            ref={setRefs}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            className={cn(
              "w-full h-full pt-4 pb-1 text-base text-foreground bg-transparent border-0 outline-none focus:ring-0 focus:outline-none placeholder-transparent select-none z-10"
            )}
            {...props}
          />

          {/* Floating label */}
          <label
            htmlFor={id}
            className={cn(
              "absolute left-4 text-muted-foreground pointer-events-none transition-all duration-300 ease-out select-none",
              isFloating
                ? "top-1 text-xs font-semibold text-primary"
                : "top-4 text-base"
            )}
          >
            {label}
          </label>

          {/* Success Checkmark / Error Warning Icons — CSS zoom-in */}
          <div className="absolute right-4 flex items-center z-20">
            {isSuccess && !error && (
              <div className="animate-in zoom-in-50 duration-200">
                <CheckCircle2 className="size-5 text-emerald-500 stroke-[2.5]" />
              </div>
            )}
            {error && (
              <div className="animate-in zoom-in-50 duration-200">
                <AlertCircle className="size-5 text-destructive stroke-[2.5]" />
              </div>
            )}
          </div>
        </div>

        {error && (
          <p
            className="text-xs font-semibold text-destructive px-1 animate-in fade-in slide-in-from-top-1 duration-200"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
