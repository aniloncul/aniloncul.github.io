"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tech logos
const techLogos: Record<string, { logo: string; bg: string }> = {
    "user": { logo: "https://cdn.simpleicons.org/googlechrome/fff", bg: "from-indigo-500 to-indigo-600" },
    "gemini": { logo: "https://cdn.simpleicons.org/google/fff", bg: "from-blue-500 to-blue-600" },
    "imagen": { logo: "https://cdn.simpleicons.org/googlegemini/fff", bg: "from-purple-500 to-purple-600" },
    "tts": { logo: "https://cdn.simpleicons.org/googlepodcasts/fff", bg: "from-red-500 to-red-600" },
    "ffmpeg": { logo: "https://cdn.simpleicons.org/ffmpeg/fff", bg: "from-green-600 to-green-700" },
    "supabase": { logo: "https://cdn.simpleicons.org/supabase/fff", bg: "from-emerald-500 to-emerald-600" },
    "player": { logo: "https://cdn.simpleicons.org/spotify/fff", bg: "from-green-500 to-green-600" },
    "huggingface": { logo: "https://cdn.simpleicons.org/huggingface/fff", bg: "from-yellow-500 to-yellow-600" },
};

interface WorkflowNode {
    id: string;
    label: string;
    icon: string;
    x: number;
    y: number;
}

interface WorkflowConnection {
    from: string;
    to: string;
}

interface LingoCastWorkflowProps {
    className?: string;
}

function Node({ node, delay }: { node: WorkflowNode; delay: number }) {
    const tech = techLogos[node.icon] || techLogos["user"];

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
        >
            {/* Glow effect */}
            <circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill={`url(#grad-${node.id})`}
                opacity={0.3}
                filter="url(#glow)"
            />

            {/* Node background */}
            <circle
                cx={node.x}
                cy={node.y}
                r={18}
                fill={`url(#grad-${node.id})`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
            />

            {/* Icon container */}
            <foreignObject
                x={node.x - 10}
                y={node.y - 10}
                width={20}
                height={20}
            >
                <Image
                    src={tech.logo}
                    alt={node.label}
                    width={20}
                    height={20}
                    className="opacity-90"
                    unoptimized
                />
            </foreignObject>

            {/* Label */}
            <text
                x={node.x}
                y={node.y + 32}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize={8}
                fontFamily="system-ui"
            >
                {node.label}
            </text>

            {/* Gradient definition */}
            <defs>
                <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={tech.bg.includes("indigo") ? "#6366f1" :
                        tech.bg.includes("blue") ? "#3b82f6" :
                            tech.bg.includes("purple") ? "#a855f7" :
                                tech.bg.includes("red") ? "#ef4444" :
                                    tech.bg.includes("green") ? "#22c55e" :
                                        tech.bg.includes("emerald") ? "#10b981" :
                                            tech.bg.includes("yellow") ? "#eab308" : "#6366f1"} />
                    <stop offset="100%" stopColor={tech.bg.includes("indigo") ? "#4f46e5" :
                        tech.bg.includes("blue") ? "#2563eb" :
                            tech.bg.includes("purple") ? "#9333ea" :
                                tech.bg.includes("red") ? "#dc2626" :
                                    tech.bg.includes("green") ? "#16a34a" :
                                        tech.bg.includes("emerald") ? "#059669" :
                                            tech.bg.includes("yellow") ? "#ca8a04" : "#4f46e5"} />
                </linearGradient>
            </defs>
        </motion.g>
    );
}

function Connection({
    x1, y1, x2, y2, delay, curved = false, curveDirection = "down"
}: {
    x1: number; y1: number; x2: number; y2: number; delay: number; curved?: boolean; curveDirection?: string;
}) {
    // Create path
    let path: string;
    if (curved) {
        const midY = curveDirection === "down" ? Math.max(y1, y2) + 20 : Math.min(y1, y2) - 20;
        path = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y2}`;
    } else {
        path = `M ${x1} ${y1} L ${x2} ${y2}`;
    }

    return (
        <g>
            {/* Static line */}
            <path
                d={path}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1.5}
            />

            {/* Animated dot */}
            <motion.circle
                r={2.5}
                fill="#fff"
                opacity={0.8}
                initial={{ "--offset-distance": "0%" } as any}
                animate={{ "--offset-distance": "100%" } as any}
                transition={{
                    duration: 2,
                    delay: delay,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    offsetPath: `path('${path}')`,
                    offsetDistance: "var(--offset-distance, 0%)"
                }}
            />
        </g>
    );
}

export default function LingoCastWorkflow({ className = "" }: LingoCastWorkflowProps) {
    // Define nodes with positions for the LingoCast workflow
    const nodes: WorkflowNode[] = [
        { id: "input", label: "User Input", icon: "user", x: 60, y: 60 },
        { id: "gemini", label: "Gemini 2.5", icon: "gemini", x: 160, y: 60 },
        { id: "imagen", label: "Imagen 4", icon: "imagen", x: 260, y: 30 },
        { id: "tts", label: "Gemini TTS", icon: "tts", x: 260, y: 90 },
        { id: "ffmpeg", label: "FFmpeg", icon: "ffmpeg", x: 360, y: 60 },
        { id: "supabase", label: "Supabase", icon: "supabase", x: 460, y: 60 },
        { id: "player", label: "Player + Quiz", icon: "player", x: 560, y: 60 },
    ];

    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

    return (
        <div className={`w-full ${className}`}>
            <svg
                viewBox="0 0 620 140"
                className="w-full h-auto"
                style={{ minHeight: "120px" }}
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connections */}
                {/* Input → Gemini */}
                <Connection x1={78} y1={60} x2={142} y2={60} delay={0} />

                {/* Gemini → Imagen (branch up) */}
                <Connection x1={178} y1={55} x2={242} y2={30} delay={0.3} />

                {/* Gemini → TTS (branch down) */}
                <Connection x1={178} y1={65} x2={242} y2={90} delay={0.5} />

                {/* Imagen → FFmpeg */}
                <Connection x1={278} y1={35} x2={342} y2={55} delay={0.6} />

                {/* TTS → FFmpeg */}
                <Connection x1={278} y1={85} x2={342} y2={65} delay={0.8} />

                {/* FFmpeg → Supabase */}
                <Connection x1={378} y1={60} x2={442} y2={60} delay={1.0} />

                {/* Supabase → Player */}
                <Connection x1={478} y1={60} x2={542} y2={60} delay={1.2} />

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <Node key={node.id} node={node} delay={i * 0.1} />
                ))}
            </svg>
        </div>
    );
}
