# jjvob.dev

Portfólio pessoal construído com Next.js, TypeScript e Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Deploy:** Vercel *(em breve)*

## Estrutura

```
app/                  → Páginas e layout (roteamento do Next.js)
components/
  layout/             → Header, Footer
  sections/           → Hero, About, Projects, Contact
  ui/                 → Componentes reutilizáveis (botões, cards)
lib/                  → Dados e funções auxiliares
public/images/        → Imagens e logo
```

## Rodando localmente

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse `http://localhost:3000` após `npm run dev`.

## Licença

MIT
