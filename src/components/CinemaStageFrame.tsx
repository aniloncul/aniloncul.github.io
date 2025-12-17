"use client";

import React from "react";

export default function CinemaStageFrame() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {/* Top Valance (Curtain Header) */}
            <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-red-900 shadow-2xl z-50 curtain-texture rounded-b-[50%] scale-x-125 origin-top translate-y-[-40%]" />

            {/* Left Main Curtain (Static Side) */}
            <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-red-900 shadow-2xl z-40 curtain-texture origin-left" />

            {/* Right Main Curtain (Static Side) */}
            <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-red-900 shadow-2xl z-40 curtain-texture origin-right" />

            {/* Stage Shadow / Vignette affecting the content */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none z-30" />

            {/* Bottom Stage Floor Illumination */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent z-30" />
        </div>
    );
}
