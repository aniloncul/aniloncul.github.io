"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [count, setCount] = useState(5); // Start closer to action for better UX, usually 10 but 5 is snappier
    const [isExiting, setIsExiting] = useState(false);

    const handleComplete = useCallback(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800); // Wait for exit animation
    }, [onComplete]);

    useEffect(() => {
        if (count > 0 && !isExiting) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (count === 0 && !isExiting) {
            handleComplete();
        }
    }, [count, isExiting, handleComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
        // Parent doesn't fade out, children move away
        >
            {/* Left Curtain */}
            <motion.div
                className="absolute left-0 top-0 w-1/2 h-full curtain-texture z-40 origin-left"
                initial={{ x: 0 }}
                exit={{
                    x: "-100%",
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }  // Custom cubic bezier for heavy curtain feel
                }}
            >
                {/* Gold Trim/Tassel hint */}
                <div className="absolute right-4 top-0 bottom-0 w-2 bg-yellow-600/30 blur-sm" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
                className="absolute right-0 top-0 w-1/2 h-full curtain-texture z-40 origin-right"
                initial={{ x: 0 }}
                exit={{
                    x: "100%",
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                }}
            >
                {/* Gold Trim/Tassel hint */}
                <div className="absolute left-4 top-0 bottom-0 w-2 bg-yellow-600/30 blur-sm" />
            </motion.div>

            {/* Content Container (Countdown) */}
            <motion.div
                className="relative z-50 flex flex-col items-center justify-center text-white"
                exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.8 } }}
            >
                {/* Countdown Circle */}
                <div className="relative flex items-center justify-center w-64 h-64 border-4 border-white/20 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute w-full h-0.5 bg-white/30 rotate-90" />
                    <div className="absolute w-full h-0.5 bg-white/30" />

                    {/* Rotating arm effect */}
                    <motion.div
                        className="absolute w-1/2 h-0.5 bg-white/80 origin-right left-0"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />

                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={count}
                            initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            exit={{ scale: 1.5, opacity: 0, filter: "blur(5px)" }}
                            transition={{ duration: 0.5 }}
                            className="text-9xl font-bebas font-bold z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                        >
                            {count > 0 ? count : "GO"}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Skip Button */}
            <motion.button
                onClick={handleComplete}
                exit={{ opacity: 0 }}
                className="absolute bottom-10 right-10 z-50 flex items-center gap-2 px-4 py-2 text-sm font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/40 rounded bg-black/20 backdrop-blur-md"
            >
                <SkipForward size={16} />
                Skip Intro
            </motion.button>
        </motion.div>
    );
}
