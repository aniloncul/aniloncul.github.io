"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Pause, RotateCcw, Copy, Check, Sparkles } from "lucide-react";

// The automation.ts code to be typed out
const automationCode = `// agentic_system.ts - Autonomous Organizational Brain
import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { Calculator } from "langchain/tools/calculator";

// 1. Initialize the Organizational Memory (Vector Store)
const embeddings = new OpenAIEmbeddings();
const vectorStore = await SupabaseVectorStore.fromExistingIndex(
  embeddings,
  {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  }
);

// 2. Define Custom Tools (The "Hands" of the Agent)
const revenueTool = new DynamicTool({
  name: "RevenueAnalyzer",
  description: "Fetches live Q3 revenue data from Data Warehouse",
  func: async () => {
    // Webhook to n8n / internal API
    const data = await fetchInternalAPI("/revenue/q3-2025");
    return JSON.stringify(data);
  },
});

const reportGeneratorTool = new DynamicTool({
  name: "ReportGenerator",
  description: "Generates and uploads PDF reports to Management Dashboard",
  func: async (input: string) => {
    const reportId = await generatePDF(input);
    return \`Report generated: \${reportId}\`;
  },
});

// 3. Initialize the Reasoning Engine (The "Brain")
const model = new ChatOpenAI({
  modelName: "gpt-4-turbo",
  temperature: 0, // Deterministic for logic
});

// 4. Create the Autonomous Agent
const executor = await initializeAgentExecutorWithOptions(
  [revenueTool, reportGeneratorTool, new Calculator()],
  model,
  {
    agentType: "openai-functions",
    verbose: true,
  }
);

console.log("🤖 Agent initialized. Waiting for triggers...");

// 5. Execute Mission
export const runAgenticWorkflow = async (goal: string) => {
  console.log(\`🎯 New Goal: \${goal}\`);
  
  // The agent decides which tools to use and in what order
  const result = await executor.call({
    input: \`Context: \${goal}. 
           Check our internal docs in Vector DB for formatting SOPs, 
           analyze the revenue, and generate a final report.\`
  });

  console.log("✅ Mission Complete:", result.output);
  return result;
};`;

// Syntax highlighting colors
const syntaxColors: Record<string, string> = {
    keyword: "text-purple-600",
    string: "text-emerald-600",
    comment: "text-neutral-500",
    function: "text-yellow-600",
    type: "text-cyan-600",
    variable: "text-blue-600",
    operator: "text-pink-600",
    number: "text-orange-600",
    property: "text-sky-600",
    bracket: "text-neutral-600",
    punctuation: "text-neutral-600",
};

// Simple syntax highlighter
function highlightSyntax(code: string): React.ReactNode[] {
    const tokens: React.ReactNode[] = [];

    // Keywords
    const keywords = /\b(import|export|const|let|var|function|async|await|return|if|else|throw|new|from|interface|type|forEach|map)\b/g;
    // Types
    const types = /\b(string|number|boolean|void|any|Promise|Error|Date|Record)\b/g;
    // Strings
    const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
    // Comments
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    // Numbers
    const numbers = /\b(\d+)\b/g;
    // Functions
    const functions = /\b([a-zA-Z_]\w*)\s*(?=\()/g;

    let lastIndex = 0;
    let key = 0;

    // Split by lines for processing
    const lines = code.split('\n');

    return lines.map((line, lineIndex) => {
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let charIndex = 0;

        // Process character by character for simple highlighting
        while (remaining.length > 0) {
            // Check for comments
            if (remaining.startsWith('//')) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.comment}>
                        {remaining}
                    </span>
                );
                break;
            }

            // Check for strings
            const stringMatch = remaining.match(/^(["'`])(?:(?!\1)[^\\]|\\.)*\1/);
            if (stringMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.string}>
                        {stringMatch[0]}
                    </span>
                );
                remaining = remaining.slice(stringMatch[0].length);
                charIndex += stringMatch[0].length;
                continue;
            }

            // Check for template literal expressions
            const templateMatch = remaining.match(/^\$\{[^}]+\}/);
            if (templateMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.variable}>
                        {templateMatch[0]}
                    </span>
                );
                remaining = remaining.slice(templateMatch[0].length);
                charIndex += templateMatch[0].length;
                continue;
            }

            // Check for keywords
            const keywordMatch = remaining.match(/^(import|export|const|let|var|function|async|await|return|if|else|throw|new|from|interface|type|forEach|map)\b/);
            if (keywordMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.keyword}>
                        {keywordMatch[0]}
                    </span>
                );
                remaining = remaining.slice(keywordMatch[0].length);
                charIndex += keywordMatch[0].length;
                continue;
            }

            // Check for types
            const typeMatch = remaining.match(/^(string|number|boolean|void|any|Promise|Error|Date|Record|Trigger|Agent|Pipeline|WorkflowConfig|PipelineResult|GeminiClient|SupabaseClient)\b/);
            if (typeMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.type}>
                        {typeMatch[0]}
                    </span>
                );
                remaining = remaining.slice(typeMatch[0].length);
                charIndex += typeMatch[0].length;
                continue;
            }

            // Check for numbers
            const numberMatch = remaining.match(/^\d+/);
            if (numberMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.number}>
                        {numberMatch[0]}
                    </span>
                );
                remaining = remaining.slice(numberMatch[0].length);
                charIndex += numberMatch[0].length;
                continue;
            }

            // Check for operators
            const operatorMatch = remaining.match(/^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!?:])/);
            if (operatorMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.operator}>
                        {operatorMatch[0]}
                    </span>
                );
                remaining = remaining.slice(operatorMatch[0].length);
                charIndex += operatorMatch[0].length;
                continue;
            }

            // Check for brackets
            const bracketMatch = remaining.match(/^[{}[\]()]/);
            if (bracketMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.bracket}>
                        {bracketMatch[0]}
                    </span>
                );
                remaining = remaining.slice(1);
                charIndex += 1;
                continue;
            }

            // Check for function calls
            const funcMatch = remaining.match(/^([a-zA-Z_]\w*)\s*(?=\()/);
            if (funcMatch) {
                parts.push(
                    <span key={`${lineIndex}-${charIndex}`} className={syntaxColors.function}>
                        {funcMatch[1]}
                    </span>
                );
                remaining = remaining.slice(funcMatch[1].length);
                charIndex += funcMatch[1].length;
                continue;
            }

            // Default: take one character
            parts.push(
                <span key={`${lineIndex}-${charIndex}`} className="text-neutral-800">
                    {remaining[0]}
                </span>
            );
            remaining = remaining.slice(1);
            charIndex += 1;
        }

        return (
            <div key={lineIndex} className="leading-relaxed">
                {parts.length > 0 ? parts : <span>&nbsp;</span>}
            </div>
        );
    });
}

interface AnimatedCodeBlockProps {
    typingSpeed?: number; // ms per character
    startDelay?: number; // ms before starting
    showControls?: boolean;
    autoPlay?: boolean;
    className?: string;
}

export default function AnimatedCodeBlock({
    typingSpeed = 15,
    startDelay = 500,
    showControls = true,
    autoPlay = true,
    className = "",
}: AnimatedCodeBlockProps) {
    const [displayedCode, setDisplayedCode] = useState("");
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isComplete, setIsComplete] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const codeContainerRef = useRef<HTMLDivElement>(null);

    const totalChars = automationCode.length;
    const progress = (displayedCode.length / totalChars) * 100;

    // Calculate current line number
    useEffect(() => {
        const lines = displayedCode.split('\n');
        setCurrentLine(lines.length);
    }, [displayedCode]);

    // Auto-scroll to bottom as code is typed
    useEffect(() => {
        if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
        }
    }, [displayedCode]);

    // Typing animation
    useEffect(() => {
        if (!isPlaying) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        const startTyping = () => {
            intervalRef.current = setInterval(() => {
                setDisplayedCode((prev) => {
                    if (prev.length >= automationCode.length) {
                        setIsComplete(true);
                        setIsPlaying(false);
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                        return prev;
                    }

                    // Type 1-3 characters at a time for more natural feel
                    const charsToAdd = Math.floor(Math.random() * 2) + 1;
                    const nextIndex = Math.min(prev.length + charsToAdd, automationCode.length);
                    return automationCode.slice(0, nextIndex);
                });
            }, typingSpeed);
        };

        const timeoutId = setTimeout(startTyping, displayedCode.length === 0 ? startDelay : 0);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, typingSpeed, startDelay]);

    const handlePlayPause = () => {
        if (isComplete) {
            // Reset
            setDisplayedCode("");
            setIsComplete(false);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleReset = () => {
        setDisplayedCode("");
        setIsComplete(false);
        setIsPlaying(false);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(automationCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Get line numbers
    const lineCount = displayedCode.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

    return (
        <div className={`relative w-full ${className}`}>
            {/* Terminal Window */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl overflow-hidden border border-black/5 shadow-2xl shadow-neutral-500/10"
            >
                {/* Terminal Header */}
                <div className="bg-neutral-100 px-4 py-3 flex items-center justify-between border-b border-neutral-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        {/* Traffic lights */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
                        </div>

                        {/* File name */}
                        <div className="flex items-center gap-2 text-neutral-600">
                            <Terminal size={14} />
                            <span className="text-sm font-mono">agentic_system.ts</span>
                            {isPlaying && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1 text-xs text-indigo-600"
                                >
                                    <Sparkles size={12} className="animate-pulse" />
                                    Writing...
                                </motion.span>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    {showControls && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePlayPause}
                                className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                                title={isPlaying ? "Pause" : isComplete ? "Replay" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause size={16} className="text-neutral-600" />
                                ) : isComplete ? (
                                    <RotateCcw size={16} className="text-neutral-600" />
                                ) : (
                                    <Play size={16} className="text-neutral-600" />
                                )}
                            </button>
                            <button
                                onClick={handleReset}
                                className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                                title="Reset"
                            >
                                <RotateCcw size={16} className="text-neutral-600" />
                            </button>
                            <button
                                onClick={handleCopy}
                                className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                                title="Copy code"
                            >
                                {copied ? (
                                    <Check size={16} className="text-emerald-500" />
                                ) : (
                                    <Copy size={16} className="text-neutral-600" />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="h-0.5 bg-neutral-200 relative overflow-hidden transition-colors duration-300">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                    {isPlaying && (
                        <motion.div
                            className="absolute top-0 right-0 w-20 h-full bg-gradient-to-r from-transparent to-white/30"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ width: `${Math.min(20, progress)}%` }}
                        />
                    )}
                </div>

                {/* Code Area */}
                <div
                    ref={codeContainerRef}
                    className="bg-white p-4 overflow-auto font-mono text-sm leading-6 transition-colors duration-300"
                    style={{ height: "500px", maxHeight: "60vh" }}
                >
                    <div className="flex">
                        {/* Line numbers */}
                        <div className="pr-4 text-right text-neutral-400 select-none border-r border-neutral-100 mr-4 transition-colors duration-300">
                            {lineNumbers.map((num) => (
                                <div key={num} className="leading-relaxed">
                                    {num}
                                </div>
                            ))}
                        </div>

                        {/* Code content with syntax highlighting */}
                        <div className="flex-1 overflow-x-auto">
                            {highlightSyntax(displayedCode)}

                            {/* Blinking cursor */}
                            {!isComplete && (
                                <motion.span
                                    className="inline-block w-2 h-5 bg-indigo-500 ml-0.5"
                                    animate={{ opacity: [1, 1, 0, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-neutral-100 px-4 py-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-200 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <span>TypeScript</span>
                        <span>UTF-8</span>
                        <span>
                            Ln {currentLine}, Col {(displayedCode.split('\n').pop()?.length || 0) + 1}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>{displayedCode.length} / {totalChars} chars</span>
                        <span className={isComplete ? "text-emerald-400" : "text-neutral-500"}>
                            {isComplete ? "✓ Complete" : `${Math.round(progress)}%`}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
