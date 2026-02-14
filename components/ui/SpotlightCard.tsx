"use client";

import { useRef, useState, type ReactNode, type CSSProperties } from "react";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
}

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(201, 162, 39, 0.25)",
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    function handleFocus() {
        setIsFocused(true);
        setOpacity(0.6);
    }

    function handleBlur() {
        setIsFocused(false);
        setOpacity(0);
    }

    function handleMouseEnter() {
        setOpacity(0.6);
    }

    function handleMouseLeave() {
        setOpacity(0);
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-[var(--color-surface)] p-8 ${className}`}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                } as CSSProperties}
            />
            {children}
        </div>
    );
}
