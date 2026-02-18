"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mountain, Map } from "lucide-react"
import Image from "next/image"

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
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Full-width mountain backdrop */}
      <div className="relative min-h-[85vh] overflow-hidden rounded-2xl border border-wood/20">
        {/* Mountain image */}
        <Image
          src="/images/mountain-summit.jpg"
          alt="Mountain summit vista at golden hour"
          fill
          className="object-cover"
          priority
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_40px_rgba(0,0,0,0.5)]" />

        {/* Mountain peak label — top */}
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <Mountain className="h-4 w-4 text-sunlight/70" />
          <span className="text-xs tracking-[0.4em] uppercase text-sunlight/60 font-medium">
            Summit Overlook
          </span>
          <Mountain className="h-4 w-4 text-sunlight/70" />
        </div>

        {/* The wooden trail sign — center piece */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            className={`relative w-full max-w-xl transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {/* Sign posts */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-32" aria-hidden="true">
              <div className="h-20 w-4 rounded-b bg-gradient-to-b from-wood to-wood-dark shadow-lg" />
              <div className="h-20 w-4 rounded-b bg-gradient-to-b from-wood to-wood-dark shadow-lg" />
            </div>

            {/* Main sign */}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative w-full max-w-xl overflow-hidden rounded-lg border-[6px] border-wood shadow-2xl shadow-background/80 bg-gradient-to-br from-wood/95 to-wood-dark/95 backdrop-blur-md wood-texture">
                {/* Top bar with nails */}
                <div className="relative flex items-center justify-center gap-3 border-b-2 border-wood-dark/40 bg-wood-dark/30 px-6 py-3">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-wood-light/30 shadow-inner" />
                  <Map className="h-4 w-4 text-sunlight/80" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-sunlight/70 font-semibold">
                    Trailhead Register
                  </span>
                  <Map className="h-4 w-4 text-sunlight/80" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-wood-light/30 shadow-inner" />
                </div>

                {/* Sign content */}
                <div className="relative px-8 py-10 md:px-12 md:py-12 text-center">
                  {/* Carved-in title effect */}
                  <h3 className="mb-2 text-4xl font-bold text-sunlight md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    Resume
                  </h3>
                  <p className="text-base text-sunlight/70 italic mb-6">
                    The Journey So Far
                  </p>

                  {/* CTA Button — like a trail blaze */}
                  <div className="inline-flex items-center gap-2.5 rounded-md bg-accent/15 border-2 border-accent/40 px-7 py-3.5 text-accent font-semibold transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/20">
                    <span>Open Resume</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom nails */}
                <div className="absolute bottom-3 left-4 h-2 w-2 rounded-full bg-wood-light/20 shadow-inner" />
                <div className="absolute bottom-3 right-4 h-2 w-2 rounded-full bg-wood-light/20 shadow-inner" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-wood-light/20 shadow-inner" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom mountain silhouette overlay for transition out */}
        <div className="absolute bottom-0 inset-x-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 120V80L120 50L240 70L360 30L480 55L600 20L720 45L840 15L960 40L1080 25L1200 50L1320 35L1440 60V120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

