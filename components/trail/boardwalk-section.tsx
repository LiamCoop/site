"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface BoardwalkSectionProps {
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
  reverse?: boolean
}

export function BoardwalkSection({ imageSrc, imageAlt, children, reverse = false }: BoardwalkSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="parallax-section relative min-h-[70vh] w-full bg-background">
      {/* Background with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: mounted ? `translateY(${(scrollY - 600) * 0.15}px)` : "none",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          quality={85}
        />
        <div className={`absolute inset-0 ${reverse
          ? "bg-gradient-to-l from-background/95 via-background/70 to-background/30"
          : "bg-gradient-to-r from-background/95 via-background/70 to-background/30"
        }`} />
      </div>

      {/* Boardwalk plank lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-wood/10"
            style={{ top: `${12 + i * 12}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 flex min-h-[70vh] items-center ${reverse ? "justify-end" : "justify-start"}`}>
        <div className={`w-full max-w-2xl px-6 py-20 ${reverse ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}>
          {children}
        </div>
      </div>
    </section>
  )
}
