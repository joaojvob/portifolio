import { TCC } from "@/lib/constants";

export function Tcc() {
    const hasContent = TCC.title.length > 0;

    return (
        <section id="tcc" className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Trabalho de Conclusão</h2>
        <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

        {hasContent ? (
            <div className="border border-white/5 rounded-xl p-8 bg-[var(--color-surface)]">
            <h3 className="text-xl font-semibold mb-4">{TCC.title}</h3>
            <p className="text-[var(--color-muted)] leading-relaxed mb-6">
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
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                    Baixar PDF
                </a>
            )}
            </div>
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
