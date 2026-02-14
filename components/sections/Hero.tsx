"use client";

import { SITE_CONFIG } from "@/lib/constants";
import BlurText from "@/components/ui/BlurText";

export function Hero() {
    return (
        <section
            aria-label="Apresentação"
            className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-screen"
        >
            <BlurText
                text="Disponível para novos projetos"
                delay={80}
                animateBy="words"
                direction="top"
                className="px-3 py-1 text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full mb-6 tracking-widest uppercase justify-center"
            />

            <BlurText
                text="Desenvolvendo experiências"
                delay={120}
                animateBy="words"
                direction="top"
                className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight justify-center"
            />

            <BlurText
                text="digitais modernas."
                delay={150}
                animateBy="words"
                direction="bottom"
                className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--color-accent)] italic justify-center"
            />

            <BlurText
                text={`Olá, eu sou o ${SITE_CONFIG.name}. ${SITE_CONFIG.description}`}
                delay={30}
                animateBy="words"
                direction="bottom"
                className="max-w-2xl text-lg text-[var(--color-muted)] mb-10 justify-center"
                stepDuration={0.3}
            />

            <div className="flex flex-col sm:flex-row gap-4">
                <a href="#projects">
                    <BlurText
                        text="Ver Projetos"
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                        className="bg-[var(--color-accent)] text-[var(--color-background)] px-8 py-3 rounded-lg font-medium hover:brightness-110 transition-all cursor-pointer justify-center"
                        animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                        animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
                    />
                </a>
                <a href="#contact">
                    <BlurText
                        text="Contato"
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                        className="border border-white/10 px-8 py-3 rounded-lg font-medium text-[var(--color-foreground)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-all cursor-pointer justify-center"
                        animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                        animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
                    />
                </a>
            </div>
        </section>
    );
}
