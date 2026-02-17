"use client"

import { useEffect, useRef, useState } from "react"

export function TrailPath() {
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [drawLength, setDrawLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!svgRef.current || !pathLength) return
      const rect = svgRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (rect.height + windowHeight)
      ))
      setDrawLength(scrollProgress * pathLength)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathLength])

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Trail background - dashed */}
        <path
          d="M50,0 Q30,100 60,200 Q80,300 40,400 Q20,500 70,600 Q90,700 35,800 Q15,900 50,1000"
          stroke="var(--trail)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          opacity="0.3"
        />
        {/* Trail progress - drawn on scroll */}
        <path
          ref={pathRef}
          d="M50,0 Q30,100 60,200 Q80,300 40,400 Q20,500 70,600 Q90,700 35,800 Q15,900 50,1000"
          stroke="var(--accent)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - drawLength}
          opacity="0.6"
        />
        {/* Trail dots/markers */}
        {[200, 400, 600, 800].map((y, i) => (
          <circle
            key={i}
            cx={[60, 40, 70, 35][i]}
            cy={y}
            r="2"
            fill="var(--accent)"
            opacity={drawLength > (pathLength * (y / 1000)) ? 0.8 : 0.1}
            className="transition-opacity duration-500"
          />
        ))}
      </svg>
    </div>
  )
}
