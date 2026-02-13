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

    /**
    * The scrollToTop function scrolls the window smoothly to the top position.
    */
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

            /*
            *
            * fixed bottom-8 right-8 → Fixo no canto inferior direito
            * z-50                   → Por cima de tudo
            * w-12 h-12 rounded-full → Círculo de 48px
            * translate-y-4          → Quando invisível, desloca 16px para baixo
            * translate-y-0          → Quando visível, volta à posição normal
            * pointer-events-none    → Quando invisível, não intercepta cliques
            */
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
        {/*
        * viewBox="0 0 24 24" → Define o "canvas" de 24x24 unidades
        * strokeWidth={2}     → Espessura da linha
        * strokeLinecap/Join  → Pontas arredondadas  
        *
        * O <path d="..."> desenha a seta:
        * M12 19  → Move para o ponto (12, 19) — base da seta
        * L12 5   → Linha reta até (12, 5) — linha vertical para cima
        * M5 12   → Move para (5, 12) — começo da ponta esquerda
        * L12 5   → Linha até (12, 5) — diagonal esquerda
        * L19 12  → Linha até (19, 12) — diagonal direita
        */}
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
