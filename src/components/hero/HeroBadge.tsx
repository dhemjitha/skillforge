"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

interface HeroBadgeProps {
  badge: string
  custom: number
  variants: any
}

export function HeroBadge({ badge, custom, variants }: HeroBadgeProps) {
  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.8] border border-blue-200/[0.5] shadow-sm"
    >
      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
      <span className="text-sm text-blue-600 tracking-wide font-medium">{badge}</span>
    </motion.div>
  )
} 