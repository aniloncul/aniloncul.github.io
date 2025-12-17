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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 90 });
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 flex items-center h-screen overflow-hidden">
                <motion.div style={{ x }} className="flex h-screen w-[400vw]">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
