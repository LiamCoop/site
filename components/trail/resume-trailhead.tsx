"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ArrowRight } from "lucide-react"
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
      className={`mx-auto max-w-3xl px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Large trail sign structure */}
      <div className="relative">
        {/* Supporting posts */}
        <div className="absolute -bottom-8 left-[20%] h-8 w-3 bg-gradient-to-b from-wood to-wood-dark rounded-b" />
        <div className="absolute -bottom-8 right-[20%] h-8 w-3 bg-gradient-to-b from-wood to-wood-dark rounded-b" />

        {/* Main sign board */}
        <Link href="/resume" className="group block">
          <div className="relative overflow-hidden rounded-xl border-4 border-wood bg-card wood-texture transition-all duration-500 group-hover:border-accent group-hover:shadow-2xl group-hover:shadow-accent/15">
            {/* Top decoration - trail blaze */}
            <div className="flex items-center justify-center gap-2 border-b border-wood/30 bg-wood-dark/30 px-6 py-3">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-xs tracking-[0.3em] uppercase text-wood-light">Trailhead Information</span>
              <MapPin className="h-4 w-4 text-accent" />
            </div>

            <div className="p-8 md:p-12 text-center">
              {/* Trail register title */}
              <h3 className="mb-3 text-3xl font-bold text-sunlight md:text-4xl lg:text-5xl">
                Trail Register
              </h3>
              <p className="mb-2 text-lg text-accent font-medium italic">
                The Journey So Far
              </p>
              <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-wood-light to-transparent" />
              <p className="mx-auto max-w-md text-muted-foreground leading-relaxed mb-8">
                Every trail has a logbook. Here's mine — the paths I've walked, the skills I've gathered, and the milestones along the way.
              </p>

              {/* Trail stats */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-canopy/20 p-4">
                  <div className="text-2xl font-bold text-sunlight">5+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Years on Trail</div>
                </div>
                <div className="rounded-lg bg-canopy/20 p-4">
                  <div className="text-2xl font-bold text-sunlight">20+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Projects Mapped</div>
                </div>
                <div className="rounded-lg bg-canopy/20 p-4">
                  <div className="text-2xl font-bold text-sunlight">10+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Tools Mastered</div>
                </div>
              </div>

              {/* CTA */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 px-6 py-3 text-accent font-medium transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <span>Read the Full Register</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Bottom nails */}
            <div className="absolute bottom-3 left-4 h-2 w-2 rounded-full bg-wood-light/30" />
            <div className="absolute bottom-3 right-4 h-2 w-2 rounded-full bg-wood-light/30" />
          </div>
        </Link>
      </div>
    </div>
  )
}
