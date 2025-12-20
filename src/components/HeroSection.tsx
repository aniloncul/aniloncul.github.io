"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const codeSnippet = `// Automation Pipeline
import { orchestrate } from '@ai/core';

async function deployPipeline() {
  const workflow = await orchestrate({
    trigger: 'on_commit',
    stages: [
      { name: 'build', runner: 'docker' },
      { name: 'test', parallel: true },
      { name: 'deploy', target: 'vercel' }
    ]
  });

  await workflow.execute({
    notifications: ['slack', 'email'],
    rollback: { enabled: true }
  });
  
  return { status: 'deployed' };
}`;

// Simple syntax highlighting
function highlightSyntax(line: string): string {
    return line
        .replace(/\/\/.*/g, '<span class="text-neutral-500">$&</span>')
        .replace(/('.*?'|".*?")/g, '<span class="text-emerald-400">$1</span>')
        .replace(/\b(import|from|async|function|await|return|const)\b/g, '<span class="text-pink-400">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
        .replace(/(\{|\}|\[|\])/g, '<span class="text-yellow-300">$1</span>');
}

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Only render highlighted code after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const codeLines = codeSnippet.split('\n');

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

                    {/* Right: Code Snippet */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Glow behind */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-2xl blur-2xl" />

                            {/* Code Window */}
                            <div className="relative glass-dark rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                                {/* Window Header */}
                                <div className="flex items-center gap-2 px-4 py-3 lg:px-5 lg:py-4 bg-black/40 border-b border-white/5">
                                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500" />
                                    <span className="ml-3 text-xs lg:text-sm text-neutral-500 font-mono">automation.ts</span>
                                </div>

                                {/* Code Content */}
                                <div className="p-4 lg:p-6 xl:p-8 font-mono text-sm lg:text-base xl:text-lg leading-relaxed lg:leading-loose overflow-x-auto">
                                    <pre className="text-neutral-300">
                                        <code>
                                            {codeLines.map((line, i) => (
                                                <div key={i} className="flex">
                                                    <span className="w-8 lg:w-10 text-neutral-600 select-none text-right pr-4">{i + 1}</span>
                                                    {mounted ? (
                                                        <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
                                                    ) : (
                                                        <span>{line}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            {/* Floating decoration */}
                            <motion.div
                                className="absolute -top-4 -right-4 lg:-top-5 lg:-right-5 px-3 py-1 lg:px-4 lg:py-2 glass rounded-full text-xs lg:text-sm text-indigo-400 font-mono"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                TypeScript
                            </motion.div>
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
