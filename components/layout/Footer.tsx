import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[var(--color-muted)]">
                © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
                </p>
                <p className="text-xs text-[var(--color-muted)]/50">
                    Desenvolvido por JJVOB
                </p>
            </div>
        </footer>
    );
}
