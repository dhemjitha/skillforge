import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 4,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none [mask-image:linear-gradient(to_bottom,white,transparent)] absolute inset-0 -z-10",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const sizes = [210, 390, 550, 730];
        const opacities = [0.5, 0.47, 0.44, 0.41];
        const delays = [0, 0.06, 0.12, 0.18];
        const foregroundOpacities = [0.05, 0.1, 0.15, 0.2];
        
        const size = sizes[i];
        const opacity = opacities[i];
        const animationDelay = `${delays[i]}s`;
        const isLastCircle = i === numCircles - 1;
        const borderStyle = isLastCircle ? 'dashed' : 'solid';

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full border-[1.5px] border-white/10 bg-transparent shadow-2xl`}
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${foregroundOpacities[i]})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
