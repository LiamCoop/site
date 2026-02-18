"use client"

import { useEffect, useRef, useState } from "react"
import { TreePine } from "lucide-react"

export function AboutSection() {
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
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <TreePine className="h-4 w-4 text-moss-light" />
        <span className="text-xs tracking-[0.3em] uppercase text-moss-light/70">The Trailhead</span>
      </div>

      <h2 className="mb-6 text-3xl font-bold text-sunlight md:text-4xl lg:text-5xl text-balance">
        Welcome, Traveler
      </h2>

      <div className="space-y-4 text-mist/90 leading-relaxed text-shadow-body">
        <p>
          I'm Liam — a software engineer from the West Coast who started out designing circuits and ended up building distributed systems. I love the craft of making things: clean code, elegant architecture, systems that hold up under pressure.
        </p>
        <p>
          This is my corner of the woods. A place to share the projects I've built, the things I've been learning, and the ideas I want to pass on. I care a lot about helping people grow — whether that's through mentoring, writing, or just building things worth studying.
        </p>
      </div>

      {/* Elevation profile decoration */}
      <div className="mt-8 flex items-end gap-1 opacity-40" aria-hidden="true">
        {[3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, 5, 4, 6, 7, 5, 3, 4, 6, 5].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t-sm bg-moss/50"
            style={{ height: `${h * 3}px` }}
          />
        ))}
      </div>
    </div>
  )
}
