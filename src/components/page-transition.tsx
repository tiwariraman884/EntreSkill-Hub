"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── CSS-only Page Transition ─────────────────────────────────────────────────
// Uses only opacity + transform — fully composited, zero JS animation overhead.
// framer-motion is NO LONGER imported here. It's lazy-loaded only where needed.

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip animation on first mount (SSR content already visible)
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Reset: invisible + offset
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";

    // Trigger next frame so browser registers the reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.18s ease-out, transform 0.18s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });

    return () => {
      el.style.transition = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams.toString()]);

  return (
    <div ref={ref} className="w-full" style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

// ─── Lazy-loadable framer-motion components ───────────────────────────────────
// These are NOT imported here — consumers import them directly from framer-motion
// via dynamic() or at route level so they never land in the shared layout bundle.

/**
 * Animated card: use only inside Client Components that already have framer-motion.
 * Do NOT import this into layout.tsx.
 */
export function AnimatedCard({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  layoutId?: string;
  className?: string;
  index?: number;
}) {
  // Pure CSS staggered fade-in; no framer-motion dependency.
  return (
    <div
      className={className}
      style={{
        animation: `fadeInUp 0.4s ease-out both`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * SharedLayout: CSS transition wrapper (no framer-motion).
 */
export function SharedLayout({
  children,
  className,
}: {
  children: ReactNode;
  layoutId?: string;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * ModalTransition: pure CSS-based modal overlay.
 * Uses data-state for animation triggers — fully composited.
 */
export function ModalTransition({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        transition: "opacity 0.2s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        style={{
          transition: "opacity 0.2s ease, transform 0.2s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * DrawerTransition: pure CSS slide-in panel.
 * Uses transform only — fully GPU-composited.
 */
export function DrawerTransition({
  children,
  isOpen,
  side = "right",
  onCloseAction,
}: {
  children: ReactNode;
  isOpen: boolean;
  side?: "left" | "right";
  onCloseAction?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const translateX = side === "right" ? "100%" : "-100%";

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        style={{
          transition: "opacity 0.2s ease",
          opacity: visible ? 1 : 0,
        }}
        onClick={onCloseAction}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className="fixed inset-y-0 z-50 w-full max-w-md bg-background shadow-2xl"
        style={{
          [side]: 0,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: visible ? "translateX(0)" : `translateX(${translateX})`,
        }}
      >
        {children}
      </div>
    </>
  );
}

/**
 * RouteLoadingSkeleton — static skeleton, no animation overhead.
 */
export function RouteLoadingSkeleton() {
  return (
    <div className="space-y-6 p-8" aria-hidden="true">
      <div className="h-8 w-48 rounded-xl bg-muted animate-pulse" />
      <div className="h-4 w-72 rounded-lg bg-muted/70 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted/50 animate-pulse" />
        ))}
      </div>
      <div className="h-64 rounded-2xl bg-muted/30 animate-pulse" />
    </div>
  );
}
