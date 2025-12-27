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

                {/* Left Side: 3D Globe - Width 50% */}
                <div className="absolute left-0 top-0 h-full w-[50%] z-0">
                    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <React.Suspense fallback={null}>
                            <ScrollBridge
                                scrollYProgress={scrollYProgress}
                                activeCoords={experiences[activeIndex]?.coordinates || [52.52, 13.405]}
                                manualRotation={manualRotation}
                                manualTilt={manualTilt}
                            />
                        </React.Suspense>
                    </Canvas>

                    {/* Manual Controls - Centered under Globe */}
                    {/* Manual Controls - Centered under Globe */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-end">
                        {/* Rotate Slider (Centered) */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Rotate</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.001"
                                value={manualRotation}
                                onChange={(e) => setManualRotation(parseFloat(e.target.value))}
                                className="w-60 h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none hover:bg-white/20 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                            />
                        </div>
                    </div>

                    {/* Tilt Slider (Independent - Moved Right) */}
                    <div className="absolute bottom-8 left-[80%] -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center gap-1 mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Tilt</span>
                        <div className="relative w-4 h-24 flex items-center justify-center">
                            <input
                                type="range"
                                min="-0.5"
                                max="0.5"
                                step="0.001"
                                value={manualTilt}
                                onChange={(e) => setManualTilt(parseFloat(e.target.value))}
                                className="absolute w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none hover:bg-white/20 transition-colors -rotate-90 origin-center [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side Container: Timeline + Cards (Width 50%) */}
                <div className="absolute right-0 top-0 h-full w-[50%] flex flex-row items-center justify-start pl-8 pr-4">

                    {/* 1. Timeline Bar */}
                    <div className="relative z-10 w-12 h-[75%] flex flex-col items-center justify-center pointer-events-none">
                        <div
                            ref={lineRef}
                            className="relative h-full w-px bg-white/10 cursor-pointer pointer-events-auto group"
                            onPointerDown={(e) => {
                                isScrubbing.current = true;
                                if (parentRef?.current) parentRef.current.style.scrollBehavior = "auto";
                                handleScrub(e);
                                document.body.style.cursor = "grabbing";
                            }}
                        >
                            {/* Hit Area */}
                            <div className="absolute inset-y-0 -left-6 -right-6 z-20" />

                            {/* Progress Fill */}
                            <motion.div
                                style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                            />
                            {/* Knob */}
                            <motion.div
                                style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                                className="absolute -left-1.5 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            />

                            {/* Labels */}
                            <div className="absolute left-6 top-0 -translate-y-1/2 text-left pointer-events-none">
                                <h3 className="text-sm font-bold text-white/50 tracking-widest">PRESENT</h3>
                            </div>
                            <div className="absolute left-6 bottom-0 translate-y-1/2 text-left pointer-events-none">
                                <h3 className="text-sm font-bold text-white/50 tracking-widest">PAST</h3>
                            </div>
                        </div>
                    </div>

                    {/* 2. Cards Stack (Fish-eye List) */}
                    <div className="relative flex-1 h-[80%] ml-12">
                        {experiences.map((exp, index) => {
                            // Calculate percentage position (10% top, 90% bottom) to avoid cut-off
                            // We map index 0 -> 10%, last index -> 90%
                            const rangeMin = 15;
                            const rangeMax = 95;
                            const percent = rangeMin + (index / (experiences.length - 1)) * (rangeMax - rangeMin);

                            const isActive = index === activeIndex;

                            return (
                                <ExperienceCard
                                    key={exp.id}
                                    experience={exp}
                                    isActive={isActive}
                                    style={{ top: `${percent}%` }}
                                />
                            );
                        })}
                    </div>

                </div>

            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
        </section>
    );
}

// Bridge for Scroll -> Canvas
function ScrollBridge({ scrollYProgress, activeCoords, manualRotation, manualTilt }: { scrollYProgress: any, activeCoords: [number, number], manualRotation: number, manualTilt: number }) {
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (val) => setProgress(Number(val)));
    return <ThreeGlobe scrollProgress={progress} activeCoords={activeCoords} manualRotation={manualRotation} manualTilt={manualTilt} />;
}

// Card Component with Absolute Positioning prop
function ExperienceCard({ experience, isActive, style }: { experience: Experience; isActive: boolean; style: React.CSSProperties }) {
    return (
        <motion.div
            style={style}
            animate={{
                scale: isActive ? 1 : 0.65,
                opacity: isActive ? 1 : 0.5,
                x: isActive ? 0 : 20,
                zIndex: isActive ? 50 : 0
            }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute left-0 w-full max-w-xl -translate-y-1/2 origin-left pointer-events-none"
        >
            <div className={`
                glass rounded-xl border border-white/10 transition-all duration-300
                ${isActive ? "p-6 md:p-8 bg-white/5 backdrop-blur-md shadow-2xl" : "p-3 bg-white/5 border-transparent"}
            `}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className={`font-bebas text-white transition-all ${isActive ? "text-3xl mb-1" : "text-xl text-white/70"}`}>
                            {experience.role}
                        </h3>
                        {isActive && (
                            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm">
                                <Briefcase size={14} />
                                <span>{experience.company}</span>
                            </div>
                        )}
                        {!isActive && (
                            <span className="text-white/50 text-xs font-mono">{experience.company}</span>
                        )}
                    </div>

                    {isActive && (
                        <div className="text-right hidden sm:block">
                            <h4 className="text-neutral-400 text-sm">{experience.period}</h4>
                        </div>
                    )}
                </div>

                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 overflow-hidden"
                    >
                        <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-indigo-500 pl-3">
                            {experience.summary}
                        </p>
                        <div className="flex gap-4 mt-3 text-xs text-neutral-500 font-mono">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {experience.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {experience.period}</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
