import { CERTIFICATES } from "@/lib/constants";

export function Certificates() {
    if (CERTIFICATES.length === 0) {
        return (
            <section id="certificates" className="py-20 px-4 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Certificados</h2>
                <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />
                <p className="text-[var(--color-muted)]">Em breve.</p>
            </section>
        );
    }

    return (
        <section id="certificates" className="py-20 px-4 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Certificados</h2>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CERTIFICATES.map((cert) => (
                    <div
                        key={cert.title}
                        className="
                            bg-[var(--color-surface)] border border-white/5
                            rounded-xl p-6
                            hover:border-[var(--color-accent)]/30 transition-colors
                        "
                    >
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                            </svg>
                        </div>

                        <h3 className="font-semibold text-lg mb-1">{cert.title}</h3>
                        <p className="text-sm text-[var(--color-accent)]">{cert.issuer}</p>
                        <p className="text-sm text-[var(--color-muted)] mt-1">{cert.date}</p>

                        {cert.url && (
                            <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center gap-1 mt-4
                                    text-sm text-[var(--color-muted)]
                                    hover:text-[var(--color-accent)] transition-colors
                                "
                            >
                                Ver certificado
                                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
