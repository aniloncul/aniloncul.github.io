"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Apps", href: "#apps" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const container = document.querySelector(".fullpage-container");
        if (!container) return;

        const handleScroll = () => {
            setIsScrolled(container.scrollTop > 50);

            // Determine active section from scroll position
            const scrollPosition = container.scrollTop;
            const windowHeight = window.innerHeight;

            navItems.forEach((item) => {
                const sectionId = item.href.substring(1);
                const element = document.getElementById(sectionId);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;

                    if (
                        scrollPosition >= elementTop - windowHeight / 3 &&
                        scrollPosition < elementBottom - windowHeight / 3
                    ) {
                        setActiveSection(sectionId);
                    }
                }
            });
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-dark py-4" : "py-6"
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="text-2xl font-bebas text-white tracking-wider">
                        ANIL<span className="text-gradient">.</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const sectionId = item.href.substring(1);
                            const isActive = activeSection === sectionId;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`relative text-sm transition-colors font-mono uppercase tracking-wider ${isActive
                                        ? "text-white"
                                        : "text-neutral-400 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden p-2 text-white"
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-4 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {navItems.map((item) => {
                                const sectionId = item.href.substring(1);
                                const isActive = activeSection === sectionId;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`text-3xl font-bebas ${isActive ? "text-gradient" : "text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
