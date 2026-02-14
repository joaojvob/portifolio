"use client";

import { useRef, useEffect, useState } from "react";

interface SkillRadarProps {
    /** Label e valor (0–100) de cada eixo */
    data: { label: string; value: number }[];
    /** Tamanho do SVG em pixels */
    size?: number;
    /** Cor de preenchimento da área */
    fillColor?: string;
    /** Cor do traço da área */
    strokeColor?: string;
    className?: string;
}

export default function SkillRadar({
    data,
    size = 300,
    fillColor = "rgba(201, 162, 39, 0.2)",
    strokeColor = "rgba(201, 162, 39, 0.8)",
    className = "",
}: SkillRadarProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const cx = size / 2;
    const cy = size / 2;
    const maxRadius = size * 0.38;
    const levels = 4;
    const n = data.length;
    const angleStep = (2 * Math.PI) / n;

    useEffect(() => {
        const el = svgRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    /** Converte (índice, raio normalizado 0–1) em coordenadas SVG */
    function toXY(index: number, ratio: number) {
        const angle = angleStep * index - Math.PI / 2; // começa do topo
        return {
            x: cx + maxRadius * ratio * Math.cos(angle),
            y: cy + maxRadius * ratio * Math.sin(angle),
        };
    }

    /** Gera o polígono de um nível (grid) */
    function levelPolygon(level: number) {
        const ratio = (level + 1) / levels;
        const points = Array.from({ length: n }, (_, i) => {
            const { x, y } = toXY(i, ratio);
            return `${x},${y}`;
        }).join(" ");
        return points;
    }

    /** Gera o polígono dos dados */
    function dataPolygon(animated: boolean) {
        const points = data.map((d, i) => {
            const ratio = animated ? d.value / 100 : 0;
            const { x, y } = toXY(i, ratio);
            return `${x},${y}`;
        }).join(" ");
        return points;
    }

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            width={size}
            height={size}
        >
            {/* Grid circular */}
            {Array.from({ length: levels }, (_, lvl) => (
                <polygon
                    key={`level-${lvl}`}
                    points={levelPolygon(lvl)}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={1}
                />
            ))}

            {/* Eixos */}
            {data.map((_, i) => {
                const { x, y } = toXY(i, 1);
                return (
                    <line
                        key={`axis-${i}`}
                        x1={cx}
                        y1={cy}
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={1}
                    />
                );
            })}

            {/* Área dos dados */}
            <polygon
                points={dataPolygon(isVisible)}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinejoin="round"
                style={{
                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            />

            {/* Pontos nos vértices */}
            {data.map((d, i) => {
                const ratio = isVisible ? d.value / 100 : 0;
                const { x, y } = toXY(i, ratio);
                return (
                    <circle
                        key={`dot-${i}`}
                        cx={x}
                        cy={y}
                        r={3.5}
                        fill={strokeColor}
                        style={{
                            transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                        }}
                    />
                );
            })}

            {/* Labels */}
            {data.map((d, i) => {
                const { x, y } = toXY(i, 1.18);
                return (
                    <text
                        key={`label-${i}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="var(--color-muted)"
                        fontSize={11}
                        fontFamily="inherit"
                    >
                        {d.label}
                    </text>
                );
            })}
        </svg>
    );
}
