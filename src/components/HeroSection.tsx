"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import AnimatedCodeBlock from "./AnimatedCodeBlock";

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
            className="relative h-full flex items-center overflow-hidden gradient-mesh noise"
        >
            {/* Floating orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: "10%", left: "10%" }}
            />
            <motion.div
                className="absolute w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: "20%", right: "15%" }}
            />

            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 xl:px-12 pt-24">
                <motion.div style={{ y, opacity }} className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 items-center">
                    {/* Left: Text Content - Left Aligned */}
                    <div className="text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 mb-6 lg:mb-8 xl:mb-10 rounded-full glass text-sm lg:text-base text-neutral-300"
                        >
                            <Sparkles size={14} className="text-indigo-400 lg:w-4 lg:h-4" />
                            Available for new projects
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bebas tracking-tight mb-4 lg:mb-6 xl:mb-8"
                        >
                            <span className="text-white">I BUILD</span>
                            <br />
                            <span className="text-gradient">DIGITAL SYSTEMS</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-400 max-w-2xl mb-8 lg:mb-10 xl:mb-12 font-mono leading-relaxed"
                        >
                            Full Stack Product Engineering with a Data Background & Automation Systems, orchestrating  the AI workflows that actually create value.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                        >
                            <a
                                href="#apps"
                                className="px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full text-white text-base lg:text-lg xl:text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/25 text-center"
                            >
                                View My Apps
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 glass rounded-full text-white text-base lg:text-lg xl:text-xl font-bold hover:bg-white/10 transition-colors text-center"
                            >
                                Get in Touch
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Animated Code Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Glow behind */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-2xl blur-2xl" />

                            {/* Animated Code Block */}
                            <div className="relative">
                                <AnimatedCodeBlock
                                    typingSpeed={12}
                                    startDelay={1000}
                                    autoPlay={true}
                                    showControls={true}
                                />

                                {/* Floating decoration */}
                                <motion.div
                                    className="absolute -top-4 -right-4 lg:-top-5 lg:-right-5 px-3 py-1 lg:px-4 lg:py-2 glass rounded-full text-xs lg:text-sm text-indigo-400 font-mono z-20"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    TypeScript
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="text-neutral-500" size={24} />
            </motion.div>
        </section>
    );
}
