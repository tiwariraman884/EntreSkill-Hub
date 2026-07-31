import { cn } from "@/lib/utils";

// Inline style for shimmer — avoids Tailwind v4 unknown-utility-class error
const shimmerStyle: React.CSSProperties = {
  animation: "shimmer 1.8s ease-in-out infinite",
  background: "linear-gradient(90deg, #e6dfcc 25%, rgba(255,255,255,0.7) 50%, #e6dfcc 75%)",
  backgroundSize: "200% 100%",
  borderRadius: "0.5rem",
};

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("rounded-lg", className)} style={shimmerStyle} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/40 bg-white overflow-hidden shadow-sm", className)}>
      <Shimmer className="h-48 w-full rounded-none!" />
      <div className="p-5 space-y-3">
        <Shimmer className="h-5 w-3/4" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Shimmer className="h-7 w-20 rounded-full" />
          <Shimmer className="h-7 w-24 rounded-full" />
        </div>
        <Shimmer className="h-10 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/40 bg-white p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Shimmer className="h-3.5 w-28" />
          <Shimmer className="h-10 w-16" />
        </div>
        <Shimmer className="h-12 w-12 rounded-xl" />
      </div>
      <Shimmer className="h-2 w-full rounded-full" />
    </div>
  );
}

export function SkeletonAvatar({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeMap = { sm: "h-10 w-10", default: "h-16 w-16", lg: "h-24 w-24" };
  return <Shimmer className={cn("rounded-full", sizeMap[size])} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonLearningCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/40 bg-white overflow-hidden shadow-sm", className)}>
      <Shimmer className="h-44 w-full rounded-none!" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Shimmer className="h-3.5 w-24 rounded-full" />
          <Shimmer className="h-3.5 w-12 rounded-full" />
        </div>
        <Shimmer className="h-5 w-full" />
        <Shimmer className="h-4 w-4/5" />
        <div className="flex gap-2 pt-1">
          <Shimmer className="h-5 w-14 rounded-full" />
          <Shimmer className="h-5 w-16 rounded-full" />
          <Shimmer className="h-5 w-12 rounded-full" />
        </div>
        <Shimmer className="h-1.5 w-full rounded-full" />
        <div className="flex justify-between items-center pt-1">
          <Shimmer className="h-8 w-24 rounded-lg" />
          <Shimmer className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
