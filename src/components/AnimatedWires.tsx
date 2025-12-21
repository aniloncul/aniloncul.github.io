"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedWiresProps {
    className?: string;
}

// Single animated light component
function TravelingLight({
    path,
    color,
    delay,
    duration
}: {
    path: string;
    color: string;
    delay: number;
    duration: number;
}) {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = React.useRef<SVGPathElement>(null);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    if (pathLength === 0) {
        // Render invisible path first to measure it
        return (
            <path
                ref={pathRef}
                d={path}
                fill="none"
                stroke="transparent"
                strokeWidth={1}
            />
        );
    }

    const dashLength = 20; // Length of the visible "light" segment
    const gapLength = pathLength - dashLength;

    return (
        <g>
            {/* Glow effect */}
            <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={4}
                strokeOpacity={0.4}
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${gapLength}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -pathLength }}
                transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ filter: "blur(3px)" }}
            />

            {/* Main light */}
            <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeOpacity={0.8}
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${gapLength}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -pathLength }}
                transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Bright core */}
            <motion.path
                d={path}
                fill="none"
                stroke="white"
                strokeWidth={1}
                strokeOpacity={0.9}
                strokeLinecap="round"
                strokeDasharray={`${dashLength * 0.4} ${gapLength + dashLength * 0.6}`}
                initial={{ strokeDashoffset: -dashLength * 0.3 }}
                animate={{ strokeDashoffset: -pathLength - dashLength * 0.3 }}
                transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </g>
    );
}

export default function AnimatedWires({ className = "" }: AnimatedWiresProps) {
    // n8n workflow style paths - organized horizontal flow with vertical connectors
    const workflows = [
        {
            path: "M 0 180 L 250 180 L 250 280 L 500 280 L 500 180 L 800 180 L 800 280 L 1200 280",
            color: "#818cf8", // indigo
            delay: 0,
            duration: 10,
        },
        {
            path: "M 0 380 L 180 380 L 180 320 L 400 320 L 400 420 L 650 420 L 650 380 L 950 380 L 950 450 L 1200 450",
            color: "#c084fc", // purple
            delay: 3,
            duration: 12,
        },
        {
            path: "M 0 550 L 300 550 L 300 480 L 550 480 L 550 550 L 750 550 L 750 480 L 1000 480 L 1000 550 L 1200 550",
            color: "#22d3ee", // cyan
            delay: 6,
            duration: 11,
        },
    ];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <svg
                className="w-full h-full"
                viewBox="0 0 1200 700"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Static base lines - very subtle */}
                {workflows.map((workflow, index) => (
                    <path
                        key={`base-${index}`}
                        d={workflow.path}
                        fill="none"
                        stroke={workflow.color}
                        strokeWidth={1}
                        strokeOpacity={0.08}
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                    />
                ))}

                {/* Traveling lights */}
                {workflows.map((workflow, index) => (
                    <TravelingLight
                        key={`light-${index}`}
                        path={workflow.path}
                        color={workflow.color}
                        delay={workflow.delay}
                        duration={workflow.duration}
                    />
                ))}
            </svg>
        </div>
    );
}
