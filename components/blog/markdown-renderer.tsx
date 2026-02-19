import Link from "next/link"
import type { ReactNode } from "react"

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; language: string; code: string }

export function MarkdownRenderer({ content }: { content: string }) {
  const blocks = parseMarkdown(content)

  return (
    <div className="space-y-6 text-mist/95 leading-relaxed">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

function renderBlock(block: Block, index: number) {
  if (block.type === "heading") {
    if (block.level === 1) {
      return (
        <h1 key={index} className="text-3xl font-bold text-sunlight text-shadow-hero">
          {renderInline(block.text)}
        </h1>
      )
    }

    if (block.level === 2) {
      return (
        <h2 key={index} className="text-2xl font-semibold text-sunlight">
          {renderInline(block.text)}
        </h2>
      )
    }

    if (block.level === 3) {
      return (
        <h3 key={index} className="text-xl font-semibold text-sunlight/95">
          {renderInline(block.text)}
        </h3>
      )
    }

    return (
      <h4 key={index} className="text-lg font-semibold text-sunlight/90">
        {renderInline(block.text)}
      </h4>
    )
  }

  if (block.type === "paragraph") {
    return (
      <p key={index} className="text-base text-shadow-body">
        {renderInline(block.text)}
      </p>
    )
  }

  if (block.type === "unordered-list") {
    return (
      <ul key={index} className="list-disc space-y-2 pl-6 text-base text-shadow-body">
        {block.items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ul>
    )
  }

  if (block.type === "ordered-list") {
    return (
      <ol key={index} className="list-decimal space-y-2 pl-6 text-base text-shadow-body">
        {block.items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ol>
    )
  }

  if (block.type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="border-l-2 border-accent/50 pl-4 italic text-mist/90 text-shadow-body"
      >
        {renderInline(block.text)}
      </blockquote>
    )
  }

  return (
    <pre
      key={index}
      className="overflow-x-auto rounded-lg border border-wood/40 bg-black/20 p-4 text-sm text-mist"
    >
      <code>{block.code}</code>
    </pre>
  )
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/)
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i += 1
      continue
    }

    const codeFenceMatch = line.match(/^```(\w+)?\s*$/)
    if (codeFenceMatch) {
      const language = codeFenceMatch[1] ?? ""
      const codeLines: string[] = []
      i += 1

      while (i < lines.length && !lines[i].match(/^```\s*$/)) {
        codeLines.push(lines[i])
        i += 1
      }

      if (i < lines.length) {
        i += 1
      }

      blocks.push({ type: "code", language, code: codeLines.join("\n") })
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      })
      i += 1
      continue
    }

    if (line.match(/^>\s?/)) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].match(/^>\s?/)) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""))
        i += 1
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ").trim() })
      continue
    }

    if (line.match(/^[-*]\s+/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        items.push(lines[i].replace(/^[-*]\s+/, "").trim())
        i += 1
      }
      blocks.push({ type: "unordered-list", items })
      continue
    }

    if (line.match(/^\d+\.\s+/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim())
        i += 1
      }
      blocks.push({ type: "ordered-list", items })
      continue
    }

    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !lines[i].match(/^>\s?/) &&
      !lines[i].match(/^[-*]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      !lines[i].match(/^```/)
    ) {
      paragraphLines.push(lines[i].trim())
      i += 1
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ").trim() })
  }

  return blocks
}

function renderInline(text: string): ReactNode[] {
  const segments = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)

  return segments.filter(Boolean).map((segment, index) => {
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-black/25 px-1.5 py-0.5 text-[0.95em] text-sunlight">
          {segment.slice(1, -1)}
        </code>
      )
    }

    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-sunlight">
          {segment.slice(2, -2)}
        </strong>
      )
    }

    if (segment.startsWith("*") && segment.endsWith("*")) {
      return <em key={index}>{segment.slice(1, -1)}</em>
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      const isExternal = /^https?:\/\//.test(href)

      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/50 underline-offset-4 hover:text-sunlight"
          >
            {label}
          </a>
        )
      }

      return (
        <Link
          key={index}
          href={href}
          className="text-accent underline decoration-accent/50 underline-offset-4 hover:text-sunlight"
        >
          {label}
        </Link>
      )
    }

    return <span key={index}>{segment}</span>
  })
}
