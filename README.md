# João Julio — Portfólio

Portfólio pessoal com temática Interstellar, fundo Galaxy WebGL, animações GSAP e componentes interativos.

## 🚀 Stack

| Camada | Tecnologias |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Linguagem** | TypeScript 5 |
| **Estilização** | Tailwind CSS 4 |
| **Animações** | GSAP 3 (ScrollTrigger), Motion (BlurText) |
| **3D / WebGL** | OGL (Galaxy Background) |
| **Ícones** | Lucide React |
| **Email** | Resend (API Route) |
| **Deploy** | Vercel |

## ✨ Funcionalidades

- **Galaxy WebGL** — fundo animado com partículas usando OGL
- **Navbar GSAP** — pills com animação de hover/scroll auto-hide
- **BlurText / ScrollFloat** — textos animados com blur e parallax
- **SpotlightCard** — cards com efeito spotlight que segue o mouse
- **ReflectiveCard** — card metálico com foto, filtros SVG e overlay de webcam opcional
- **SkillRadar** — gráfico radar SVG com proficiência de skills
- **Formulário de contato** — envio de email via Resend (API Route)
- **SEO** — OpenGraph, Twitter Cards, robots.txt, sitemap.xml
- **Responsivo** — layout adaptável de mobile a desktop

## 📁 Estrutura

```
app/
  layout.tsx            → Layout raiz (Galaxy, Header, Footer)
  page.tsx              → Página principal com todas as seções
  globals.css           → Tema (cores, fontes)
  robots.ts             → Configuração de crawlers
  sitemap.ts            → Mapa do site para SEO
  api/contact/route.ts  → API de envio de email
components/
  layout/               → Header (GSAP navbar), Footer
  sections/             → Hero, About, Projects, Tcc, Certificates, Contact
  ui/                   → SpotlightCard, ReflectiveCard, SkillRadar,
                          BlurText, ScrollFloat, GalaxyBackground,
                          Galaxy, ScrollToTop
lib/
  constants.ts          → Dados centralizados (projetos, skills, XP, etc.)
public/
  docs/                 → PDFs (diploma, certificados)
  images/               → Foto de perfil, logo
```

## 🛠️ Rodando localmente

```bash
# Instalar dependências
npm install

# Variáveis de ambiente
cp .env.example .env.local
# Preencha RESEND_API_KEY e CONTACT_EMAIL

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse `http://localhost:3000` após `npm run dev`.

## 📦 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server com Turbopack |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build localmente |
| `npm run lint` | ESLint |

## 📄 Licença

MIT
