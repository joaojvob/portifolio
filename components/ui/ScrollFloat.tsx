"use client";

import { useEffect, useMemo, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
    children: ReactNode;
    containerClassName?: string;
    textClassName?: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
}

export default function ScrollFloat({
    children,
    containerClassName = "",
    textClassName = "",
    animationDuration = 1,
    ease = "back.inOut(2)",
    scrollStart = "center bottom+=50%",
    scrollEnd = "bottom bottom-=40%",
    stagger = 0.03,
}: ScrollFloatProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const splitText = useMemo(() => {
        const text = typeof children === "string" ? children : "";
        return text.split("").map((char, index) => (
            <span className="inline-block word" key={index}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const charElements = el.querySelectorAll(".inline-block");

        const ctx = gsap.context(() => {
            gsap.fromTo(
                charElements,
                {
                    willChange: "opacity, transform",
                    opacity: 0,
                    yPercent: 120,
                    scaleY: 2.3,
                    scaleX: 0.7,
                    transformOrigin: "50% 0%",
                },
                {
                    duration: animationDuration,
                    ease,
                    opacity: 1,
                    yPercent: 0,
                    scaleY: 1,
                    scaleX: 1,
                    stagger,
                    scrollTrigger: {
                        trigger: el,
                        start: scrollStart,
                        end: scrollEnd,
                        scrub: true,
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
        <h2
            ref={containerRef}
            className={`overflow-hidden ${containerClassName}`}
        >
            <span className={`inline-block ${textClassName}`}>
                {splitText}
            </span>
        </h2>
    );
}
