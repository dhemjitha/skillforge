"use client"

import { ElegantShape } from "./ElegantShape"
import { shapesConfig } from "./shapes-config"

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapesConfig.map((shape, index) => (
        <ElegantShape
          key={index}
          delay={shape.delay}
          width={shape.width}
          height={shape.height}
          rotate={shape.rotate}
          gradient={shape.gradient}
          className={shape.className}
        />
      ))}
    </div>
  )
} 