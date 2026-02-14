/**
 * Dados centralizados do portfólio.
 */

export const SITE_CONFIG = {
    name: "João Julio",
    role: "Desenvolvedor de Software",
    description: "Desenvolvedor de Software com experiência em soluções back-end robustas no ecossistema PHP com Laravel e na criação de aplicações móveis multiplataforma com Flutter.",
    siteUrl: "https://portifolio-jjvob.vercel.app",
    location: "Caratinga - MG",
    phone: "(31) 99978-0267",
    resumeUrl: "https://drive.google.com/file/d/1U7b-3I7jOxNhVOUnA1o5qgdXkC_dGv6B/view?usp=sharing",
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
type Project = {
    title: string;
    description: string;
    tags: string[];
    github: string;
    live?: string;
};

export const PROJECTS: Project[] = [
    {
        title: "Gerenciador de Tarefas — App",
        description:
        "Aplicativo Flutter para gerenciamento de tarefas integrado a uma API RESTful. Autenticação, CRUD de tarefas com prioridades coloridas, sincronização com backend e interface responsiva com Material 3.",
        tags: ["Flutter", "Dart", "REST API"],
        github: "https://github.com/joaojvob/gerenciador-tarefas-app",
        live: "",
    },
    {
        title: "Gerenciador de Tarefas — API",
        description:
        "Backend RESTful em Laravel para o sistema de gerenciamento de tarefas. Autenticação por token, endpoints para CRUD de tarefas, gerenciamento de usuários e atualização de perfil.",
        tags: ["Laravel", "PHP", "MySQL", "REST API"],
        github: "https://github.com/joaojvob/gerenciador-tarefas",
        live: "",
    },
    {
        title: "Portfólio Pessoal",
        description:
        "Site pessoal construído com Next.js, TypeScript e Tailwind CSS. Tema Interstellar com Galaxy WebGL, animações GSAP e componentes interativos.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/joaojvob/portifolio",
        live: "#",
    },
    {
        title: "TruckFlow API — Gestão de Frotas",
        description:
            "API REST multi-tenant para gestão de frotas e logística rodoviária. Backend SaaS em Laravel 12, PostgreSQL + PostGIS, projetado para ser consumido por aplicações React (web) e Flutter (mobile).",
        tags: ["Laravel", "PostgreSQL", "PostGIS", "REST API", "SaaS"],
        github: "https://github.com/joaojvob/truckflow-api",
        live: "",
    },
];

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
    {
        title: "Pós-graduação em Engenharia de Software",
        issuer: "Doctum — Teófilo Otoni/MG",
        date: "2024",
        url: "/docs/cetificado_pos.pdf",
    },
    {
        title: "Bacharel em Ciência da Computação",
        issuer: "Doctum — Caratinga/MG",
        date: "2023",
        url: "/docs/diploma.pdf",
    },
    {
        title: "Laravel 10 do Básico ao Avançado",
        issuer: "Udemy",
        date: "2023",
        url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-4478900d-40fe-43be-aced-0bbe836f5625.pdf",
    },
];

/**
 * Informações do TCC.
 */
export const TCC = {
    title: "Estudo de Caso do Sistema Acadêmico ADX para a Verificação das Funcionalidades e Identificação da Adequação Perante a LGPD",
    authors: [
        "Augusto César Moreira Gonçalves",
        "João Julio Veriato Oliveira Benigno",
        "Msc. Elias de Souza Gonçalves",
    ],
    summary:
        "Análise da adequação do sistema acadêmico ADX à Lei Geral de Proteção de Dados (LGPD), verificando funcionalidades, tratamento de dados pessoais e conformidade legal no contexto educacional.",
    downloadUrl:
        "https://docs.google.com/document/d/1-1k9mQFCayptF0m_ptBmndl42QWeIc-A-iK_hSzX_Xc/edit?usp=sharing",
} as const;
