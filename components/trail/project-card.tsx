"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  subtitle: string
  bullets: string[]
  tech: string[]
  direction?: "left" | "right"
  delay?: number
  href?: string
}

export function ProjectCard({
  title,
  subtitle,
  bullets,
  tech,
  direction = "right",
  delay = 0,
  href,
}: ProjectCardProps) {
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
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`flex items-start gap-6 md:gap-10 ${
        direction === "right" ? "flex-row" : "flex-row-reverse"
      } ${direction === "right" ? "md:pl-12 lg:pl-24" : "md:pr-12 lg:pr-24"}`}
    >
      {/* Wooden post */}
      <div className="hidden md:flex flex-col items-center pt-6">
        <div className="h-4 w-4 rounded-full bg-wood-light border-2 border-wood" />
        <div className="h-full min-h-32 w-1.5 bg-gradient-to-b from-wood-light to-wood-dark" />
      </div>

      {/* Card */}
      <div
        className={`sway w-full max-w-xl transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : direction === "right"
              ? "opacity-0 -translate-x-12"
              : "opacity-0 translate-x-12"
        }`}
      >
        <Link
          href={href ?? "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          className={href ? "block group" : "block pointer-events-none"}
        >
        <div className="relative overflow-hidden rounded-lg border-2 border-wood bg-card p-6 md:p-8 wood-texture group-hover:border-wood-light transition-colors duration-200">
          {/* Nail details */}
          <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-wood-light/40" />
          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-wood-light/40" />

          {/* Title */}
          <h3 className="text-xl font-bold text-sunlight mb-1 md:text-2xl">{title}</h3>
          <p className="text-xs italic text-mist/60 mb-4">{subtitle}</p>

          {/* Bullets */}
          <ul className="space-y-2 mb-5">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-mist/90 leading-relaxed text-shadow-body">
                <span className="mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-accent/60" />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className={`flex flex-wrap gap-2 ${direction === "left" ? "justify-end" : ""}`}>
            {tech.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md border border-moss/40 bg-moss/10 px-2.5 py-0.5 text-xs font-medium text-moss-light tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}
