"use client";

import React from "react";
import { motion } from "framer-motion";

interface Section {
    id: string;
    label: string;
}

interface SectionIndicatorProps {
    sections: Section[];
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export default function SectionIndicator({
    sections,
    activeSection,
    onSectionClick,
}: SectionIndicatorProps) {
    return (
        <div className="section-indicator hidden md:flex">
            {sections.map((section, index) => (
                <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    onClick={() => onSectionClick(section.id)}
                    className={`section-dot group relative ${activeSection === section.id ? "active" : ""
                        }`}
                    aria-label={`Go to ${section.label}`}
                >
                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-1 bg-neutral-800/90 backdrop-blur rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {section.label}
                    </span>
                </motion.button>
            ))}
        </div>
    );
}
