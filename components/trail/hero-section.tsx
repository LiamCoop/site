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

          <h1 className="mb-2 text-5xl font-bold tracking-tight text-sunlight md:text-7xl lg:text-8xl text-balance text-shadow-hero">
            Liam Cooper
          </h1>
          <p className="mx-auto max-w-lg text-xl font-medium text-mist md:text-2xl leading-relaxed text-shadow-body">
            Design for seasons, not sprints
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-sunlight px-6 py-2.5 text-base font-medium text-wood-dark transition-colors hover:bg-sunlight/80"
              >
                Resume
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-md bg-wood px-6 py-2.5 text-base font-medium text-mist transition-colors hover:bg-wood/80"
              >
                Blog
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-2">
        <span className="text-sm tracking-widest uppercase text-mist/90 text-shadow-body">Take the Scenic Route</span>
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
          d="M0,120 L0,88 C120,40 240,105 360,72 C480,38 600,100 720,65 C840,30 960,98 1080,68 C1200,38 1340,95 1440,78 L1440,120 Z"
        />
      </svg>
    </section>
  )
}
