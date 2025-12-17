"use client";

import React, { useState, useRef, useEffect } from "react";
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
        name: "Curator Map Berlin",
        tagline: "AI-Powered Event Discovery Platform",
        description:
            "An intelligent event discovery platform that aggregates and curates Berlin's vibrant cultural scene. Features real-time mapping, personalized recommendations, and social sharing capabilities.",
        gradient: "from-violet-600 via-purple-600 to-indigo-600",
        screenshot: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
        status: "live",
        link: "#",
        techStack: {
            frontend: ["Next.js", "TypeScript", "TailwindCSS", "Zustand"],
            backend: ["Python", "FastAPI", "PostgreSQL"],
            ai: ["OpenAI", "LangChain"],
            orchestration: ["Celery", "Redis", "n8n"],
            deployment: ["Vercel", "Docker", "AWS"],
        },
        workflowDescription:
            "Automated data pipelines scrape event data from multiple sources daily. Python scripts process and normalize venue information, while AI models categorize events and generate personalized recommendations.",
        aiFeatures: [
            "GPT-4 powered event descriptions",
            "Semantic search for events",
            "Personalized recommendations",
        ],
        pythonScripts: [
            "Web scraping with BeautifulSoup",
            "Data normalization pipelines",
            "Geocoding & clustering",
        ],
    },
    {
        id: 2,
        name: "NeoFinance Dashboard",
        tagline: "Intelligent Financial Analytics",
        description:
            "A sophisticated financial analytics dashboard that leverages AI to provide insights, predict trends, and automate portfolio management with real-time market data integration.",
        gradient: "from-emerald-500 via-teal-500 to-cyan-600",
        screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        status: "live",
        link: "#",
        techStack: {
            frontend: ["React", "TypeScript", "TailwindCSS"],
            backend: ["Python", "FastAPI", "Supabase"],
            ai: ["OpenAI", "LangChain"],
            orchestration: ["Celery", "Redis"],
            deployment: ["Vercel", "Docker", "GCP"],
        },
        workflowDescription:
            "Real-time market data flows through a message queue system, processed by Python workers for technical analysis. AI agents continuously monitor portfolio performance and trigger alerts.",
        aiFeatures: [
            "Natural language portfolio queries",
            "Predictive trend analysis",
            "Automated report generation",
        ],
        pythonScripts: [
            "Real-time data ingestion",
            "Technical indicator calculations",
            "Portfolio optimization",
        ],
    },
    {
        id: 3,
        name: "MindFlow Workspace",
        tagline: "Your AI-Enhanced Second Brain",
        description:
            "A next-generation knowledge management platform that combines note-taking, task management, and AI assistance. Automatically organizes your thoughts and surfaces relevant information.",
        gradient: "from-orange-500 via-rose-500 to-pink-600",
        screenshot: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop",
        status: "beta",
        link: "#",
        techStack: {
            frontend: ["Next.js", "TypeScript", "TailwindCSS", "Zustand"],
            backend: ["Python", "FastAPI", "PostgreSQL"],
            ai: ["OpenAI", "LangChain"],
            orchestration: ["Celery", "Redis", "n8n"],
            deployment: ["Vercel", "Docker", "AWS"],
        },
        workflowDescription:
            "Every note is automatically processed through an AI pipeline: content extraction, semantic analysis, and relationship mapping. n8n workflows handle cross-platform syncing.",
        aiFeatures: [
            "Automatic tagging & categorization",
            "Smart linking between notes",
            "AI writing assistant",
        ],
        pythonScripts: [
            "Text extraction & parsing",
            "Knowledge graph construction",
            "Embedding generation",
        ],
    },
    {
        id: 4,
        name: "DataFlow Orchestrator",
        tagline: "Enterprise Workflow Automation",
        description:
            "A powerful workflow automation platform that connects disparate systems, processes complex data transformations, and provides real-time monitoring for enterprise data pipelines.",
        gradient: "from-blue-600 via-indigo-600 to-violet-600",
        screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
        status: "live",
        link: "#",
        techStack: {
            frontend: ["Next.js", "TypeScript", "TailwindCSS"],
            backend: ["Python", "FastAPI", "PostgreSQL"],
            ai: ["OpenAI"],
            orchestration: ["Celery", "Redis", "n8n"],
            deployment: ["Docker", "AWS"],
        },
        workflowDescription:
            "The platform uses n8n as the visual workflow builder, with custom Python nodes for specialized data transformations. Celery workers handle heavy processing tasks.",
        aiFeatures: [
            "Anomaly detection in data flows",
            "Natural language workflow creation",
            "Predictive maintenance alerts",
        ],
        pythonScripts: [
            "Custom transformation nodes",
            "API integration adapters",
            "Schema validation & mapping",
        ],
    },
];

function TechBadge({ tech }: { tech: string }) {
    return (
        <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-all">
            <span className="text-indigo-400">{techIcons[tech] || <Code2 size={12} />}</span>
            <span className="text-[10px] text-neutral-300">{tech}</span>
        </div>
    );
}

function CarouselCard({ app, isActive }: { app: typeof webApps[0]; isActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative w-full max-w-6xl mx-auto ${isActive ? "z-10" : "z-0"}`}
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

                {/* Split Layout: Left (Preview) | Right (Tech Stack) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
                    {/* LEFT SIDE - Web App Preview */}
                    <div className="relative">
                        {/* Screenshot */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${app.screenshot})` }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-40 mix-blend-overlay`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/80 hidden lg:block" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6">
                            <h3 className={`text-2xl md:text-3xl font-bebas text-transparent bg-clip-text bg-gradient-to-r ${app.gradient} mb-1`}>
                                {app.name}
                            </h3>
                            <p className="text-sm text-neutral-300 font-medium mb-3">{app.tagline}</p>
                            <p className="text-xs text-neutral-400 leading-relaxed mb-4 max-w-md">{app.description}</p>

                            <a
                                href={app.link}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${app.gradient} rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all w-fit`}
                            >
                                View Project <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Tech Stack */}
                    <div className="bg-neutral-900/80 p-5 space-y-4 overflow-y-auto max-h-[420px]">
                        {/* Tech Stack Header */}
                        <h4 className="text-sm font-bebas text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <Layers className="text-indigo-400" size={16} />
                            Full Tech Stack
                        </h4>

                        {/* Tech Categories Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Frontend */}
                            <div className="glass rounded-lg p-3 border border-white/5">
                                <div className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Globe size={10} /> Frontend
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.frontend.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Backend */}
                            <div className="glass rounded-lg p-3 border border-white/5">
                                <div className="text-[10px] text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Server size={10} /> Backend
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.backend.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* AI */}
                            <div className="glass rounded-lg p-3 border border-white/5">
                                <div className="text-[10px] text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Bot size={10} /> AI & ML
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.ai.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Orchestration */}
                            <div className="glass rounded-lg p-3 border border-white/5">
                                <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Workflow size={10} /> Orchestration
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {app.techStack.orchestration.map((tech) => (
                                        <TechBadge key={tech} tech={tech} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Deployment */}
                        <div className="glass rounded-lg p-3 border border-white/5">
                            <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Cloud size={10} /> Deployment
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {app.techStack.deployment.map((tech) => (
                                    <TechBadge key={tech} tech={tech} />
                                ))}
                            </div>
                        </div>

                        {/* Workflow Description */}
                        <div className="glass rounded-lg p-3 border border-white/5 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
                            <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Workflow size={10} /> Workflow Orchestration
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">{app.workflowDescription}</p>
                        </div>

                        {/* AI & Python Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* AI Features */}
                            <div className="glass rounded-lg p-3 border border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                                <div className="text-[10px] text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Bot size={10} /> AI Features
                                </div>
                                <ul className="space-y-1">
                                    {app.aiFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-1 text-[10px] text-neutral-400">
                                            <Sparkles size={10} className="text-purple-400 mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Python Scripts */}
                            <div className="glass rounded-lg p-3 border border-white/5 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                                <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Terminal size={10} /> Python Scripts
                                </div>
                                <ul className="space-y-1">
                                    {app.pythonScripts.map((script, idx) => (
                                        <li key={idx} className="flex items-start gap-1 text-[10px] text-neutral-400">
                                            <Code2 size={10} className="text-cyan-400 mt-0.5 shrink-0" />
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
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 8000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleManualNav = (callback: () => void) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        callback();
        intervalRef.current = setInterval(nextSlide, 8000);
    };

    return (
        <section id="apps" className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <div className="container mx-auto px-4 mb-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3 block">
                        Featured Work
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bebas text-white mb-4">
                        Web Applications I&apos;ve Built
                    </h2>
                    <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                        Full-stack applications powered by modern frameworks, AI integrations, and automated workflows.
                    </p>
                </motion.div>
            </div>

            {/* Carousel */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="relative">
                    {/* Nav Arrows */}
                    <button
                        onClick={() => handleManualNav(prevSlide)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>

                    <button
                        onClick={() => handleManualNav(nextSlide)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} className="text-white" />
                    </button>

                    {/* Slides */}
                    <div className="overflow-hidden px-10 md:px-14">
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
                                onClick={() => handleManualNav(() => goToSlide(index))}
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
