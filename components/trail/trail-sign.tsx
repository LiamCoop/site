"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface TrailSignProps {
  title: string
  description: string
  href: string
  direction: "left" | "right"
  icon: React.ReactNode
  delay?: number
}

export function TrailSign({ title, description, href, direction, icon, delay = 0 }: TrailSignProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 md:gap-10 ${
        direction === "right" ? "flex-row" : "flex-row-reverse"
      } ${direction === "right" ? "md:pl-12 lg:pl-24" : "md:pr-12 lg:pr-24"}`}
    >
      {/* Wooden post */}
      <div className="hidden md:flex flex-col items-center">
        <div className="h-4 w-4 rounded-full bg-wood-light border-2 border-wood" />
        <div className="h-24 w-1.5 bg-gradient-to-b from-wood-light to-wood-dark" />
      </div>

      {/* Sign board */}
      <Link
        href={href}
        className={`group block w-full max-w-xl transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : direction === "right"
              ? "opacity-0 -translate-x-12"
              : "opacity-0 translate-x-12"
        }`}
      >
        <div className="sway relative overflow-hidden rounded-lg border-2 border-wood bg-card p-6 md:p-8 wood-texture transition-all duration-300 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10">
          {/* Nail details */}
          <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-wood-light/40" />
          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-wood-light/40" />

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 rounded-lg bg-moss/20 p-3 text-moss-light group-hover:bg-accent/20 group-hover:text-accent transition-colors duration-300">
              {icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-sunlight group-hover:text-accent transition-colors duration-300 md:text-2xl">
                  {title}
                </h3>
                <ArrowRight className={`h-4 w-4 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 ${direction === "left" ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </div>
              <p className="text-mist/90 leading-relaxed text-sm md:text-base text-shadow-body">
                {description}
              </p>
            </div>
          </div>

          {/* Distance marker */}
          <div className={`mt-4 flex items-center gap-2 text-xs tracking-widest uppercase text-wood-light/60 ${direction === "right" ? "" : "justify-end"}`}>
            <span className="inline-block h-px w-8 bg-wood-light/30" />
            <span>Follow the path</span>
            <span className="inline-block h-px w-8 bg-wood-light/30" />
          </div>
        </div>
      </Link>
    </div>
  )
}
