"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Zap, Palette, Cloud } from "lucide-react";

const skills = [
    { icon: Smartphone, label: "Mobile Development", desc: "React Native, Swift, Kotlin" },
    { icon: Code2, label: "Web Development", desc: "Next.js, TypeScript, Node.js" },
    { icon: Brain, label: "AI & Machine Learning", desc: "Python, TensorFlow, OpenAI" },
    { icon: Cloud, label: "Cloud & DevOps", desc: "AWS, Vercel, Docker" },
    { icon: Palette, label: "UI/UX Design", desc: "Figma, Framer, Tailwind" },
    { icon: Zap, label: "Automation", desc: "CI/CD, Testing, Scripts" },
];

export default function AboutSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-mono text-pink-400 uppercase tracking-widest mb-4 block">
                            About Me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bebas text-white mb-6">
                            Turning Ideas Into
                            <span className="text-gradient"> Reality</span>
                        </h2>

                        <div className="space-y-4 text-neutral-300 font-mono text-sm leading-relaxed">
                            <p>
                                I&apos;m a software engineer passionate about creating digital products
                                that make a difference. With expertise spanning mobile, web, and AI,
                                I bring ideas to life with clean code and thoughtful design.
                            </p>
                            <p>
                                Based in Berlin, I work with startups and companies to build
                                innovative solutions that users love. When I&apos;m not coding,
                                you&apos;ll find me exploring new technologies or contributing to
                                open-source projects.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-10">
                            {[
                                { value: "5+", label: "Years Experience" },
                                { value: "20+", label: "Projects Delivered" },
                                { value: "10+", label: "Happy Clients" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="text-3xl md:text-4xl font-bebas text-gradient">{stat.value}</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Skills Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass rounded-xl p-5 cursor-default group"
                            >
                                <skill.icon
                                    size={28}
                                    className="text-indigo-400 mb-3 group-hover:text-pink-400 transition-colors"
                                />
                                <h3 className="font-bebas text-white text-lg mb-1">{skill.label}</h3>
                                <p className="text-xs text-neutral-500">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
