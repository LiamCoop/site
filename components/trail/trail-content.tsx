"use client"

import { FolderGit2, BookOpen, Compass } from "lucide-react"
import { BoardwalkSection } from "./boardwalk-section"
import { TrailSign } from "./trail-sign"
import { ResumeTrailhead } from "./resume-trailhead"
import { TrailPath } from "./trail-path"
import { TrailFooter } from "./trail-footer"
import { FloatingLeaves } from "./floating-leaves"
import { AboutSection } from "./about-section"

export function TrailContent() {
  return (
    <>
      <FloatingLeaves />

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

        {/* SECTION 2 — Trail signs: Projects */}
        <section className="relative py-20 md:py-32" aria-label="Projects trail">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              label="Side Trail"
              title="Projects"
              description="Each project is a path I've explored — some winding, some steep, all worth the journey."
            />
            <div className="mt-12 space-y-8">
              <TrailSign
                title="Projects"
                description="Wander through the things I've built — web apps, open source tools, and creative experiments crafted in the quiet of the woods."
                href="/projects"
                direction="right"
                icon={<FolderGit2 className="h-6 w-6" />}
                delay={0}
              />
            </div>
          </div>
        </section>

        {/* Forest depth transition */}
        <BoardwalkSection
          imageSrc="/images/deep-forest.jpg"
          imageAlt="Deep forest trail with towering old-growth trees"
          reverse
        >
          <div className="text-right">
            <p className="text-xs tracking-[0.3em] uppercase text-wood-light/50 mb-4">Deeper into the woods</p>
            <h2 className="text-3xl font-bold text-sunlight mb-4 md:text-4xl text-balance">
              The path grows quieter here
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md ml-auto">
              Past the familiar clearings, where the canopy thickens and the light turns golden — this is where the real thinking happens.
            </p>
          </div>
        </BoardwalkSection>

        {/* Trail divider */}
        <TrailDivider />

        {/* SECTION 3 — Trail signs: Blog */}
        <section className="relative py-20 md:py-32" aria-label="Blog trail">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              label="Scenic Overlook"
              title="Blog"
              description="Thoughts collected along the way — field notes from the trail."
            />
            <div className="mt-12 space-y-8">
              <TrailSign
                title="Blog"
                description="Field notes and reflections gathered along the trail — thoughts on craft, technology, and the slow art of building things that matter."
                href="/blog"
                direction="left"
                icon={<BookOpen className="h-6 w-6" />}
                delay={0}
              />
            </div>
          </div>
        </section>

        {/* Forest clearing transition */}
        <BoardwalkSection
          imageSrc="/images/forest-clearing.jpg"
          imageAlt="A peaceful forest clearing with warm sunlight"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-wood-light/50 mb-4">A clearing in the trees</p>
            <h2 className="text-3xl font-bold text-sunlight mb-4 md:text-4xl text-balance">
              You've come a long way
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Take a moment. Rest on the mossy log. The trailhead register is just ahead — a record of everywhere I've been and everything I've learned.
            </p>
          </div>
        </BoardwalkSection>

        {/* Trail divider */}
        <TrailDivider />

        {/* SECTION 4 — The big trailhead sign: Resume */}
        <section className="relative py-20 md:py-32" aria-label="Resume trailhead">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeader
              label="Trailhead"
              title="Resume"
              description="The full map of the journey."
              icon={<Compass className="h-5 w-5 text-accent" />}
            />
            <div className="mt-12">
              <ResumeTrailhead />
            </div>
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
      <p className="mx-auto max-w-md text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function TrailDivider() {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <div className="flex items-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-wood/30" />
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-wood/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-moss/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-wood/40" />
        </div>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-wood/30" />
      </div>
    </div>
  )
}
