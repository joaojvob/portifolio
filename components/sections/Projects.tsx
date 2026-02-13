import { PROJECTS } from "@/lib/constants";

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Projetos</h2>
        <div className="w-12 h-1 bg-[var(--color-accent)] mb-10 rounded-full" />

        <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
            <div
                key={project.title}
                className="
                border border-white/5 rounded-xl p-6
                bg-[var(--color-surface)]
                hover:border-[var(--color-accent)]/20
                transition-colors
                "
            >
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                    <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
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
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                    GitHub ↗
                </a>
                {project.live && project.live !== "#" && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-accent)] hover:brightness-110 transition-all"
                    >
                        Ver online ↗
                    </a>
                )}
                </div>
            </div>
            ))}
        </div>
        </section>
    );
}
