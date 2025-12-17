"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Project Alpha",
        role: "Full Stack",
        type: "Web App",
        status: "Now Streaming",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // placeholder
        link: "#",
        desc: "A revolutionary AI platform for data synthesis."
    },
    {
        id: 2,
        title: "Neo-Commerce",
        role: "Frontend Arch",
        type: "E-Commerce",
        status: "Now Streaming",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop", // placeholder
        link: "#",
        desc: "Next-gen shopping experience with 3D product views."
    },
    {
        id: 3,
        title: "Pocket Mind",
        role: "Mobile Dev",
        type: "Mobile App",
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // placeholder
        link: "#",
        desc: "Second brain for your pocket. IOS & Android."
    }
];

export default function Scene3Action() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center bg-neutral-950 border-l border-neutral-800">

            <div className="absolute top-12 left-0 w-full text-center z-10">
                <h2 className="text-5xl md:text-8xl font-bebas text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 opacity-20 select-none">
                    FEATURE PRESENTATIONS
                </h2>
            </div>

            <div className="container mx-auto px-4 flex gap-8 md:gap-12 overflow-x-auto md:overflow-visible items-center justify-start md:justify-center h-2/3 snap-x snap-mandatory">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        onHoverStart={() => setHoveredId(project.id)}
                        onHoverEnd={() => setHoveredId(null)}
                        className="relative group min-w-[300px] md:min-w-[350px] h-[500px] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-red-600/50 snap-center"
                    >
                        {/* Poster Image / Video Placeholder */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />

                        {/* Hover Video Overlay (Simulated) */}
                        {hoveredId === project.id && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                                <Play className="text-white w-16 h-16 opacity-80" />
                            </div>
                        )}

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-1 text-[10px] font-mono uppercase bg-red-600 text-white rounded-sm">
                                    {project.status}
                                </span>
                                <span className="text-xs font-mono text-neutral-400">{project.type}</span>
                            </div>

                            <h3 className="text-3xl font-bebas text-white mb-1 group-hover:text-red-500 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-sm text-neutral-400 font-mono mb-4 line-clamp-2">
                                {project.desc}
                            </p>

                            <a href={project.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:underline decoration-red-500 underline-offset-4">
                                View Project <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-8 right-12 text-neutral-600 font-mono text-sm tracking-widest">
                SCENE 03 — THE ACTION
            </div>
        </section>
    );
}
