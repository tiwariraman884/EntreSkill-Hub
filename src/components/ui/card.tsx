import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  hoverable = false,
  glow = false,
  ...props
}: React.ComponentProps<"div"> & { 
  size?: "default" | "sm" 
  hoverable?: boolean 
  glow?: boolean 
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-glow={glow}
      className={cn(
        "group/card relative flex flex-col gap-(--card-spacing) overflow-hidden rounded-2xl bg-card text-[0.96rem] leading-relaxed text-card-foreground ring-1 ring-foreground/5 shadow-sm transition-all duration-300 ease-out [--card-spacing:--spacing(6)] dark:ring-white/10 dark:shadow-premium has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
        hoverable && "hover:-translate-y-1 hover:shadow-premium-hover hover:ring-foreground/10 cursor-pointer",
        glow && "card-glow-primary",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-2xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-xl leading-snug font-semibold tracking-tight text-foreground dark:text-card-foreground group-data-[size=sm]/card:text-lg",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[0.95rem] text-thread leading-relaxed dark:text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing) flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-2xl border-t bg-muted/30 p-(--card-spacing) backdrop-blur-sm dark:border-border/60 dark:bg-muted/10",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
