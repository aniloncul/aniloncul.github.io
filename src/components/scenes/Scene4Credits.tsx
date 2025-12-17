"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Github, Linkedin, Twitter } from "lucide-react";

export default function Scene4Credits() {
    return (
        <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center bg-black border-l border-neutral-800">

            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none select-none">
                <div className="animate-rolling-credits text-center space-y-12 text-neutral-500 font-bebas text-4xl">
                    <p>DIRECTED BY ANIL ONCUL</p>
                    <p>PRODUCED BY NEXT.JS 14</p>
                    <p>ART DIRECTION BY TAILWIND CSS</p>
                    <p>STUNTS BY FRAMER MOTION</p>
                    <p>FILMED ON LOCATION IN VSC</p>
                    <p>SPECIAL THANKS TO COFFEE</p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-9xl font-bebas text-white mb-8"
                >
                    THE END?
                </motion.h2>

                <p className="text-xl md:text-2xl font-mono text-neutral-400 mb-12">
                    Or just the beginning of our collaboration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg shadow-2xl">
                        <h3 className="text-2xl font-bebas text-white mb-6 tracking-wide">CAST ME FOR YOUR PROJECT</h3>

                        <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded transition-colors mb-4 group">
                            <Calendar className="group-hover:rotate-12 transition-transform" />
                            Book a Meeting
                        </button>

                        <a href="mailto:hello@example.com" className="w-full flex items-center justify-center gap-3 bg-transparent border border-neutral-600 hover:border-white text-neutral-300 hover:text-white font-bold py-4 px-6 rounded transition-all">
                            <Mail />
                            Send a Script (Email)
                        </a>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <h3 className="text-2xl font-bebas text-white tracking-wide">FOLLOW THE JOURNEY</h3>
                        <div className="flex gap-8">
                            <a href="#" className="p-4 bg-neutral-900 rounded-full text-white hover:bg-white hover:text-black transition-all hover:scale-110">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-neutral-900 rounded-full text-white hover:bg-[#0077b5] hover:text-white transition-all hover:scale-110">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" className="p-4 bg-neutral-900 rounded-full text-white hover:bg-[#1DA1F2] hover:text-white transition-all hover:scale-110">
                                <Twitter size={24} />
                            </a>
                        </div>
                        <p className="font-mono text-xs text-neutral-600 mt-8">
                            © {new Date().getFullYear()} ANIL ONCUL STUDIOS. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
