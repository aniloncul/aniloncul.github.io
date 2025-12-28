"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";

export default function ContactSection() {
    // ⬇️ FOR GITHUB PAGES: Use your Public n8n URL (starts with https://...)
    // If testing locally, http://localhost:5678 is fine.
    const N8N_WEBHOOK_URL = "https://gratuitous-earnestine-bedraggledly.ngrok-free.dev/webhook/contact-form";

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            // Direct fetch to n8n (Client-Side)
            const res = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({ email, subject, message }),
            });

            if (!res.ok) throw new Error("Webhook failed");

            setStatus("success");
            setEmail("");
            setSubject("");
            setMessage("");

            // Reset status after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error("Failed to send:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                        <p className="text-neutral-400">Send a message directly to my Telegram!</p>
                    </div>

                    <form onSubmit={handleSend} className="flex flex-col gap-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Subject *"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Message *"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending" || status === "success"}
                            className={`w-full font-bold rounded-lg py-3 flex items-center justify-center gap-2 transition-all ${status === "success"
                                ? "bg-green-500 text-white"
                                : "bg-white text-black hover:bg-neutral-200"
                                }`}
                        >
                            {status === "sending" ? (
                                <span>Sending...</span>
                            ) : status === "success" ? (
                                <span>Message Sent! 🚀</span>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send your message
                                </>
                            )}
                        </button>

                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center">Failed to send. Please check the Webhook URL.</p>
                        )}
                    </form>

                    <div className="flex justify-center gap-6 mt-8">
                        <a
                            href="https://github.com/aniloncul"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/anil-oncul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-[#0077b5] transition-colors"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Simple Footer */}
            <div className="absolute bottom-4 left-0 w-full text-center text-neutral-600 text-sm">
                <p>© 2025 Anil Oncul. All rights reserved.</p>
            </div>
        </section >
    );
}
