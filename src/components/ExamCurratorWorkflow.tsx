"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tech logos for ExamCurrator pipeline
const techLogos: Record<string, { logo: string; bg: string }> = {
    "pdf": { logo: "https://cdn.simpleicons.org/adobeacrobatreader/fff", bg: "from-red-500 to-red-600" },
    "regex": { logo: "https://cdn.simpleicons.org/python/fff", bg: "from-yellow-500 to-yellow-600" },
    "json": { logo: "https://cdn.simpleicons.org/json/fff", bg: "from-neutral-500 to-neutral-600" },
    "vertex": { logo: "https://cdn.simpleicons.org/googlecloud/fff", bg: "from-blue-500 to-blue-600" },
    "gemini": { logo: "https://cdn.simpleicons.org/google/fff", bg: "from-purple-500 to-purple-600" },
    "react": { logo: "https://cdn.simpleicons.org/react/fff", bg: "from-cyan-500 to-cyan-600" },
};

interface WorkflowNode {
    id: string;
    label: string;
    subLabel?: string;
    icon: string;
    x: number;
    y: number;
}

interface ExamCurratorWorkflowProps {
    className?: string;
}

function Node({ node, delay }: { node: WorkflowNode; delay: number }) {
    const tech = techLogos[node.icon] || techLogos["json"];

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
                r={20}
                fill={`url(#grad-ec-${node.id})`}
                opacity={0.3}
                filter="url(#glow-ec)"
            />

            {/* Node background */}
            <circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill={`url(#grad-ec-${node.id})`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
            />

            {/* Icon container */}
            <foreignObject
                x={node.x - 9}
                y={node.y - 9}
                width={18}
                height={18}
            >
                <Image
                    src={tech.logo}
                    alt={node.label}
                    width={18}
                    height={18}
                    className="opacity-90"
                    unoptimized
                />
            </foreignObject>

            {/* Label */}
            <text
                x={node.x}
                y={node.y + 28}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize={7}
                fontFamily="system-ui"
            >
                {node.label}
            </text>

            {/* Sub-label if exists */}
            {node.subLabel && (
                <text
                    x={node.x}
                    y={node.y + 38}
                    textAnchor="middle"
                    fill="#525252"
                    fontSize={5}
                    fontFamily="system-ui"
                >
                    {node.subLabel}
                </text>
            )}

            {/* Gradient definition */}
            <defs>
                <linearGradient id={`grad-ec-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={
                        tech.bg.includes("red") ? "#ef4444" :
                            tech.bg.includes("yellow") ? "#eab308" :
                                tech.bg.includes("neutral") ? "#525252" :
                                    tech.bg.includes("blue") ? "#3b82f6" :
                                        tech.bg.includes("purple") ? "#a855f7" :
                                            tech.bg.includes("cyan") ? "#06b6d4" : "#3b82f6"
                    } />
                    <stop offset="100%" stopColor={
                        tech.bg.includes("red") ? "#dc2626" :
                            tech.bg.includes("yellow") ? "#ca8a04" :
                                tech.bg.includes("neutral") ? "#404040" :
                                    tech.bg.includes("blue") ? "#2563eb" :
                                        tech.bg.includes("purple") ? "#9333ea" :
                                            tech.bg.includes("cyan") ? "#0891b2" : "#2563eb"
                    } />
                </linearGradient>
            </defs>
        </motion.g>
    );
}

function Connection({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
    const path = `M ${x1} ${y1} L ${x2} ${y2}`;

    return (
        <g>
            <path d={path} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
            <motion.circle
                r={2}
                fill="#fff"
                opacity={0.8}
                initial={{ "--offset-distance": "0%" } as any}
                animate={{ "--offset-distance": "100%" } as any}
                transition={{ duration: 1.5, delay, repeat: Infinity, ease: "linear" }}
                style={{
                    offsetPath: `path('${path}')`,
                    offsetDistance: "var(--offset-distance, 0%)"
                }}
            />
        </g>
    );
}

export default function ExamCurratorWorkflow({ className = "" }: ExamCurratorWorkflowProps) {
    // Two-row layout for the exam preparation pipeline
    // Row 1: Data Extraction & Preparation
    // Row 2: Fine-Tuning & Generation
    const nodes: WorkflowNode[] = [
        // Row 1 - Data Extraction
        { id: "pdf", label: "Exam PDFs", subLabel: "Past papers", icon: "pdf", x: 55, y: 35 },
        { id: "regex", label: "Regex Parse", subLabel: "Structure extraction", icon: "regex", x: 155, y: 35 },
        { id: "jsonl", label: "JSONL Dataset", subLabel: "Training data", icon: "json", x: 255, y: 35 },
        // Row 2 - Fine-Tuning & Generation
        { id: "vertex", label: "Vertex AI", subLabel: "Fine-tuning", icon: "vertex", x: 205, y: 95 },
        { id: "gemini", label: "Tuned Gemini", subLabel: "Exam generation", icon: "gemini", x: 320, y: 95 },
        { id: "ui", label: "Quiz UI", subLabel: "Interactive learning", icon: "react", x: 435, y: 95 },
    ];

    return (
        <div className={`w-full ${className}`}>
            <svg
                viewBox="0 0 500 140"
                className="w-full h-auto"
                style={{ minHeight: "110px" }}
            >
                <defs>
                    <filter id="glow-ec" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Row 1 Connections - Data Extraction Pipeline */}
                <Connection x1={71} y1={35} x2={139} y2={35} delay={0} />
                <Connection x1={171} y1={35} x2={239} y2={35} delay={0.2} />

                {/* Down from JSONL to Vertex AI */}
                <Connection x1={255} y1={51} x2={220} y2={79} delay={0.4} />

                {/* Vertex AI to Gemini */}
                <Connection x1={221} y1={95} x2={304} y2={95} delay={0.6} />

                {/* Gemini to UI */}
                <Connection x1={336} y1={95} x2={419} y2={95} delay={0.8} />

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <Node key={node.id} node={node} delay={i * 0.1} />
                ))}

                {/* Stage Labels */}
                <text x="8" y="12" fill="#525252" fontSize={6} fontFamily="system-ui">DATA EXTRACTION</text>
                <text x="8" y="120" fill="#525252" fontSize={6} fontFamily="system-ui">FINE-TUNING → GENERATION</text>
            </svg>
        </div>
    );
}
