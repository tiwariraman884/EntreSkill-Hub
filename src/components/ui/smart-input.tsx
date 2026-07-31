"use client";

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type InputState = "idle" | "success" | "error" | "loading"

interface SmartInputProps extends Omit<React.ComponentProps<"input">, "disabled" | "readOnly"> {
  state?: InputState
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  showCharacterCount?: boolean
  maxLength?: number
  currentLength?: number
  readOnly?: boolean
  disabled?: boolean
  passwordToggle?: boolean
  onPasswordToggle?: () => void
  showPassword?: boolean
  animatedLabel?: boolean
  validation?: "onBlur" | "onChange" | "onSubmit"
  validateFn?: (value: string) => string | null
  /** When true, renders as a textarea with auto-resize */
  asTextarea?: boolean
  /** Rows for textarea */
  textareaRows?: number
  /** Show password strength meter (only for password type) */
  showPasswordStrength?: boolean
}

type PasswordStrength = "none" | "weak" | "medium" | "strong" | "very-strong"

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return "none"
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return "weak"
  if (score <= 2) return "medium"
  if (score <= 4) return "strong"
  return "very-strong"
}

const strengthConfig: Record<PasswordStrength, { label: string; color: string; width: string; textColor: string }> = {
  "none": { label: "", color: "", width: "0%", textColor: "" },
  "weak": { label: "Weak", color: "bg-danger", width: "25%", textColor: "text-danger" },
  "medium": { label: "Medium", color: "bg-warning", width: "50%", textColor: "text-warning" },
  "strong": { label: "Strong", color: "bg-success", width: "75%", textColor: "text-success" },
  "very-strong": { label: "Very strong", color: "bg-emerald-600", width: "100%", textColor: "text-emerald-600" },
}

function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password)
  const config = strengthConfig[strength]
  if (strength === "none") return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="mt-2 space-y-1"
    >
      <div className="flex gap-1 h-1.5">
        {["weak", "medium", "strong", "very-strong"].map((level) => (
          <div
            key={level}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              level === "weak" && (strength === "weak" || strength === "medium" || strength === "strong" || strength === "very-strong") && "bg-danger",
              level === "medium" && (strength === "medium" || strength === "strong" || strength === "very-strong") && "bg-warning",
              level === "strong" && (strength === "strong" || strength === "very-strong") && "bg-success",
              level === "very-strong" && strength === "very-strong" && "bg-emerald-600",
              (level === "weak" && strength !== "weak" && strength !== "medium" && strength !== "strong" && strength !== "very-strong") && "bg-muted",
              (level === "medium" && strength !== "medium" && strength !== "strong" && strength !== "very-strong") && "bg-muted",
              (level === "strong" && strength !== "strong" && strength !== "very-strong") && "bg-muted",
              (level === "very-strong" && strength !== "very-strong") && "bg-muted"
            )}
          />
        ))}
      </div>
      <p className={cn("text-[11px] font-medium", config.textColor)}>
        {config.label}
      </p>
    </motion.div>
  )
}

function SmartInput({
  className,
  type = "text",
  state = "idle",
  label,
  helperText,
  errorMessage,
  successMessage,
  showCharacterCount,
  maxLength,
  currentLength,
  readOnly,
  disabled,
  passwordToggle,
  onPasswordToggle,
  showPassword,
  animatedLabel = true,
  validation,
  validateFn,
  onFocus,
  onBlur,
  value,
  onChange,
  defaultValue,
  asTextarea,
  textareaRows = 3,
  showPasswordStrength,
  ...props
}: SmartInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)
  const [internalState, setInternalState] = React.useState<InputState>(state)
  const [internalError, setInternalError] = React.useState<string | undefined>(errorMessage)
  const [passwordValue, setPasswordValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => { setInternalState(state) }, [state])
  React.useEffect(() => { setInternalError(errorMessage) }, [errorMessage])
  React.useEffect(() => {
    const v = (typeof value === "string" ? value : typeof defaultValue === "string" ? defaultValue : "") || ""
    setHasValue(v.length > 0)
  }, [value, defaultValue])

  // Auto-resize textarea
  const autoResizeTextarea = React.useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = textarea.scrollHeight + "px"
    }
  }, [])

  React.useEffect(() => {
    if (asTextarea) {
      autoResizeTextarea()
    }
  }, [asTextarea, autoResizeTextarea, value])

  const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true)
    onFocus?.(e as unknown as React.FocusEvent<HTMLInputElement>)
  }, [onFocus])

  const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false)
    const val = (e.target as HTMLInputElement | HTMLTextAreaElement).value
    setHasValue(val.length > 0)
    if (validation === "onBlur" && validateFn && val.length > 0) {
      const err = validateFn(val)
      if (err) { setInternalState("error"); setInternalError(err) }
      else { setInternalState("success"); setInternalError(undefined) }
    }
    onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>)
  }, [onBlur, validation, validateFn])

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setHasValue(val.length > 0)
    if (type === "password") setPasswordValue(val)
    if (internalState === "error" && val.length > 0) { setInternalState("idle"); setInternalError(undefined) }
    if (validation === "onChange" && validateFn) {
      if (val.length > 0) {
        const err = validateFn(val)
        if (err) { setInternalState("error"); setInternalError(err) }
        else { setInternalState("success"); setInternalError(undefined) }
      } else { setInternalState("idle"); setInternalError(undefined) }
    }
    onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>)
  }, [onChange, validation, validateFn, internalState, type])

  const hasError = internalState === "error"
  const hasSuccess = internalState === "success"
  const isLoading = internalState === "loading"
  const showFloating = animatedLabel && (isFocused || hasValue)

  const stateIcon = React.useMemo(() => {
    if (isLoading) return <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden="true" />
    if (hasError) return <XCircle className="size-4 text-danger" aria-hidden="true" />
    if (hasSuccess) return <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
    return null
  }, [isLoading, hasError, hasSuccess])

  const inputType = passwordToggle && type === "password" ? (showPassword ? "text" : "password") : type

  const shouldShowStateIcon = hasError || hasSuccess || isLoading
  const shouldShowPasswordToggle = passwordToggle && type === "password" && !isLoading && !hasError && !hasSuccess

  const commonLabel = label && (
    <AnimatePresence>
      <motion.label
        initial={false}
        animate={showFloating ? { top: 0, fontSize: "12px", y: 0, scale: 0.85, opacity: 1 } : { top: "50%", fontSize: "14px", y: "-50%", scale: 1, opacity: 0.7 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={() => { inputRef.current?.focus(); textareaRef.current?.focus() }}
        className={cn(
          "absolute left-4 pointer-events-none origin-left z-[1] text-muted-foreground",
          showFloating && "text-primary font-medium",
          hasError && "text-danger"
        )}
        style={{ top: showFloating ? "0px" : "50%", transform: showFloating ? "translateY(-50%)" : "translateY(-50%)" }}
      >
        {label}
      </motion.label>
    </AnimatePresence>
  )

  const commonPadding = animatedLabel ? "pt-5 pb-1.5" : ""
  const inputRightPadding = (shouldShowStateIcon || shouldShowPasswordToggle) ? "pr-10" : ""

  return (
    <div className="w-full">
      <div className="relative">
        {commonLabel}

        {/* Textarea mode */}
        {asTextarea ? (
          <textarea
            ref={textareaRef}
            rows={textareaRows}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            onFocus={handleFocus as React.FocusEventHandler<HTMLTextAreaElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            data-slot="input"
            data-state={internalState}
            className={cn(
              "w-full min-w-0 rounded-xl border-2 bg-white/50 px-4 py-2.5 text-base transition-all duration-300 ease-out outline-none",
              "hover:border-foreground/20 hover:bg-white/80",
              "focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgba(91,108,255,0.15)]",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
              "aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20",
              "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
              animatedLabel && "pt-5 pb-1.5",
              "resize-none overflow-hidden",
              state === "success" && "border-success focus-visible:border-success focus-visible:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
              state === "error" && "border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
              className
            )}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? "input-error" : helperText ? "input-helper" : undefined}
          />
        ) : (
          <InputPrimitive
            ref={inputRef}
            type={inputType}
            data-slot="input"
            data-state={internalState}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "h-11 w-full min-w-0 rounded-xl border-2 bg-white/50 px-4 py-2.5 text-base transition-all duration-300 ease-out outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70",
              "hover:border-foreground/20 hover:bg-white/80",
              "focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgba(91,108,255,0.15)]",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
              "aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20",
              "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
              commonPadding,
              inputRightPadding,
              state === "success" && "border-success focus-visible:border-success focus-visible:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
              state === "error" && "border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
              className
            )}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? "input-error" : helperText ? "input-helper" : undefined}
            {...props}
          />
        )}

        {/* State Icon */}
        {shouldShowStateIcon && !asTextarea && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{stateIcon}</div>
        )}

        {/* Password Toggle */}
        {shouldShowPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}

        {/* Focus ring animation */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl ring-2 ring-primary/20 pointer-events-none"
          />
        )}
      </div>

      {/* Password Strength Meter */}
      {showPasswordStrength && type === "password" && (
        <PasswordStrengthMeter password={passwordValue || (typeof value === "string" ? value : "")} />
      )}

      {/* Helper text row */}
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AnimatePresence>
            {hasSuccess && successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-success font-medium flex items-center gap-1"
                role="status"
              >
                <CheckCircle2 className="size-3" aria-hidden="true" />
                {successMessage}
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {hasError && internalError && (
              <motion.p
                id="input-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-danger font-medium flex items-center gap-1"
                role="alert"
              >
                <AlertCircle className="size-3" aria-hidden="true" />
                {internalError}
              </motion.p>
            )}
          </AnimatePresence>
          {helperText && !hasError && !hasSuccess && (
            <motion.p
              id="input-helper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground"
            >
              {helperText}
            </motion.p>
          )}
        </div>
        {showCharacterCount && maxLength && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "text-xs tabular-nums transition-colors duration-200",
              (currentLength || 0) > maxLength * 0.9 ? "text-danger font-medium" : (currentLength || 0) > maxLength * 0.75 ? "text-warning" : "text-muted-foreground"
            )}
          >
            {(currentLength || 0)}/{maxLength}
          </motion.span>
        )}
      </div>
    </div>
  )
}

export { SmartInput }
export type { SmartInputProps, InputState }

