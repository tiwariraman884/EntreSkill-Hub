"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3" role="list">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-border/40 hover:border-indigo/30 transition-all duration-300 overflow-hidden"
          role="listitem"
        >
          <h3>
            <button
              className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-inset rounded-2xl"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span className="text-base pr-4">{item.q}</span>
              {openIdx === i ? (
                <Minus className="size-5 text-indigo shrink-0" aria-hidden="true" />
              ) : (
                <Plus className="size-5 text-thread shrink-0" aria-hidden="true" />
              )}
            </button>
          </h3>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            hidden={openIdx !== i}
            className={cn(
              "px-6 overflow-hidden transition-all duration-300 ease-out",
              openIdx === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-thread leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
