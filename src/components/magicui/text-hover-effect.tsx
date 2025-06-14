"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
    text,
    duration,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    // Ensure we always have valid values
    const safePosition = useMemo(() => ({
        cx: maskPosition?.cx || "50%",
        cy: maskPosition?.cy || "50%"
    }), [maskPosition]);

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            
            // Check if svgRect has valid dimensions to avoid division by zero
            if (svgRect.width > 0 && svgRect.height > 0) {
                const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
                const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
                
                // Ensure the calculated percentages are valid numbers
                if (!isNaN(cxPercentage) && !isNaN(cyPercentage) && isFinite(cxPercentage) && isFinite(cyPercentage)) {
                    setMaskPosition({
                        cx: `${Math.max(0, Math.min(100, cxPercentage))}%`,
                        cy: `${Math.max(0, Math.min(100, cyPercentage))}%`,
                    });
                }
            }
        }
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none"
        >
            <defs>
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor={"var(--indigo-500)"} />
                            <stop offset="25%" stopColor={"var(--violet-500)"} />
                            <stop offset="50%" stopColor={"var(--purple-500)"} />
                            <stop offset="75%" stopColor={"var(--fuchsia-500)"} />
                            <stop offset="100%" stopColor={"var(--rose-500)"} />
                        </>
                    )}
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={safePosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}

                // example for a smoother animation below

                //   transition={{
                //     type: "spring",
                //     stiffness: 300,
                //     damping: 50,
                //   }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#revealMask)"
                    />
                </mask>
            </defs>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="font-[helvetica] font-bold stroke-neutral-800 fill-transparent text-7xl"
                style={{ opacity: hovered ? 0.7 : 0 }}
            >
                {text}
            </text>
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.3"
                className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-800"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="0.3"
                mask="url(#textMask)"
                className="font-[helvetica] font-bold fill-transparent text-7xl"
            >
                {text}
            </text>
        </svg>
    );
};