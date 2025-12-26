"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { Canvas } from "@react-three/fiber"; // Ensure three is installed
import { experiences, Experience } from "../data/experience";
import ThreeGlobe from "./ThreeGlobe";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function AboutTimeline({ parentRef }: { parentRef: React.RefObject<HTMLElement | null> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const isScrubbing = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [manualRotation, setManualRotation] = useState(0);
    const [manualTilt, setManualTilt] = useState(0.163);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: parentRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // Map scroll progress (0-1) to an index (0 to length-1) to highlight current experience
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * experiences.length),
            experiences.length - 1
        );
        setActiveIndex(index);
    });

    const handleScrub = (e: React.PointerEvent | PointerEvent) => {
        if (!lineRef.current || !parentRef?.current || !containerRef.current) return;

        const rect = lineRef.current.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const progress = Math.max(0, Math.min(1, relativeY / rect.height));

        const sectionTop = containerRef.current.offsetTop;
        const sectionHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollDistance = sectionHeight - windowHeight;

        const targetScroll = sectionTop + (progress * scrollDistance);

        parentRef.current.scrollTo({
            top: targetScroll,
            behavior: "auto"
        });
    };

    React.useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            if (isScrubbing.current) {
                e.preventDefault();
                handleScrub(e);
            }
        };
        const handleUp = () => {
            isScrubbing.current = false;
            document.body.style.cursor = "auto";
            if (parentRef?.current) {
                parentRef.current.style.scrollBehavior = "smooth";
            }
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
    }, []);

    return (
        <section id="about" ref={containerRef} className="relative h-[300vh] bg-neutral-950 snap-start">
            {/* Sticky Container for Visuals */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row justify-between items-center px-4 md:px-12">

                {/* Background 3D Globe (Absolute or behind) - Shifted Left via Container */}
                <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 -translate-x-[10%]">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        {/* We use a specialized component to bridge scroll to 3D */}
                        <React.Suspense fallback={null}>
                            <ScrollBridge
                                scrollYProgress={scrollYProgress}
                                activeCoords={experiences[activeIndex]?.coordinates || [52.52, 13.405]}
                                manualRotation={manualRotation}
                                manualTilt={manualTilt}
                            />
                        </React.Suspense>
                    </Canvas>
                </div>

                {/* Left Side: Animated Timeline UI - Fixed Left Column */}
                <div className="relative z-10 hidden md:flex flex-col w-24 h-full items-center justify-center pointer-events-none">
                    <div
                        ref={lineRef}
                        className="relative h-[60%] w-px bg-white/10 cursor-pointer pointer-events-auto group"
                        onPointerDown={(e) => {
                            isScrubbing.current = true;
                            if (parentRef?.current) {
                                parentRef.current.style.scrollBehavior = "auto";
                            }
                            handleScrub(e);
                            document.body.style.cursor = "grabbing";
                        }}
                    >
                        {/* Invisible Hit Area for easier grabbing */}
                        <div className="absolute inset-y-0 -left-6 -right-6 z-20" />

                        {/* Moving indicator */}
                        <motion.div
                            style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                        />
                        {/* Moving glowing dot */}
                        <motion.div
                            style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                            className="absolute -left-1.5 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        />

                        {/* Labels MOVED TO RIGHT of the line */}
                        <div className="absolute left-6 top-0 -translate-y-1/2 w-48 text-left pointer-events-none">
                            <h3 className="text-4xl font-bebas text-white/30">PRESENT</h3>
                        </div>
                        <div className="absolute left-6 bottom-0 translate-y-1/2 w-48 text-left pointer-events-none">
                            <h3 className="text-4xl font-bebas text-white/30">PAST</h3>
                        </div>
                    </div>
                </div>

                {/* Middle Spacer (Invisible) to push content apart */}
                <div className="flex-1" />

                {/* Right Side: Active Experience Card - Fixed Right Column */}
                <div className="relative z-10 w-full md:w-1/3 min-w-[320px] h-full flex items-center justify-end pointer-events-none">
                    {/* We show ONLY the active card with a nice transition */}
                    <div className="relative w-full">
                        {experiences.map((exp, index) => (
                            <ExperienceCard
                                key={exp.id}
                                experience={exp}
                                isActive={index === activeIndex}
                            />
                        ))}
                    </div>
                </div>

                {/* Manual Controls Container - Bottom Center of Globe */}
                <div className="absolute bottom-8 left-[42%] -translate-x-1/2 z-50 pointer-events-auto flex items-end gap-16">
                    {/* Rotate Slider (Horizontal) */}

                    <div className="flex flex-col items-center gap-2 w-120">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Rotate</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.001"
                            value={manualRotation}
                            onChange={(e) => setManualRotation(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none hover:bg-white/20 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                        />
                    </div>

                    {/* Tilt Slider (Vertical) */}
                    <div className="flex flex-col items-center gap-1 mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-">Tilt</span>
                        <div className="relative w-4 h-32 flex items-center justify-center">
                            <input
                                type="range"
                                min="-0.5"
                                max="0.5"
                                step="0.001"
                                value={manualTilt}
                                onChange={(e) => setManualTilt(parseFloat(e.target.value))}
                                className="absolute w-32 h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none hover:bg-white/20 transition-colors -rotate-90 origin-center [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll overlay gradient at bottom to blend */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
        </section>
    );
}

// Sub-component to inject scroll value into Canvas (since Canvas is isolated context)
function ScrollBridge({ scrollYProgress, activeCoords, manualRotation, manualTilt }: { scrollYProgress: any, activeCoords: [number, number], manualRotation: number, manualTilt: number }) {
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (val) => setProgress(Number(val)));
    return <ThreeGlobe scrollProgress={progress} activeCoords={activeCoords} manualRotation={manualRotation} manualTilt={manualTilt} />;
}

function ExperienceCard({ experience, isActive }: { experience: Experience; isActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : -50,
                scale: isActive ? 1 : 0.9,
                pointerEvents: isActive ? "auto" : "none"
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 glass p-6 md:p-8 rounded-2xl border border-white/10"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bebas text-white mb-1">{experience.role}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm md:text-base">
                        {experience.type === "work" ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                        <span>{experience.company}</span>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="flex items-center justify-end gap-1 text-neutral-400 text-xs md:text-sm mb-1">
                        <Calendar size={14} />
                        <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-neutral-400 text-xs md:text-sm">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Date/Location shown below header */}
            <div className="flex flex-wrap gap-4 mb-4 sm:hidden text-neutral-400 text-xs">
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{experience.location}</span>
                </div>
            </div>

            <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                {experience.summary}
            </p>

            <motion.div
                className="mt-6 h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isActive ? 80 : 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            />
        </motion.div>
    );
}
