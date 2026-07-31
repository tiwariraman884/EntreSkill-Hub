"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface Logo {
  name: string
  src: string
  href: string
}

const logos: Logo[] = [
  { name: "Google", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", href: "https://google.com" },
  { name: "Microsoft", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoft/microsoft-original.svg", href: "https://microsoft.com" },
  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazon/amazon-original.svg", href: "https://aws.amazon.com" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", href: "https://github.com" },
  { name: "OpenAI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg", href: "https://openai.com" },
  { name: "Stripe", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg", href: "https://stripe.com" },
  { name: "Vercel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", href: "https://vercel.com" },
  { name: "Meta", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meta/meta-original.svg", href: "https://meta.com" },
]

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <motion.a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.1 }}
      className="group relative flex items-center justify-center shrink-0"
      aria-label={`${logo.name} - trusted partner`}
    >
      <div className="h-8 w-24 md:h-10 md:w-28 opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
        <Image src={logo.src} alt={logo.name} width={96} height={40} sizes="(max-width: 768px) 96px, 112px" className="h-full w-full object-contain" />
      </div>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-border rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {logo.name}
      </div>
    </motion.a>
  )
}

export function CompanyLogos({ className }: { className?: string }) {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [duplicateCount, setDuplicateCount] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth
        const itemWidth = 150
        const needed = Math.ceil(containerWidth / (itemWidth * logos.length)) + 1
        setDuplicateCount(Math.max(needed, 1))
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <p className="text-center text-sm text-muted-foreground mb-6 font-medium">
        Trusted by teams at leading companies
      </p>
      <div
        className="relative"
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex items-center gap-8 md:gap-12 w-max"
          animate={isPaused ? {} : { x: [0, -(logos.length * (150 + 48))] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {Array.from({ length: duplicateCount + 1 }).map((_, groupIdx) =>
            logos.map((logo, logoIdx) => (
              <LogoItem key={`${groupIdx}-${logoIdx}`} logo={logo} />
            ))
          )}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}

export { logos }