"use client"

import { motion } from "framer-motion"

interface HeroDescriptionProps {
  description?: string
  custom: number
  variants: any
}

export function HeroDescription({ 
  description = "Advance your engineering skills with us. Build skills with our courses and mentor from world-class companies.",
  custom, 
  variants 
}: HeroDescriptionProps) {
  return (
    <motion.div custom={custom} variants={variants} initial="hidden" animate="visible">
      <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light tracking-wide max-w-xl text-left">
        {description}
      </p>
    </motion.div>
  )
} 