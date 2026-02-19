import { HeroSection } from "@/components/trail/hero-section"
import { TrailContent } from "@/components/trail/trail-content"
import { FloatingLeaves } from "@/components/trail/floating-leaves"

export default function Home() {
  return (
    <>
      <FloatingLeaves />
      <main className="relative z-2">
        <HeroSection />
        <TrailContent />
      </main>
    </>
  )
}
