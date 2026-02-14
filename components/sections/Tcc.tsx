"use client";

import { TCC } from "@/lib/constants";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { FileText, ExternalLink, Users } from "lucide-react";

export function Tcc() {
    const hasContent = TCC.title.length > 0;

    return (
        <section id="tcc" className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollFloat
                containerClassName="text-3xl font-bold mb-2"
                textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
            >
                Trabalho de Conclusão
            </ScrollFloat>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            {hasContent ? (
                <SpotlightCard className="max-w-3xl mx-auto">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--color-accent)] font-medium uppercase tracking-wider mb-2">
                                Artigo Científico • Ciência da Computação
                            </p>
                            <h3 className="text-lg font-semibold leading-snug">
                                {TCC.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mb-6 pl-1">
                        <Users className="w-4 h-4 text-[var(--color-muted)] mt-0.5 shrink-0" />
                        <p className="text-sm text-[var(--color-muted)]">
                            {TCC.authors.join(" · ")}
                        </p>
                    </div>

                    <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                        {TCC.summary}
                    </p>

                    {TCC.downloadUrl && (
                        <a
                            href={TCC.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center gap-2
                                bg-[var(--color-accent)] text-[var(--color-background)]
                                px-6 py-3 rounded-lg font-medium
                                hover:brightness-110 transition-all
                            "
                        >
                            <ExternalLink className="w-4 h-4" />
                            Acessar documento
                        </a>
                    )}
                </SpotlightCard>
            ) : (
                <div className="border border-dashed border-white/10 rounded-xl p-12 text-center">
                    <p className="text-[var(--color-muted)]">
                        Em breve — conteúdo sendo preparado.
                    </p>
                </div>
            )}
        </section>
    );
}
