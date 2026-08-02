import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-200 ease-out focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30",
        secondary:
          "bg-gradient-to-r from-warning to-warning-light text-ink shadow-sm shadow-warning/20 hover:shadow-md hover:shadow-warning/30 [a]:hover:opacity-90 dark:text-foreground",
        destructive:
          "bg-gradient-to-r from-danger to-danger-light text-white shadow-sm shadow-danger/20 hover:shadow-md hover:shadow-danger/30 focus-visible:ring-destructive/20 dark:bg-gradient-to-r dark:from-danger dark:to-danger-light dark:focus-visible:ring-destructive/40 [a]:hover:opacity-90",
        outline:
          "border-2 border-primary/30 bg-background text-primary hover:bg-primary/5 hover:border-primary/50 dark:border-border/60 dark:bg-card dark:text-foreground dark:hover:bg-muted/70",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
