"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedWiresProps {
    className?: string;
}

// Processing node indicator - like n8n's executing node animation
function ProcessingNode({
    x,
    y,
    color,
    delay
}: {
    x: number;
    y: number;
    color: string;
    delay: number;
}) {
    return (
        <g>
            {/* Outer pulsing ring */}
            <motion.circle
                cx={x}
                cy={y}
                r={6}
                fill="none"
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.4}
                animate={{
                    r: [6, 12, 6],
                    opacity: [0.4, 0, 0.4],
                }}
                transition={{
                    duration: 2,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />

            {/* Middle glow */}
            <motion.circle
                cx={x}
                cy={y}
                r={4}
                fill={color}
                opacity={0.3}
                animate={{
                    r: [4, 8, 4],
                    opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                    duration: 2,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Core dot */}
            <circle
                cx={x}
                cy={y}
                r={2.5}
                fill={color}
                opacity={0.6}
            />

            {/* Bright center */}
            <motion.circle
                cx={x}
                cy={y}
                r={1.5}
                fill="white"
                animate={{
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 1,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </g>
    );
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

    const dashLength = 20;
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

// Helper function to create a circular arc path segment (orbit around a point)
function createOrbitPath(centerX: number, centerY: number, radius: number, loops: number = 1): string {
    // Create a full circle path that can be looped
    // Using two arcs to create a complete circle
    const circleSegments: string[] = [];

    for (let i = 0; i < loops; i++) {
        // Start from the right side of the circle
        if (i === 0) {
            circleSegments.push(`L ${centerX + radius} ${centerY}`);
        }
        // First half of circle (top arc)
        circleSegments.push(`A ${radius} ${radius} 0 0 1 ${centerX - radius} ${centerY}`);
        // Second half of circle (bottom arc)  
        circleSegments.push(`A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`);
    }

    return circleSegments.join(' ');
}

export default function AnimatedWires({ className = "" }: AnimatedWiresProps) {
    const orbitRadius = 12;

    // n8n workflow style paths with orbit loops at node positions
    // The path includes circular orbits at the processing nodes
    const workflows = [
        {
            // Path with orbit at (500, 180)
            path: `M 0 180 L 250 180 L 250 280 L 488 280 L 488 180 
                   ${createOrbitPath(500, 180, orbitRadius, 1)}
                   L 512 180 L 800 180 L 800 280 L 1200 280`,
            color: "#818cf8",
            delay: 0,
            duration: 12,
            nodePosition: { x: 500, y: 180 },
        },
        {
            // Path with orbit at (400, 420)
            path: `M 0 380 L 180 380 L 180 320 L 388 320 L 388 420 
                   ${createOrbitPath(400, 420, orbitRadius, 1)}
                   L 412 420 L 650 420 L 650 380 L 950 380 L 950 450 L 1200 450`,
            color: "#c084fc",
            delay: 4,
            duration: 14,
            nodePosition: { x: 400, y: 420 },
        },
        {
            // Path with orbit at (750, 480)
            path: `M 0 550 L 300 550 L 300 480 L 550 480 L 550 550 L 738 550 L 738 480 
                   ${createOrbitPath(750, 480, orbitRadius, 1)}
                   L 762 480 L 1000 480 L 1000 550 L 1200 550`,
            color: "#22d3ee",
            delay: 8,
            duration: 13,
            nodePosition: { x: 750, y: 480 },
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

                {/* Processing node indicators at junction points */}
                {workflows.map((workflow, index) => (
                    <ProcessingNode
                        key={`node-${index}`}
                        x={workflow.nodePosition.x}
                        y={workflow.nodePosition.y}
                        color={workflow.color}
                        delay={workflow.delay + 0.5}
                    />
                ))}
            </svg>
        </div>
    );
}
