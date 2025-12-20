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
        <section className="relative h-full flex flex-col justify-center overflow-hidden py-8 lg:py-12">
            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 xl:px-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm md:text-base lg:text-lg font-mono text-pink-400 uppercase tracking-widest mb-4 lg:mb-6 block">
                            About Me
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bebas text-white mb-4 lg:mb-6 xl:mb-8">
                            Turning Ideas Into
                            <span className="text-gradient"> Reality</span>
                        </h2>

                        <div className="space-y-4 lg:space-y-6 text-neutral-300 font-mono text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl">
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
                        <div className="grid grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mt-8 lg:mt-10 xl:mt-14">
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
                                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bebas text-gradient">{stat.value}</div>
                                    <div className="text-xs md:text-sm lg:text-base text-neutral-500 uppercase tracking-wide">{stat.label}</div>
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
                        className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 xl:gap-6"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass rounded-xl p-4 md:p-5 lg:p-6 xl:p-8 cursor-default group"
                            >
                                <skill.icon
                                    size={28}
                                    className="text-indigo-400 mb-2 lg:mb-3 xl:mb-4 group-hover:text-pink-400 transition-colors lg:w-8 lg:h-8 xl:w-10 xl:h-10"
                                />
                                <h3 className="font-bebas text-white text-lg md:text-xl lg:text-2xl xl:text-3xl mb-1 lg:mb-2">{skill.label}</h3>
                                <p className="text-xs md:text-sm lg:text-base text-neutral-500">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
