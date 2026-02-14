"use client";

import React, { useRef, useState, useEffect } from "react";
import { Code2, Quote } from "lucide-react";
import Image from "next/image";

interface ReflectiveCardProps {
    blurStrength?: number;
    color?: string;
    metalness?: number;
    roughness?: number;
    overlayColor?: string;
    displacementStrength?: number;
    noiseScale?: number;
    specularConstant?: number;
    grayscale?: number;
    glassDistortion?: number;
    className?: string;
    style?: React.CSSProperties;
}

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
    blurStrength = 12,
    color = "white",
    metalness = 1,
    roughness = 0.4,
    overlayColor = "rgba(255, 255, 255, 0.1)",
    displacementStrength = 20,
    noiseScale = 1,
    specularConstant = 1.2,
    grayscale = 1,
    glassDistortion = 0,
    className = "",
    style = {},
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [streamActive, setStreamActive] = useState(false);

    useEffect(() => {
        let stream: MediaStream | null = null;

        const startWebcam = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 320 },
                        height: { ideal: 240 },
                        facingMode: "user",
                    },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreamActive(true);
                }
            } catch  (error) {
                console.error("Erro ao acessar a webcam:", error);
            }
        };

        startWebcam();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
    const saturation = 1 - Math.max(0, Math.min(1, grayscale));

    const cssVariables = {
        "--blur-strength": `${blurStrength}px`,
        "--metalness": metalness,
        "--roughness": roughness,
        "--overlay-color": overlayColor,
        "--text-color": color,
        "--saturation": saturation,
    } as React.CSSProperties;

    return (
        <div
            className={`relative w-[280px] h-[420px] rounded-[20px] overflow-hidden bg-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] isolate font-sans ${className}`}
            style={{ ...style, ...cssVariables }}
        >
            {/* SVG Filters */}
            <svg
                className="absolute w-0 h-0 pointer-events-none opacity-0"
                aria-hidden="true"
            >
                <defs>
                    <filter
                        id="metallic-displacement"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
                        <feTurbulence
                            type="turbulence"
                            baseFrequency={baseFrequency}
                            numOctaves="2"
                            result="noise"
                        />
                        <feColorMatrix
                            in="noise"
                            type="luminanceToAlpha"
                            result="noiseAlpha"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={displacementStrength}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="rippled"
                        />
                        <feSpecularLighting
                            in="noiseAlpha"
                            surfaceScale={displacementStrength}
                            specularConstant={specularConstant}
                            specularExponent="20"
                            lightingColor="#ffffff"
                            result="light"
                        >
                            <fePointLight x="0" y="0" z="300" />
                        </feSpecularLighting>
                        <feComposite
                            in="light"
                            in2="rippled"
                            operator="in"
                            result="light-effect"
                        />
                        <feBlend
                            in="light-effect"
                            in2="rippled"
                            mode="screen"
                            result="metallic-result"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                            result="solidAlpha"
                        />
                        <feMorphology
                            in="solidAlpha"
                            operator="erode"
                            radius="45"
                            result="erodedAlpha"
                        />
                        <feGaussianBlur
                            in="erodedAlpha"
                            stdDeviation="10"
                            result="blurredMap"
                        />
                        <feComponentTransfer in="blurredMap" result="glassMap">
                            <feFuncA
                                type="linear"
                                slope="0.5"
                                intercept="0"
                            />
                        </feComponentTransfer>
                        <feDisplacementMap
                            in="metallic-result"
                            in2="glassMap"
                            scale={glassDistortion}
                            xChannelSelector="A"
                            yChannelSelector="A"
                            result="final"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Foto de perfil como fundo principal */}
            <Image
                src="/images/profile.jpg"
                alt="João Julio"
                fill
                className="object-cover z-0"
                sizes="280px"
                priority
            />

            {/* Webcam como overlay reflexivo sutil */}
            {streamActive && (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover scale-[1.2] -scale-x-100 z-[1] opacity-20 mix-blend-overlay pointer-events-none transition-opacity duration-500"
                    style={{
                        filter: `saturate(var(--saturation, 0)) contrast(120%) brightness(110%) blur(var(--blur-strength, 12px)) url(#metallic-displacement)`,
                    }}
                />
            )}

            {/* Vídeo oculto para captura (quando webcam ativa mas ainda carregando) */}
            {!streamActive && (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute w-0 h-0 opacity-0 pointer-events-none"
                />
            )}

            {/* Noise texture overlay — sutil */}
            <div className="absolute inset-0 z-10 opacity-[0.15] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.8%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url(%23noiseFilter)%27%2F%3E%3C%2Fsvg%3E')] mix-blend-overlay" />

            {/* Metallic gradient — leve */}
            <div className="absolute inset-0 z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_100%)] pointer-events-none mix-blend-overlay" />

            {/* Border gradient */}
            <div className="absolute inset-0 rounded-[20px] p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.4)_100%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] z-20 pointer-events-none" />

            {/* Gradiente de escurecimento — topo e base para legibilidade */}
            <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

            {/* Conteúdo do card */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/30 pb-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] px-2.5 py-1.5 bg-black/40 backdrop-blur-sm rounded-md border border-white/30 shadow-lg">
                        <Code2 size={13} className="opacity-90" />
                        <span className="drop-shadow-md">DESENVOLVEDOR FULLSTACK</span>
                    </div>
                </div>

                {/* Nome e cargo */}
                <div className="flex-1 flex flex-col justify-end items-center text-center gap-4 mb-6">
                    <div className="text-center">
                        <h2 className="text-xl font-bold tracking-[0.05em] m-0 mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            JOÃO JULIO
                        </h2>
                        <p className="text-[11px] tracking-[0.2em] opacity-90 m-0 uppercase drop-shadow-md">
                            PLENO
                        </p>
                    </div>
                </div>

                {/* Citação */}
                <div className="flex justify-between items-end border-t border-white/30 pt-4">
                    <div className="flex items-start gap-2 max-w-[85%]">
                        <Quote
                            size={14}
                            className="opacity-70 shrink-0 mt-0.5 drop-shadow-md"
                        />
                        <span className="text-[11px] leading-relaxed opacity-90 italic drop-shadow-md">
                            &ldquo;O prazer no trabalho aperfeiçoa a obra.&rdquo;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReflectiveCard;
