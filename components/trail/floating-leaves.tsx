"use client"

import { useEffect, useState } from "react"

interface Leaf {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  rotation: number
}

export function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    setLeaves(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        rotation: Math.random() * 360,
      }))
    )
  }, [])

  if (leaves.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf-float absolute opacity-0"
          style={{
            left: `${leaf.x}%`,
            top: `${20 + leaf.id * 15}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            style={{ transform: `rotate(${leaf.rotation}deg)` }}
          >
            <path
              d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
              fill="var(--moss)"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
