"use client";

import { useState } from "react";
import { Plus, MessageSquare, Map, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FABAction {
  icon: React.ElementType;
  label: string;
  href: string;
  onClick?: () => void;
}

interface FABProps {
  actions?: FABAction[];
  className?: string;
}

const defaultActions: FABAction[] = [
  { icon: Lightbulb, label: "New Idea", href: "/ideas" },
  { icon: Map, label: "New Roadmap", href: "/roadmaps" },
  { icon: MessageSquare, label: "Quick Chat", href: "/mentors" },
];

export function FloatingActionButton({ actions = defaultActions, className }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", className)}>
      <div
        className={cn(
          "flex flex-col items-end gap-2 transition-all duration-200 origin-bottom",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center gap-3 transition-all duration-200"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              transform: isOpen ? "translateX(0)" : "translateX(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <span className="text-xs font-medium text-muted-foreground bg-card/90 backdrop-blur-xl px-3 py-1.5 rounded-lg shadow-lg border border-border/60">
              {action.label}
            </span>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={() => {
                action.onClick?.();
                setIsOpen(false);
              }}
              asChild
            >
              <a href={action.href}>
                <action.icon className="size-5" />
              </a>
            </Button>
          </div>
        ))}
      </div>
      <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
        <Button
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-14 w-14 bg-gradient-to-r from-primary to-primary-light"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <Plus
            className="size-6 transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          />
        </Button>
      </div>
    </div>
  );
}

export { defaultActions };
