import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { FloatingLeaves } from "@/components/trail/floating-leaves"
import { getAllBlogPosts } from "@/lib/blog"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

export default function BlogIndexPage() {
  const blogPosts = getAllBlogPosts()

  return (
    <>
      <FloatingLeaves />
      <main className="relative z-0 min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-canopy/10 to-background" />
          <div className="fog absolute top-24 h-28 w-full bg-gradient-to-r from-transparent via-mist/10 to-transparent" />
          <div
            className="fog absolute top-1/2 h-24 w-full bg-gradient-to-r from-transparent via-mist/8 to-transparent"
            style={{ animationDelay: "8s" }}
          />
        </div>

        <section className="relative mx-auto max-w-4xl px-6 py-16 md:py-24" aria-label="Blog posts">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mist/80 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>

          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent/70" />
              <span className="text-xs tracking-[0.3em] uppercase text-accent/70">Field Notes</span>
            </div>
            <h1 className="text-4xl font-bold text-sunlight md:text-5xl text-shadow-hero">Blog</h1>
            <p className="mt-3 max-w-xl text-mist/90 text-shadow-body">
              Simple notes from along the trail.
            </p>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <article
                key={post.filePath}
                className="rounded-xl border border-wood/35 bg-card/50 p-5 backdrop-blur-[2px]"
              >
                <h2 className="text-xl font-semibold text-sunlight">{post.name}</h2>
                <p className="mt-1 text-sm text-mist/80">
                  Published {dateFormatter.format(new Date(post.date))}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-accent transition-colors hover:text-sunlight"
                >
                  Read post
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
