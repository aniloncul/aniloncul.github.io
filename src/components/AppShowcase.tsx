"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Layers,
    Cpu,
    Workflow,
    Bot,
    Code2,
    Database,
    Cloud,
    Zap,
    GitBranch,
    Terminal,
    Globe,
    Server,
    Sparkles,
} from "lucide-react";
import WorkflowDiagram from "./WorkflowDiagram";
import LingoCastWorkflow from "./LingoCastWorkflow";
import ExploresBerlinWorkflow from "./ExploresBerlinWorkflow";
import ExamCurratorWorkflow from "./ExamCurratorWorkflow";

// Tech stack icons mapping
const techIcons: Record<string, React.ReactNode> = {
    "Next.js": <Globe size={14} />,
    "React": <Code2 size={14} />,
    "TypeScript": <Terminal size={14} />,
    "Python": <Code2 size={14} />,
    "FastAPI": <Zap size={14} />,
    "PostgreSQL": <Database size={14} />,
    "Supabase": <Database size={14} />,
    "Firebase": <Cloud size={14} />,
    "TailwindCSS": <Layers size={14} />,
    "Zustand": <GitBranch size={14} />,
    "OpenAI": <Bot size={14} />,
    "LangChain": <Sparkles size={14} />,
    "Celery": <Workflow size={14} />,
    "Redis": <Server size={14} />,
    "Docker": <Cpu size={14} />,
    "n8n": <Workflow size={14} />,
    "Vercel": <Cloud size={14} />,
    "AWS": <Cloud size={14} />,
    "GCP": <Cloud size={14} />,
};

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
        link: "https://explores.berlin/",
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

function TechBadge({ tech }: { tech: string }) {
    return (
        <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-all">
            <span className="text-indigo-400">{techIcons[tech] || <Code2 size={12} />}</span>
            <span className="text-xs md:text-sm text-neutral-300">{tech}</span>
        </div>
    );
}

function CarouselCard({ app, isActive }: { app: typeof webApps[0]; isActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative w-full mx-auto ${isActive ? "z-10" : "z-0"}`}
        >
            <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                {/* Browser Chrome */}
                <div className="bg-neutral-800/80 px-3 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 mx-3">
                        <div className="bg-neutral-700/50 rounded px-3 py-1 text-[10px] text-neutral-400 font-mono flex items-center gap-1.5">
                            <Globe size={10} />
                            {`https://${app.name.toLowerCase().replace(/\s/g, "")}.dev`}
                        </div>
                    </div>
                    {app.status === "beta" && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white">
                            Beta
                        </span>
                    )}
                    {app.status === "live" && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white flex items-center gap-1">
                            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            Live
                        </span>
                    )}
                </div>

                {/* Split Layout: Left (Preview) | Right (Tech Stack) - Responsive height based on viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[600px]">
                    {/* LEFT SIDE - Web App Preview */}
                    <div className="relative">
                        {/* Screenshot */}
                        <div
                            className="absolute inset-0 bg-contain bg-top bg-no-repeat bg-neutral-900"
                            style={{ backgroundImage: `url(${app.screenshot})` }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-40 mix-blend-overlay`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/80 hidden lg:block" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-4 md:p-6 lg:p-8 xl:p-10">
                            <h3 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bebas text-transparent bg-clip-text bg-gradient-to-r ${app.gradient} mb-1 lg:mb-2`}>
                                {app.name}
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg text-neutral-300 font-medium mb-2 lg:mb-4">{app.tagline}</p>
                            <p className="text-xs md:text-sm lg:text-base text-neutral-400 leading-relaxed mb-4 lg:mb-6 max-w-2xl">{app.description}</p>

                            <a
                                href={app.link}
                                className={`inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r ${app.gradient} rounded-lg text-white text-sm lg:text-base font-medium hover:shadow-lg hover:scale-105 transition-all w-fit`}
                            >
                                View Project <ExternalLink size={16} className="lg:w-5 lg:h-5" />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Tech Stack */}
                    <div className="bg-neutral-900/80 p-3 md:p-4 lg:p-5 space-y-2 lg:space-y-3">
                        {/* Tech Stack Header */}
                        <h4 className="text-sm font-bebas text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <Layers className="text-indigo-400" size={16} />
                            Full Tech Stack
                        </h4>

                        {/* Tech Categories Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* Frontend */}
                            <div className="glass rounded-lg p-2 border border-white/5">
                                <div className="text-sm md:text-base text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Globe size={14} /> Frontend
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.frontend.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Backend */}
                            <div className="glass rounded-lg p-2 border border-white/5">
                                <div className="text-sm md:text-base text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Server size={14} /> Backend
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.backend.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Orchestration */}
                            <div className="glass rounded-lg p-2 border border-white/5">
                                <div className="text-sm md:text-base text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Workflow size={14} /> Orchestration
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.orchestration.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Deployment */}
                            <div className="glass rounded-lg p-2 border border-white/5">
                                <div className="text-sm md:text-base text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Cloud size={14} /> Deployment
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.deployment.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Workflow Diagram - n8n style visual */}
                        <div className="glass rounded-lg p-4 border border-white/5 bg-gradient-to-r from-amber-500/5 to-orange-500/5 min-h-[140px]">
                            <div className="text-xs md:text-sm text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Workflow size={14} /> Workflow Pipeline
                            </div>
                            {app.id === 1 ? (
                                <LingoCastWorkflow />
                            ) : app.id === 2 ? (
                                <ExploresBerlinWorkflow />
                            ) : app.id === 3 ? (
                                <ExamCurratorWorkflow />
                            ) : (
                                <WorkflowDiagram nodes={app.workflowNodes} gradient={app.gradient} />
                            )}
                        </div>

                        {/* AI & Python Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* AI Features */}
                            <div className="glass rounded-lg p-2 border border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                                <div className="text-sm md:text-base text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Bot size={14} /> AI Features
                                </div>
                                <ul className="space-y-1">
                                    {app.aiFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-1 text-sm md:text-base text-neutral-400">
                                            <Sparkles size={14} className="text-purple-400 mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Python Scripts */}
                            <div className="glass rounded-lg p-2 border border-white/5 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                                <div className="text-sm md:text-base text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Terminal size={14} /> Python Scripts
                                </div>
                                <ul className="space-y-1">
                                    {app.pythonScripts.map((script, idx) => (
                                        <li key={idx} className="flex items-start gap-1 text-sm md:text-base text-neutral-400">
                                            <Code2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                                            {script}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} className="text-white" />
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
                                    : "w-1.5 bg-white/30 hover:bg-white/50"
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
