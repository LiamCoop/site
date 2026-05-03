"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FolderGit2, BookOpen, Compass } from "lucide-react"
import { BoardwalkSection } from "./boardwalk-section"
import { TrailSign } from "./trail-sign"
import { TrailPath } from "./trail-path"
import { TrailFooter } from "./trail-footer"
import { AboutSection } from "./about-section"
import { ProjectCard } from "./project-card"
import { ResumeTrailhead } from "./resume-trailhead"

export function TrailContent() {
  return (
    <>
      {/* The trail journey */}
      <div className="relative">
        <TrailPath />

        {/* SECTION 1 — Into the forest: About */}
        <BoardwalkSection
          imageSrc="/images/boardwalk-path.jpg"
          imageAlt="A wooden boardwalk winding through a lush forest"
        >
          <AboutSection />
        </BoardwalkSection>

        {/* Trail divider */}
        <TrailDivider />

        {/* SECTION 2 — Projects */}
        <section className="relative py-24 md:py-40" aria-label="Projects trail">
          <div className="mx-auto max-w-5xl px-6 space-y-12">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-accent/70" />
                <span className="text-xs tracking-[0.3em] uppercase text-accent/70">Vista</span>
              </div>
              <Link href="/projects" className="group inline-block underline decoration-sunlight/40 underline-offset-4 hover:decoration-accent transition-all duration-200">
                <h2 className="text-3xl font-bold text-sunlight mb-4 md:text-4xl lg:text-5xl text-balance transition-colors duration-200 group-hover:text-accent">
                  Projects
                </h2>
              </Link>
              <p className="text-mist/90 leading-relaxed max-w-md text-shadow-body">
                Each project is a path I've explored — some winding, some steep, all worth the journey.
              </p>
            </div>
            <div className="space-y-8">
              <ProjectCard
                title="Rules Engine"
                subtitle="Evaluates complex user-defined schemas and rules"
                bullets={[
                  "Designed a stateless, horizontally scalable rule engine evaluating dynamic user-defined schemas via Common Expression Language",
                  "Achieved ~7k RPS per instance under sustained load (10-minute test, ~4M evaluations)",
                  "Identified and analyzed saturation behavior at tail latencies (p95 ~2.8s under peak load)",
                ]}
                tech={["Go", "PostgreSQL"]}
                direction="right"
                delay={0}
                href="https://github.com/liamcoop/rules"
              />
              <ProjectCard
                title="Collaborative Markdown Editor"
                subtitle="Real-time multiplayer markdown editor for teams"
                bullets={[
                  "Conflict-free real-time collaboration powered by Automerge CRDTs — edits from multiple users merge automatically without data loss",
                  "Live presence: see collaborators' cursors and active selections in real time across all connected clients",
                  "Inline review workflow with threaded comments anchored to document positions, plus split editor/preview with KaTeX math and Mermaid diagram rendering",
                  "Offline-friendly via IndexedDB persistence and BroadcastChannel tab-to-tab sync; SSO authentication via Microsoft Entra ID and Google",
                ]}
                tech={["Next.js", "TypeScript", "Automerge", "CodeMirror", "NextAuth"]}
                direction="left"
                delay={200}
                href="https://github.com/LiamCoop/md-editor"
              />
              <ProjectCard
                title="Automerge Sync Daemon"
                subtitle="Rust CLI daemon that syncs local files with a remote Automerge document"
                bullets={[
                  "Connects to an automerge-repo WebSocket sync server and keeps a local file in sync with a remote Automerge document",
                  "Implements the full automerge-repo handshake and CBOR-encoded message protocol",
                  "Handles ping/pong keepalive and graceful shutdown",
                ]}
                tech={["Rust", "Automerge", "WebSockets", "CBOR"]}
                direction="right"
                delay={400}
                href="https://github.com/LiamCoop/fs-automerge-client"
              />
            </div>
          </div>
        </section>

        {/* Trail divider */}
        <TrailDivider />

        {/* SECTION 3 — Blog on image */}
        <BlogSection />

        {/* Trail divider */}
        <TrailDivider />

        {/* SECTION 4 — The summit: Resume */}
        <section className="relative pt-20 md:pt-32 pb-8" aria-label="Resume trailhead">
          <div className="mx-auto max-w-5xl px-6 mb-16">
            <SectionHeader
              label="The Summit"
              title="Resume"
              description="You've reached the peak. The full map of the journey lies ahead."
              icon={<Compass className="h-5 w-5 text-accent" />}
            />
          </div>
          <div className="mx-auto max-w-6xl px-4">
            <ResumeTrailhead />
          </div>
        </section>
      </div>

      <TrailFooter />
    </>
  )
}

function SectionHeader({
  label,
  title,
  description,
  icon,
}: {
  label: string
  title: string
  description: string
  icon?: React.ReactNode
}) {
  return (
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        {icon || <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent/60" />}
        <span className="text-xs tracking-[0.3em] uppercase text-accent/70">{label}</span>
      </div>
      <h2 className="mb-3 text-3xl font-bold text-sunlight md:text-4xl">{title}</h2>
      <p className="mx-auto max-w-md text-mist/90 leading-relaxed text-shadow-body">{description}</p>
    </div>
  )
}

function BlogSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative w-full bg-background" aria-label="Blog">
      {/* Background image with parallax */}
      <div className="absolute -inset-px">
        <Image
          src="/images/forest-clearing.jpg"
          alt="A peaceful forest clearing with warm sunlight"
          fill
          className="object-cover"
          style={{
            objectPosition: mounted ? `50% ${50 + (scrollY - 600) * 0.015}%` : "50% 50%",
          }}
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/60 to-background/85" />
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

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-32">
        {/* Mobile: stacked. Desktop: intro anchored top-left */}
        <div className="mb-10 md:max-w-xs">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent/70" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent/70">Meadow</span>
          </div>
          <Link href="/blog" className="group inline-block underline decoration-sunlight/40 underline-offset-4 hover:decoration-accent transition-all duration-200">
            <h2 className="text-3xl font-bold text-sunlight mb-4 md:text-4xl lg:text-5xl text-balance transition-colors duration-200 group-hover:text-accent">
              Blog
            </h2>
          </Link>
          <p className="text-mist/90 leading-relaxed text-shadow-body">
            Field notes and reflections gathered along the trail — thoughts on craft, technology, and the slow art of building things that matter.
          </p>
        </div>

        {/* Trail signs: stacked on mobile, alternating on desktop */}
        <div className="space-y-8">
          <TrailSign
            title="Agentic Development Notes"
            description="Placeholder description for this post."
            href="/blog/agentic-development-notes"
            direction="left"
            icon={<BookOpen className="h-6 w-6" />}
            delay={100}
          />
          <TrailSign
            title="Dotfiles"
            description="Quick writeup on how I'm using GNU stow with git to store my dev configuration to easily share, update, and setup new machines."
            href="/blog/dotfiles"
            direction="right"
            icon={<BookOpen className="h-6 w-6" />}
            delay={300}
          />
        </div>
      </div>
    </section>
  )
}

function TrailDivider() {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <div className="flex items-center gap-3">
        <span className="h-px w-16 bg-linear-to-r from-transparent to-wood/30" />
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-wood/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-moss/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-wood/40" />
        </div>
        <span className="h-px w-16 bg-linear-to-l from-transparent to-wood/30" />
      </div>
    </div>
  )
}
