"use client";

import { CERTIFICATES } from "@/lib/constants";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Award, ExternalLink, FolderOpen } from "lucide-react";

export function Certificates() {
    if (CERTIFICATES.length === 0) {
        return (
            <section id="certificates" className="py-20 px-4 max-w-5xl mx-auto">
                <ScrollFloat
                    containerClassName="text-3xl font-bold mb-2"
                    textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
                >
                    Certificados
                </ScrollFloat>
                <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

                <div className="border border-dashed border-white/10 rounded-xl p-12 text-center">
                    <FolderOpen className="w-10 h-10 text-[var(--color-accent)]/40 mx-auto mb-4" />
                    <p className="text-[var(--color-muted)]">
                        Certificados sendo organizados — em breve!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="certificates" className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollFloat
                containerClassName="text-3xl font-bold mb-2"
                textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
            >
                Certificados
            </ScrollFloat>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            <div className="space-y-4">
                {CERTIFICATES.map((cert) => (
                    <SpotlightCard key={cert.title} className="!p-0">
                        <div className="flex items-center gap-5 p-5">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6 text-[var(--color-accent)]" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base">{cert.title}</h3>
                                <p className="text-sm text-[var(--color-accent)]">{cert.issuer}</p>
                            </div>

                            <span className="text-sm text-[var(--color-muted)] shrink-0 hidden sm:block">
                                {cert.date}
                            </span>

                            {cert.url && (
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        shrink-0 inline-flex items-center gap-1.5
                                        text-sm px-4 py-2 rounded-lg
                                        border border-[var(--color-accent)]/20
                                        text-[var(--color-accent)]
                                        hover:bg-[var(--color-accent)]/10
                                        transition-colors
                                    "
                                >
                                    Ver
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    );
}
