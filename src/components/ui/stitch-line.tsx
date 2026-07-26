"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface StitchLineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: { label: string }[];
  currentStepIndex: number;
}

export function StitchLine({
  steps,
  currentStepIndex,
  className,
  ...props
}: StitchLineProps) {
  return (
    <div className={cn("w-full flex items-center justify-between py-6", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative z-10 shrink-0">
              {/* Node */}
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-400 ease-out",
                  isCompleted && "bg-primary border-primary",
                  isActive && "border-secondary",
                  isUpcoming && "bg-transparent border-muted-foreground"
                )}
                style={isActive ? { background: "linear-gradient(90deg, var(--color-marigold) 50%, transparent 50%)" } : undefined}
                aria-current={isActive ? "step" : undefined}
              />
              {/* Label */}
              <span className={cn(
                "text-xs font-medium absolute top-6 text-center w-24 -ml-[2.5rem]",
                isCompleted && "text-primary",
                isActive && "text-foreground font-bold",
                isUpcoming && "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
            
            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 relative flex items-center h-4">
                <div 
                  className={cn(
                    "w-full transition-all duration-400 ease-out",
                    index < currentStepIndex 
                      ? "h-[2px] bg-primary" 
                      : "border-b-[2px] border-dashed border-muted-foreground h-0"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
