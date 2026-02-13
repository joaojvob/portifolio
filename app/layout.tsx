import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

/* 
  O código está definindo uma variável `geistSans` que recebe o resultado da chamada da função `Geist` com um objeto como argumento. 
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* 
  O código está definindo uma variável `geistMono` que armazena o resultado da chamada da função `Geist_Mono` com 
  um objeto como argumento. Essa configuração permite um estilo e tema consistentes da fonte monoespaçada em todo o projeto. 
*/
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* 
  Este trecho de código exporta uma constante chamada `metadata` do tipo `Metadata`. O objeto `metadata`
  contém informações sobre o título e a descrição do site. 
*/
export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

/**
 * A função `RootLayout` é o layout raiz de uma aplicação Next.js (App Router).
 * Ela define a estrutura base da aplicação, incluindo os elementos <html> e <body>,
 * além de componentes globais como cabeçalho e controle de rolagem.
 *
 * @param - Recebe um objeto com a propriedade `children` do tipo `React.ReactNode`.
 * A propriedade `children` representa o conteúdo das páginas que será renderizado
 * dentro do layout.
 *
 * @returns Retorna a estrutura JSX base da aplicação, incluindo:
 * - Elemento <html> com o atributo `lang="pt-BR"`
 * - Elemento <body> com classes para estilização
 * - Componentes globais como <Header />, {children} e <ScrollToTop />
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
