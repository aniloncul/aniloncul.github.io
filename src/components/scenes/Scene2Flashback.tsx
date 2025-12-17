"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Code2 } from "lucide-react";

export default function Scene2Flashback() {
    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center bg-neutral-900 border-l border-neutral-800">
            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 md:p-12"
                >
                    <h2 className="text-5xl md:text-7xl font-bebas text-white">
                        FLASHBACK: <span className="text-red-500">ORIGINS</span>
                    </h2>
                    <p className="text-lg md:text-xl font-mono text-neutral-300 leading-relaxed">
                        From decoding the first lines of Hello World to orchestrating complex AI architectures, my journey has been a script written in Python and TypeScript.
                    </p>
                    <p className="text-md md:text-lg font-mono text-neutral-400">
                        I specialize in building intelligent systems that blend cinematic user experiences with robust backend logic.
                    </p>

                    <div className="flex gap-6 pt-4">
                        <div className="flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                            <Terminal size={32} />
                            <span className="text-xs font-mono uppercase">DevOps</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                            <Cpu size={32} />
                            <span className="text-xs font-mono uppercase">AI/ML</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                            <Code2 size={32} />
                            <span className="text-xs font-mono uppercase">FullStack</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[50vh] w-full bg-black rounded-lg border border-neutral-700 shadow-2xl overflow-hidden font-mono text-sm md:text-base"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 border-b border-neutral-700">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-xs text-neutral-400">anil@machine:~/profile</span>
                    </div>

                    <div className="p-6 text-green-400 space-y-2">
                        <p>
                            <span className="text-purple-400">const</span> <span className="text-yellow-300">hero</span> = &#123;
                        </p>
                        <p className="pl-4">name: <span className="text-orange-300">&quot;Anil Oncul&quot;</span>,</p>
                        <p className="pl-4">role: <span className="text-orange-300">&quot;Software Engineer&quot;</span>,</p>
                        <p className="pl-4">traits: [<span className="text-orange-300">&quot;Creative&quot;</span>, <span className="text-orange-300">&quot;Analytical&quot;</span>],</p>
                        <p className="pl-4">mission: <span className="text-orange-300">&quot;Automate the boring, engineer the extraordinary.&quot;</span></p>
                        <p>&#125;;</p>
                        <p className="animate-pulse">_</p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scanline pointer-events-none" />
                </motion.div>

            </div>

            <div className="absolute bottom-8 left-12 text-neutral-600 font-mono text-sm tracking-widest">
                SCENE 02 — FLASHBACK
            </div>
        </section>
    );
}
