"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HorizontalScrollWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile to disable scroll jacking or use it for responsive logic if needed later
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Initialize
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Smooth out the scroll for cinematic feel
    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 90 });

    // Map vertical scroll to horizontal movement
    // Assuming 4 full-screen sections, we move from 0% to -75% (3/4 hidden initially)
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

    // Removed mobile check to force horizontal scroll as requested
    return (
        // Height must be multiple of viewport to allow scrolling distance. 
        // 400vh means we scroll 4 screens worth of content vertically to move horizontally.
        <section ref={targetRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 flex items-center h-screen overflow-hidden">
                <motion.div style={{ x }} className="flex h-screen w-[400vw]">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
