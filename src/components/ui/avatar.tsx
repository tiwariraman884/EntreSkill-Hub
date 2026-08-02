"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg" | "xl"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-10 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border-2 after:border-indigo/10 after:transition-all duration-300 group-hover:after:border-indigo/30 group-hover:after:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] data-[size=lg]:size-12 data-[size=sm]:size-8 data-[size=xl]:size-16 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover ring-2 ring-white shadow-lg transition-all duration-300 group-hover:ring-4 group-hover:ring-indigo/20",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-linear-to-br from-indigo/10 to-indigo/20 text-sm font-semibold text-indigo ring-2 ring-white shadow-md group-data-[size=sm]/avatar:text-xs group-data-[size=lg]/avatar:text-base group-data-[size=xl]/avatar:text-lg",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 text-white ring-3 ring-white shadow-lg",
        "group-data-[size=sm]/avatar:size-2.5 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:[&>svg]:size-2.5",
        "group-data-[size=lg]/avatar:size-4 group-data-[size=lg]/avatar:[&>svg]:size-3",
        "group-data-[size=xl]/avatar:size-5 group-data-[size=xl]/avatar:[&>svg]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-3 *:data-[slot=avatar]:ring-3 *:data-[slot=avatar]:ring-white *:data-[slot=avatar]:hover:z-10 *:data-[slot=avatar]:hover:scale-110 *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo to-indigo-light text-sm font-semibold text-white ring-3 ring-white shadow-md group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-8 group-has-data-[size=xl]/avatar-group:size-16",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
