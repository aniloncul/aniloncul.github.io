"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight, Calendar } from "lucide-react";

const socials = [
    { icon: Github, label: "GitHub", href: "#", color: "hover:bg-white hover:text-black" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-[#0077b5]" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:bg-[#1DA1F2]" },
];

export default function ContactSection() {
    return (
        <section id="contact" className="relative h-full flex flex-col justify-center overflow-hidden gradient-mesh noise py-8 lg:py-12">
            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 xl:px-12 flex-1 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-5xl mx-auto"
                >
                    <span className="text-sm md:text-base lg:text-lg font-mono text-indigo-400 uppercase tracking-widest mb-4 lg:mb-6 block">
                        Let&apos;s Connect
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bebas text-white mb-4 lg:mb-6 xl:mb-8">
                        Have a Project?
                        <br />
                        <span className="text-gradient">Let&apos;s Talk</span>
                    </h2>
                    <p className="text-neutral-400 text-base md:text-lg lg:text-xl xl:text-2xl mb-10 lg:mb-12 xl:mb-16 max-w-2xl mx-auto leading-relaxed">
                        I&apos;m always interested in hearing about new projects and opportunities.
                        Whether you have a question or just want to say hi, feel free to reach out.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-10 lg:mb-14 xl:mb-16">
                        <motion.a
                            href="mailto:hello@aniloncul.dev"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-3 lg:gap-4 px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full text-white text-base lg:text-lg xl:text-xl font-bold shadow-lg shadow-indigo-500/25"
                        >
                            <Mail size={20} className="lg:w-6 lg:h-6" />
                            Send an Email
                            <ArrowUpRight size={18} className="lg:w-5 lg:h-5" />
                        </motion.a>

                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-3 lg:gap-4 px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 glass rounded-full text-white text-base lg:text-lg xl:text-xl font-bold hover:bg-white/10"
                        >
                            <Calendar size={20} className="lg:w-6 lg:h-6" />
                            Book a Call
                        </motion.a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 lg:gap-6">
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 lg:p-5 xl:p-6 glass rounded-full text-white transition-all ${social.color}`}
                                aria-label={social.label}
                            >
                                <social.icon size={24} className="lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 xl:px-12 mt-auto pt-6 lg:pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm lg:text-base text-neutral-500">
                    <p>© 2025 Anil Oncul. All rights reserved.</p>
                    <p className="font-mono text-xs lg:text-sm">
                        Built with Next.js, Tailwind CSS &amp; Framer Motion
                    </p>
                </div>
            </div>
        </section>
    );
}
