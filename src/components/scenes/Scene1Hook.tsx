"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Scene1Hook() {
    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Glow / Projector Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Content Container - Screen aspect ratio */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10 w-[90vw] md:w-[70vw] aspect-video border-4 border-neutral-900 bg-neutral-950 shadow-2xl flex flex-col items-center justify-center p-8 md:p-16 text-center"
            >
                {/* Film grain overlay on screen */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-3xl font-mono text-neutral-400 mb-4 tracking-widest uppercase"
                >
                    A Production By
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse-slow"
                >
                    ANIL ONCUL
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="h-1 bg-red-600 my-6 md:my-8"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-lg md:text-2xl font-mono text-neutral-300"
                >
                    AI Engineer & Automation Architect
                </motion.p>

                {/* Decor: Corner markers */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
            </motion.div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-neutral-600 font-mono text-sm tracking-widest">
                SCENE 01 — THE HOOK
            </div>
        </section>
    );
}
