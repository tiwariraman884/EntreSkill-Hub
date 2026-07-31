"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="flex flex-col items-end gap-2"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
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
            </motion.div>
          ))}
        </motion.div>
      )}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-14 w-14 bg-gradient-to-r from-primary to-primary-light"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="size-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}

export { defaultActions };
