"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tech logos using simple-icons CDN or local paths
const techLogos: Record<string, { logo: string; bg: string }> = {
    // AI/ML
    "gemini": { logo: "https://cdn.simpleicons.org/google/fff", bg: "from-blue-500 to-blue-600" },
    "openai": { logo: "https://cdn.simpleicons.org/openai/fff", bg: "from-emerald-500 to-emerald-600" },
    "huggingface": { logo: "https://cdn.simpleicons.org/huggingface/fff", bg: "from-yellow-500 to-yellow-600" },

    // Backend
    "python": { logo: "https://cdn.simpleicons.org/python/fff", bg: "from-blue-600 to-yellow-500" },
    "fastapi": { logo: "https://cdn.simpleicons.org/fastapi/fff", bg: "from-teal-500 to-teal-600" },
    "supabase": { logo: "https://cdn.simpleicons.org/supabase/fff", bg: "from-emerald-500 to-emerald-600" },
    "nodejs": { logo: "https://cdn.simpleicons.org/nodedotjs/fff", bg: "from-green-600 to-green-700" },

    // Frontend
    "nextjs": { logo: "https://cdn.simpleicons.org/nextdotjs/fff", bg: "from-neutral-700 to-neutral-800" },
    "react": { logo: "https://cdn.simpleicons.org/react/fff", bg: "from-cyan-500 to-cyan-600" },
    "typescript": { logo: "https://cdn.simpleicons.org/typescript/fff", bg: "from-blue-600 to-blue-700" },

    // Deployment
    "vercel": { logo: "https://cdn.simpleicons.org/vercel/fff", bg: "from-neutral-700 to-neutral-800" },
    "render": { logo: "https://cdn.simpleicons.org/render/fff", bg: "from-purple-500 to-purple-600" },

    // Generic
    "database": { logo: "https://cdn.simpleicons.org/postgresql/fff", bg: "from-blue-700 to-blue-800" },
    "api": { logo: "https://cdn.simpleicons.org/fastapi/fff", bg: "from-orange-500 to-orange-600" },
    "user": { logo: "https://cdn.simpleicons.org/googlechrome/fff", bg: "from-indigo-500 to-indigo-600" },
    "audio": { logo: "https://cdn.simpleicons.org/soundcloud/fff", bg: "from-orange-500 to-orange-600" },
    "image": { logo: "https://cdn.simpleicons.org/unsplash/fff", bg: "from-neutral-600 to-neutral-700" },
    "storage": { logo: "https://cdn.simpleicons.org/googlecloudstorage/fff", bg: "from-blue-500 to-blue-600" },
};

interface WorkflowNode {
    id: string;
    label: string;
    icon: string;
}

interface WorkflowDiagramProps {
    nodes: WorkflowNode[];
    gradient: string;
}

function WorkflowNode({
    node,
    index,
    total,
    gradient
}: {
    node: WorkflowNode;
    index: number;
    total: number;
    gradient: string;
}) {
    const tech = techLogos[node.icon] || techLogos["api"];
    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
        <div className="flex items-center">
            {/* Node */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-1"
            >
                {/* Node circle with logo */}
                <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${tech.bg} flex items-center justify-center shadow-lg`}>
                    <Image
                        src={tech.logo}
                        alt={node.label}
                        width={20}
                        height={20}
                        className="opacity-90"
                        unoptimized
                    />

                    {/* Pulse animation */}
                    <motion.div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.bg}`}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            delay: index * 0.3,
                            repeat: Infinity,
                        }}
                    />
                </div>

                {/* Label */}
                <span className="text-[10px] text-neutral-400 text-center max-w-[60px] leading-tight">
                    {node.label}
                </span>
            </motion.div>

            {/* Connector line with traveling dot */}
            {!isLast && (
                <div className="relative w-8 h-0.5 mx-1">
                    {/* Static line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full" />

                    {/* Traveling dot */}
                    <motion.div
                        className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-lg"
                        style={{ top: "-2px" }}
                        animate={{ x: [0, 28, 0] }}
                        transition={{
                            duration: 1.5,
                            delay: index * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default function WorkflowDiagram({ nodes, gradient }: WorkflowDiagramProps) {
    return (
        <div className="flex items-center justify-start overflow-x-auto py-2">
            {nodes.map((node, index) => (
                <WorkflowNode
                    key={node.id}
                    node={node}
                    index={index}
                    total={nodes.length}
                    gradient={gradient}
                />
            ))}
        </div>
    );
}
