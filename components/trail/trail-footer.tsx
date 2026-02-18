"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"

export function TrailFooter() {
  const ref = useRef<HTMLElement>(null)
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
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-wood/20"
    >
      {/* Forest floor background */}
      <div className="absolute inset-0">
        <Image
          src="/images/forest-floor.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className={`relative z-10 mx-auto max-w-4xl px-6 py-16 text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        {/* End of trail marker */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-wood-light/40" />
          <span className="text-xs tracking-[0.3em] uppercase text-wood-light/60">End of Trail</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-wood-light/40" />
        </div>

        <h2 className="mb-4 text-2xl font-bold text-sunlight md:text-3xl">
          Thanks for Wandering
        </h2>
        <p className="mx-auto mb-8 max-w-md text-mist/90 leading-relaxed text-shadow-body">
          The best trails are shared with good company. Let's connect and explore what we can build together.
        </p>

        {/* Social links as trail markers */}
        <nav className="mb-12 flex items-center justify-center gap-4" aria-label="Social links">
          {[
            { icon: Github, label: "GitHub", href: "http://github.com/liamcoop" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Mail, label: "Email", href: "mailto:liamcoop@outlook.com" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="group flex h-12 w-12 items-center justify-center rounded-lg border border-wood/30 bg-card/50 text-muted-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </nav>

        {/* Trail blaze bottom */}
        <div className="flex items-center justify-center gap-2 text-xs text-wood-light/40">
          <span className="inline-block h-2 w-2 rounded-sm bg-moss/30" />
          <span className="inline-block h-2 w-2 rounded-sm bg-accent/30" />
          <span className="inline-block h-2 w-2 rounded-sm bg-moss/30" />
        </div>
      </div>
    </footer>
  )
}
