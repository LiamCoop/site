"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full" aria-label="Welcome to the trail">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: mounted ? `translateY(${scrollY * 0.4}px)` : "none",
        }}
      >
        <Image
          src="/images/forest-canopy.jpg"
          alt="Sunlight filtering through a forest canopy"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/45 to-background" />
      </div>

      {/* Fog overlays */}
      <div className="fog absolute top-1/4 left-0 h-32 w-full bg-gradient-to-r from-transparent via-mist/10 to-transparent" />
      <div className="fog absolute top-2/3 left-0 h-24 w-full bg-gradient-to-r from-transparent via-mist/8 to-transparent" style={{ animationDelay: "7s" }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className="animate-fade-up"
          style={{
            opacity: mounted ? Math.max(0, 1 - scrollY / 400) : 1,
            transform: mounted ? `translateY(${scrollY * 0.15}px)` : "none",
          }}
        >
          {/* Trail blaze marks */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="inline-block h-3 w-3 rounded-sm bg-accent/60" />
            <span className="inline-block h-3 w-3 rounded-sm bg-accent/80" />
            <span className="inline-block h-3 w-3 rounded-sm bg-accent" />
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-sunlight md:text-7xl lg:text-8xl text-balance text-shadow-hero">
            Into the Woods
          </h1>
          <p className="mx-auto max-w-lg text-lg text-mist md:text-xl leading-relaxed text-shadow-body">
            Step off the beaten path. Wander through my work, my words, and the trails I've traveled.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-base font-semibold text-mist/90 italic text-shadow-strong">Don't feel like wandering?</span>
            <Link
              href="/resume"
              className="inline-flex items-center rounded-md bg-sunlight px-4 py-1.5 text-sm font-medium text-wood-dark transition-colors hover:bg-sunlight/80"
            >
              Resume
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md bg-wood px-4 py-1.5 text-sm font-medium text-mist transition-colors hover:bg-wood/80"
            >
              Blog
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-2">
        <span className="text-sm tracking-widest uppercase text-mist/90 text-shadow-body">Take the scenic route</span>
        <ChevronDown className="h-5 w-5 text-mist/90 animate-bounce" />
      </div>

      {/* Bottom tree line silhouette */}
      <svg
        className="absolute -bottom-[2px] left-0 w-full text-background"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,120 L0,80 Q60,40 120,70 Q180,95 240,60 Q300,25 360,55 Q420,85 480,45 Q540,15 600,50 Q660,80 720,40 Q780,10 840,55 Q900,90 960,50 Q1020,20 1080,60 Q1140,90 1200,55 Q1260,30 1320,65 Q1380,95 1440,70 L1440,120 Z"
        />
      </svg>
    </section>
  )
}
