import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-[0.95rem] font-semibold leading-none whitespace-nowrap transition-all duration-300 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] active:shadow-md active:translate-y-0",
        outline:
          "border-2 border-primary/30 bg-background text-primary hover:bg-primary/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 dark:border-border/60 dark:bg-card dark:text-foreground dark:hover:bg-muted/70 active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary-light text-white shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:translate-y-[-2px] active:shadow-md active:translate-y-0",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        glass:
          "bg-white/70 backdrop-blur-xl border border-white/20 text-foreground shadow-lg hover:bg-white/80 hover:shadow-xl hover:border-white/30 active:scale-[0.98] dark:bg-ink/10 dark:border-white/10 dark:text-white dark:hover:bg-ink/20",
        destructive:
          "bg-gradient-to-r from-danger to-danger-light text-white shadow-lg shadow-danger/20 hover:shadow-xl hover:shadow-danger/30 hover:translate-y-[-2px] active:shadow-md active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 text-[0.95rem]",
        xl: "h-14 gap-2.5 px-8 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6 text-[1rem]",
        icon: "size-10",
        "icon-xs":
          "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
