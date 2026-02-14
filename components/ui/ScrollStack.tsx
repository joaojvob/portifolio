"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackProps {
    children: ReactNode[];
    className?: string;
}

/**
 * Cards empilhados que se fixam e deslizam conforme o scroll.
 * Cada card fica "pinado" até o próximo empurrá-lo para cima.
 */
export default function ScrollStack({ children, className = "" }: ScrollStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = gsap.utils.toArray<HTMLElement>(
            container.querySelectorAll(".scroll-stack-card")
        );

        const triggers: ScrollTrigger[] = [];

        cards.forEach((card, i) => {
            const isLast = i === cards.length - 1;

            const st = ScrollTrigger.create({
                trigger: card,
                start: `top ${80 + i * 20}px`,
                end: isLast ? "bottom bottom" : `top ${80 + (i + 1) * 20}px`,
                pin: !isLast,
                pinSpacing: false,
                onUpdate: (self) => {
                    /* Leve escala regressiva nos cards fixados */
                    if (!isLast) {
                        const scale = 1 - self.progress * 0.04;
                        gsap.set(card, { scale, opacity: 1 - self.progress * 0.15 });
                    }
                },
            });

            triggers.push(st);
        });

        return () => {
            triggers.forEach((st) => st.kill());
        };
    }, [children]);

    return (
        <div ref={containerRef} className={className}>
            {(children as ReactNode[]).map((child, i) => (
                <div
                    key={i}
                    className="scroll-stack-card mb-6 will-change-transform"
                >
                    {child}
                </div>
            ))}
        </div>
    );
}
