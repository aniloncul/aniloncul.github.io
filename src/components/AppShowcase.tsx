"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Globe,
} from "lucide-react";

const webApps = [
    {
        id: 1,
        name: "LingoCast",
        tagline: "AI-Powered Language Learning Podcast Generator",
        description:
            "An educative AI platform that generates personalized language-learning podcasts on demand. Features real-time streaming generation, multi-speaker TTS synthesis, AI-generated cover art, and interactive comprehension quizzes.",
        gradient: "from-amber-600 via-orange-600 to-red-600",
        screenshot: "/screenshots/lingocast.png",
        status: "live",
        link: "https://podcast-generator-delta.vercel.app/",
        techStack: {
            frontend: ["Next.js 16", "TypeScript", "TailwindCSS 4", "Framer Motion"],
            backend: ["Python", "FastAPI", "Supabase", "FFmpeg"],
            ai: ["Gemini 2.5 Flash", "Imagen 4", "Gemini TTS"],
            orchestration: ["Streaming Response", "Async Pipeline"],
            deployment: ["Vercel", "Render.com"],
        },
        workflowDescription:
            "User inputs topic, details, level, and grammar focus. Backend streams status updates while: 1) Gemini generates dialogue script with quiz questions, 2) HF FLUX creates cover art, 3) Gemini TTS synthesizes multi-speaker audio. Files are uploaded to Supabase Storage and optionally saved to database.",
        aiFeatures: [
            "Podcast transcript generation",
            "Multi-speaker podcast audio generation",
            "AI Image generation for podcast cover art",
            "Comprehensive quiz structure generation",
        ],
        pythonScripts: [
            "WAV → MP3 audio encoding with FFmpeg",
            "Multi-speaker TTS audio synthesis",
            "Real-time SSE streaming pipeline",
            "Supabase Storage upload & URL generation",
        ],
        workflowNodes: [
            { id: "1", label: "User Input", icon: "user" },
            { id: "2", label: "FastAPI", icon: "fastapi" },
            { id: "3", label: "Gemini", icon: "gemini" },
            { id: "4", label: "HuggingFace", icon: "huggingface" },
            { id: "5", label: "Audio Gen", icon: "audio" },
            { id: "6", label: "Supabase", icon: "supabase" },
        ],
    },
    {
        id: 2,
        name: "Explores.Berlin",
        tagline: "AI-Augmented Event Discovery Platform",
        description:
            "A curated, interactive map application for discovering underground events, exhibitions, and techno culture in Berlin. Features LLM-guided web scraping, semantic classification, and a split-panel UI with Google Maps integration.",
        gradient: "from-zinc-800 via-neutral-900 to-yellow-500",
        screenshot: "/screenshots/exploresberlin.png",
        status: "live",
        link: "https://explores-berlin.vercel.app/",
        techStack: {
            frontend: ["Next.js 14", "React 19", "TailwindCSS", "Zustand", "Google Maps API"],
            backend: ["Node.js", "Supabase PostgreSQL"],
            ai: ["LLM Web Scraping", "Semantic Classification"],
            orchestration: ["ETL Scripts", "useMemo Pipeline"],
            deployment: ["Vercel", "Supabase"],
        },
        workflowDescription:
            "Event Sites → LLM Scraper → CSV Data → LLM Classification → Node.js ETL → Supabase → Next.js → Maps UI",
        aiFeatures: [
            "'Plan my Saturday' → AI generates full-day itinerary",
            "Multi-stop route optimization on interactive map",
            "Time-aware scheduling (opening hours, travel time)",
            "AI curator: historical context & hidden gems for each stop",
        ],
        pythonScripts: [
            "LLM-guided web scraping that adapts to layout changes",
            "Zero-shot event categorization (Techno, Exhibition, Dining)",
            "Real-time geocoding with Berlin neighborhood mapping",
            "Autonomous ETL pipeline to Supabase PostgreSQL",
        ],
        workflowNodes: [
            { id: "1", label: "Web Scraper", icon: "python" },
            { id: "2", label: "LLM Parse", icon: "gemini" },
            { id: "3", label: "Classify", icon: "openai" },
            { id: "4", label: "Supabase", icon: "supabase" },
            { id: "5", label: "Next.js", icon: "nextjs" },
        ],
    },
    {
        "id": 3,
        "name": "ExamCurrator",
        "tagline": "Master Language Exams with Fine-Tuned AI",
        "description": "An adaptive preparation platform for standardized language exams (Goethe, TOEFL, IELTS). It transforms static study materials into dynamic, exam-grade practice questions using custom fine-tuned LLMs.",
        "gradient": "from-emerald-500 via-teal-500 to-cyan-600",
        "screenshot": "/screenshots/examcurrator.png",
        "status": "live",
        "link": "https://examcurrator-960123097756.europe-west4.run.app/",
        "techStack": {
            "frontend": ["Vanilla JS", "CSS3", "HTML5"],
            "backend": ["Python", "Flask", "Supabase"],
            "ai": ["Gemini 1.5 Flash", "Vertex AI", "Fine-Tuned Endpoint"],
            "orchestration": ["Regex", "Pandas", "PyMuPDF"],
            "deployment": ["Docker", "Google Cloud Run"]
        },
        "workflowDescription": "Official YDS exam PDFs (German, English, French, Russian) are parsed using advanced Regex patterns to extract structured question data. This clean dataset fine-tunes Gemini models via Vertex AI to replicate specific question styles and difficulty. The Flask backend orchestrates generation requests with Supabase handling user auth and performance tracking.",
        "aiFeatures": [
            "Domain-Specific Fine-Tuning: Custom Gemini model trained on 500+ official YDS questions to replicate difficulty, distractor logic, and linguistic patterns.",
            "Contextual Explanations: AI-generated explanations for each question, breaking down grammar rules and vocabulary in the target language.",
            "Performance Analytics Agent: Tracks user answers to identify weak categories, recommend study areas, and build personalized vocabulary lists."
        ],
        "pythonScripts": [
            "PDF Parsing & Structure Extraction (pdf_extractor.py)",
            "Dataset Cleaning & JSONL Formatting for Vertex AI",
            "Quiz Data Generation & Enrichment Pipeline"
        ],
        "workflowNodes": [
            { "id": "1", "label": "YDS PDFs", "icon": "pdf" },
            { "id": "2", "label": "Regex Extraction", "icon": "regex" },
            { "id": "3", "label": "Dataset (JSONL)", "icon": "json" },
            { "id": "4", "label": "Vertex AI Tuning", "icon": "cloud" },
            { "id": "5", "label": "Exam Generation", "icon": "gemini" },
            { "id": "6", "label": "Interactive UI", "icon": "browser" }
        ]

    },

];

function CarouselCard({ app, isActive }: { app: typeof webApps[0]; isActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative w-full mx-auto ${isActive ? "z-10" : "z-0"}`}
        >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                {/* LEFT SIDE - Browser Frame with Screenshot */}
                <div className="w-full lg:w-[60%] glass rounded-xl md:rounded-3xl overflow-hidden border border-black/5 hover:border-black/10 transition-all duration-500 shadow-2xl">
                    {/* Browser Chrome Header */}
                    <div className="bg-neutral-100/80 px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 border-b border-black/5">
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400/80" />
                        </div>
                        <div className="flex-1 mx-2 md:mx-6">
                            <div className="bg-neutral-200/50 rounded-lg px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs text-neutral-500 font-mono flex items-center gap-2 truncate">
                                <Globe size={12} className="shrink-0 text-neutral-400" />
                                <span className="truncate">{`https://${app.name.toLowerCase().replace(/\s/g, "")}.dev`}</span>
                            </div>
                        </div>
                        {app.status === "live" && (
                            <div className="px-2 py-1 text-[10px] md:text-xs font-bold uppercase bg-emerald-500/10 text-emerald-600 rounded-full flex items-center gap-1.5 shrink-0 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Live
                            </div>
                        )}
                    </div>

                    {/* SCREENSHOT AREA */}
                    <div className="relative aspect-video lg:aspect-[16/10] overflow-hidden bg-neutral-50">
                        <div
                            className="absolute inset-0 bg-cover bg-top transition-transform duration-1000 ease-out hover:scale-105"
                            style={{ backgroundImage: `url(${app.screenshot})` }}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE - Project Info (Outside Frame) */}
                <div className="w-full lg:w-[40%] flex flex-col space-y-6 lg:space-y-8 p-2 lg:p-0">
                    <div className="space-y-2 lg:space-y-4">
                        <h3 className={`text-4xl sm:text-5xl lg:text-7xl font-bebas tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${app.gradient}`}>
                            {app.name}
                        </h3>
                        <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-800 font-semibold leading-tight">
                            {app.tagline}
                        </p>
                    </div>

                    <p className="text-base sm:text-lg lg:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light">
                        {app.description}
                    </p>

                    <div className="pt-4 lg:pt-6">
                        <a
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group inline-flex items-center gap-3 px-8 py-4 lg:px-12 lg:py-6 bg-gradient-to-r ${app.gradient} rounded-2xl text-white text-lg lg:text-2xl font-bold shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 w-fit`}
                        >
                            <span>View Project</span>
                            <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}



export default function AppShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance to trigger slide change
    const minSwipeDistance = 50;

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % webApps.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + webApps.length) % webApps.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    // Touch handlers for swipe support
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    return (
        <section id="apps" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-8">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Carousel */}
            <div className="w-full max-w-[95vw] 2xl:max-w-[90vw] mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
                <div className="relative">
                    {/* Nav Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-black/5 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} className="text-neutral-900" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-black/5 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} className="text-neutral-900" />
                    </button>

                    {/* Slides with swipe support */}
                    <div
                        className="overflow-hidden px-10 md:px-14"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <CarouselCard app={webApps[activeIndex]} isActive={true} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {webApps.map((app, index) => (
                            <button
                                key={app.id}
                                onClick={() => goToSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? "w-6 bg-gradient-to-r from-indigo-500 to-purple-500"
                                    : "w-1.5 bg-black/10 hover:bg-black/20"
                                    }`}
                                aria-label={`Go to ${app.name}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
