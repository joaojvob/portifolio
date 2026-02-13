"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 50);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isVisible = !scrolled || hovered || mobileOpen;

    return (
        <header
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`
                fixed top-0 left-0 w-full z-50
                transition-all duration-500 ease-in-out
                ${isVisible ? "bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent border-b border-transparent"}
            `}
        >
      
        <nav aria-label="Navegação principal" className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

            <ul
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
