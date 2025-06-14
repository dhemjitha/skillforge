"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

interface HeroTitleProps {
  title1: string
  title2: string
  custom: number
  variants: any
}

export function HeroTitle({ title1, title2, custom, variants }: HeroTitleProps) {
  return (
    <motion.div custom={custom} variants={variants} initial="hidden" animate="visible">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-left">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
          {title1}
        </span>
        <br />
        <span
          className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700",
            pacifico.className,
          )}
        >
          {title2}
        </span>
      </h1>
    </motion.div>
  )
}