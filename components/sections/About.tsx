import {
    SITE_CONFIG,
    SKILLS,
    EXPERIENCES,
    EDUCATION,
} from "@/lib/constants";

export function About() {
    return (
        <section id="about" className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Sobre mim</h2>
        <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

        {/* Bio */}
        <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-12 max-w-3xl">
            {SITE_CONFIG.description} Possuo vivência em todo o ciclo de
            desenvolvimento de software e sou proativo no aprendizado contínuo,
            atualmente expandindo minhas competências em front-end com React e
            Next.js.
        </p>

        {/* ── SKILLS ── */}
        <h3 className="text-xl font-semibold mb-6">Tecnologias & Ferramentas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
                <h4 className="text-sm text-[var(--color-accent)] font-medium mb-3 uppercase tracking-wider">
                    {category}
                </h4>
                <ul className="space-y-2">
                    {items.map((skill) => (
                        <li
                            key={skill}
                            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
            ))}
        </div>

        {/* ── EXPERIÊNCIA ── */}
        <h3 className="text-xl font-semibold mb-6">Experiência Profissional</h3>
        <div className="space-y-8 mb-16">
            {EXPERIENCES.map((exp) => (
            <div
                key={exp.company}
                className="border-l-2 border-[var(--color-accent)]/30 pl-6"
            >
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
            </div>
            ))}
        </div>

        {/* ── FORMAÇÃO ── */}
        <h3 className="text-xl font-semibold mb-6">Formação Acadêmica</h3>
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
