"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export function Header() {

    const [scrolled, setScrolled] = useState(false);     // true quando o usuário rolou a página para baixo
    const [hovered, setHovered] = useState(false);       // true quando o mouse está em cima do header
    const [mobileOpen, setMobileOpen] = useState(false); // true quando o menu hambúrguer está aberto

    useEffect(() => {
        function handleScroll() {
            // window.scrollY = quantos pixels o usuário já rolou, se rolou mais de 50px, consideramos "scrolled"
            setScrolled(window.scrollY > 50);
        }

        // Adiciona um "ouvinte" (listener) no evento de scroll
        window.addEventListener("scroll", handleScroll);

        // Quando o componente sair da tela, remove o ouvinte para evitar "vazamento de memória" 
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isVisible = !scrolled || hovered || mobileOpen;

    return (
        <header
            // onMouseEnter/Leave → detectam quando o mouse entra/sai do header
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        
            /*
            * fixed                       → Fica fixo no topo (não sai ao scrollar)
            * top-0 left-0                → Posição: canto superior esquerdo
            * w-full                      → Largura 100%
            * z-50                        → Fica "por cima" de todo o conteúdo
            * transition-all duration-500 → Transição suave de 500ms
            * backdrop-blur-md            → Desfoca o fundo atrás (efeito vidro)
            */
            className={`
                fixed top-0 left-0 w-full z-50
                transition-all duration-500 ease-in-out
                ${isVisible ? "bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent border-b border-transparent"}
            `}
        >
      
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* ── LOGO (esquerda) ── */}
            <a href="#" className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"} `}>
                <Image
                    src="/images/logo.jpg"
                    alt="JJVOB Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                    priority
                />
            </a>

            {/* ── LINKS DE NAVEGAÇÃO (centro — visível só em desktop) ── */}
            <ul
                /*
                * hidden md:flex                     → Escondido no celular, flex no desktop (≥768px)
                * absolute left-1/2 -translate-x-1/2 → Centraliza no meio da tela
                * gap-8                              → Espaçamento entre os links
                */
                className={`
                    hidden md:flex items-center gap-8
                    absolute left-1/2 -translate-x-1/2
                    transition-opacity duration-500
                    ${isVisible ? "opacity-100" : "opacity-0"}
                `}
            >

                {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            /*
                            * after:             → Cria um pseudo-elemento abaixo do texto
                            * after:w-0          → Começa com largura 0 (invisível)
                            * hover:after:w-full → No hover, cresce para 100%
                            */
                            className="
                                text-sm text-[var(--color-muted)]
                                hover:text-[var(--color-foreground)]
                                transition-colors duration-300
                                relative
                                after:absolute after:bottom-[-4px] after:left-0
                                after:h-[1px] after:w-0 after:bg-[var(--color-accent)]
                                after:transition-all after:duration-300
                                hover:after:w-full
                            "
                            >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* ── BOTÃO HAMBÚRGUER ─────── */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`
                    md:hidden flex flex-col justify-center items-center
                    w-8 h-8 gap-1.5
                    transition-opacity duration-500
                    ${isVisible ? "opacity-100" : "opacity-0"}
                `}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
                {/*Menu Lateral*/}
                <span
                    className={`block h-[2px] w-6 bg-[var(--color-foreground)] transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                />
                <span
                    className={`block h-[2px] w-6 bg-[var(--color-foreground)] transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                    className={`block h-[2px] w-6 bg-[var(--color-foreground)] transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                />
            </button>
        </nav>

      {/* ── MENU MOBILE */}
        <div
            className={`
                md:hidden overflow-hidden
                transition-all duration-500 ease-in-out
                ${mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
            `}
        >
            <ul className="flex flex-col items-center gap-6 py-8 bg-[var(--color-surface)]/90 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
                <li key={link.href}>
                <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                    text-base text-[var(--color-muted)]
                    hover:text-[var(--color-accent)]
                    transition-colors duration-300
                    "
                >
                    {link.label}
                </a>
                </li>
            ))}
            </ul>
        </div>
    </header>
  );
}
