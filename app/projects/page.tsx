import Link from "next/link"
import { ArrowLeft, FolderGit2 } from "lucide-react"
import { FloatingLeaves } from "@/components/trail/floating-leaves"
import { ProjectCard } from "@/components/trail/project-card"

const projects = [
  {
    title: "Rules Engine",
    subtitle: "Evaluates complex user-defined schemas and rules",
    bullets: [
      "Designed a stateless, horizontally scalable rule engine evaluating dynamic user-defined schemas via Common Expression Language",
      "Achieved ~7k RPS per instance under sustained load (10-minute test, ~4M evaluations)",
      "Identified and analyzed saturation behavior at tail latencies (p95 ~2.8s under peak load)",
    ],
    tech: ["Go", "PostgreSQL"],
    href: "https://github.com/liamcoop/rules",
  },
  {
    title: "Real-time Collaborative Markdown Editor",
    subtitle: "Real-time collaborative markdown editor powered by CRDTs",
    bullets: [
      "Built real-time collaborative editing using Automerge CRDTs for conflict-free merging and eventual consistency across users",
      "Supports live markdown rendering so collaborators can preview changes as they write",
      "Implements threaded comments with replies and resolution for inline discussion",
      "Tracks user presence and cursor positions in real time, showing who's active in the document",
    ],
    tech: ["CRDTs", "NextJS", "Markdown"],
    href: "https://github.com/LiamCoop/md-editor",
  },
  {
    title: "Distrace",
    subtitle: "Distributed tracing backend for OpenTelemetry",
    bullets: [
      "Correlates out-of-order spans across services using TraceID grouping and parent–child resolution",
      "Implements bounded trace completion with inactivity and max-age limits (30s / 5m) to balance completeness with memory constraints",
    ],
    tech: ["Go", "Kafka", "OpenTelemetry"],
    href: "https://github.com/liamcoop/distrace",
  },
]

export default function ProjectsPage() {
  return (
    <>
      <FloatingLeaves />
      <main className="relative z-0 min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-background via-canopy/10 to-background" />
          <div className="fog absolute top-24 h-28 w-full bg-linear-to-r from-transparent via-mist/10 to-transparent" />
          <div
            className="fog absolute top-1/2 h-24 w-full bg-linear-to-r from-transparent via-mist/8 to-transparent"
            style={{ animationDelay: "8s" }}
          />
        </div>

        <section className="relative mx-auto max-w-5xl px-6 py-16 md:py-24" aria-label="Projects">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mist/80 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>

          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-accent/70" />
              <span className="text-xs tracking-[0.3em] uppercase text-accent/70">Vista</span>
            </div>
            <h1 className="text-4xl font-bold text-sunlight md:text-5xl text-shadow-hero">Projects</h1>
            <p className="mt-3 max-w-xl text-mist/90 text-shadow-body">
              Each project is a path I've explored — some winding, some steep, all worth the journey.
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                subtitle={project.subtitle}
                bullets={project.bullets}
                tech={project.tech}
                direction={i % 2 === 0 ? "right" : "left"}
                delay={i * 200}
                href={project.href}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
