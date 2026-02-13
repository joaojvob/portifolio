import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-screen">
      {/* Badge de status */}
      <span className="px-3 py-1 text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full mb-6 tracking-widest uppercase">
        Disponível para novos projetos
      </span>

      {/* Título Principal — H1 único para SEO */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        Desenvolvendo experiências <br />
        <span className="text-[var(--color-accent)] italic">digitais modernas.</span>
      </h1>

      {/* Bio Curta */}
      <p className="max-w-2xl text-lg text-[var(--color-muted)] mb-10">
        Olá, eu sou o <strong className="text-[var(--color-foreground)]">{SITE_CONFIG.name}</strong>.{" "}
        {SITE_CONFIG.description}
      </p>

      {/* CTAs (Call to Action) */}
      <div className="flex gap-4">
        <a
          href="#projects"
          className="bg-[var(--color-accent)] text-[var(--color-background)] px-8 py-3 rounded-lg font-medium hover:brightness-110 transition-all"
        >
          Ver Projetos
        </a>
        <a
          href="#contact"
          className="border border-white/10 px-8 py-3 rounded-lg font-medium text-[var(--color-foreground)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-all"
        >
          Contato
        </a>
      </div>
    </section>
  );
}
