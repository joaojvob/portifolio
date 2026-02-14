"use client";

import {
    SITE_CONFIG,
    SKILLS,
    EXPERIENCES,
    EDUCATION,
} from "@/lib/constants";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SkillRadar from "@/components/ui/SkillRadar";
import ReflectiveCard from "@/components/ui/ReflectiveCard";
import { Briefcase, GraduationCap, Wrench, FileDown } from "lucide-react";

/** Dados para o radar — nível de proficiência autoavaliado */
const SKILL_RADAR_DATA = [
    { label: "Laravel", value: 90 },
    { label: "PHP", value: 85 },
    { label: "SQL", value: 80 },
    { label: "Flutter", value: 75 },
    { label: "React", value: 65 },
    { label: "Next.js", value: 60 },
    { label: "Git", value: 85 },
    { label: "JS/TS", value: 70 },
];

export function About() {
    return (
        <section id="about" className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollFloat
                containerClassName="text-3xl font-bold mb-2"
                textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
            >
                Sobre mim
            </ScrollFloat>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            {/* ── Bio + ReflectiveCard + Tecnologias ── */}
            <div className="flex flex-col lg:flex-row gap-10 items-start mb-16">
                {/* Coluna esquerda: bio + tecnologias */}
                <div className="flex-1 min-w-0">
                    <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-10">
                        {SITE_CONFIG.description} Possuo vivência em todo o ciclo de
                        desenvolvimento de software e sou proativo no aprendizado contínuo,
                        atualmente expandindo minhas competências em front-end com React e
                        Next.js.
                    </p>

                    {/* Skills inline com o texto */}
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-[var(--color-accent)]" />
                        Tecnologias & Ferramentas
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(SKILLS).map(([category, items]) => (
                            <div key={category}>
                                <h4 className="text-sm text-[var(--color-accent)] font-medium mb-3 uppercase tracking-wider">
                                    {category}
                                </h4>
                                <div className="flex flex-col gap-1.5">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="
                                                text-sm px-3 py-1.5 rounded-lg
                                                bg-white/[0.03] border border-white/[0.06]
                                                text-[var(--color-muted)]
                                                hover:text-[var(--color-foreground)]
                                                hover:border-[var(--color-accent)]/20
                                                hover:bg-[var(--color-accent)]/5
                                                transition-all duration-200
                                                cursor-default
                                            "
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botão currículo — abaixo das skills, à esquerda */}
                    {SITE_CONFIG.resumeUrl && (
                        <div className="mt-8">
                            <a
                                href={SITE_CONFIG.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center gap-2.5
                                    bg-[var(--color-accent)] text-[var(--color-background)]
                                    px-8 py-3.5 rounded-xl font-semibold
                                    hover:brightness-110 hover:scale-[1.02]
                                    transition-all duration-200
                                    shadow-[0_0_20px_rgba(201,162,39,0.15)]
                                "
                            >
                                <FileDown className="w-5 h-5" />
                                Baixar Currículo
                            </a>
                        </div>
                    )}
                </div>

                {/* Coluna direita: card + radar */}
                <div className="shrink-0 flex flex-col items-center gap-8">
                    <ReflectiveCard
                        overlayColor="rgba(0, 0, 0, 0.1)"
                        blurStrength={8}
                        glassDistortion={20}
                        metalness={0.6}
                        roughness={0.3}
                        displacementStrength={15}
                        noiseScale={1}
                        specularConstant={3}
                        grayscale={0.1}
                        color="#ffffff"
                    />

                    <SkillRadar
                        data={SKILL_RADAR_DATA}
                        size={240}
                        className="w-[240px] h-[240px]"
                    />
                </div>
            </div>

            {/* ── EXPERIÊNCIA ── */}
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[var(--color-accent)]" />
                Experiência Profissional
            </h3>
            <div className="space-y-6 mb-16">
                {EXPERIENCES.map((exp) => (
                    <SpotlightCard key={exp.company} className="!p-6">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <p className="text-sm text-[var(--color-accent)] mb-1">
                            {exp.company}
                        </p>
                        <p className="text-xs text-[var(--color-muted)] mb-2">
                            {exp.period}
                        </p>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {exp.description}
                        </p>
                    </SpotlightCard>
                ))}
            </div>

            {/* ── FORMAÇÃO ── */}
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--color-accent)]" />
                Formação Acadêmica
            </h3>
            <div className="space-y-4">
                {EDUCATION.map((edu) => (
                    <div key={edu.degree} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                        <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm text-[var(--color-muted)]">
                                {edu.institution}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
