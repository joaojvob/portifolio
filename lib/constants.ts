/**
 * Dados centralizados do portfólio.
 */

export const SITE_CONFIG = {
    name: "João Julio",
    role: "Desenvolvedor de Software",
    description: "Desenvolvedor de Software com experiência em soluções back-end robustas no ecossistema PHP com Laravel e na criação de aplicações móveis multiplataforma com Flutter.",
    siteUrl: "",
    location: "Caratinga - MG",
    phone: "(31) 99978-0267",
} as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/joaojvob",
    linkedin: "https://www.linkedin.com/in/joão-julio-veriato-oliveira-benigno-9325711a7",
    email: "mailto:joaojuliovob@gmail.com",
} as const;

export const NAV_LINKS = [
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Certificados", href: "#certificates" },
    { label: "TCC", href: "#tcc" },
    { label: "Contato", href: "#contact" },
] as const;

/**
 * Skills organizadas por categoria.
 */
export const SKILLS = {
    "Back-End": ["Laravel", "PHP", "SQL", "MySQL"],
    "Front-End": ["React", "Next.js", "JavaScript", "Blade", "JQuery"],
    Mobile: ["Flutter", "Dart"],
    Ferramentas: ["Git", "Bitbucket", "Scrum", "Kanban"],
} as const;

/**
 * Experiências profissionais (da mais recente para a mais antiga).
 */
export const EXPERIENCES = [
    {
        role: "Analista Programador",
        company: "Versa Gestão Pública (Versa Saúde)",
        period: "Mai 2025 – Presente",
        description:
        "Análise, diagnóstico e correção de bugs em sistema legado de gestão de saúde. Refatoração e otimização de código em Laravel, melhorando performance de consultas ao banco de dados.",
    },
    {
        role: "Programador de Sistemas",
        company: "Certificafe Inovação e Sustentabilidade",
        period: "Fev 2024 – Abr 2025",
        description:
        "Desenvolvimento de funcionalidades críticas em sistema de gestão (ERP) com Laravel, Blade e Flutter. Implementação de arquitetura offline first com padrão DAO.",
    },
    {
        role: "Estagiário em Desenvolvimento",
        company: "Levex",
        period: "Jul 2023 – Jan 2024",
        description:
        "Desenvolvimento e manutenção de sistemas de gestão utilizando PHP, JQuery e SQL. Participação em todas as etapas do ciclo de vida do software.",
    },
] as const;

/**
 * Formação acadêmica.
 */
export const EDUCATION = [
    {
        degree: "Pós-graduação em Engenharia de Software",
        institution: "2024",
    },
    {
        degree: "Bacharel em Ciência da Computação",
        institution: "Doctum - Caratinga/MG, 2023",
    },
] as const;

/**
 * Projetos para exibição no portfólio.
 */
export const PROJECTS = [
    {
        title: "Portfólio Pessoal",
        description:
        "Site pessoal construído com Next.js, TypeScript e Tailwind CSS. Tema Interstellar com design responsivo.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/joaojvob/portifolio",
        live: "#",
    },
] as const;

/**
 * Certificados e certificações profissionais.
 */
export type Certificate = {
    title: string;
    issuer: string;
    date: string;
    url?: string;
};

export const CERTIFICATES: Certificate[] = [
    // Adicionar certificados, seguir o modelo:
    // {
    //     title: "Nome do Certificado",
    //     issuer: "Instituição ou Plataforma",
    //     date: "2024",
    //     url: "https://link-do-certificado.com",
    // },
];

/**
 * Informações do TCC.
 */
export const TCC = {
    title: "",
    summary: "",
    downloadUrl: "",
} as const;
