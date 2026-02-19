import fs from "node:fs/promises"
import path from "node:path"
import posts from "@/data/blog-posts.json"

export type BlogPostConfig = {
  slug: string
  name: string
  date: string
  filePath: string
}

const blogPosts = posts as BlogPostConfig[]

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

function resolvePublicFilePath(filePath: string) {
  const relativePath = filePath.replace(/^\/+/, "")
  return path.join(process.cwd(), "public", relativePath)
}

export async function getBlogPostContent(slug: string) {
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return null
  }

  const absolutePath = resolvePublicFilePath(post.filePath)
  let rawContent: string
  try {
    rawContent = await fs.readFile(absolutePath, "utf8")
  } catch {
    return null
  }

  return {
    post,
    content: stripFrontmatter(rawContent),
  }
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "")
}
