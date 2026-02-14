import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        "desenvolvedor", "fullstack", "software", "Laravel", "PHP",
        "Flutter", "React", "Next.js", "portfólio", SITE_CONFIG.name,
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase: SITE_CONFIG.siteUrl
        ? new URL(SITE_CONFIG.siteUrl)
        : undefined,
    openGraph: {
        type: "website",
        locale: "pt_BR",
        title: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
        description: SITE_CONFIG.description,
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE_CONFIG.name} | ${SITE_CONFIG.role}`,
        description: SITE_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
};

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
                <GalaxyBackground />
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
            </body>
        </html>
    );
}
