"use client";

import { PROJECTS } from "@/lib/constants";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollFloat
                containerClassName="text-3xl font-bold mb-2"
                textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
            >
                Projetos
            </ScrollFloat>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project) => (
                    <SpotlightCard key={project.title} className="!p-6 flex flex-col">
                        <h3 className="text-lg font-semibold mb-2">
                            {project.title}
                        </h3>
                        <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed flex-1">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                            {project.live && project.live !== "#" && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:brightness-110 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Ver online
                                </a>
                            )}
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    );
}
