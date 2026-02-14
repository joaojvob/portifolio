"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform float uGlowIntensity;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 2.0

float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = (0.04 * uGlowIntensity) / d;
    m += smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 800.0)) * flare * uGlowIntensity;
    m *= smoothstep(1.0, 0.2, d);
    return m;
}

vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 offset = vec2(float(x), float(y));
            vec2 si = id + offset;
            float seed = Hash21(si);
            float size = fract(seed * 345.32);

            float flareSize = smoothstep(0.85, 1.0, size);

            float warm = Hash21(si + 1.0);
            vec3 color = mix(
                vec3(0.8, 0.85, 1.0),
                vec3(1.0, 0.9, 0.7),
                warm
            );

            vec2 pad = vec2(
                fract(seed * 34.0 + uTime * uSpeed * 0.05) - 0.5,
                fract(seed * 38.0 + uTime * uSpeed * 0.03) - 0.5
            ) * 0.6;

            float star = Star(gv - offset - pad, flareSize);

            float twinkle = sin(uTime * uSpeed * 1.5 + seed * 6.283) * 0.3 + 0.7;
            twinkle = mix(1.0, twinkle, uTwinkleIntensity);

            col += star * size * color * twinkle;
        }
    }

    return col;
}

void main() {
    vec2 focalPx = uFocal * uResolution.xy;
    vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

    float a = uTime * uRotationSpeed;
    float c = cos(a);
    float s = sin(a);
    uv = mat2(c, -s, s, c) * uv;
    uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

    vec3 col = vec3(0.0);

    for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
        float depth = fract(i + uStarSpeed * uSpeed);
        float scale = mix(15.0 * uDensity, 0.5 * uDensity, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        col += StarLayer(uv * scale + i * 453.32) * fade;
    }

    if (uTransparent) {
        float alpha = min(length(col) * 3.0, 1.0);
        gl_FragColor = vec4(col, alpha);
    } else {
        gl_FragColor = vec4(col, 1.0);
    }
}
`;

interface GalaxyProps {
    focal?: [number, number];
    rotation?: [number, number];
    starSpeed?: number;
    density?: number;
    hueShift?: number;
    disableAnimation?: boolean;
    speed?: number;
    glowIntensity?: number;
    twinkleIntensity?: number;
    rotationSpeed?: number;
    transparent?: boolean;
}

export default function Galaxy({
    focal = [0.5, 0.5],
    rotation = [1.0, 0.0],
    starSpeed = 0.5,
    density = 1,
    hueShift = 140,
    disableAnimation = false,
    speed = 1.0,
    glowIntensity = 0.3,
    twinkleIntensity = 0.3,
    rotationSpeed = 0.1,
    transparent = true,
    ...rest
}: GalaxyProps) {
    const ctnDom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ctnDom.current) return;

        const canvas = document.createElement("canvas");
        const testGl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!testGl) return;

        const ctn = ctnDom.current;

        let renderer: Renderer;
        const dpr = Math.min(window.devicePixelRatio, 1);
        try {
            renderer = new Renderer({
                alpha: transparent,
                premultipliedAlpha: false,
                dpr,
            });
        } catch {
            return;
        }

        const gl = renderer.gl;

        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        gl.canvas.style.display = "block";

        if (transparent) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
        } else {
            gl.clearColor(0, 0, 0, 1);
        }

        let program: Program;
        let resizeTimer: ReturnType<typeof setTimeout>;

        function resize() {
            const w = ctn.offsetWidth;
            const h = ctn.offsetHeight;
            renderer.setSize(w, h);
            if (program) {
                program.uniforms.uResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height
                );
            }
        }

        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 100);
        }

        window.addEventListener("resize", onResize, false);
        resize();

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
                },
                uFocal: { value: new Float32Array(focal) },
                uRotation: { value: new Float32Array(rotation) },
                uStarSpeed: { value: starSpeed },
                uDensity: { value: density },
                uHueShift: { value: hueShift },
                uSpeed: { value: speed },
                uGlowIntensity: { value: glowIntensity },
                uTwinkleIntensity: { value: twinkleIntensity },
                uRotationSpeed: { value: rotationSpeed },
                uTransparent: { value: transparent },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId: number;

        function update(t: number) {
            animateId = requestAnimationFrame(update);
            if (!disableAnimation) {
                program.uniforms.uTime.value = t * 0.001;
                program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;
            }
            renderer.render({ scene: mesh });
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        return () => {
            cancelAnimationFrame(animateId);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", onResize);
            ctn.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [
        focal,
        rotation,
        starSpeed,
        density,
        hueShift,
        disableAnimation,
        speed,
        glowIntensity,
        twinkleIntensity,
        rotationSpeed,
        transparent,
    ]);

    return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;
}
