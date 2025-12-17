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
        <section id="contact" className="relative py-32 overflow-hidden gradient-mesh noise">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 block">
                        Let&apos;s Connect
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bebas text-white mb-6">
                        Have a Project?
                        <br />
                        <span className="text-gradient">Let&apos;s Talk</span>
                    </h2>
                    <p className="text-neutral-400 mb-12 max-w-xl mx-auto">
                        I&apos;m always interested in hearing about new projects and opportunities.
                        Whether you have a question or just want to say hi, feel free to reach out.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <motion.a
                            href="mailto:hello@aniloncul.dev"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full text-white font-bold shadow-lg shadow-indigo-500/25"
                        >
                            <Mail size={20} />
                            Send an Email
                            <ArrowUpRight size={18} />
                        </motion.a>

                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 glass rounded-full text-white font-bold hover:bg-white/10"
                        >
                            <Calendar size={20} />
                            Book a Call
                        </motion.a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4">
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 glass rounded-full text-white transition-all ${social.color}`}
                                aria-label={social.label}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="container mx-auto px-4 mt-24 pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                    <p>© 2025 Anil Oncul. All rights reserved.</p>
                    <p className="font-mono text-xs">
                        Built with Next.js, Tailwind CSS &amp; Framer Motion
                    </p>
                </div>
            </div>
        </section>
    );
}
