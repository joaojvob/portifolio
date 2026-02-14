"use client";

import { useState, FormEvent } from "react";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import ScrollFloat from "@/components/ui/ScrollFloat";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMsg(result.error || "Erro ao enviar mensagem.");
                setStatus("error");
                return;
            }

            setStatus("success");
            form.reset();
            setTimeout(() => setStatus("idle"), 5000);
        } catch {
            setErrorMsg("Erro de conexão. Tente novamente.");
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollFloat
                containerClassName="text-3xl font-bold mb-2"
                textClassName="text-[clamp(1.6rem,4vw,2rem)] leading-[1.5]"
            >
                Contato
            </ScrollFloat>
            <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

            <div className="grid md:grid-cols-2 gap-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm text-[var(--color-muted)] mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg
                                bg-[var(--color-surface)] border border-white/10
                                text-[var(--color-foreground)]
                                focus:outline-none focus:border-[var(--color-accent)]/50
                                transition-colors
                            "
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-[var(--color-muted)] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="
                                w-full px-4 py-3 rounded-lg
                                bg-[var(--color-surface)] border border-white/10
                                text-[var(--color-foreground)]
                                focus:outline-none focus:border-[var(--color-accent)]/50
                                transition-colors
                            "
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm text-[var(--color-muted)] mb-1">
                            Mensagem
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="
                                w-full px-4 py-3 rounded-lg resize-none
                                bg-[var(--color-surface)] border border-white/10
                                text-[var(--color-foreground)]
                                focus:outline-none focus:border-[var(--color-accent)]/50
                                transition-colors
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="
                            bg-[var(--color-accent)] text-[var(--color-background)]
                            px-8 py-3 rounded-lg font-medium
                            hover:brightness-110 transition-all
                            cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
                    </button>

                    {status === "success" && (
                        <p className="text-green-400 text-sm mt-2">
                            ✓ Mensagem enviada com sucesso!
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-red-400 text-sm mt-2">
                            ✕ {errorMsg}
                        </p>
                    )}
                </form>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Vamos conversar</h3>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            Estou disponível para novos projetos e oportunidades.
                            Entre em contato por aqui ou pelas redes sociais.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <a
                            href={SOCIAL_LINKS.email}
                            className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            {SOCIAL_LINKS.email.replace("mailto:", "")}
                        </a>

                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            github.com/joaojvob
                        </a>

                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>

                        <div className="flex items-center gap-3 text-[var(--color-muted)]">
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {SITE_CONFIG.location}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
