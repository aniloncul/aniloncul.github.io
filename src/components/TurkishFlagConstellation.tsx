"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ─── Graph Layout ───────────────────────────────────────────────
interface GNode {
    id: string;
    x: number;
    y: number;
    size: number;
    label: string;
}

interface GEdge {
    from: string;
    to: string;
    type: "normal" | "parallel";
}

const NODES: GNode[] = [
    { id: "n0", x: 900, y: 150, size: 75, label: "START" },
    { id: "n1", x: 450, y: 600, size: 75, label: "router" },
    { id: "n2", x: 1350, y: 600, size: 75, label: "planner" },
    { id: "n3", x: 450, y: 1050, size: 75, label: "agent_a" },
    { id: "n4", x: 1350, y: 1050, size: 75, label: "agent_b" },
    { id: "n5", x: 90, y: 1275, size: 75, label: "tool_a" },
    { id: "n6", x: 1710, y: 1275, size: 75, label: "tool_b" },
    { id: "n7", x: 450, y: 1500, size: 75, label: "reducer" },
    { id: "n8", x: 1350, y: 1500, size: 75, label: "validator" },
    { id: "n9", x: 900, y: 1950, size: 75, label: "END" },
];

const EDGES: GEdge[] = [
    { from: "n0", to: "n1", type: "normal" },
    { from: "n0", to: "n2", type: "normal" },
    { from: "n1", to: "n3", type: "normal" },
    { from: "n2", to: "n4", type: "normal" },
    { from: "n3", to: "n5", type: "parallel" },
    { from: "n5", to: "n3", type: "parallel" },
    { from: "n4", to: "n6", type: "parallel" },
    { from: "n6", to: "n4", type: "parallel" },
    { from: "n3", to: "n7", type: "normal" },
    { from: "n4", to: "n8", type: "normal" },
    { from: "n7", to: "n9", type: "normal" },
    { from: "n8", to: "n9", type: "normal" },
];

// ─── Perfect Geometric Shape Generators ────────────────────────────

function generateGeometricStar(cx: number, cy: number, rOuter: number, rInner: number): string {
    const points: string[] = [];
    for (let i = 0; i < 16; i++) {
        const angle = (Math.PI / 8) * i - Math.PI / 2;
        const r = i % 2 === 0 ? rOuter : rInner;
        points.push(`${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`);
    }
    return `M ${points.join(" L ")} Z`;
}

function generateGeometricChevron(cx: number, cy: number, width: number, height: number, thickness: number): string {
    const halfW = width / 2.15;
    const topY = cy - height / 1.4;
    const bottomY = cy + height / 2;
    const pts = [
        { x: cx - halfW, y: topY },
        { x: cx, y: bottomY },
        { x: cx + halfW, y: topY },
        { x: cx + halfW, y: topY + thickness },
        { x: cx, y: bottomY + thickness },
        { x: cx - halfW, y: topY + thickness }
    ];
    return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} L ${pts[3].x},${pts[3].y} L ${pts[4].x},${pts[4].y} L ${pts[5].x},${pts[5].y} Z`;
}

const STAR_PATH = generateGeometricStar(900, 600, 700, 320);
const CHEVRON_PATH = generateGeometricChevron(900, 1500, 1920, 550, 280);

// ─── Components ─────────────────────────────────────────────────

function Particles() {
    const ps = useMemo(() =>
        Array.from({ length: 40 }, (_, i) => ({
            i, x: Math.random() * 1800, y: Math.random() * 2250,
            s: Math.random() * 4 + 1.5, d: Math.random() * 5 + 4,
            dl: Math.random() * 5, o: Math.random() * 0.25 + 0.05,
        })), []);
    return (
        <>
            {ps.map((p) => (
                <motion.circle key={p.i} cx={p.x} cy={p.y} r={p.s} fill="rgba(255,255,255,0.4)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, p.o, 0], cy: [p.y, p.y - 40, p.y] }}
                    transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: "easeInOut" }}
                />
            ))}
        </>
    );
}

function Edge({ x1, y1, x2, y2, type, index }: { x1: number, y1: number, x2: number, y2: number, type: "normal" | "parallel", index: number }) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;

    const nx = -uy, ny = ux;
    const offsetScale = type === "parallel" ? 30 : 0;

    const sx = x1 + ux * 115 + nx * offsetScale;
    const sy = y1 + uy * 115 + ny * offsetScale;
    const ex = x2 - ux * 115 + nx * offsetScale;
    const ey = y2 - uy * 115 + ny * offsetScale;

    const al = 38, aw = 18;
    const a1x = ex - ux * al + uy * aw, a1y = ey - uy * al - ux * aw;
    const a2x = ex - ux * al - uy * aw, a2y = ey - uy * al + ux * aw;

    const delay = index * 0.05 + 0.6;
    const stroke = "rgba(0, 0, 0, 0.85)";
    const weight = 3.5;

    return (
        <g>
            <motion.line x1={sx} y1={sy} x2={ex} y2={ey}
                stroke="rgba(0, 0, 0, 0.05)" strokeWidth={15} strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            />
            <motion.line x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={stroke} strokeWidth={weight}
                strokeLinecap="round" strokeDasharray={type === "parallel" ? "20 15" : "none"}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay }}
            />
            <motion.polygon points={`${ex},${ey} ${a1x},${a1y} ${a2x},${a2y}`} fill={stroke}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.3 }}
            />
        </g>
    );
}

function Node({ node, index }: { node: GNode, index: number }) {
    const [h, setH] = useState(false);
    const isTerminal = node.id === "n0" || node.id === "n9";
    const d = index * 0.07;
    const weight = 3.5;

    return (
        <g onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ cursor: "pointer" }}>
            <motion.circle cx={node.x} cy={node.y} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth={2} animate={{ r: [node.size * 1.2, node.size * 1.6, node.size * 1.2], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3.5, delay: d + 1.2, repeat: Infinity }} />
            <motion.circle cx={node.x} cy={node.y} r={h ? node.size * 1.1 : node.size} fill="#ffffff" stroke="#000000" strokeWidth={weight} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: d }} />
            <motion.text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize={isTerminal ? "30" : "27"} fontWeight="600" fontFamily="Inter, sans-serif">{node.label}</motion.text>
        </g>
    );
}

function DecorationStyle({ path, color = "#e2e8f0" }: { path: string, color?: string }) {
    return (
        <motion.path
            d={path}
            fill={color}
            stroke={color}
            strokeWidth={11}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            initial={{ opacity: 0.3 }}
            animate={{
                opacity: [0, 0.5, 0.0],
            }}
            transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

// ─── Main Component ─────────────────────────────────────────────
export default function TurkishFlagConstellation() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg
                viewBox="0 0 1800 2250"
                className="w-full h-full max-h-[85vh] md:max-h-full"
                style={{ overflow: "visible" }}
                preserveAspectRatio="xMidYMid meet"
            >
                <DecorationStyle path={STAR_PATH} color="#e2e8f0" />
                <DecorationStyle path={CHEVRON_PATH} color="#e2e8f0" />

                <Particles />

                {/* ── Edges ── */}
                {EDGES.map((e, i) => {
                    const fromNode = NODES.find(n => n.id === e.from)!;
                    const toNode = NODES.find(n => n.id === e.to)!;
                    return <Edge key={`${e.from}-${e.to}-${i}`} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} type={e.type} index={i} />;
                })}

                {/* ── Nodes ── */}
                {NODES.map((n, i) => <Node key={n.id} node={n} index={i} />)}
            </svg>
        </div>
    );
}
