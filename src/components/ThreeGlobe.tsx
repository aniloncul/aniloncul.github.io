"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ThreeGlobeProps {
    scrollProgress: number;
    activeCoords: [number, number]; // [lat, lng]
    manualRotation: number; // Added manual rotation control
    manualTilt: number; // Added manual tilt control
}

export default function ThreeGlobe({ scrollProgress, activeCoords, manualRotation, manualTilt }: ThreeGlobeProps) {
    const meshRef = useRef<THREE.Group>(null);
    const markerRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Responsive scale
    const globeScale = useMemo(() => {
        return (Math.min(viewport.width, viewport.height) / 4) * 0.8;
    }, [viewport]);

    // Load GeoJSON for Coastline Lines
    const geoJsonData = useLoader(THREE.FileLoader, "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_coastline.geojson");

    const radius = 2; // Radius of globe

    const { pointsPosition, linesGeometry } = useMemo(() => {
        // 1. Generate Uniform Fibonacci Points (Background Sphere)
        const count = 4000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            positions.set([x, y, z], i * 3);
        }

        // 2. Process GeoJSON for Accurate Border Lines
        const geoJson = JSON.parse(geoJsonData as string);
        const linePositions: number[] = [];

        const convertToXYZ = (lon: number, lat: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon) * (Math.PI / 180);
            const x = radius * Math.sin(phi) * Math.sin(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.cos(theta);
            return [x, y, z];
        };

        geoJson.features.forEach((feature: any) => {
            if (feature.geometry.type === "LineString") {
                const coords = feature.geometry.coordinates;
                for (let i = 0; i < coords.length - 1; i++) {
                    const [lon1, lat1] = coords[i];
                    const [lon2, lat2] = coords[i + 1];
                    const p1 = convertToXYZ(lon1, lat1);
                    const p2 = convertToXYZ(lon2, lat2);
                    linePositions.push(...p1, ...p2);
                }
            }
        });

        const linesGeo = new THREE.BufferGeometry();
        linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

        return { pointsPosition: positions, linesGeometry: linesGeo };
    }, [geoJsonData]);

    // Calculate position for the Red Marker
    const markerPosition = useMemo(() => {
        const [lat, lon] = activeCoords;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.cos(theta);
        // Push slightly out to sit on top
        const scale = 1.02;
        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }, [activeCoords]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
            const targetRotationY = scrollProgress * Math.PI * 2;
            const manualRad = manualRotation * Math.PI * 2;
            const tiltRad = manualTilt * Math.PI;
            meshRef.current.rotation.y = targetRotationY + (state.clock.elapsedTime * 0.05) + manualRad;
            meshRef.current.rotation.x = (scrollProgress * 0.2) + tiltRad;
        }

        // Pulse the marker
        if (markerRef.current) {
            const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
            markerRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group
            scale={globeScale}
            ref={meshRef}
        >
            {/* GeoJSON Real Borders */}
            <lineSegments geometry={linesGeometry}>
                <lineBasicMaterial color="#6366f1" opacity={0.8} transparent />
            </lineSegments>

            {/* Random Background Dots */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[pointsPosition, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    color="#6366f1"
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.3}
                />
            </points>

            {/* Inner Sphere */}
            <mesh>
                <sphereGeometry args={[1.95, 32, 32]} />
                <meshBasicMaterial color="#000" opacity={0.9} transparent />
            </mesh>

            {/* Red Landmark */}
            <mesh ref={markerRef} position={markerPosition}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#ef4444" />
            </mesh>
            {/* Glow Ring for Landmark */}
            <mesh position={markerPosition} lookAt={() => new THREE.Vector3(0, 0, 0)}>
                <ringGeometry args={[0.08, 0.1, 32]} />
                <meshBasicMaterial color="#ef4444" opacity={0.5} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}
