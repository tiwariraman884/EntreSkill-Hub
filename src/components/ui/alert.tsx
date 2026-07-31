"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react"

const alertVariants = cva(
  "relative grid w-full gap-1 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border/60",
        destructive:
          "bg-danger/5 text-danger-foreground border-danger/20 dark:bg-danger/10",
        success:
          "bg-success/5 text-success-foreground border-success/20 dark:bg-success/10",
        warning:
          "bg-warning/5 text-warning-foreground border-warning/20 dark:bg-warning/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const icons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
}

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const Icon = icons[variant || "default"]

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
      {props.children}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

function AlertClose({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="Dismiss alert"
      className={cn(
        "absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
        className
      )}
      {...props}
    >
      <X className="size-3.5" aria-hidden="true" />
    </button>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, AlertClose, alertVariants }
