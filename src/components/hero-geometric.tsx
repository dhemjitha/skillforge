"use client"

import { HeroContent } from "./hero/HeroContent"
import { FloatingShapes } from "./hero/FloatingShapes"

interface HeroGeometricProps {
  badge?: string
  title1?: string
  title2?: string
  description?: string
}

export default function HeroGeometric({
  badge = "AI Powered Smart Learning Platform",
  title1 = "Be an Expert",
  title2 = "with an Expert...",
  description,
}: HeroGeometricProps) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-blue-600/[0.03] blur-3xl" />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Main Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-6 lg:px-8">
        <HeroContent 
          badge={badge}
          title1={title1}
          title2={title2}
          description={description}
        />
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 pointer-events-none" />
    </div>
  )
}
