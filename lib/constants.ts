/**
 * Dados centralizados do portfólio.
 */

export const SITE_CONFIG = {
  name: "João Julio",
  role: "Desenvolvedor Full-Stack",
  description:
    "Especialista em transformar ideias em código limpo, escalável e de alta performance utilizando o ecossistema Next.js.",
  siteUrl: "https://seusite.com.br", // domínio
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/joaojvob",
  linkedin: "https://www.linkedin.com/in/joão-julio-veriato-oliveira-benigno-9325711a7", // LinkedIn
  email: "mailto:joaojuliovob@gmail.com", // email
} as const;

export const NAV_LINKS = [
  { label: "Projetos", href: "#projects" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
] as const;
