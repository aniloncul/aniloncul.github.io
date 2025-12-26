"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tech logos
const techLogos: Record<string, { logo: string; bg: string }> = {
    "web": { logo: "https://cdn.simpleicons.org/googlechrome/fff", bg: "from-blue-500 to-blue-600" },
    "scraper": { logo: "https://cdn.simpleicons.org/python/fff", bg: "from-yellow-500 to-yellow-600" },
    "llm": { logo: "https://cdn.simpleicons.org/openai/fff", bg: "from-emerald-500 to-emerald-600" },
    "csv": { logo: "https://cdn.simpleicons.org/microsoftexcel/fff", bg: "from-green-600 to-green-700" },
    "nodejs": { logo: "https://cdn.simpleicons.org/nodedotjs/fff", bg: "from-green-500 to-green-600" },
    "supabase": { logo: "https://cdn.simpleicons.org/supabase/fff", bg: "from-emerald-500 to-emerald-600" },
    "nextjs": { logo: "https://cdn.simpleicons.org/nextdotjs/fff", bg: "from-neutral-600 to-neutral-700" },
    "map": { logo: "https://cdn.simpleicons.org/googlemaps/fff", bg: "from-red-500 to-red-600" },
};

interface WorkflowNode {
    id: string;
    label: string;
    icon: string;
    x: number;
    y: number;
}

interface ExploresBerlinWorkflowProps {
    className?: string;
}

function Node({ node, delay }: { node: WorkflowNode; delay: number }) {
    const tech = techLogos[node.icon] || techLogos["web"];

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
                fill={`url(#grad-eb-${node.id})`}
                opacity={0.3}
                filter="url(#glow-eb)"
            />

            {/* Node background */}
            <circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill={`url(#grad-eb-${node.id})`}
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

            {/* Gradient definition */}
            <defs>
                <linearGradient id={`grad-eb-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={
                        tech.bg.includes("blue") ? "#3b82f6" :
                            tech.bg.includes("yellow") ? "#eab308" :
                                tech.bg.includes("emerald") ? "#10b981" :
                                    tech.bg.includes("green") ? "#22c55e" :
                                        tech.bg.includes("neutral") ? "#525252" :
                                            tech.bg.includes("red") ? "#ef4444" : "#3b82f6"
                    } />
                    <stop offset="100%" stopColor={
                        tech.bg.includes("blue") ? "#2563eb" :
                            tech.bg.includes("yellow") ? "#ca8a04" :
                                tech.bg.includes("emerald") ? "#059669" :
                                    tech.bg.includes("green") ? "#16a34a" :
                                        tech.bg.includes("neutral") ? "#404040" :
                                            tech.bg.includes("red") ? "#dc2626" : "#2563eb"
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

export default function ExploresBerlinWorkflow({ className = "" }: ExploresBerlinWorkflowProps) {
    // Define nodes for the Explores.Berlin pipeline
    // Row 1: Data Ingestion
    // Row 2: ETL & Storage
    // Row 3: Client
    const nodes: WorkflowNode[] = [
        // Row 1 - Data Ingestion
        { id: "web", label: "Event Sites", icon: "web", x: 50, y: 35 },
        { id: "scraper", label: "LLM Scraper", icon: "scraper", x: 140, y: 35 },
        { id: "csv", label: "CSV Data", icon: "csv", x: 230, y: 35 },
        { id: "classify", label: "LLM Classify", icon: "llm", x: 320, y: 35 },
        // Row 2 - ETL & Storage
        { id: "etl", label: "Node.js ETL", icon: "nodejs", x: 185, y: 85 },
        { id: "supabase", label: "Supabase", icon: "supabase", x: 275, y: 85 },
        // Row 3 - Client
        { id: "nextjs", label: "Next.js", icon: "nextjs", x: 365, y: 85 },
        { id: "map", label: "Maps UI", icon: "map", x: 455, y: 85 },
    ];

    return (
        <div className={`w-full ${className}`}>
            <svg
                viewBox="0 0 500 130"
                className="w-full h-auto"
                style={{ minHeight: "110px" }}
            >
                <defs>
                    <filter id="glow-eb" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Row 1 Connections (Data Ingestion) */}
                <Connection x1={66} y1={35} x2={124} y2={35} delay={0} />
                <Connection x1={156} y1={35} x2={214} y2={35} delay={0.2} />
                <Connection x1={246} y1={35} x2={304} y2={35} delay={0.4} />

                {/* Down from CSV to ETL */}
                <Connection x1={230} y1={51} x2={200} y2={69} delay={0.6} />

                {/* Down from Classify to ETL */}
                <Connection x1={320} y1={51} x2={200} y2={69} delay={0.7} />

                {/* ETL to Supabase */}
                <Connection x1={201} y1={85} x2={259} y2={85} delay={0.8} />

                {/* Supabase to Next.js */}
                <Connection x1={291} y1={85} x2={349} y2={85} delay={1.0} />

                {/* Next.js to Maps */}
                <Connection x1={381} y1={85} x2={439} y2={85} delay={1.2} />

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <Node key={node.id} node={node} delay={i * 0.08} />
                ))}

                {/* Layer Labels */}
                <text x="10" y="12" fill="#525252" fontSize={6} fontFamily="system-ui">DATA INGESTION</text>
                <text x="10" y="110" fill="#525252" fontSize={6} fontFamily="system-ui">ETL + CLIENT</text>
            </svg>
        </div>
    );
}
