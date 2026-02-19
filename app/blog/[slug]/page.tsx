import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { FloatingLeaves } from "@/components/trail/floating-leaves"
import { MarkdownRenderer } from "@/components/blog/markdown-renderer"
import { getAllBlogPosts, getBlogPostBySlug, getBlogPostContent } from "@/lib/blog"

type PageProps = {
  params: Promise<{ slug: string }>
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | Liam Cooper",
    }
  }

  return {
    title: `${post.name} | Liam Cooper`,
    description: `Blog post published on ${dateFormatter.format(new Date(post.date))}.`,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const postData = await getBlogPostContent(slug)

  if (!postData) {
    notFound()
  }

  return (
    <>
      <FloatingLeaves />
      <main className="relative z-0 min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-canopy/10 to-background" />
          <div className="fog absolute top-28 h-28 w-full bg-gradient-to-r from-transparent via-mist/10 to-transparent" />
          <div
            className="fog absolute top-2/3 h-24 w-full bg-gradient-to-r from-transparent via-mist/8 to-transparent"
            style={{ animationDelay: "9s" }}
          />
        </div>

        <article className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mist/80 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-8 border-b border-wood/35 pb-6">
            <h1 className="text-4xl font-bold text-sunlight md:text-5xl text-shadow-hero">
              {postData.post.name}
            </h1>
            <p className="mt-3 text-sm text-mist/80 text-shadow-body">
              Published {dateFormatter.format(new Date(postData.post.date))}
            </p>
          </header>

          <MarkdownRenderer content={postData.content} />
        </article>
      </main>
    </>
  )
}
