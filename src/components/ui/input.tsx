import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border-2 border-input bg-background/70 px-4 py-2.5 text-base text-foreground transition-all duration-300 ease-out outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 hover:border-foreground/20 hover:bg-background focus-visible:border-primary focus-visible:bg-background focus-visible:shadow-[0_0_0_3px_rgba(91,108,255,0.15)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 md:text-sm dark:bg-input/30 dark:text-foreground dark:hover:bg-input/40 dark:focus-visible:bg-input/40 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
