"use client";

import { useState, useEffect } from "react";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setVisible(window.scrollY > 300);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className={`
                fixed bottom-8 right-8 z-50
                w-12 h-12 rounded-full
                bg-[var(--color-surface)] border border-white/10
                flex items-center justify-center
                hover:border-[var(--color-accent)]/50
                hover:shadow-[0_0_15px_var(--color-accent)/20]
                transition-all duration-500 ease-in-out
                cursor-pointer
                ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
                }
            `}
        >
        <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 19L12 5" />
            <path d="M5 12L12 5L19 12" />
        </svg>
        </button>
    );
}
