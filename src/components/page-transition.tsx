"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const transitionVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const transitionConfig = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1] as const,
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [key, setKey] = useState(pathname + searchParams.toString());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const newKey = pathname + searchParams.toString();
    if (newKey !== key) {
      requestAnimationFrame(() => {
        setKey(newKey);
      });
    }
  }, [pathname, searchParams, key]);

  const variants = prefersReducedMotion ? reducedMotionVariants : transitionVariants;
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : transitionConfig;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={transition}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** 
 * Shared layout animation wrapper for elements that should persist across route changes
 * Use this to wrap Navbar, Sidebar, or persistent cards
 */
export function SharedLayout({
  children,
  layoutId,
  className,
}: {
  children: React.ReactNode;
  layoutId: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={layoutId}
      layout={!prefersReducedMotion}
      transition={prefersReducedMotion ? { duration: 0.01 } : {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated card wrapper for shared element transitions
 */
export function AnimatedCard({
  children,
  layoutId,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  layoutId?: string;
  className?: string;
  index?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={layoutId}
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.04,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated modal/dialog overlay transition
 */
export function ModalTransition({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated drawer (slide-in panel) transition
 */
export function DrawerTransition({
  children,
  isOpen,
  side = "right",
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  side?: "left" | "right";
  onCloseActionAction?: () => void;
}) {
  const x = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x }}
            animate={{ x: 0 }}
            exit={{ x }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 z-50 w-full max-w-md bg-background shadow-2xl"
            style={{ [side]: 0 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Loading skeleton transition for route changes
 */
export function RouteLoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-6 p-8"
      aria-hidden="true"
    >
      <div className="h-8 w-48 rounded-xl bg-muted animate-pulse" />
      <div className="h-4 w-72 rounded-lg bg-muted/70 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted/50 animate-pulse" />
        ))}
      </div>
      <div className="h-64 rounded-2xl bg-muted/30 animate-pulse" />
    </motion.div>
  );
}

