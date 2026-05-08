"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TurkishFlagConstellation from "./TurkishFlagConstellation";
import AnimatedWires from "./AnimatedWires";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center overflow-hidden gradient-mesh noise"
        >
            {/* Animated Circuit Wires Background */}
            <AnimatedWires className="opacity-40" />

            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 xl:px-12 pt-24">
                <motion.div style={{ y, opacity }} className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 items-center">
                    {/* Left: Text Content - Left Aligned */}
                    <div className="text-left">
                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bebas tracking-tight mb-4 lg:mb-6 xl:mb-8"
                        >
                            <span className="text-neutral-900">INTELLIGENT AGENTIC AI</span>
                            <br />
                            <span className="text-neutral-900">AUTOMATIONS</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-600 max-w-2xl mb-8 lg:mb-10 xl:mb-12 font-mono leading-relaxed"
                        >
                            Building the brain of your organization. I design agentic backends, orchestrate intelligent workflows, and engineer the system architecture that drives autonomy.
                        </motion.p>

                        {/* Custom Long Double Arrow CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-start"
                        >
                            <a href="#apps" className="group flex flex-col items-start gap-4">
                                <div className="relative h-20 w-12 flex items-center justify-center">
                                    {/* The Long Line */}
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: 60 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        className="absolute top-0 w-px bg-neutral-400 group-hover:bg-indigo-500 transition-colors"
                                    />
                                    
                                    {/* The Double Arrows */}
                                    <motion.div
                                        animate={{ y: [40, 52, 40] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-0 flex flex-col items-center -mt-1"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 group-hover:text-indigo-600 transition-colors">
                                            <path d="M7 13L12 18L17 13" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 7L12 12L17 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                </div>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.3em] ml-2 group-hover:text-neutral-900 transition-colors">
                                    Scroll to Explore
                                </span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Constellation Graph */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center justify-center order-first lg:order-last mb-8 lg:mb-0"
                    >
                        <div className="relative w-full max-w-[400px] sm:max-w-[550px] lg:max-w-[800px] aspect-[4/5]">
                            <TurkishFlagConstellation />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
