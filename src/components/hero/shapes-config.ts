interface ShapeConfig {
  delay: number
  width: number
  height: number
  rotate: number
  gradient: string
  className: string
}

export const shapesConfig: ShapeConfig[] = [
  {
    delay: 0.3,
    width: 600,
    height: 140,
    rotate: 12,
    gradient: "from-blue-500/[0.12]",
    className: "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]",
  },
  {
    delay: 0.5,
    width: 500,
    height: 120,
    rotate: -15,
    gradient: "from-blue-600/[0.15]",
    className: "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]",
  },
  {
    delay: 0.4,
    width: 300,
    height: 80,
    rotate: -8,
    gradient: "from-blue-400/[0.18]",
    className: "left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]",
  },
  {
    delay: 0.6,
    width: 200,
    height: 60,
    rotate: 20,
    gradient: "from-blue-700/[0.12]",
    className: "right-[15%] md:right-[20%] top-[10%] md:top-[15%]",
  },
  {
    delay: 0.7,
    width: 150,
    height: 40,
    rotate: -25,
    gradient: "from-blue-300/[0.15]",
    className: "left-[20%] md:left-[25%] top-[5%] md:top-[10%]",
  },
] 