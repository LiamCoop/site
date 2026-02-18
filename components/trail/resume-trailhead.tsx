"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ResumeTrailhead() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-xl px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group block">
        <div className="relative overflow-hidden rounded-xl border-2 border-wood bg-card wood-texture transition-all duration-300 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10">
          {/* Nail details */}
          <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-wood-light/40" />
          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-wood-light/40" />

          <div className="p-8 md:p-10 text-center">
            <h3 className="mb-4 text-2xl font-bold text-sunlight md:text-3xl group-hover:text-accent transition-colors duration-300">
              View My Resume
            </h3>
            <div className="inline-flex items-center gap-2 text-accent font-medium transition-all duration-300">
              <span>Read the full register</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Bottom nails */}
          <div className="absolute bottom-3 left-4 h-2 w-2 rounded-full bg-wood-light/30" />
          <div className="absolute bottom-3 right-4 h-2 w-2 rounded-full bg-wood-light/30" />
        </div>
      </Link>
    </div>
  )
}
